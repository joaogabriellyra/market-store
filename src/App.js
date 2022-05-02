import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { getCategories } from './services/api';

// componentes:
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      cartItems: [],
      productSearch: [],
      totalPayable: 0,
    };
  }

  async componentDidMount() {
    const result = await getCategories();
    const getItens = JSON.parse(localStorage.getItem('shoppingCart'));
    if (getItens !== null) {
      this.setState({
        categories: result,
        cartItems: getItens,
      }, async () => {
        await this.onCalculateTotalPayable();
      });
    } else {
      this.setState({
        categories: result,
      });
    }
  }

  onSetLocalStore = () => {
    const { cartItems } = this.state;
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }

  addProductSearch = (productList) => {
    this.setState({ productSearch: productList });
  }

  onCalculateTotalPayable = async () => {
    const { cartItems } = this.state;
    let totalSum = 0;
    cartItems.forEach((item) => {
      const { product: { price }, quantity } = item;
      totalSum += (price * quantity);
    });
    this.setState({ totalPayable: totalSum });
  }

  addProduct = (productItem, idProduct) => {
    const product = {
      id: idProduct,
      product: productItem,
      quantity: 1,
      stockAvailable: true,
    };
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, product],
    }), async () => {
      await this.onCalculateTotalPayable();
      await this.onSetLocalStore();
    });
  }

  onVerifyQuantity = (idProduct) => {
    const { cartItems } = this.state;
    cartItems.forEach((item) => {
      const { id, product } = item;
      const availableQuantity = product.available_quantity;
      if (id === idProduct) {
        item.quantity += 1;
        if (item.quantity >= availableQuantity) {
          item.stockAvailable = false;
        }
      }
      this.setState({}, async () => {
        await this.onCalculateTotalPayable();
        await this.onSetLocalStore();
      });
    });
  }

  addProductByDetails = ({ target }) => {
    const { productSearch, cartItems } = this.state;
    const idProduct = target.value;
    const verify = cartItems.some(({ id }) => id === idProduct);
    if (!verify) {
      productSearch.forEach((item) => {
        const { id } = item;
        if (id === idProduct) {
          const product = {
            id,
            product: item,
            quantity: 1,
            stockAvailable: true,
          };
          this.setState((prevState) => ({
            cartItems: [...prevState.cartItems, product],
          }), async () => {
            await this.onCalculateTotalPayable();
            await this.onSetLocalStore();
          });
        }
      });
    } else {
      this.onVerifyQuantity(idProduct);
    }
  }

  addItemToCart = ({ target }) => {
    const idProduct = target.name;
    const { productSearch } = this.state;
    const { cartItems } = this.state;
    const itemNumber = target.id;
    if (cartItems.length <= 0) {
      this.addProduct(productSearch[itemNumber], idProduct);
    } else {
      const verify = cartItems.some(({ id }) => id === idProduct);
      if (!verify) {
        this.addProduct(productSearch[itemNumber], idProduct);
      } else {
        this.onVerifyQuantity(idProduct);
      }
    }
  }

  onRemoveItemToCart = ({ target }) => {
    const { cartItems } = this.state;
    const idProduct = target.value;
    const newCartItems = cartItems.filter(({ id }) => id !== idProduct);
    this.setState({
      cartItems: newCartItems,
    }, async () => {
      await this.onSetLocalStore();
    });
  }

  onModifyQuantity = (event) => {
    const { cartItems } = this.state;
    const idProduct = event.target.value;
    const { name } = event.target;
    if (name === 'decrease-quantity') {
      cartItems.forEach((item) => {
        const { id } = item;
        if (id === idProduct && item.quantity > 0) item.quantity -= 1;
        item.stockAvailable = true;
      });
    }
    if (name === 'increase-quantity') {
      cartItems.forEach((item) => {
        const { id, product } = item;
        const availableQuantity = product.available_quantity;
        if (id === idProduct) {
          if (item.quantity < availableQuantity) {
            item.quantity += 1;
          } else if (item.quantity >= availableQuantity) {
            item.stockAvailable = false;
          }
        }
      });
    }
    this.onCalculateTotalPayable();
    this.setState({});
    this.onSetLocalStore();
  }

  onCalculateTotalProducts = () => {
    const { cartItems } = this.state;
    let sumTotal = 0;
    cartItems.forEach((item) => {
      const { quantity } = item;
      sumTotal += quantity;
    });
    return sumTotal;
  }

  render() {
    const { categories, cartItems, totalPayable } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Search
              categories={ categories }
              cartItems={ cartItems }
              productList={ this.addProductSearch }
              addItem={ this.addItemToCart }
              totalProducts={ this.onCalculateTotalProducts }
            />) }
          />
          <Route
            path="/cart"
            render={ () => (<ShoppingCart
              cartItems={ cartItems }
              modifyQuantity={ this.onModifyQuantity }
              totalPayable={ totalPayable }
              onRemove={ this.onRemoveItemToCart }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              cartItems={ cartItems }
              addProductByDetails={ this.addProductByDetails }
              totalProducts={ this.onCalculateTotalProducts }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
