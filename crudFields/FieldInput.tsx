import * as React from 'react';
import CrudTemplate from './CrudTemplate';
import { v4 } from 'uuid';


export default class FieldInput extends CrudTemplate {
  render() {
    const { opts } = this.props;
    const value = opts.getField<string>(opts.name).value;
    const id = v4();

    return (
      <input
        id={id}
        type={opts.type}
        placeholder={opts.placeholder}
        value={value}
        onChange={this.handleEventChange}
        required={opts.required}
        autoFocus={opts.autoFocus}
        disabled={opts.disabled}
        {...opts.extra}
        multiple
      />
    );
  }
}
