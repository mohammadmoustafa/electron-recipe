import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import RecipeStore from './store/db';
const DB = new RecipeStore();

ReactDOM.render(
  <BrowserRouter>
    <App db={DB} />
  </BrowserRouter>, 
  document.getElementById('root'));