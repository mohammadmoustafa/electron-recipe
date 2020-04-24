import React from 'react';
import Recipes from './components/Recipes';
import './App.css';
import './style/master.css';

// Shards React UI
import { 
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

// React Router DOM
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
      <Container fluid className="App">
        <Row id="crumbs">
          <Breadcrumb id="crumbs-root">
            <Switch>
              <Route exact path="/">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
              </Route>
              <Route path="/recipes">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Recipes</BreadcrumbItem>
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
                    <ListGroupItem>Item 2</ListGroupItem>
                    <ListGroupItem>Item 3</ListGroupItem>
                    <ListGroupItem>Item 4</ListGroupItem>
                    <ListGroupItem>Item 5</ListGroupItem>
                    <ListGroupItem>Item 6</ListGroupItem>
                  </ListGroup>
                </Route>
              </Switch>
            </Container>
          </Col>
          <Col sm="12" md="9" lg="10" id="content">
            <Container fluid>
              <Row>
                <Switch>
                  <Route path="/recipes"><Recipes /></Route>
                  <Route exact path="/">Content</Route>
                </Switch>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
