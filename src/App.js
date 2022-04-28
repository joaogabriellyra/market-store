import React from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { getCategories } from './services/api';

// componentes:
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      cartItems: [],
    };
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({ categories: result });
  }

  render() {
    const { categories, cartItems } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Search
              categories={ categories }
              cartItems={ cartItems }
            />) }
          />
          <Route path="/cart" render={ () => <ShoppingCart cartItems={ cartItems } /> } />
          <Route
            path="/product/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
