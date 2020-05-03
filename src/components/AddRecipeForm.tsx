import React from 'react';
import 'src/style/master.css';

import {
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormTextarea,
  FormSelect,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
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
      prepUnit: 'hr',
      cook: -1,
      cookUnit: 'hr',
      ingredients: [],
      directions: [],
      notes: '',
      redirect: false,
      open: false,
      ingredientForm: {
        name: '',
        quantity: 0,
        unit: 'cup'
      },
      directionsForm: ''
    }
    this.store = remote.getGlobal('recipeStore');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addDirection = this.addDirection.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
  }

  addRow(event: any) {
    var ingredients = this.state.ingredients;
    ingredients.push({
      name: this.state.ingredientForm.name,
      quantity: parseInt(this.state.ingredientForm.quantity),
      unit: this.state.ingredientForm.unit
    });
    this.setState({ ingredients: ingredients});
  }

  addDirection(event: any) {
    var directions = this.state.directions;
    directions.push(this.state.directionsForm);
    this.setState({ directions: directions});
  }

  handleDirectionsChange(event: any) {
    this.setState({ directionsForm: event.target.value });
  }

  handleChange(event: any, field: string) {
    var newState: any = {};
    newState[field] = event.target.value;
    this.setState({...this.state, ...newState });
  }

  handleIngredientChange(event: any, field: string) {
    const newState: any = {};
    newState['ingredientForm'] = this.state.ingredientForm;
    newState.ingredientForm[field] = event.target.value;
    this.setState({...this.state, ...newState});
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
    const recipe: any = {
      title: this.state.title,
      img: this.state.img,
      categories: categories,
      prepTime: parseFloat(this.state.prep) * ((this.state.prepUnit === 'hr') ? 60 : 1),
      cookTime: parseFloat(this.state.cook) * ((this.state.cookUnit === 'hr') ? 60 : 1),
      ingredients: this.state.ingredients,
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
          <FormInput type="number" step="0.25"
            onChange={(e:any) => this.handleChange(e, 'prep')}/>
          <FormSelect onChange={(e: any) => { this.setState({ cookUnit: e.target.value}) }} >
            <option>Hour(s)</option>
            <option>Minute(s)</option>
          </FormSelect>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon type="prepend">
            <InputGroupText>Cook Time</InputGroupText>
          </InputGroupAddon>
          <FormInput type="number" step="0.25"
            onChange={(e:any) => this.handleChange(e, 'cook')}/>
          <FormSelect onChange={(e: any) => { this.setState({ cookUnit: e.target.value}) }} >
            <option value="hr">Hour(s)</option>
            <option value="min">Minute(s)</option>
          </FormSelect>
        </InputGroup>

        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Unit</th>  
            </tr>
            <tr>
              <th><FormInput onChange={(e: any) => this.handleIngredientChange(e, 'name')} /></th>
              <th><FormInput type="number" onChange={(e: any) => this.handleIngredientChange(e, 'quantity')} /></th>
              <th>
                <FormSelect value={this.state.ingredientForm.unit}
                  onChange={(e: any) => this.handleIngredientChange(e, 'unit')}>
                  <option value="cup">Cup</option>
                  <option value="bunch">Bunch</option>
                </FormSelect>
              </th>
              <th><Button onClick={this.addRow}>Add Ingredient</Button></th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            { 
              this.state.ingredients.map((r: any) => {
                return (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.quantity}</td>
                    <td>{r.unit}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        
        <table>
          <thead>
            <tr>
              <th><FormInput onChange={this.handleDirectionsChange} /></th>
              <th><Button onClick={this.addDirection}>Add Direction</Button></th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            { 
              this.state.directions.map((r: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{ ++index }</td>
                    <td>{r}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <FormGroup>
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
