import React from 'react';
import PropTypes from 'prop-types';

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
              <div key={ id } data-testid="product">
                <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
                <h3>{title}</h3>
                <p>{price}</p>
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
};
