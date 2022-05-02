import React from 'react';
import PropTypes from 'prop-types';

// Componentes
import Header from '../components/Header';

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
    const { details } = this.state;
    const { cartItems, totalProducts } = this.props;
    return (
      <div>
        <Header cartItems={ cartItems } totalProducts={ totalProducts } />
        <div>
          <h2 data-testid="product-detail-name">
            {details.title}
          </h2>
          <img src={ details.thumbnail } alt={ `imagem do produto ${details.title}` } />
          <p>{`R$ ${details.price}`}</p>
          <p>{details.description}</p>
        </div>
        <div>
          <Form />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  totalProducts: PropTypes.func.isRequired,
};
