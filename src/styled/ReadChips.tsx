import * as React from 'react';
import { CrudChip, CrudStatusText, FlexContainer, FlexItem } from './styles';

interface IProps {
  chips: Array<{
    _id: string;
    label: string;
  }>;
  emptyState?: JSX.Element | string;
}

export default class ReadChips extends React.Component<IProps> {
  public render() {
    const { chips, emptyState } = this.props;

    if (chips.length > 0) {
      return (
        <FlexContainer>
          {chips.map(c => (
            <FlexItem key={c._id}>
              <CrudChip label={c.label} />
            </FlexItem>
          ))}
        </FlexContainer>
      );
    }

    return <CrudStatusText block>{emptyState || 'Mangler'}</CrudStatusText>;
  }
}
