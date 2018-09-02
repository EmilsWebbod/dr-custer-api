import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleCrud from '../src/components/crudModal/SimpleCrud';
import CrudModalComponent from '../src/components/crudModal/CrudModalComponent';
import UpdateDelete from '../src/components/UpdateDelete';
import { ITodo } from './interface';

class Header<T> extends CrudModalComponent<T> {
  render() {
    return <h1>Crud Header</h1>;
  }
}

class Body<T> extends CrudModalComponent<T> {
  render() {
    const { children } = this.props;
    return <div><h2>Content</h2> <br/>{children}</div>;
  }
}

class Footer<T> extends CrudModalComponent<T> {

  render() {
    return <button type="submit">Save</button>;
  }
}

storiesOf('Crud', module).add('SimpleCrud', () => (
  <SimpleCrud
    endpoint={'todos'}
    fields={[
      {
        name:        'name',
        type:        'text',
        placeholder: 'Navn',
        value:       '',
        label:       ''
      }]}
    Header={Header}
    Body={Body}
    Footer={Footer}
  />
));


storiesOf('Crud', module).add('UpdateDelete', () => (
  <UpdateDelete<ITodo>
    id="1"
    endpoint={'todos'}
    fields={[
      {
        name:  'id',
        value: '',
        label: ''
      },
      {
        name:  'title',
        value: '',
        label: ''
      }
    ]}
  >
    {({ save, destroy, getField, setField }) => (
      <div>
        <input
          type="text"
          placeholder={'ID'}
          value={getField<string>('id').value}
          onChange={e => {
            setField('id', e.target.value, e.target.value);
          }}
        />
        <input
          type="text"
          placeholder={'Tittel'}
          value={getField<string>('title').value}
          onChange={e => {
            setField('title', e.target.value, e.target.value);
          }}
        />
        <button onClick={save}>Save</button>
        <button onClick={destroy}>Delete</button>
      </div>
    )}
  </UpdateDelete>
));
