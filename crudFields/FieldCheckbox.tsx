import * as React from 'react';
import CrudTemplate from './CrudTemplate';

export default class FieldCheckbox extends CrudTemplate {
  render() {
    const { opts } = this.props;

    return (
      <input
        type="checkbox"
        checked={opts.value}
        disabled={opts.disabled}
        color="primary"
        {...opts.extra}
      >
        {opts.helpField}
      </input>
    );
  }
}
