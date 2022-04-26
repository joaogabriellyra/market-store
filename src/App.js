import React from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { getCategories } from './services/api';

// componentes:
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const result = await getCategories();
    this.setState({ categories: result });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route path="/cart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
