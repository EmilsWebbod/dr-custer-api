import { ICrudComponent } from '../components/crudModal/interface';
import * as React from 'react';
import defaultCrudFields from '../../crudFields/defaultCrudFields';

type CrudFieldProps = ICrudComponent[];
export default React.createContext<CrudFieldProps>(defaultCrudFields);
