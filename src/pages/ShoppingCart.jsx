import React from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends React.Component {
  renderItemsShoppingCart = () => {
    const { cartItems, modifyQuantity, onRemove } = this.props;
    if (cartItems.length < 1) {
      return (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      );
    }
    return cartItems.map((cartItem, index) => {
      const { id, product, quantity } = cartItem;
      const { title, thumbnail } = product;
      return (
        <div key={ index }>
          <button type="button" value={ id } onClick={ onRemove }>X</button>
          <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            name="decrease-quantity"
            onClick={ modifyQuantity }
            value={ id }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">
            {quantity}
          </p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            name="increase-quantity"
            onClick={ modifyQuantity }
            value={ id }
            disabled={ !cartItem.stockAvailable }
          >
            +
          </button>
        </div>
      );
    });
  };

  onRenderTotalPayable = () => {
    const { totalPayable } = this.props;
    return (
      <div>
        <p>{ `Valor Total da Compra R$ ${totalPayable}` }</p>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <h2>Meu Carrinho de Compras</h2>
        {this.renderItemsShoppingCart()}
        {cartItems.length > 0 && this.onRenderTotalPayable()}
      </>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  modifyQuantity: PropTypes.func.isRequired,
  totalPayable: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};
