import * as React from 'react';
import { Children } from 'react';
import { ICrudComponent } from './components/crudModal/interface';
import CrudHeaders, { ICrudHeadersProps } from './crudProvider/crudHeaders';
import CrudContext from './crudProvider/CrudContext'

interface IProps extends ICrudHeadersProps {
  crudComponents?: ICrudComponent[];
}

export default class CrudProvider extends React.Component<IProps> {
  public static defaultProps = {
    crudComponents: []
  };

  headers: CrudHeaders;

  public render() {
    const { children, crudComponents, ...props } = this.props;
    if (!children || !crudComponents) {
      console.error('Crud Wrapper need children and crudComponents');
      return null;
    }
    this.headers = new CrudHeaders(props, true);
    return (
      <CrudContext.Provider value={crudComponents}>
        {Children.only(children)}
      </CrudContext.Provider>
    );
  }
}
