import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      comment: '',
      rating: '',
      listComments: [],
      disabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    const get = localStorage.getItem('comments');
    if (get !== null) {
      this.setState({
        listComments: JSON.parse(get),
      });
    }
  }

  validation = () => {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      return this.setState({
        disabled: false,
      });
    }
  }

  onHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.validation();
  }

  handleClick = () => {
    const { email, comment, rating } = this.state;
    const resultComment = { email, comment, rating };
    this.setState((old) => ({
      listComments: [...old.listComments, resultComment],
    }), () => {
      const { listComments } = this.state;
      localStorage.setItem('comments', JSON.stringify(listComments));
    });
  }

  render() {
    const { email, comment, rating, listComments, disabled, redirect } = this.state;
    return (
      <>
        {
          redirect ? <Redirect to="/product/:id" /> : ''
        }
        <form action="">
          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="text"
              name="email"
              placeholder="E-mail"
              value={ email }
              onChange={ this.onHandleChange }
              required
            />
          </label>

          <select name="rating" value={ rating } onChange={ this.onHandleChange }>
            <option value="1" data-testid="1-rating">1</option>
            <option value="2" data-testid="2-rating">2</option>
            <option value="3" data-testid="3-rating">3</option>
            <option value="4" data-testid="4-rating">4</option>
            <option value="5" data-testid="5-rating">5</option>
          </select>
          <label htmlFor="comment">
            <input
              data-testid="product-detail-evaluation"
              placeholder="Mensagem(opcional)"
              name="comment"
              value={ comment }
              onChange={ this.onHandleChange }
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            {' '}
            Avaliar
          </button>
        </form>
        {listComments.length > 0 && listComments.map((review, index) => (
          <div key={ index }>
            <p>{ review.email }</p>
            <p>{ review.rating }</p>
            <p>{ review.comment }</p>
          </div>
        ))}
      </>

    );
  }
}
