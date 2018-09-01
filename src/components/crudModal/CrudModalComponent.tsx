import * as React from 'react';
import { ICrudModalProps } from '../CrudModal';
import { IUpdateDeleteFieldMethods } from './interface';

export default abstract class CrudModalComponent<T> extends React.Component<
  ICrudModalProps<T> & IUpdateDeleteFieldMethods
> {}
