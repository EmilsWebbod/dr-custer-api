import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleCrud from '../src/components/crudModal/SimpleCrud';
import CrudModalComponent from '../src/components/crudModal/CrudModalComponent';

class Footer<T> extends CrudModalComponent<T> {

  render() {
    return <button type="submit">Save</button>;
  }
}

storiesOf('Crud', module).add('SimpleCrud', () => (
  <SimpleCrud
    endpoint={''}
    fields={[
      {
        name:  'name',
        type:  'text',
        value: '',
        label: ''
      }]}
    Footer={Footer}
  />
));
