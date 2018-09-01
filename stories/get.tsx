import { storiesOf } from '@storybook/react';
import Resource from '../src/components/Resource';
import * as React from 'react';


storiesOf('Get', module).add('Resource', () => (
  <Resource<any[]> endpoint={``}>
    {({ data }) => (
      <div>
        {data && data.map(x => (
          <div>
            {x.id}: {x.title}
          </div>
        ))}
      </div>
    )}
  </Resource>
));
