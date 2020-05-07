import React from 'react';
import Recipes from './Recipes';
import AddRecipeForm from './AddRecipeForm';
import RecipePage from './RecipePage';
import '../style/master.css';

// Shards React UI
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

// React Router DOM
import { Switch, Route, Link } from 'react-router-dom';

function App(props: any) {
  return (
      <Container fluid className="App">
        <Row id="crumbs">
          <Breadcrumb id="crumbs-root">
            <Switch>
              <Route exact path="/">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
              </Route>
              <Route exact path="/recipes">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Recipes</BreadcrumbItem>
              </Route>
              <Route exact path="/recipes/add-recipe">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem>Recipes</BreadcrumbItem>
                <BreadcrumbItem active>Add Recipe</BreadcrumbItem>
              </Route>
              <Route exact path="/recipes/:id">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem>Recipes</BreadcrumbItem>
                <BreadcrumbItem active>View Recipe</BreadcrumbItem>
              </Route>
            </Switch>
          </Breadcrumb>
        </Row>
        <Row id="body">
          <Col sm="12" md="3" lg="2" id="navigation">
            <Container fluid>
              <Switch>
                <Route>
                  <ListGroup flush>
                    <ListGroupItem><Link to="/recipes">Recipes</Link></ListGroupItem>
                    <ListGroupItem><Link to="/recipes/add-recipe">Add Recipe</Link></ListGroupItem>
                  </ListGroup>
                </Route>
              </Switch>
            </Container>
          </Col>
          <Col sm="12" md="9" lg="10" id="content">
            <Container fluid>
              <Row>
                <Switch>
                  <Route exact path="/recipes"><Recipes db={props.db} /></Route>
                  <Route exact path="/recipes/add-recipe"><AddRecipeForm db={props.db} /></Route>
                  <Route exact path="/">Content</Route>
                  <Route path="/recipes/:id" children={<RecipePage db={props.db} />}></Route>
                </Switch>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
