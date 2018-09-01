import * as React from 'react';
import { ReactNode } from 'react';
import StatusWrapper from '../../styled/StatusWrapper';
import { IError } from '../../../api/apiRequest';

export type IResourceState = 'empty' | 'busy' | 'data' | number;

interface IProps {
  state: IResourceState;
  errorStatus: number;
  error: string;
  emptyState?: ReactNode;
  busyState?: ReactNode;
  errorState?: (error: IError, DefaultComponent: ReactNode) => ReactNode;
}

export default class ResourceState extends React.Component<IProps> {
  static defaultProps = {
    emptyState: 'Fant ikke ressurs'
  };

  render() {
    switch (this.props.state) {
      case 'empty':
        return this.renderEmpty();
      case 'busy':
        return this.renderBusy();
      case 'data':
        return this.renderData();
      default:
        return this.renderError();
    }
  }

  private renderEmpty() {
    return this.props.emptyState || 'Fant ikke ressurs';
  }

  private renderBusy() {
    const { busyState } = this.props;
    return (
      <StatusWrapper busy={true}>
        {busyState ? busyState : this.props.children}
      </StatusWrapper>
    );
  }

  private renderData() {
    return this.props.children;
  }

  private renderError(): ReactNode {
    const { state, errorState, errorStatus, error } = this.props;

    const DefaultError = () => (
      <React.Fragment>
        {state}: {error} <br />
        <br />
        Kontakt oss hvis dette problemet vedvarer, informasjonen finner du
        nederst på siden.
      </React.Fragment>
    );

    if (errorState) {
      return errorState(
        {
          status: errorStatus,
          message: error
        },
        DefaultError
      );
    }
    return <DefaultError />;
  }
}
