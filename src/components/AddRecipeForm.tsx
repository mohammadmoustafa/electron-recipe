import React from 'react';
import '../style/master.css';
import '../style/RecipeForm.css';

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
  Row,
  Col,
  Container
} from "shards-react";
import { Redirect } from 'react-router-dom';
import FlakeIdGen from 'flake-idgen';
import intformat from 'biguint-format';
const generator = new FlakeIdGen();

// Need to work on this to accept proper recipes

class AddRecipeForm extends React.Component<any,any> {
  store: any;
  myref: any;
  constructor(props: any) {
    super(props)
    this.state = {
      title: '',
      img: '',
      category: '',
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
        quantity: '',
        unit: 'cup'
      },
      directionsForm: ''
    }
    this.store = props.db;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addDirection = this.addDirection.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.convertTime = this.convertTime.bind(this)
  }

  convertTime(mins: number) {
    let hr = Math.floor(mins / 60);
    let min = mins % 60;
    let result : string = '';
    if (hr > 1) {
      result = result.concat(`${hr} hours `);
    } else if (hr > 0) {
      result = result.concat(`${hr} hour `);
    }

    if (min > 0) {
      result = result.concat(`${min} mins`);
    }
    return result;
  }

  addRow(event: any) {
    var ingredients = this.state.ingredients;
    ingredients.push({
      name: this.state.ingredientForm.name,
      quantity: parseInt(this.state.ingredientForm.quantity),
      unit: this.state.ingredientForm.unit
    });
    this.setState({ 
      ingredients: ingredients,
      ingredientForm: {
        name: '',
        quantity: 0,
        unit: 'cup'
      }
    });
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
      _id: intformat(generator.next(), 'hex'),
      title: this.state.title,
      img: this.state.img,
      categories: categories,
      prepTime: this.convertTime(parseFloat(this.state.prep) * ((this.state.prepUnit === 'hr') ? 60 : 1)),
      cookTime: this.convertTime(parseFloat(this.state.cook) * ((this.state.cookUnit === 'hr') ? 60 : 1)),
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      notes: this.state.notes
    }
    this.store.addRecipe(recipe).then((res: any) => {
      let notif = new Notification('Electron Recipe', {
        body: `New Recipe '${recipe.title}' has been added.`
      });
      this.setState({ redirect: true });
    }).catch((err: any) => console.log(err));;
    event.preventDefault();
  }

  render() {
    return (
      <Form className="recipe-form" onSubmit={this.handleSubmit}>

        <Row id="form-item" lg="12">
          <InputGroup>
            <InputGroupAddon type="prepend">
              <InputGroupText>Recipe Name</InputGroupText>
            </InputGroupAddon>
            <FormInput required onChange={(e:any) => this.handleChange(e, 'title')}/>
          </InputGroup>
        </Row>

        <Row id="form-item">
          <Col md="6" lg="6" style={{ display: 'flex', paddingRight: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Image</InputGroupText>
              </InputGroupAddon>
              <FormInput type="file" />
            </InputGroup>
          </Col>
          <Col md="6" lg="6" style={{ display: 'flex', paddingLeft: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Category</InputGroupText>
              </InputGroupAddon>
              <FormSelect style={{ height: '100%'}}
                onChange={(e: any) => this.handleChange(e, 'category')}>
                <option value="appetizer">Appetizer</option>
                <option value="entree">Entree</option>
                <option value="dessert">Dessert</option>
              </FormSelect>
            </InputGroup>
          </Col>
        </Row>

        <Row id="form-item">
          <Col md="6" lg="6" style={{ display: 'flex', paddingRight: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Prep Time</InputGroupText>
              </InputGroupAddon>
              <FormInput type="number" step="0.25"
                onChange={(e:any) => this.handleChange(e, 'prep')}/>
              <FormSelect onChange={(e: any) => { this.setState({ prepUnit: e.target.value}) }} >
                <option>Hour(s)</option>
                <option>Minute(s)</option>
              </FormSelect>
            </InputGroup>
          </Col>
          <Col md="6" lg="6" style={{ display: 'flex', paddingLeft: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Prep Time</InputGroupText>
              </InputGroupAddon>
              <FormInput type="number" step="0.25"
                onChange={(e:any) => this.handleChange(e, 'prep')}/>
              <FormSelect onChange={(e: any) => { this.setState({ prepUnit: e.target.value}) }} >
                <option>Hour(s)</option>
                <option>Minute(s)</option>
              </FormSelect>
            </InputGroup>
          </Col>
        </Row>
          
        {/* Ingredients section */}
        <InputGroup>
          <FormInput ref={this.myref} value={this.state.ingredientForm.name}
            onChange={(e: any) => this.handleIngredientChange(e, 'name')} />
          <FormInput type="number" value={this.state.ingredientForm.quantity}
            onChange={(e: any) => this.handleIngredientChange(e, 'quantity')} />
          <FormSelect value={this.state.ingredientForm.unit}
            onChange={(e: any) => this.handleIngredientChange(e, 'unit')}>
            <option value="cup">Cup</option>
            <option value="bunch">Bunch</option>
          </FormSelect>
          <Button onClick={this.addRow}>Add Ingredient</Button>
        </InputGroup>
        <ul className="column-3">
          {
            this.state.ingredients.map((r: any) => {
              return (
              <li key={r.name}>{r.quantity} {r.unit} {r.name}</li>
              )
            })
          }
        </ul>
        
        {/* Directions section */}
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
