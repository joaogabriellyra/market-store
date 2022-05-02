import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {
  render() {
    const { produts, onClick } = this.props;
    return (
      <div className="container-products">
        {
          produts.map((product, index) => {
            const { id, title, thumbnail, price } = product;
            return (
              <div data-testid="product" key={ id }>
                <Link data-testid="product-detail-link" to={ `/product/${id}` }>
                  <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
                  <h3>{title}</h3>
                  <p>{price}</p>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ onClick }
                  id={ index }
                  name={ id }
                >
                  Adicionar ao carrinho!
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  produts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};
