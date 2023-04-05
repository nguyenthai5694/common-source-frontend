import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Checkbox, CustomSelect, Input, Radio, Textarea, InputTags } from 'common/form';

class SimpleForm extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      textAreaValue: '',
      customSelect1Value: '',
      customSelect2Value: [],
      checkbox1: false,
      checkbox2: false,
      radio: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCustomSelectChange = this.handleCustomSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCustomSelectChange(name, option) {
    this.setState({ [name]: option })
  }

  handleCheckboxChange(event) {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleSubmit(event) {
    const formData = {
      'input': this.state.inputValue,
      'textarea': this.state.textAreaValue,
      'customSelectSingle': this.state.customSelect1Value,
      'customSelectMulti': this.state.customSelect2Value,
      'checkbox1': this.state.checkbox1,
      'checkbox2': this.state.checkbox2,
      'radio': this.state.radio,
    }

    this.props.history.push('/', formData);
    event.preventDefault();
  }

  render() {
    const range = [
      {
        value: '20',
        label: '20件',
      },
      {
        value: '50',
        label: '50件',
      },
      {
        value: '100',
        label: '100件',
      },
    ]

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Input:</label>

        <div className={'form-control'}>
          <Input name={'inputValue'} value={this.state.inputValue}
            onChange={this.handleInputChange} require={true} />
        </div>

        <br></br><br></br>

        <label>Textarea:</label>

        <div className={'form-control'}>
          <Textarea name={'textAreaValue'} value={this.state.textAreaValue}
            onChange={this.handleInputChange} require={true} />
        </div>

        <br></br><br></br>

        <label>Single Select:</label>

        <div className={'form-control'}>
          <CustomSelect name={'customSelect1Value'} onChange={this.handleCustomSelectChange}
            options={range} multi={false} />
        </div>

        <br></br><br></br>

        <label>Multi Select:</label>

        <div className={'form-control'}>
          <CustomSelect name={'customSelect2Value'} onChange={this.handleCustomSelectChange}
            options={range} multi={true} />
        </div>

        <br></br><br></br>

        <label>Checkbox:</label>

        <div className={'form-control'}>
          <Checkbox name={'checkbox1'} value={this.state.checkbox1} onChange={this.handleCheckboxChange}
            className={'h-mt-10'} label={'件名'} />

          <Checkbox name={'checkbox2'} value={this.state.checkbox2} onChange={this.handleCheckboxChange}
            className={'h-mt-10'} label={'文書'} />
        </div>

        <br></br><br></br>

        <label>Radio:</label>

        <div className={'form-control'}>
          <Radio name={'radio'} value={'個人'} label={'個人'} defaultChecked={true} onChange={this.handleInputChange} />

          <Radio name={'radio'} value={'所属'} label={'所属'} onChange={this.handleInputChange} />
        </div>

        <br></br><br></br>

        <label>Radio:</label>

        <div className={'form-control'}>
          <InputTags
            onChange={(values) => { }}
            value={[{ label: 'tag1' }, { label: 'tag2' }]}
          />
        </div>

        <br></br><br></br>

        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default withRouter(SimpleForm);
