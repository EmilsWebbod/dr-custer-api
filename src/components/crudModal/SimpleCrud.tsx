import * as React from 'react';

import CrudModal, { ICrudModalProps } from '../CrudModal';
import { FlexContainer, FlexItem } from '../../styled/styles';

// @ts-ignore // We dont really care about children for simple crud. But want all the other props
export interface ISimpleCrudProps<T> extends ICrudModalProps<T> {
  children?: any;
}

function SimpleCrud<T>({ children, ...props }: ISimpleCrudProps<T>) {
  const suppliedFields = props.fields;
  const suppliedSubdocuments = props.subdocuments;

  return (
    <CrudModal<T> {...props} editing cancelCloses>
      {({ editing, fields, subdocuments }: any) => (
        <React.Fragment>
          <FlexContainer direction="column">
            {(suppliedFields ? suppliedFields : []).map((f, k) => {
              if (f.hidden) {
                return null;
              }
              const renderedField = fields[f.name]();

              return renderedField ? (
                <FlexItem key={k}>{renderedField}</FlexItem>
              ) : null;
            })}
            {suppliedSubdocuments &&
              suppliedSubdocuments.map((s, k) => {
                const renderedSubdocument = subdocuments[s.name]();
                return renderedSubdocument ? (
                  <FlexItem key={k}>{renderedSubdocument}</FlexItem>
                ) : null;
              })}
          </FlexContainer>
        </React.Fragment>
      )}
    </CrudModal>
  );
}

export default SimpleCrud;
