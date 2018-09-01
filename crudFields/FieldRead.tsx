import * as React from 'react';
import CrudTemplate from './CrudTemplate';

function renderStatusText(emptyState?: JSX.Element | string) {
  return <p>{emptyState || 'Mangler'}</p>;
}

export default class FieldRead extends CrudTemplate {
  public render() {
    const { getField, value, emptyState, helpField } = this.props.opts;
    const field = getField<string>(value);
    let elem;

    if (field.label) {
      elem = <p>{field.label}</p>;
    } else {
      elem = renderStatusText(emptyState);
    }

    return (
      <React.Fragment>
        {helpField && <label>{helpField}</label>}
        {elem}
      </React.Fragment>
    );
  }
}
