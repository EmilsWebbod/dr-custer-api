import { SyntheticEvent } from 'react';
import {
  IAddToSubdocument,
  IDeleteFromSubdocument,
  IFieldValues,
  IGetField,
  IGetSubdocument,
  ILabel,
  ISetField,
  ISubdocument,
  IUpdateDeleteField
} from '../interface';
import CrudTemplate from '../../../crudFields/CrudTemplate';

type StringTypes =
  | ''
  | 'text'
  | 'text-area'
  | 'email'
  | 'select'
  | 'rich'
  | 'reference'
  | 'reference-select'
  | 'read';
type NumberTypes = 'number';
type BooleanTypes = 'checkbox' | 'switch';
type DateTypes = 'date-picker';
type FileTypes = 'file' | 'image' | 'avatarImage';
type ComponentTypes = 'customComponent';

export type IFieldAllTypes =
  | StringTypes
  | NumberTypes
  | BooleanTypes
  | DateTypes
  | FileTypes
  | ComponentTypes;

type FieldValue =
  | {
  type: FileTypes;
  value: File | File[] | null;
}
  | {
  type: StringTypes;
  value: string;
}
  | {
  type: NumberTypes;
  value: number;
}
  | {
  type: BooleanTypes;
  value: boolean;
}
  | {
  type: DateTypes;
  value: Date;
}
  | {
  type: ComponentTypes;
  value: any;
};

export interface IItem {
  _id: string;
  label: string;
}

export interface IUpdateDeleteFieldMethods {
  getField: IGetField;
  setField: ISetField;
}

export interface IUpdateDeleteSubdocumentMethods {
  getSubdocument: IGetSubdocument;
  addToSubdocument: IAddToSubdocument;
  deleteFromSubdocument: IDeleteFromSubdocument;
}

interface IReference {
  endpoint: string;
  queryKey: string;
  labelKey: string;
}

export type ICrudField = FieldValue &
  IUpdateDeleteField<IFieldValues> & {
  extra?: {
    [key: string]: any;
  };
  required?: boolean;
  hidden?: boolean;
  autoFocus?: boolean;
  helpField?: string;
  placeholder?: string;
  disabled?: boolean;
  emptyState?: JSX.Element | string;
  hideIfSet?: string;
  showIfSet?: string;
  reference?: IReference;
  referenceName?: string;
  renderComponent?: (setField: ISetField, getField: IGetField) => JSX.Element;
  options?: Array<{
    label: string;
    value: string;
  }>;
};

export type RenderableField = (writable?: boolean) => JSX.Element | null;

export interface RenderableFields {
  [key: string]: RenderableField;
}

export interface Subdocument extends ISubdocument {
  helpField?: string;
  required?: boolean;
  autoFocus?: boolean;
  emptyState?: JSX.Element | string;
  reference?: IReference;
}

export type RenderWriteFieldOpts = ICrudField & {
  setField: ISetField;
  getField: IGetField;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  onChangeReference: (value: IFieldValues, label: ILabel) => any;
};

export interface ICrudComponent {
  type: IFieldAllTypes;
  component: typeof CrudTemplate;
}
