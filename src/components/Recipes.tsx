import React from 'react';
import '../style/master.css';
import '../style/Recipe.css';
import breakfast from '../assets/breakfast.jpeg';

import {
  Badge,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col
} from "shards-react";

import { useHistory } from 'react-router-dom';

type catOptions = {
  [key: string]: JSX.Element
}
var categories : catOptions = {
  appetizer: <Badge className="recipe-badge" theme="primary" key="appetizer">Appetizer</Badge>,
  entree: <Badge className="recipe-badge" theme="success" key="entree">Entree</Badge>,
  dessert: <Badge className="recipe-badge" theme="info" key="dessert">Dessert</Badge>
}

const colors = () => {
  const options = {
    c1: 'rgb(224, 108, 117)',
    c2: 'rgb(152, 195, 121)',
    c3: 'rgb(210, 153, 102)',
    c4: 'rgb(97, 176, 238)',
    c5: 'rgb(198, 120, 222)',
    c6: 'rgb(86, 182, 194)',
    c7: 'rgb(171, 178, 191)',
    c8: 'rgb(255, 255, 255)',
  }
  let result: any = [];
  result.push(<span style={{ width: '100%', height: '25px',
      backgroundColor: options.c1,
      borderTopRightRadius: '5px'}}
      key='first'></span>)
  Object.entries(options).slice(1, -1).forEach(([k, v]) => {
    result.push(<span style={{ width: '100%', height: '25px',
      backgroundColor: v,}}
      key={k}></span>)
  });
  result.push(<span style={{ width: '100%', height: '25px',
      backgroundColor: options.c8,
      borderBottomRightRadius: '5px'}}
      key='last'></span>)
  return result;
}


function Recipe(props: any) {
  const history = useHistory();
  const recipe = props.entry.doc;
  const image = recipe._attachments.img;

  const handleClick = () => {
    history.push(`/recipes/${recipe._id}`);
  }

  return (
    <ListGroupItem className="recipe-body" onClick={handleClick}>
      <Container fluid>
        <Row>
          <Col md="4">
            <img className="recipe-img" alt=''
              src={(image) ? URL.createObjectURL(image.data) : "https://place-hold.it/250x300"} />
          </Col>
          <Col md="7" className="recipe-info">
            <Row><h4>{recipe.title}</h4></Row>
            <Row>Prep Time: {recipe.prepTime}</Row>
            <Row>Cook Time: {recipe.cookTime}</Row>
            <Row style={{ flexGrow: '1' }}>&nbsp; </Row>
            <Row>
              { categories[recipe.category] }
            </Row>
          </Col>
          <Col md="1" className="share-controls">
            { colors() }
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  );
}

class Recipes extends React.Component<any, any> {
  store: any;
  constructor(props: any) {
    super(props);
    this.store = props.db;
    this.state = {
      recipes: []
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    var recipes: Array<any> = [];
    this.store.getRecipes().then((res: any) => {
      res.rows.forEach((r: any) => {
        recipes.push(<Recipe entry={r} key={r.doc._id}/>);
      });
      this.setState({recipes: recipes});
    });
  }

  render() {
    return (
      <React.Fragment>
        <ListGroup className="recipes-group">
        { this.state.recipes }
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Recipes;
