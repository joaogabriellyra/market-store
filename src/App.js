import React from 'react';
import './App.css';
import { getCategories } from './services/api';

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
    return (
      <div />
    );
  }
}

export default App;
