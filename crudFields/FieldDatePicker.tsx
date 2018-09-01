import * as React from 'react';
import CrudTemplate from './CrudTemplate';

export default class FieldDatePicker extends CrudTemplate {
  render() {
    const { opts } = this.props;

    return (
      <input
        type="date"
        onChange={date => {
          const datePickerValue: any = {
            currentTarget: { value: date }
          };
          opts.onChange(datePickerValue);
        }}
        {...opts.extra}
      />
    );
  }
}
