import * as React from 'react';
import { Context } from 'react';
import Resource, {
  IFetchOpts,
  IResourceChildrenProps,
  IResourceProps
} from '../Resource';

export default class ResourceContext<T, U = null> {
  private _Context: Context<
    IResourceChildrenProps<T, U>
  > = React.createContext<IResourceChildrenProps<T, U>>({
    busy: false,
    data: null,
    refresh: (opts?: IFetchOpts<T, U>) => {
      return;
    },
    putField: (fields: string[], data: any) => {
      return;
    }
  });

  constructor() {
    this.Provider = this.Provider.bind(this);
  }

  get Consumer() {
    return this._Context.Consumer;
  }

  public Provider({ children, ...props }: IResourceProps<T>) {
    const Provider = this._Context.Provider;
    return (
      <Resource<T, any> {...props}>
        {child => <Provider value={child}>{children(child)}</Provider>}
      </Resource>
    );
  }
}
