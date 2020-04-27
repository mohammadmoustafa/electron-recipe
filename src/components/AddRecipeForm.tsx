import React from 'react';
import '../style/master.css';

import {
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  Button
} from "shards-react";

const remote = window.require('electron').remote;

class AddRecipeForm extends React.Component<any,any> {
  store: any;
  constructor(props: any) {
    super(props)
    this.state = {
      title: '',
      id: -1,
      breakfast: false,
      lunch: false,
      dinner: false,
    }
    this.store = remote.getGlobal('recipeStore');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleTitleChange(event: any) {
    this.setState({title: event.target.value});
  }

  handleIdChange(event: any) {
    this.setState({id: event.target.value});
  }
  
  handleCheckChange(event: any, category: any) {
    const newState: any = {};
    newState[category] = !this.state[category];
    this.setState({...this.state, ...newState});
  }

  handleSubmit(event: any) {
    alert(`Title: ${this.state.title}, ID: ${this.state.id}`);
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <label htmlFor="#title">Recipe Name</label>
          <FormInput id="#title" placeholder="Recipe Name" onChange={this.handleTitleChange}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#id">Recipe ID</label>
          <FormInput type="number" id="#id" placeholder="Recipe ID" onChange={this.handleIdChange}/>
        </FormGroup>
        <FormGroup>
          <FormCheckbox
          checked={this.state.breakfast}
          onChange={(e:any) => this.handleCheckChange(e, "breakfast")}>
          Breakfast</FormCheckbox>
          <FormCheckbox
          checked={this.state.lunch}
          onChange={(e:any) => this.handleCheckChange(e, "lunch")}>
          Lunch</FormCheckbox>
          <FormCheckbox
          checked={this.state.dinner}
          onChange={(e:any) => this.handleCheckChange(e, "dinner")}>
          Dinner</FormCheckbox>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default AddRecipeForm;
