import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Badge
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
    return (
        <Container fluid>
            <Row>
              <Col>
                <img style={{ maxWidth: '100%', objectFit: 'cover'}}
                    src={recipe.img} alt=''/>
              </Col>
              <Col>
                <Row>{recipe.title}</Row>
                <Row>Prep Time: {recipe.prepTime} Cook Time: {recipe.cookTime}</Row>
                <Row>{ recipe.categories.map((c: string) => {
                    return categories[c];
                  }) }
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>Ingredients</Col>
              <Col>Directions</Col>
            </Row>
            <Row>
              <Col>
                <table>
                  <tbody>
                    {
                      recipe.ingredients.map((i: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>{i.quantity} {i.unit} {i.name}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </Col>
              <Col>
                <table>
                  <tbody>
                    {
                      recipe.directions.map((i: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>{++index} {i}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </Col>
            </Row>
        </Container>
    );
}