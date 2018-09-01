import { ICrudComponent, IFieldAllTypes } from '../src/components/crudModal/interface';
import FieldInput from './FieldInput';
import FieldCheckbox from './FieldCheckbox';
import FieldTextArea from './FieldTextArea';
import FieldSelect from './FieldSelect';
import FieldReferenceInput from './FieldReferenceInput';
import FieldReferenceSelect from './FieldReferenceSelect';
import FieldDatePicker from './FieldDatePicker';
import FieldImage from './FieldImage';
import CrudTemplate from './CrudTemplate';
import FieldRead from './FieldRead';

const createComponent = (
  type: IFieldAllTypes,
  component?: typeof CrudTemplate
) => ({
  type,
  component: component || FieldInput
});

const createMultipleComponents = (
  types: IFieldAllTypes[],
  component?: typeof CrudTemplate
) => types.map(type => createComponent(type, component));

const defaultCrudFields: ICrudComponent[] = [
  ...createMultipleComponents(['text', 'email', 'number']),
  ...createMultipleComponents(['text-area', 'rich'], FieldTextArea),
  ...createMultipleComponents(['file', 'image', 'avatarImage'], FieldImage),
  { ...createComponent('select', FieldSelect) },
  { ...createComponent('reference', FieldReferenceInput) },
  { ...createComponent('reference-select', FieldReferenceSelect) },
  { ...createComponent('number', FieldInput) },
  { ...createComponent('checkbox', FieldCheckbox) },
  { ...createComponent('date-picker', FieldDatePicker) },
  { ...createComponent('read', FieldRead) }
];

export default defaultCrudFields;
