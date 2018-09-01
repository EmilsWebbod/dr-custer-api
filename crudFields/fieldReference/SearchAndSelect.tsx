import * as React from 'react';
//import { Divider } from '../../../../../../style-guide/Divider';
//import Search from '../../src/components/Search';
//import TextField from '@material-ui/core/TextField/TextField';
//import Icon from '../../../../../../style-guide/icons/index';
//import Button from '../../../../../../style-guide/Button';
//import List, { ListItem } from '../../../../../../style-guide/List';
//import Block from '../../../../../../style-guide/Block';
//import ActionBar from '../../../../../../style-guide/ActionBar';

interface Item {
  _id: string;
  label: string;
}

interface Props {
  data?: Item[];
  endpoint?: string;
  queryKey?: string;
  labelKey?: string;
  selectedItems?: Item[];
  singular?: boolean;
  autoFocus?: boolean;
  searchHint?: string;
  onAdd?: (item: Item) => void;
  onChange?: (item: Item) => void;
  onRemove?: (id: string) => void;
  onCommit?: (items: Item[]) => void;
}

interface State {
  selectedItems: Item[];
}

class SearchAndSelect extends React.Component<Props, State> {
  //state = {
  //  selectedItems: this.props.selectedItems || []
  //};
  render() {
    return 'todo: Rewrite SearchAndSelect';
  }

  /*
    addItem = (item: Item) => {
      const { onAdd } = this.props;
      const { selectedItems } = this.state;

      this.setState({
        selectedItems: [...selectedItems, item]
      });

      if (typeof onAdd === 'function') {
        onAdd(item);
      }
    };

    changeItem = (item: Item) => {
      const { onChange, singular, onCommit } = this.props;

      this.setState({
        selectedItems: [item]
      });

      if (typeof onChange === 'function') {
        onChange(item);
      }

      if (singular && typeof onCommit === 'function') {
        onCommit([item]);
      }
    };

    removeItem = (id: string) => {
      const { onRemove, singular, onCommit } = this.props;
      const { selectedItems } = this.state;

      const items = selectedItems.filter(i => i._id !== id);

      this.setState({
        selectedItems: items
      });

      if (typeof onRemove === 'function') {
        onRemove(id);
      }

      if (singular && typeof onCommit === 'function') {
        onCommit(items);
      }
    };

    commit = () => {
      const { onCommit } = this.props;
      const { selectedItems } = this.state;

      if (typeof onCommit === 'function') {
        onCommit(selectedItems);
      }
    };

    renderItems = (items: Item[]) => {
      const { singular } = this.props;
      const { selectedItems } = this.state;

      return (
        <React.Fragment>
          <Divider />
          <List>
            {items.map(i => (
              <ListItem
                key={i._id}
                button
                onClick={() => {
                  if (singular) {
                    return this.changeItem(i);
                  }

                  return this.addItem(i);
                }}
                icon={
                  singular && selectedItems.length > 0 ? (
                    <Icon minus />
                  ) : (
                    <Icon plus />
                  )
                }
              >
                {i.label}
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      );
    };

    renderSearch = () => {
      const {
        endpoint,
        queryKey,
        labelKey,
        singular,
        autoFocus,
        searchHint
      } = this.props;
      const { selectedItems } = this.state;

      if (!endpoint || !queryKey || !labelKey) {
        return null;
      }

      return (
        <Search
          endpoint={endpoint}
          label={`Søk for å ${
            singular && selectedItems.length > 0 ? 'endre' : 'legge til'
          }`}
          limit={5}
          onQueryComplete={() => window.dispatchEvent(new Event('resize'))}
        >
          {({ busy, results, hasQueried, query }) => {
            const filteredResults = results
              .filter(r => !selectedItems.some(i => i._id === r._id))
              .map(f => ({
                _id: f._id,
                label: f[labelKey]
              }));

            return (
              <React.Fragment>
                <Block>
                  <TextField
                    label={`Søk for å${' '}
                    ${
                      singular && selectedItems.length > 0 ? 'endre' : 'legge til'
                    }`}
                    autoFocus={autoFocus}
                    placeholder={searchHint}
                    fullWidth
                    onChange={e => query(queryKey, e.target.value)}
                    InputLabelProps={
                      (searchHint && {
                        shrink: true
                      }) ||
                      undefined
                    }
                  />
                  {hasQueried &&
                    results.length < 1 && <div>Finner ingen ting!</div>}
                </Block>
                {filteredResults.length > 0 && this.renderItems(filteredResults)}
              </React.Fragment>
            );
          }}
        </Search>
      );
    };

    render() {
      const { data, onCommit, singular } = this.props;
      const { selectedItems } = this.state;

      return (
        <React.Fragment>
          {selectedItems.length > 0 && (
            <React.Fragment>
              <List>
                {selectedItems.map(i => (
                  <ListItem
                    key={i._id}
                    button
                    icon={<Icon flag />}
                    onClick={() => this.removeItem(i._id)}
                  >
                    {i.label}
                  </ListItem>
                ))}
              </List>
              <Divider />
            </React.Fragment>
          )}
          {data ? this.renderItems(data) : this.renderSearch()}
          {onCommit &&
            !singular && (
              <React.Fragment>
                <Divider />
                <Block compact>
                  <ActionBar>
                    <Button color="primary" onClick={this.commit}>
                      Fullfør
                    </Button>
                  </ActionBar>
                </Block>
              </React.Fragment>
            )}
        </React.Fragment>
      );
    }
    */
}

export default SearchAndSelect;
