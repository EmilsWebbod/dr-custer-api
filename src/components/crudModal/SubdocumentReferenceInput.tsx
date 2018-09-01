import * as React from 'react';
import {
  IUpdateDeleteSubdocumentMethods,
  Subdocument
} from './interface';
import ReferenceInput from '../../../crudFields/fieldReference/ReferenceInput';

interface IProps {
  doc: Subdocument;
  methods: IUpdateDeleteSubdocumentMethods;
}

export default class SubdocumentReferenceInput extends React.Component<IProps> {
  public render() {
    const { doc, methods } = this.props;
    if (!doc.reference) {
      console.error('Subdocument with name', doc.name, 'has no reference');
      return null;
    }
    return (
      <ReferenceInput
        label={doc.helpField}
        endpoint={doc.reference.endpoint}
        queryKey={doc.reference.queryKey}
        labelKey={doc.reference.labelKey}
        onAdd={i =>
          methods.addToSubdocument(doc.name, {
            _id: i._id,
            value: i._id,
            label: i.label
          })
        }
        onRemove={id => methods.deleteFromSubdocument(doc.name, id)}
        defaultSelected={methods.getSubdocument(doc.name).previews.map(p => ({
          _id: p._id,
          label: p.label
        }))}
        required={doc.required}
        autoFocus={doc.autoFocus}
      />
    );
  }
}
