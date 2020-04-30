import React from 'react';
import '../style/master.css';

import {
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormTextarea,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
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
      prep: -1,
      cook: -1,
      ingredients: [],
      directions: [],
      notes: '',
      redirect: false,
      open: false
    }
    this.store = remote.getGlobal('recipeStore');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleDirectionsChange(event: any) {
    var directions: Array<string> = event.target.value.split(',');
    this.setState({ directions: directions });
  }

  handleChange(event: any, field: string) {
    var newState: any = {};
    newState[field] = event.target.value;
    this.setState({...this.state, ...newState });
  }
  
  handleCheckChange(event: any, category: any) {
    const newState: any = {};
    newState['categories'] = this.state.categories;
    newState.categories[category] = !this.state.categories[category];
    this.setState({...this.state, ...newState});
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  handleSubmit(event: any) {
    var categories: Array<string> = [];
    for (let x in this.state.categories) {
      if (this.state.categories[x]) categories.push(x);
    }
    const recipe: any = {
      title: this.state.title,
      img: this.state.img,
      categories: categories,
      prepTime: parseInt(this.state.prep),
      cookTime: parseInt(this.state.cook),
      ingredients: [
        {
          name: 'test ingredient',
          quantity: 2,
          unit: 'cup'
        }
      ],
      directions: this.state.directions,
      notes: this.state.notes
    }
    console.log(recipe);
    this.store.addRecipe(recipe);
    alert("Recipe has been added.");
    this.setState({ redirect: true });
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <InputGroupAddon type="prepend">
            <InputGroupText>Recipe Name</InputGroupText>
          </InputGroupAddon>
          <FormInput onChange={(e:any) => this.handleChange(e, 'title')}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon type="prepend">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="Image URL"
            onChange={(e:any) => this.handleChange(e, 'img')}/>
        </InputGroup>

        <FormGroup>
          <FormCheckbox inline
          checked={this.state.categories.breakfast}
          onChange={(e:any) => this.handleCheckChange(e, "breakfast")}>
          Breakfast</FormCheckbox>
          <FormCheckbox inline
          checked={this.state.categories.lunch}
          onChange={(e:any) => this.handleCheckChange(e, "lunch")}>
          Lunch</FormCheckbox>
          <FormCheckbox inline
          checked={this.state.categories.dinner}
          onChange={(e:any) => this.handleCheckChange(e, "dinner")}>
          Dinner</FormCheckbox>
        </FormGroup>

        <InputGroup>
          <InputGroupAddon type="prepend">
            <InputGroupText>Prep Time</InputGroupText>
          </InputGroupAddon>
          <FormInput type="number"
            onChange={(e:any) => this.handleChange(e, 'prep')}/>
          <Dropdown
            addonType="append"
            open={this.state.open}
            toggle={this.toggle}>
            <DropdownToggle caret>Time Unit</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Minutes</DropdownItem>
              <DropdownItem>Hours</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon type="prepend">
            <InputGroupText>Cook Time</InputGroupText>
          </InputGroupAddon>
          <FormInput type="number"
            onChange={(e:any) => this.handleChange(e, 'cook')}/>
          <Dropdown
            addonType="append"
            open={this.state.open}
            toggle={this.toggle}>
            <DropdownToggle caret>Time Unit</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Minutes</DropdownItem>
              <DropdownItem>Hours</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroup>
        <FormGroup>
          <label htmlFor="#ingredients">Ingredients</label>
          <FormInput id="#ingredients" type="number" placeholder="Ingredients" />
          <label htmlFor="#directiones">Directions</label>
          <FormInput id="#directions" placeholder="Directions" onChange={this.handleDirectionsChange}/>
          <label htmlFor="#notes">Notes</label>
          <FormTextarea id="#notes"
            onChange={(e: any) => this.handleChange(e, 'notes')} />
        </FormGroup>
        <Button type="submit">Submit</Button>
        { this.state.redirect && <Redirect to="/recipes" /> }
      </Form>
    );
  }
}

export default AddRecipeForm;
