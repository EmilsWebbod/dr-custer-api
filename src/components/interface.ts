export type IFieldValues = any;

export interface IUpdateDeleteField<T> {
  readonly value: T;
  readonly label: ILabel;
  readonly name: string;
  changed?: boolean;
  forceSave?: boolean;
}

export type ILabel = string;
export type IGetField = <T>(value: string) => IUpdateDeleteField<T>;
export type ISetField = <T>(
  name: string,
  value: T,
  label: ILabel,
  meta?: any
) => void;
export type IGetSubdocument = (name: string) => ISubdocument;
export type IAddToSubdocument = (name: string, data: ISubdocumentData) => void;
export type IDeleteFromSubdocument = (name: string, id: string) => void;
export type IUpdateDeleteFields = Array<IUpdateDeleteField<IFieldValues>>;

export interface ISubdocumentData {
  _id: string;
  label: string;
  value: IFieldValues;
}

export interface ISubdocument {
  endpoint: string;
  name: string;
  previews: ISubdocumentData[];
  delete?: string[];
  create?: ISubdocumentData[];
  changed?: boolean;
}

export interface IBaseProps<T> {
  endpoint: string;
  id?: string;
  onSave?: (res: T) => void;
  onDestroy?: (res: T) => void;
  fields?: IUpdateDeleteFields;
  subdocuments?: ISubdocument[];
  dontPromtDelete?: boolean;
  dontPromptReset?: boolean;
  resetFieldsOnSave?: boolean;
  multipart?: boolean;
  children: (children: IUpdateDeleteInterface) => JSX.Element;
  forceSaveAllField?: boolean;
}

export interface IUpdateDeleteInterface {
  busy: boolean;
  save: (event?: any) => any;
  destroy: () => any;
  getField: IGetField;
  setField: ISetField;
  getSubdocument: IGetSubdocument;
  addToSubdocument: IAddToSubdocument;
  deleteFromSubdocument: IDeleteFromSubdocument;
  changesHaveBeenMade: boolean;
  reset: () => boolean;
}
