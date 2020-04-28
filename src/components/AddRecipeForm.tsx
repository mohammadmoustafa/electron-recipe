import React from 'react';
import '../style/master.css';

import {
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  Button
} from "shards-react";

import { Redirect } from 'react-router-dom';

const remote = window.require('electron').remote;

class AddRecipeForm extends React.Component<any,any> {
  store: any;
  constructor(props: any) {
    super(props)
    this.state = {
      title: '',
      img: '',
      categories: {
        breakfast: false,
        lunch: false,
        dinner: false,
      },
      redirect: false
    }
    this.store = remote.getGlobal('recipeStore');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleTitleChange(event: any) {
    this.setState({title: event.target.value});
  }

  handleImgChange(event: any) {
    this.setState({img: event.target.value});
  }
  
  handleCheckChange(event: any, category: any) {
    const newState: any = {};
    newState['categories'] = this.state.categories;
    newState.categories[category] = !this.state.categories[category];

    this.setState({...this.state, ...newState});
  }

  handleSubmit(event: any) {
    var categories: Array<string> = [];
    for (let x in this.state.categories) {
      if (this.state.categories[x]) categories.push(x);
    }
    this.store.addRecipe({ title: this.state.title, img: this.state.img ,categories: categories});
    alert("Recipe has been added.");
    this.setState({ redirect: true });
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
          <label htmlFor="#img">Recipe Image URL</label>
          <FormInput id="#img" placeholder="Image URL" onChange={this.handleImgChange}/>
        </FormGroup>
        <FormGroup>
          <FormCheckbox
          checked={this.state.categories.breakfast}
          onChange={(e:any) => this.handleCheckChange(e, "breakfast")}>
          Breakfast</FormCheckbox>
          <FormCheckbox
          checked={this.state.categories.lunch}
          onChange={(e:any) => this.handleCheckChange(e, "lunch")}>
          Lunch</FormCheckbox>
          <FormCheckbox
          checked={this.state.categories.dinner}
          onChange={(e:any) => this.handleCheckChange(e, "dinner")}>
          Dinner</FormCheckbox>
        </FormGroup>
        <Button type="submit">Submit</Button>
        { this.state.redirect && <Redirect to="/recipes" /> }
      </Form>
    );
  }
}

export default AddRecipeForm;
