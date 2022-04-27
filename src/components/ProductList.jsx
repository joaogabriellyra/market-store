import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Title, thumbnail, price

export default class ProductList extends React.Component {
  render() {
    const { produts } = this.props;
    return (
      <div className="container-products">
        {
          produts.map((product) => {
            const { id, title, thumbnail, price } = product;
            return (
              <Link data-testid="product-detail-link" key={ id } to={ `/product/${id}` }>
                <div data-testid="product">
                  <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
                  <h3>{title}</h3>
                  <p>{price}</p>
                </div>
              </Link>
            );
          })
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  produts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
