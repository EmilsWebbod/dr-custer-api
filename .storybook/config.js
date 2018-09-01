import * as React from 'react';
import {addDecorator, configure} from '@storybook/react';
import CrudProvider from "../src/CrudProvider";
import defaultCrudFields from "../crudFields/defaultCrudFields";

addDecorator(story => (
  <CrudProvider
    url={`https://jsonplaceholder.typicode.com/todos`}
    noAuth
    crudComponents={defaultCrudFields}
  >
    {story()}
  </CrudProvider>
));

function loadStories() {
  require('../stories/crud');
  require('../stories/get');
}

configure(loadStories, module);
