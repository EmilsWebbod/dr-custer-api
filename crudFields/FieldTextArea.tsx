import * as React from 'react';
import CrudTemplate from './CrudTemplate';

export default class FieldTextArea extends CrudTemplate {
  public render() {
    const { opts } = this.props;
    const value = this.props.opts.getField<string>(this.props.opts.name).value;

    return (
      <textarea
        value={value}
        onChange={this.handleEventChange}
        placeholder={opts.helpField}
        {...opts.extra}
      />
    );
  }
}
