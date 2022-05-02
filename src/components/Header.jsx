import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    const { totalProducts, cartItems } = this.props;
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <span>Carrinho </span>
        {cartItems.length > 0
          && <span data-testid="shopping-cart-size">{totalProducts()}</span>}
      </Link>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  totalProducts: PropTypes.func.isRequired,
};
