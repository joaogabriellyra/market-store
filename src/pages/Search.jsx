import React from 'react';
import { Link } from 'react-router-dom';

// Componentes
import ProductList from '../components/ProductList';

// funções
import * as api from '../services/api';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      categoryId: '',
      productSearch: [],
    };
  }

  onFetchProducts = async () => {
    const { value, categoryId } = this.state;
    const search = await api.getProductsFromCategoryAndQuery(categoryId, value);
    return search;
  }

  onChangeHandle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  onClickButton = async () => {
    const search = await this.onFetchProducts();
    const { results } = search;
    this.setState({
      productSearch: results,
    });
  }

  onDrawComponents = () => {
    const { productSearch } = this.state;
    if (productSearch.length <= 0) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    return <ProductList produts={ productSearch } />;
  }

  render() {
    const { value } = this.state;
    return (
      <main>
        <div>
          <form action="">
            <input
              data-testid="query-input"
              type="text"
              name="value"
              value={ value }
              onChange={ this.onChangeHandle }
            />
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.onClickButton }
            >
              pesquisar
            </button>
          </form>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </div>
        { this.onDrawComponents() }
      </main>
    );
  }
}
