import * as React from 'react';
import { isEqual } from 'lodash';
import apiRequest, { IError } from '../../api/apiRequest';
import handleError from '../../api/handleError';
import confirm from '../../api/confirm';
import {
  IBaseProps,
  ILabel,
  ISubdocument,
  ISubdocumentData,
  IUpdateDeleteField,
  IUpdateDeleteFields
} from './interface';
import {
  createSubdocumentsRequests,
  deleteSubdocumentRequest,
  isFieldEligibleForSave,
  markSubdocumentForAddition,
  markSubdocumentForDeletion,
  updateInternalFieldFromValues
} from './utils';

export interface IUpdateDeleteProps<T> extends IBaseProps<T> {
  onSaveError?: (response?: IError) => void;
  onDestroyError?: (response?: IError) => void;
}

interface IState {
  busy: boolean;
  internalFields: IUpdateDeleteFields;
  internalSubdocuments: ISubdocument[];
  startedEditing: boolean;
}

class UpdateDelete<T> extends React.Component<IUpdateDeleteProps<T>, IState> {
  state = {
    startedEditing: false,
    busy:           false,
    ...syncFields(this.props.fields, this.props.subdocuments)
  };

  constructor(props: IUpdateDeleteProps<T>) {
    super(props);
    this.getField = this.getField.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidUpdate(prevProps: IBaseProps<T>) {
    const { fields, subdocuments } = this.props;

    if (
      !isEqual(fields, prevProps.fields) ||
      !isEqual(subdocuments, prevProps.subdocuments)
    ) {
      this.setState(syncFields(fields, subdocuments));
    }
  }

  save = async (event?: any) => {
    const {
      endpoint,
      id,
      onSave,
      multipart,
      resetFieldsOnSave
    } = this.props;

    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const { internalFields, internalSubdocuments, busy } = this.state;

    if (busy) {
      return;
    }

    if (id && internalSubdocuments) {
      await this.handleSubdocuments(`${endpoint}/${id}`, internalSubdocuments);
    }

    const data = internalFields.reduce(isFieldEligibleForSave(this.props), {});

    try {
      this.setState({
        busy: true
      });

      const response = await apiRequest<T>(id ? `c` : endpoint, {
        method:              id ? 'PUT' : 'POST',
        data,
        notificationMessage: id ? 'Lagrer…' : 'Oppretter…',
        multipart
      });

      this.setState({
        busy: false,
        ...syncFields(internalFields, internalSubdocuments)
      });

      if (typeof onSave === 'function') {
        onSave(response);
        if (resetFieldsOnSave) {
          this.reset();
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  };

  destroy = async (message = 'Er du sikker på at du vil slette?') => {
    const {
      id,
      endpoint,
      onSave,
      onDestroy,
      dontPromtDelete
    } = this.props;

    const { busy } = this.state;

    if (!id || busy) {
      return;
    }

    if (!dontPromtDelete && !(await confirm(message))) {
      return;
    }

    try {
      this.setState({
        busy: true
      });

      const response = await apiRequest<T>(`${endpoint}/${id}`, {
        method:              'DELETE',
        notificationMessage: 'Sletter…'
      });

      this.setState(
        {
          busy: false
        },
        () => {
          if (typeof onSave === 'function') {
            onSave(response);
          }
          if (typeof onDestroy === 'function') {
            onDestroy(response);
          }
        }
      );
    } catch (error) {
      this.handleError(error);
    }
  };

  getField<V>(name: string): IUpdateDeleteField<V | any> {
    const { internalFields } = this.state;

    const field = internalFields.find(f => f.name === name);
    if (field) {
      return field;
    } else {
      return {
        value: '',
        label: '',
        name:  ''
      };
    }
  }

  setValue<V>(name: string, value: V, label: ILabel) {
    const { fields } = this.props;
    const { internalFields } = this.state;

    this.setState({
      startedEditing: true,
      internalFields: internalFields.map(
        updateInternalFieldFromValues<V>(name, value, label, fields)
      )
    });
  }

  handleSubdocuments = async (
    baseEndpoint: string,
    subdocuments: ISubdocument[]
  ) => {
    const requests: Array<Promise<any | null>> = [];

    for (const doc of subdocuments) {
      requests.concat(createSubdocumentsRequests(doc, baseEndpoint));
      requests.concat(deleteSubdocumentRequest(doc, baseEndpoint));
    }

    return Promise.all(requests);
  };

  getSubdocument = (name: string): ISubdocument => {
    const { internalSubdocuments } = this.state;

    return (
      internalSubdocuments.find(s => s.name === name) || {
        endpoint: '',
        name:     '',
        previews: [],
        delete:   [],
        create:   []
      }
    );
  };

  addToSubdocument = (name: string, data: ISubdocumentData) => {
    const { subdocuments } = this.props;
    const { internalSubdocuments } = this.state;

    this.setState({
      startedEditing:       true,
      internalSubdocuments: internalSubdocuments.map(
        markSubdocumentForAddition(name, data, subdocuments)
      )
    });
  };

  deleteFromSubdocument = (name: string, id: string) => {
    const { subdocuments } = this.props;
    const { internalSubdocuments } = this.state;

    this.setState({
      startedEditing:       true,
      internalSubdocuments: internalSubdocuments.map(
        markSubdocumentForDeletion(name, id, subdocuments)
      )
    });
  };

  reset = (): boolean => {
    const { fields, subdocuments, dontPromptReset } = this.props;

    if (
      this.hasMadeChanges() &&
      !dontPromptReset &&
      !confirm(
        'Er du sikker på at du vil avbryte? Du vil miste alle endringer som ikke er lagret.'
      )
    ) {
      return false;
    }

    this.setState(syncFields(fields, subdocuments));
    return true;
  };

  hasMadeChanges = () => {
    const { startedEditing, internalFields, internalSubdocuments } = this.state;

    if (!startedEditing) {
      return false;
    } else if (internalFields.some(f => f.changed)) {
      return true;
    } else if (internalSubdocuments.some(f => f.changed)) {
      return true;
    }

    return false;
  };

  render() {
    const { children } = this.props;
    const { busy } = this.state;
    const {
      save,
      destroy,
      getField,
      setValue,
      getSubdocument,
      addToSubdocument,
      deleteFromSubdocument,
      reset,
      hasMadeChanges
    } = this;

    return children({
      busy,
      save,
      destroy,
      getField,
      setValue,
      getSubdocument,
      addToSubdocument,
      deleteFromSubdocument,
      reset,
      changesHaveBeenMade: hasMadeChanges()
    });
  }

  private handleError(error: IError) {
    const { onSaveError } = this.props;
    this.setState({ busy: false });
    if (typeof onSaveError === 'function') {
      onSaveError(error);
    }
    handleError(error);
  }
}

function syncFields(
  fields?: IUpdateDeleteFields,
  subdocuments?: ISubdocument[]
) {
  return {
    internalFields:       (fields || []).map(f => ({
      ...f,
      changed: false
    })),
    internalSubdocuments: (subdocuments || []).map(s => ({
      ...s,
      previews: [...s.previews],
      create:   [],
      delete:   [],
      changed:  false
    }))
  };
}

export default UpdateDelete;
