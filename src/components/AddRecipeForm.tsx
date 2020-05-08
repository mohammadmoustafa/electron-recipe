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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons'


// Need to work on this to accept proper recipes

class AddRecipeForm extends React.Component<any,any> {
  store: any;
  myref: any;
  constructor(props: any) {
    super(props)
    this.state = {
      title: '',
      img: null,
      category: '',
      prep: 0,
      prepUnit: 'hr',
      cook: 0,
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
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
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

  addIngredient(event: any) {
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
    this.setState({ directions: directions, directionsForm: ''});
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

  handleSubmit(event: any) { 
    const recipe: any = {
      _id: intformat(generator.next(), 'hex'),
      _attachments: {
        img: {
          type: this.state.img.type,
          data: this.state.img,
          content_type: this.state.img.type
        }
      },
      title: this.state.title,
      category: this.state.category,
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
      this.setState({
        title: '',
        img: null,
        category: '',
        prep: 0,
        cook: 0,
        ingredients: [],
        directions: [],
        notes: ''
      });
    }).catch((err: any) => console.log(err));
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
            <FormInput required value={this.state.title} onChange={(e:any) => this.handleChange(e, 'title')}/>
          </InputGroup>
        </Row>

        <Row id="form-item">
          <Col md="6" lg="6" style={{ display: 'flex', paddingRight: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Image</InputGroupText>
              </InputGroupAddon>
              <FormInput type="file" onChange={(e:any) => this.setState({ img: e.target.files[0] }) }/>
            </InputGroup>
          </Col>
          <Col md="6" lg="6" style={{ display: 'flex', paddingLeft: '7.5px'}}>
            <InputGroup style={{ flex: '1'}}>
              <InputGroupAddon type="prepend">
                <InputGroupText>Category</InputGroupText>
              </InputGroupAddon>
              <FormSelect style={{ height: '100%'}} value={this.state.category}
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
              <FormInput type="number" step="0.25" value={this.state.prep}
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
                <InputGroupText>Cook Time</InputGroupText>
              </InputGroupAddon>
              <FormInput type="number" step="0.25" value={this.state.cook}
                onChange={(e:any) => this.handleChange(e, 'cook')}/>
              <FormSelect onChange={(e: any) => { this.setState({ cookUnit: e.target.value}) }} >
                <option>Hour(s)</option>
                <option>Minute(s)</option>
              </FormSelect>
            </InputGroup>
          </Col>
        </Row>
          
        {/* Ingredients section */}
        <label htmlFor="#ingredients" className="sub-title">Ingredients</label>
        <InputGroup id="ingredients">
          <FormInput placeholder="Ingredient"
            ref={this.myref} value={this.state.ingredientForm.name}
            onChange={(e: any) => this.handleIngredientChange(e, 'name')} />
          <FormInput placeholder="Amount" step="0.25"
            type="number" value={this.state.ingredientForm.quantity}
            onChange={(e: any) => this.handleIngredientChange(e, 'quantity')} />
          <FormSelect value={this.state.ingredientForm.unit}
            onChange={(e: any) => this.handleIngredientChange(e, 'unit')}>
            <option value="cup">cup(s)</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
            <option value="g">gram(s)</option>
            <option value="kg">kg(s)</option>
            <option value="lb">lb(s)</option>
            <option value="quart">quart(s)</option>
            <option value="litre">litre(s)</option>
            <option value="ml">ml</option>

          </FormSelect>
          <InputGroupAddon type="append">
          <Button onClick={this.addIngredient}>Add Ingredient</Button>
          </InputGroupAddon>
        </InputGroup>
        <ul className="column-2">
          {
            this.state.ingredients.map((r: any, i: number) => {
              return (
              <li key={r.name}>{r.quantity} {r.unit} {r.name} {
                <FontAwesomeIcon icon={faMinus} onClick={(e: any) => {
                  var ingredients: Array<string> = this.state.ingredients; 
                  ingredients.splice(i);
                  this.setState({ingredients: ingredients});
                }} />}</li>
              )
            })
          }
        </ul>
        
        {/* Directions section */}
        <label htmlFor="#directions" className="sub-title">Directions</label>
        <InputGroup>
          <FormInput placeholder="Direction..." onChange={this.handleDirectionsChange} />
          <InputGroupAddon type="append">
            <Button onClick={this.addDirection}>Add Direction</Button>
          </InputGroupAddon>
        </InputGroup>
        <ol className="column-2">
          {
            this.state.directions.map((r: any, i: number) => {
              return (
              <li key={i}>{r} {
                <FontAwesomeIcon icon={faMinus} onClick={(e: any) => {
                  var directions: Array<string> = this.state.directions; 
                  directions.splice(i);
                  this.setState({directions: directions});
                }} />}</li>
              )
            })
          }
        </ol>

        <FormGroup>
          <label htmlFor="#notes">Notes</label>
          <FormTextarea id="#notes" value={this.state.notes}
            onChange={(e: any) => this.handleChange(e, 'notes')} />
        </FormGroup>
        <Button type="submit">Submit</Button>
        { this.state.redirect && <Redirect to="/recipes" /> }
      </Form>
    );
  }
}

export default AddRecipeForm;
