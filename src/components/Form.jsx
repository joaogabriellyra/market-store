import React from 'react';
import propTypes from 'prop-types';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      comment: '',
      rating: '',
      listComments: [],
      disabled: true,
      idProduct: '',
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

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id !== prevProps.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        idProduct: id,
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
    const { email, comment, rating, idProduct } = this.state;
    const resultComment = { email, comment, rating, idProduct };
    this.setState((old) => ({
      listComments: [...old.listComments, resultComment, idProduct],
    }), () => {
      const { listComments } = this.state;
      localStorage.setItem('comments', JSON.stringify(listComments));
    });
  }

  render() {
    const { email, comment, rating, listComments, disabled, idProduct } = this.state;
    const filtered = listComments.filter((item) => item.idProduct === idProduct);
    return (
      <>
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
            <option value="0" data-testid="0-rating">0</option>
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
            Avaliar
          </button>
        </form>
        {
          filtered.length <= 0 ? (<p>Não há nenhuma avaliação</p>)
            : (
              filtered.map((review, index) => (
                <div key={ index }>
                  <p>{ review.email }</p>
                  <p>{ review.rating }</p>
                  <p>{ review.comment }</p>
                </div>
              ))
            )
        }
      </>
    );
  }
}

Form.propTypes = {
  id: propTypes.string.isRequired,
};
