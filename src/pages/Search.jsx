import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Componentes
import ProductList from '../components/ProductList';

// funções
import * as api from '../services/api';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      category: '',
      productSearch: [],
    };
  }

  addProduct = (productItem, idProduct) => {
    const { cartItems } = this.props;
    const product = {
      id: idProduct,
      product: productItem,
      quantity: 1,
    };
    cartItems.push(product);
  }

  addItemToCart = ({ target }) => {
    const idProduct = target.name;
    const { productSearch } = this.state;
    const { cartItems } = this.props;
    const itemNumber = target.id;
    if (cartItems.length <= 0) {
      this.addProduct(productSearch[itemNumber], idProduct);
    } else {
      const verify = cartItems.some(({ id }) => id === idProduct);
      if (!verify) {
        this.addProduct(productSearch[itemNumber], idProduct);
      } else {
        cartItems.forEach((item) => {
          const { id } = item;
          if (id === idProduct) item.quantity += 1;
        });
      }
    }
  }

  onFetchProducts = async () => {
    const { value, category } = this.state;
    const search = await api.getProductsFromCategoryAndQuery(category, value);
    return search;
  }

  onSearchProduct = async () => {
    const search = await this.onFetchProducts();
    const { results } = search;
    this.setState({
      productSearch: results,
    });
  }

  onChangeHandle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, async () => {
      if (name === 'category') {
        this.onSearchProduct();
      }
    });
  }

  onClickButton = async () => {
    this.onSearchProduct();
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
    return <ProductList produts={ productSearch } onClick={ this.addItemToCart } />;
  }

  render() {
    const { value } = this.state;
    const { categories } = this.props;
    return (
      <main>
        <Link to="/cart" />
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
        <div>
          <section>
            {categories.map((element) => (
              <label htmlFor={ element.id } data-testid="category" key={ element.id }>
                {element.name}
                <input
                  type="radio"
                  id={ element.id }
                  name="category"
                  value={ element.id }
                  onChange={ this.onChangeHandle }
                />
              </label>
            ))}
          </section>
        </div>
        { this.onDrawComponents() }
      </main>
    );
  }
}

Search.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
