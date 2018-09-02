import { storiesOf } from '@storybook/react';
import Resource from '../src/components/Resource';
import * as React from 'react';
import Paginator from '../src/components/Paginator';
import { ITodo } from './interface';
import StatusWrapper from '../src/styled/StatusWrapper';
import Search from '../src/components/Search';

storiesOf('Get', module).add('Resource', () => (
  <Resource<ITodo[]> endpoint={`todos`}>
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

storiesOf('Get', module).add('Paginator', () => (
  <Paginator<ITodo> endpoint={`todos`} limit={10}>
    {({ data, hasMore, fetch, busy }) => (
      <StatusWrapper busy={busy}>
        {data && data.map(x => (
          <div key={x.id}>{x.id}: {x.title}</div>
        ))}
        {hasMore && (<button onClick={fetch}>More</button>)}
      </StatusWrapper>
    )}
  </Paginator>
));

storiesOf('Get', module).add('Search', () => (
  <Search endpoint={`todos`} limit={10}>
    {({ results, paginate, clear, query }) => (
      <div>
        <button onClick={() => {
          query('title', 'delectus aut autem')
        }}>Query: delectus aut autem
        </button>
        <button onClick={async () => {
          await clear();
        }}>Query all
        </button>
        {results.map(result => (
          <div>{result.id}: {result.title}</div>
        ))}
      </div>
    )}
  </Search>
));

