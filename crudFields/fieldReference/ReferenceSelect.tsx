import * as React from 'react';
import apiRequest from '../../api/apiRequest';
//import Select from '../../../../../../style-guide/Select';

interface OptionData {
  _id: string;

  [key: string]: string;
}

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  endpoint: string;
  queryKey: string;
  labelKey: string;
  onChange?: (e: any) => any;
  label?: string;
}

interface State {
  options: Option[];
  optionValue: string;
  searchValue: string;
}

class ReferenceSelect extends React.Component<Props, State> {
  state = {
    options: [this.defaultOption('No options')],
    optionValue: '',
    searchValue: ''
  };

  defaultOption(label: string = 'Ingen valg') {
    return {
      value: '',
      label
    };
  }

  fetchOptions = async (): Promise<void> => {
    const { value, endpoint, queryKey, labelKey } = this.props;
    const { searchValue } = this.state;

    if (searchValue !== value && queryKey && value) {
      try {
        const options = await apiRequest<OptionData[]>(
          `${endpoint}/${value}/${queryKey}`
        );
        const newOptions = options.map(option => ({
          value: option._id,
          label: option[labelKey]
        }));
        this.setOptions(newOptions, value);
      } catch (e) {
        this.setOptions([], value);
      }
    }
  };

  handleSelectChange = (e: any) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };

  setOptions = (options: Option[], searchValue: string) => {
    if (options.length === 0) {
      options.push(this.defaultOption());
    }
    this.setState({ options, searchValue });
  };

  render() {
    //const { ...rest } = this.props;
    //const { options, optionValue } = this.state;
    this.fetchOptions().then();

    return 'Fix ReferenceSelect';
    /*
    return (
      <Select
        value={optionValue}
        onChange={this.handleSelectChange}
        options={options}
        {...rest}
      />
    );
    */
  }
}

export default ReferenceSelect;
