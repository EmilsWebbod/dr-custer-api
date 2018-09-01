import * as React from 'react';
import { IItem } from '../../src/components/crudModal/interface';
//import SearchAndSelect from './SearchAndSelect';
//import styled from 'styled-components';

export interface IReferenceInputProps {
  data?: IItem[];
  endpoint?: string;
  queryKey?: string;
  labelKey?: string;
  singular?: boolean;
  defaultSelected?: IItem[];
  onAdd?: (item: IItem) => any;
  onSelect?: (items: IItem[]) => any;
  onRemove?: (id: string) => any;
  fieldID?: string;
  head?: JSX.Element;
  required?: boolean;
  autoFocus?: boolean;
  label?: string;
  disabled?: boolean;
}

interface State {
  selecting: boolean;
  target?: HTMLElement;
  selected: IItem[];
}

//const FieldWrapper = styled.div`
//  position: relative;
//`;

class ReferenceInput extends React.Component<IReferenceInputProps, State> {
  state = {
    selecting: false,
    target:    undefined,
    selected:  this.props.defaultSelected || []
  };

  render() {
    return 'Todo: Fix referenceInput';
    /*
    const {
      fieldID,
      endpoint,
      queryKey,
      labelKey,
      singular,
      data,
      onAdd,
      onRemove,
      required,
      autoFocus,
      label
    } = this.props;

    const { selecting, selected, target } = this.state;

    return (
      <FieldWrapper>
        <Input
          id={fieldID}
          value={selected.map(s => s.label).join(', ')}
          required={required}
          autoFocus={autoFocus}
          label={label}
          onClick={e => {
            if (!selecting) {
              this.setState({
                target: e.currentTarget,
                selecting: true
              });
            }
          }}
        />
        <Popover
          open={selecting}
          anchorEl={target}
          onClose={() =>
            this.setState({
              selecting: false
            })
          }
        >
          {selecting && (
            <SearchAndSelect
              endpoint={endpoint}
              labelKey={labelKey}
              queryKey={queryKey}
              onCommit={this.select}
              selectedItems={selected}
              singular={singular}
              data={data}
              autoFocus
              onAdd={onAdd}
              onRemove={onRemove}
            />
          )}
        </Popover>
      </FieldWrapper>
    );
    */
  }

  //private select = (items: IItem[]) => {
  //  const { onSelect } = this.props;
  //
  //  this.setState({
  //    selecting: false,
  //    selected: items
  //  });
  //
  //  if (typeof onSelect === 'function') {
  //    onSelect(items);
  //  }
  //};
}

export default ReferenceInput;
