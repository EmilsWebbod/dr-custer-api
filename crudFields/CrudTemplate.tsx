import * as React from 'react';
import { RenderWriteFieldOpts } from '../src/components/crudModal/interface';

interface IProps {
  opts: RenderWriteFieldOpts;
}

interface IState {
  value: any;
}

export default abstract class CrudTemplate extends React.Component<IProps,
  IState> {
  public handleEventChange = (e: any) => {
    const { opts } = this.props;
    if (e.target) {
      if ('setField' in opts) {
        if (typeof opts.setField === 'function') {
          opts.setField(opts.name, e.target.value, e.target.value);
        }
      }
    }
  };
}
