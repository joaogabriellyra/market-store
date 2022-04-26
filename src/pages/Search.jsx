import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
  render() {
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
      </main>
    );
  }
}
