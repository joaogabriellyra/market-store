import React from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends React.Component {
  renderItemsShoppingCart = () => {
    const { cartItems } = this.props;
    if (cartItems.length < 1) {
      return (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      );
    }
    return cartItems.map((cartItem, index) => {
      const { product, quantity } = cartItem;
      const { title, thumbnail } = product;
      return (
        <div key={ index }>
          <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <p data-testid="shopping-cart-product-quantity">
            {quantity}
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        {this.renderItemsShoppingCart()}
      </>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
