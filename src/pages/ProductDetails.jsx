import React from 'react';
import PropTypes from 'prop-types';

// Funções
import { getProductsDetails } from '../services/api';
import Form from '../components/Form';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentDidMount = async () => {
    const { match: { params } } = this.props;
    const details = await getProductsDetails(params.id);
    this.setState({
      details: { ...details },
    });
  }

  // nome do produto, imagem, preço e especificação técnica

  render() {
    const { details: { title, thumbnail, price, description, id } } = this.state;
    const { addProductByDetails } = this.props;
    return (
      <div>
        <div>
          <h2 data-testid="product-detail-name">
            {title}
          </h2>
          <img src={ thumbnail } alt={ `imagem do produto ${title}` } />
          <p>{`R$ ${price}`}</p>
          <p>{description}</p>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ addProductByDetails }
          value={ id }
          name={ title }
        >
          Adicionar ao carrinho
        </button>
        <div>
          <Form />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  addProductByDetails: PropTypes.func.isRequired,
};
