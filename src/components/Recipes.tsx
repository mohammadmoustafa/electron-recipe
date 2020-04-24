import React from 'react';
import '../style/master.css';

import { 
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import { Link } from 'react-router-dom';

class Recipe extends React.Component {
  render() {
    return (
      <Card style={{ width: '200px', margin: '5px 10px 5px 10px' }}>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <CardTitle>Title</CardTitle>
          <p>Text</p>
          <Button>Button</Button>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
  }
}

class Recipes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </React.Fragment>
    );
  }
}

export default Recipes;