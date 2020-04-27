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

class Recipe extends React.Component<RecipeProps> {
  render() {
    return (
      <Card style={{ maxWidth: '250px', maxHeight: '300px', margin: '5px 10px 5px 10px' }}>
        <CardImg top className="recipe-img" src={(this.props.img) ? this.props.img : "https://place-hold.it/250x300"} />
        <CardBody className="recipe-body">
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle><FontAwesomeIcon icon={faClock} /> {this.props.time}</CardSubtitle>
        </CardBody>
        <CardFooter><Badge  theme="primary">Breakfast</Badge></CardFooter>
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
        <Recipe title="Pancakes" category={['breakfast']} time="5 mins." img={breakfast}/>
        {/* { RecipeStore.recipes.map((r : any) =>
          <Recipe title={r.title} category={['breakfast']} time="5 mins." img={breakfast} key={r.id}/>
        ) } */}
      </React.Fragment>
    );
  }
}

export default Recipes;
