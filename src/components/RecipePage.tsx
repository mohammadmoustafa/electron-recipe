import React, { useState, useEffect } from 'react';
import '../style/master.css';
import '../style/RecipePage.css';
import * as conversions from '../store/UnitConversions.json';
import breakfast from '../assets/breakfast.jpeg';
import { useParams } from 'react-router-dom';

import {
    Row,
    Col,
    Badge,
    FormSelect,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "shards-react";

type catOptions = {
    [key: string]: JSX.Element
  }
var categories : catOptions = {
    appetizer: <Badge pill className="recipe-badge" theme="primary" key="appetizer">Appetizer</Badge>,
    entree: <Badge pill className="recipe-badge" theme="success" key="entree">Entree</Badge>,
    dessert: <Badge pill className="recipe-badge" theme="info" key="dessert">Dessert</Badge>
}


export default function RecipePage(props: any) {
    const { id } = useParams();
    const store = props.db;
    const [recipe, setRecipe] = useState({
      title: '',
      _attachments: {
        img: ''
      },
      category: '',
      prepTime: '',
      cookTime: '',
      ingredients: [],
      directions: [],
      notes: '',
      tags: []
    } as any);
    const [_mounted, _setMounted] = useState(true);

    useEffect(() => {
      if (_mounted) {
        store.getRecipe(id).then((res: any) => {
          setRecipe(res);
        }).catch((err: any) => {
          console.log(err)
        });
      }
      return function cleanup() {
       _setMounted(false);
      }
    }, [recipe]);
    
    const [divider, setDivider] = useState(1);

    const convertUnit = (num: number, unit: string, name: string) => {
      let divisor : number = divider;
      let clean = ((num / divisor) % 0.25) === 0;
      if (clean) return `${num/divisor} ${unit}`;
      else {
        switch(unit) {
          case 'cup':
            let mult = conversions.cup.multiplier;
            let tbsp = Math.floor(Math.pow(mult, 2) *num / divisor);
            let tsp = Math.ceil(((( Math.pow(mult, 2) * num) / divisor) % tbsp) * conversions.tbsp.multiplier);
            let result: string = '';
            if (tbsp > 0) result = result.concat(`${tbsp} tbsp `);
            if (tsp > 0) result = result.concat(`${tsp} tsp`);
            return `${result} ${name}`;
          case 'tsp':
            let res = num/divisor;
            if ([0.25, 0.5, 0.75].includes(res)) return `${res} tsp ${name}`;
            return `pinch of ${name}`;
          case 'g':
            return `${Math.floor(num/divisor)} g ${name}`
          default:
            return 'cups';
        }
      }
    }

    return (
        <div id="container">
          <Row>
            <Col>
              <img className="image"
                  src={(recipe._attachments.img) ? 
                    URL.createObjectURL(recipe._attachments.img.data) :
                    "https://place-hold.it/250x300"} alt=''/>
            </Col>
            <Col className="w-100" style={{ paddingLeft: "15px", paddingTop: "15px" }}>
              <Row className="title">{recipe.title}</Row>
              <Row> 
                {recipe.prepTime && `Prep Time: ${recipe.prepTime}`}
              </Row>
              <Row>
                {recipe.cookTime && `Cook Time: ${recipe.cookTime}`}
              </Row>
              <Row>{ categories[recipe.category] }</Row>
              <Row className="w-100" style={{ marginTop: "5px"}}>
                <InputGroup>
                  <InputGroupAddon type="prepend">
                    <InputGroupText style={{ color: 'black'}}>Divide Recipe</InputGroupText>
                  </InputGroupAddon>
                  <FormSelect onChange={(e: any) => setDivider(e.target.value)}
                  id="divider"
                  value={divider}>
                    <option value={1}>Original</option>
                    <option value={2}>1/2</option>
                    <option value={4}>1/4</option>
                    <option value={3}>1/3</option>
                  </FormSelect>
                </InputGroup>
                
              </Row>
            </Col>
          </Row>
          <Row className="body-headings">
            <Col md="4"><h4>Ingredients</h4></Col>
            <Col md="8"><h4>Directions</h4></Col>
          </Row>
          <Row>
            {/* ingredients */}
            <Col md="4">
              <ul >
                {
                  recipe.ingredients.map((i: any, index: number) => {
                    return (
                      <li key={index}>{ convertUnit(i.quantity, i.unit, i.name)}</li>
                    )
                  })
                }
              </ul>
            </Col>
            {/* directions */}
            <Col md="8">
              <ol>
                {
                  recipe.directions.map((i: any, index: number) => {
                    return (
                      <li key={index}>{i}</li>
                    )
                  })
                }
              </ol>
            </Col>
          </Row>
          { recipe.notes &&
            <React.Fragment>
              <Row>
                <Col>
                  <h4>Notes:</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  {recipe.notes}
                </Col>
              </Row> 
            </React.Fragment>
          }
          { recipe.tags &&
          <Row id="tags">
            { recipe.tags.map((tag: any, i: number) => {
              return (<Badge pill theme="light" key={i}>#{tag.value}</Badge>)
            }) }
          </Row>
          }
        </div>
    );
}