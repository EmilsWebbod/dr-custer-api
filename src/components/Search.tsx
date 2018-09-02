import * as React from 'react';
import * as uuid from 'uuid/v4';
import { throttle } from 'lodash';
import apiRequest from '../../api/apiRequest';

interface IQuery {
  [value: string]: string;
}

interface ISearchInterface {
  busy: boolean;
  search: (paginate?: boolean) => Promise<boolean | void>;
  query: (key: string, value: string) => any;
  hasQueried: boolean;
  results: any[];
  paginate: () => any;
  hasMore: boolean;
  clear: () => Promise<any>;
  resultSpec: IQuery;
}

interface IProps {
  endpoint: string;
  children: (opts: ISearchInterface) => JSX.Element;
  limit: number;
  query?: IQuery;
  label?: string;
  onQueryComplete?: () => any;
}

interface IState {
  query: IQuery;
  hasQueried: boolean;
  busy: boolean;
  results: any[];
  hasMore: boolean;
  operationID: string;
}

interface IDefaultProps {
  limit: number;
}

export default class Search<T> extends React.Component<IProps, IState> {
  static defaultProps: IDefaultProps = {
    limit: 20
  };

  state = {
    query:       this.props.query || {},
    hasQueried:  false,
    busy:        false,
    results:     [],
    hasMore:     true,
    operationID: uuid()
  };

  requestCounter = 0;

  search = throttle(async (paginate?: boolean): Promise<boolean | void> => {
    const { endpoint, limit, onQueryComplete } = this.props;
    const { query, busy, results } = this.state;

    const currentRequest = this.requestCounter + 1;

    if (busy) {
      return false;
    }

    this.setState({
      busy: true
    });

    query.limit = limit.toString();

    if (paginate) {
      query.skip = results.length.toString();
    } else {
      query.skip = '0';
    }

    const response = await apiRequest<T[]>(endpoint, { data: query });

    if (currentRequest <= this.requestCounter) {
      return;
    }

    this.setState({
      busy:    false,
      results: paginate ? [...results, ...response] : response,
      hasMore: response.length === limit
    });

    this.requestCounter = currentRequest;

    if (typeof onQueryComplete === 'function') {
      onQueryComplete();
    }
  }, 500);

  constructQuery = (key: string, value: string) => {
    let { query } = this.state;

    query = {
      ...query,
      [key]: value
    };

    for (const k in query) {
      if (!query[k]) {
        delete query[k];
      }
    }

    this.setState(
      {
        hasQueried: Object.keys(query).length > 0,
        query,
        hasMore:    true
      },
      () => this.search(false)
    );
  };

  paginate = () => {
    this.search(true);
  };

  clear = async () => {
    await this.setState(
      {
        query:       {},
        hasQueried:  false,
        operationID: uuid(),
        results:     []
      },
      this.search
    );
  };

  createResultSpec = (): IQuery => {
    const { query, results } = this.state;

    return {
      ...query,
      skip:  '0',
      limit: results.length.toString()
    };
  };

  render() {
    const { children } = this.props;
    const { busy, hasQueried, results, hasMore } = this.state;
    const { constructQuery, paginate, clear, search } = this;

    return children({
      busy,
      search,
      query:      constructQuery,
      hasQueried,
      results,
      hasMore,
      paginate,
      clear,
      resultSpec: this.createResultSpec()
    });
  }
}
