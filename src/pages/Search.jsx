import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <main>
        <div>
          <form action="">
            <input type="text" />
          </form>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          <section>
            {categories.map((element) => (
              <label htmlFor={ element.id } data-testid="category" key={ element.id }>
                {element.name}
                <input type="radio" id={ element.id } name="category" />
              </label>
            ))}
          </section>
        </div>
      </main>
    );
  }
}

Search.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
