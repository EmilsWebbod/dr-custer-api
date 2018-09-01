import * as React from 'react';
import CrudTemplate from './CrudTemplate';

export default class FieldSelect extends CrudTemplate {
  render() {
    const { opts } = this.props;
    const value = this.props.opts.getField<string>(this.props.opts.name).value;

    return (
      <select
        name={opts.name}
        placeholder={opts.helpField}
        value={value}
        onChange={this.handleEventChange}
        disabled={opts.disabled}
        {...opts.extra}
      >
        {opts.options && opts.options.map(option =>
          <option key={option.value} value={option.value}>{option.label}</option>
        )}
      </select>
    );
  }
}
