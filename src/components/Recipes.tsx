import React from 'react';
import '../style/master.css';
import '../style/Recipe.css';
import breakfast from '../media/breakfast.jpeg';

import {
  Card,
  CardSubtitle,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Badge
} from "shards-react";
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const remote = window.require('electron').remote;

type catOptions = {
  [key: string]: JSX.Element
}
var categories : catOptions = {
  breakfast: <Badge theme="primary" key="breakfast">Breakfast</Badge>,
  lunch: <Badge theme="success" key="lunch">Lunch</Badge>,
  dinner: <Badge theme="info" key="dinner">Dinner</Badge>
}

class Recipe extends React.Component<RecipeProps> {

  constructor(props: RecipeProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(`Recipe name:${this.props.title}, ID: ${this.props.id}`);
  }

  render() {
    return (
      <Card onClick={this.handleClick} style={{ maxWidth: '250px', maxHeight: '300px', margin: '5px 10px 5px 10px' }}>
        <CardImg top className="recipe-img" src={(this.props.img) ? this.props.img : "https://place-hold.it/250x300"} />
        <CardBody className="recipe-body">
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle><FontAwesomeIcon icon={faClock} /> {this.props.time}</CardSubtitle>
        </CardBody>
        <CardFooter>{ this.props.category.map((c: string) => {
          return categories[c];
        }) }</CardFooter>
      </Card>
    );
  }
}

class Recipes extends React.Component<any, any> {
  store: any;
  constructor(props: any) {
    super(props);
    this.store = remote.getGlobal('recipeStore');
  }

  render() {
    return (
      <React.Fragment>
        { this.store.recipes.map((r : any) =>
          <Recipe title={r.title}
                  category={r.categories}
                  time="5 mins."
                  img={breakfast}
                  key={r.id}
                  id={r.id}/>
        ) }
      </React.Fragment>
    );
  }
}

export default Recipes;
