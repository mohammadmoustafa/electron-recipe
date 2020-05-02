import React, { useState } from 'react';
import '../style/master.css';
import '../style/RecipePage.css';
import * as conversions from './UnitConversions.json';
import breakfast from '../media/breakfast.jpeg';
import { useParams } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Badge,
    FormSelect,
} from "shards-react";

const remote = window.require('electron').remote;
type catOptions = {
    [key: string]: JSX.Element
  }
var categories : catOptions = {
    breakfast: <Badge className="recipe-badge" theme="primary" key="breakfast">Breakfast</Badge>,
    lunch: <Badge className="recipe-badge" theme="success" key="lunch">Lunch</Badge>,
    dinner: <Badge className="recipe-badge" theme="info" key="dinner">Dinner</Badge>
}

export default function RecipePage() {
    const { id } = useParams();
    const store = remote.getGlobal('recipeStore');
    const recipe = store.getRecipe(id)[0];
    const [divider, setDivider] = useState(1);

    const convertUnit = (num: number, unit: string) => {
      let divisor : number = divider;
      let clean = ((num / divisor) % 0.25) === 0;
      if (clean) return `${num/divisor} ${unit}`;
      else {
        switch(unit) {
          case 'cup':
            let mult = conversions.cup.multiplier;
            let tbsp = Math.floor(Math.pow(mult, 2) *num / divisor);
            let tsp = Math.ceil(((( Math.pow(mult, 2) * num) / divisor) % tbsp) * conversions.tbsp.multiplier);
            return `${tbsp} tbsp + ${tsp} tsp`;
          default:
            return 'cups';
        }
      }
    }

    const convertTime = (mins: number) => {
      let hr = Math.floor(mins / 60);
      let min = mins % 60;
      return `${hr} ` + ((hr > 1)?  `hours` : 'hour') + ((min > 0) ? ` ${min} mins` : '');
    }

    return (
        <Container fluid>
            <Row>
              <Col>
                <img style={{ maxWidth: '100%', objectFit: 'cover'}}
                    src={(recipe.img) ? recipe.img : breakfast} alt=''/>
              </Col>
              <Col>
                <Row><h3>{recipe.title}</h3></Row>
                <Row>Prep Time: {convertTime(recipe.prepTime)} Cook Time: {convertTime(recipe.cookTime)}</Row>
                <Row>{ recipe.categories.map((c: string) => {
                    return categories[c];
                  }) }
                </Row>
                <Row>
                  <label htmlFor="divider">Divide Recipe:</label>
                  <FormSelect onChange={(e: any) => setDivider(e.target.value)}
                    id="divider"
                    value={divider}>
                      <option value={1}>Original</option>
                      <option value={2}>1/2</option>
                      <option value={4}>1/4</option>
                      <option value={3}>1/3</option>
                  </FormSelect>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col><h4>Ingredients</h4></Col>
            </Row>
            <Row>
              <Col>
                <ul className="column-2">
                  {
                    recipe.ingredients.map((i: any, index: number) => {
                      return (
                        <li key={index}>{ convertUnit(i.quantity, i.unit)} {i.name}</li>
                      )
                    })
                  }
                </ul>
              </Col>
            </Row>
            <Row>
              <Col><h4>Directions</h4></Col>
            </Row>
            <Row>
              <Col>
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
        </Container>
    );
}