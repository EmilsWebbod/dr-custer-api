import * as React from 'react';
import { ReactNode } from 'react';
import apiRequest from '../../api/apiRequest';
import handleError from '../../api/handleError';

interface IChildren<T> {
  busy: boolean;
  data: T[];
  hasMore: boolean;
  fetch: () => Promise<void>;
  addElement: (element: T) => void;
  putElement: (index: number, element: T) => void;
  removeElement: (index: number) => void;
}

interface Props<T> {
  endpoint: string;
  limit?: number;
  children: (children: IChildren<T>) => ReactNode;
}

interface State<T> {
  busy: boolean;
  data: T[];
  hasMore: boolean;
}

export default class Paginator<T> extends React.Component<Props<T>, State<T>> {
  public state = {
    busy:    false,
    data:    [],
    hasMore: true
  };

  render() {
    const { children } = this.props;
    const { busy, data, hasMore } = this.state;

    return children({
      busy,
      data,
      hasMore,
      fetch:         this.fetch,
      addElement:    this.addElement,
      putElement:    this.putElement,
      removeElement: this.removeElement
    });
  }

  private fetch = async () => {
    let { endpoint, limit } = this.props;
    const { busy, data, hasMore } = this.state;

    limit = limit || 20;

    if (busy || !hasMore) {
      return;
    }

    this.setState({
      busy: true
    });

    try {
      const response: T[] = await apiRequest<T[]>(endpoint, {
        data: {
          skip: data.length,
          limit
        }
      });

      this.setState({
        busy:    false,
        data:    [...data, ...response],
        hasMore: response.length === limit
      });
    } catch (e) {
      handleError(e);
      this.setState({ busy: false });
    }
  };

  private addElement = (element: T) => {
    const { data } = this.state;

    this.setState({
      data: [element, ...data]
    });
  };

  private putElement = (index: number, element: T) => {
    const { data } = this.state;

    this.setState({
      data: data.map((e, k) => {
        if (k === index) {
          return element;
        }

        return e;
      })
    });
  };

  private removeElement = (index: number) => {
    const { data } = this.state;

    this.setState({
      data: data.filter((_, k) => k !== index)
    });
  };
};
