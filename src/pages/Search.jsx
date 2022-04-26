import React from 'react';

export default class Search extends React.Component {
  render() {
    return (
      <main>
        <div>
          <form action="">
            <input type="text" />
          </form>
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </main>
    );
  }
}
