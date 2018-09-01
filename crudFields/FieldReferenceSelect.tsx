import * as React from 'react';
import CrudTemplate from './CrudTemplate';
import ReferenceSelect from './fieldReference/ReferenceSelect';

export default class FieldReferenceSelect extends CrudTemplate {
  render() {
    const { opts } = this.props;
    if (!opts.reference) {
      throw new Error('Missing reference opts');
    }
    if (!opts.referenceName) {
      throw new Error('Missing referenceName opts');
    }

    const selectValue = opts.getField<string>(opts.referenceName).value;

    return (
      <ReferenceSelect
        value={selectValue}
        endpoint={opts.reference.endpoint}
        queryKey={opts.reference.queryKey}
        labelKey={opts.reference.labelKey}
        label={opts.helpField}
        onChange={this.handleEventChange}
      />
    );
  }
}
