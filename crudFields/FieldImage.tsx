import * as React from 'react';
import CrudTemplate from './CrudTemplate';

export default class FieldImage extends CrudTemplate {
  render() {
    const { opts } = this.props;

    return (
      <input
        type="file"
        placeholder={opts.helpField || 'Legg til bilde'}
        onChange={e => {
          // todo: Fix image upload
          // opts.setValue<File | File[]>(opts.name, e.target.value, '');
        }}
        {...opts.extra}
      />
    );
  }
}
