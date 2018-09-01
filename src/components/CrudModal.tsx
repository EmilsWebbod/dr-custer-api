import * as React from 'react';
import { ReactNode } from 'react';

import UpdateDelete from './UpdateDelete';
import { IFetchOpts } from './Resource';
import {
  shouldHideFieldIfConditionNotMet,
  shouldRenderCustomComponent
} from './crudModal/fields';
import {
  ICrudField,
  IUpdateDeleteFieldMethods,
  IUpdateDeleteSubdocumentMethods,
  RenderableField,
  Subdocument
} from './crudModal/interface';
import { IFieldValues, ILabel, ISubdocument } from './interface';
import CreateCrudField from './crudModal/CreateCrudField';
import CrudModalComponent from './crudModal/CrudModalComponent';
import { CrudBody, CrudModalForm, CrudStatusWrapper } from '../styled/styles';
import SubdocumentReferenceInput from './crudModal/SubdocumentReferenceInput';
import ReadChips from '../styled/ReadChips';

interface CrudModalInterface {
  editing: boolean;
  fields: any;
  subdocuments: any;
}

export interface ICrudSharedProps<T> {
  id?: string;
  endpoint: string;
  fields: ICrudField[];
  subdocuments?: ISubdocument[];
  multipart?: boolean;
  actionLabel?: string;
  onClose?: () => void;
  onSave?: (res: T) => void;
  onDestroy?: (res: T) => void;
  deleteAction?: boolean;
}

export interface ICrudModalProps<T> extends ICrudSharedProps<T> {
  children: (modalInterface: CrudModalInterface) => JSX.Element;
  Header?: typeof CrudModalComponent;
  Body?: ReactNode;
  Footer?: typeof CrudModalComponent;
  busy?: boolean;
  refresh?: (opts: IFetchOpts<T>) => any;
  subdocuments?: ISubdocument[];
  editing?: boolean;
  cancelCloses?: boolean;
  disable?: boolean;
  title?: string;
}

interface State {
  editing: boolean;
}

export default class CrudModal<T> extends React.Component<
  ICrudModalProps<T>,
  State
> {
  public state = {
    editing: this.props.editing || !this.props.id || false
  };

  render() {
    const { children, subdocuments, Header, Footer, ...props } = this.props;
    const { editing } = this.state;

    const resourceBusy = this.props.busy;
    const Body: any = this.props.Body ? this.props.Body : CrudBody;

    return (
      <UpdateDelete<T>
        {...props}
        subdocuments={subdocuments}
        onSave={this.onSave}
        onDestroy={this.onDestroy}
      >
        {crudMethods => {
          return (
            <CrudStatusWrapper busy={resourceBusy || crudMethods.busy}>
              <CrudModalForm onSubmit={crudMethods.save}>
                {Header && <Header {...this.props} {...crudMethods} />}
                <Body>
                  {children({
                    editing,
                    fields: this.createRenderableFields(crudMethods),
                    subdocuments: this.createRenderableSubdocuments(crudMethods)
                  })}
                </Body>
                {Footer && <Footer {...this.props} {...crudMethods} />}
              </CrudModalForm>
            </CrudStatusWrapper>
          );
        }}
      </UpdateDelete>
    );
  }

  private createRenderableFields = (methods: IUpdateDeleteFieldMethods) => {
    const { fields } = this.props;
    const { editing } = this.state;

    const renderableFields = {};

    for (const f of fields) {
      const field = this.createRenderableField(methods, f, editing);
      if (field) {
        renderableFields[f.name] = field;
      }
    }
    return renderableFields;
  };

  private createRenderableField = (
    methods: IUpdateDeleteFieldMethods,
    f: ICrudField,
    allWriteable?: boolean
  ): RenderableField => {
    return (writable: boolean) => {
      const updateDeleteField = methods.getField<IFieldValues>(f.name);

      if (shouldHideFieldIfConditionNotMet(f, methods)) {
        if (updateDeleteField.value) {
          methods.setValue(f.name, null, '');
        }

        return null;
      }

      if (
        shouldRenderCustomComponent(f) &&
        typeof f.renderComponent === 'function'
      ) {
        return f.renderComponent(methods.setValue, methods.getField);
      }

      const extraProps = {
        value: updateDeleteField.value,
        label: updateDeleteField.label,
        setValue: methods.setValue,
        getField: methods.getField,
        onChange: this.onChange(methods, f),
        onChangeReference: this.onChangeReference(methods, f)
      };

      return allWriteable || writable ? (
        <CreateCrudField {...f} {...extraProps} />
      ) : (
        <CreateCrudField {...f} {...extraProps} type="read" />
      );
    };
  };

  private createRenderableSubdocuments = (
    methods: IUpdateDeleteSubdocumentMethods
  ) => {
    const { subdocuments } = this.props;
    const { editing } = this.state;

    if (subdocuments) {
      return subdocuments.reduce((documents, doc) => {
        documents[doc.name] = this.createRenerableSubdocument(
          methods,
          doc,
          editing
        );
        return documents;
      }, {});
    }
    return {};
  };

  private createRenerableSubdocument = (
    methods: IUpdateDeleteSubdocumentMethods,
    doc: Subdocument,
    allWritable: boolean
  ) => (writable: boolean) => {
    return doc.reference && (allWritable || writable) ? (
      <SubdocumentReferenceInput doc={doc} methods={methods} />
    ) : (
      <React.Fragment>
        {doc.helpField && <label>{doc.helpField}</label>}
        {
          <ReadChips
            chips={methods
              .getSubdocument(doc.name)
              .previews.map(p => ({ _id: p._id, label: p.label }))}
            emptyState={doc.emptyState}
          />
        }
      </React.Fragment>
    );
  };

  private onChange = (methods: IUpdateDeleteFieldMethods, f: ICrudField) => (
    e: any
  ) => {
    let value: string | File = e.currentTarget.value;

    if (
      f.type === 'file' &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      value = e.currentTarget.files[0];
    }

    methods.setValue(f.name, value, e.currentTarget.value);
  };

  private onChangeReference = (
    methods: IUpdateDeleteFieldMethods,
    f: ICrudField
  ) => (v: IFieldValues, l: ILabel) => methods.setValue(f.name, v, l);

  private onSave = (response: T & { _id: string }) => {
    const { onSave, onClose, refresh, endpoint } = this.props;
    if (typeof onSave === 'function') {
      onSave(response);
    }

    if (typeof onClose === 'function') {
      onClose();
    }

    if (typeof refresh === 'function') {
      refresh({
        background: true,
        endpoint: `${endpoint}/${response._id}`,
        cb: () => {
          this.setState({
            editing: false
          });
        }
      });
    }
  };

  private onDestroy = (response: T) => {
    const { onDestroy, onClose } = this.props;

    if (typeof onDestroy === 'function') {
      onDestroy(response);
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };
}
