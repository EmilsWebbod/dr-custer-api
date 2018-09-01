import * as React from 'react';
import { ReactNode } from 'react';
import { ICrudComponent, IFieldAllTypes, RenderWriteFieldOpts } from './interface';
import CrudContext from '../../crudProvider/CrudContext';

const byType = (t: IFieldAllTypes) => ({ type }: ICrudComponent) => type === t;

export default class CreateCrudField extends React.Component<RenderWriteFieldOpts> {
  public render() {
    const { type } = this.props;
    return (
      <CrudContext.Consumer>{this.getFieldFromType(type)}</CrudContext.Consumer>
    );
  }

  private getFieldFromType = (t: IFieldAllTypes) => (
    fields: ICrudComponent[]
  ): ReactNode => {
    if (fields) {
      const component = fields.find(byType(t));
      if (component) {
        return <component.component opts={this.props}/>;
      }
      console.error('Could not find any CrudContext with type: ', t);
    } else {
      console.error('No fields were provided', t);
    }
    return null;
  };
}
