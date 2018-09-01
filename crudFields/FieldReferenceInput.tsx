import * as React from 'react';
import ReferenceInput from './fieldReference/ReferenceInput';
import CrudTemplate from './CrudTemplate';

export default class FieldReferenceInput extends CrudTemplate {
  render() {
    const { opts, ...props } = this.props;
    if (!opts.reference) {
      throw new Error('Missing reference opts');
    }
    const extra = 'extra' in opts ? opts.extra : {};
    const defaultSelected =
      'value' in opts
        ? opts.value
          ? [
              {
                _id: typeof opts.value === 'string' ? opts.value : '',
                label: opts.label
              }
            ]
          : []
        : [];

    return (
      <ReferenceInput
        label={opts.helpField}
        endpoint={opts.reference.endpoint}
        queryKey={opts.reference.queryKey}
        labelKey={opts.reference.labelKey}
        required={opts.required}
        disabled={'disabled' in opts ? opts.disabled : false}
        autoFocus={opts.autoFocus}
        onSelect={is => {
          if (is.length > 0) {
            opts.onChangeReference(is[0]._id, is[0].label);
          }
        }}
        singular
        defaultSelected={defaultSelected}
        {...extra}
        {...props}
      />
    );
  }
}
