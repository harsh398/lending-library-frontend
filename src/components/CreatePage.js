import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { GET_BOOKS } from "./FeedPage";
import Modal from "react-awesome-modal";
import {
  Link,
} from "react-router-dom";
class CreatePage extends Component {
  state = {
    name: "",
    author_name: "",
    visible: false
  };
  openModal() {
    this.setState({
      visible: true
    });
  }
  closeModal() {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <Mutation
        mutation={INSERT_BOOK_MUTATION}
        update={(cache, { data }) => {
          const { books } = cache.readQuery({ query: GET_BOOKS });
          cache.writeQuery({
            query: GET_BOOKS,
            data: { books: books.concat([data.insert_books]) }
          });
        }}
      >
        {(insert_books, { data, loading, error }) => {
          return (
            <div className="donate-page">
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const { name, author_name } = this.state;
                  await insert_books({
                    variables: { name, author_name }
                  });
                }}
              >
                <h1>Donate Books</h1>
                <h3>Book Name:</h3>
                <input
                  autoFocus
                  className="name-field"
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="Name of the Book"
                  type="text"
                />
                <br></br>
                <h3>Name of the Author:</h3>
                <textarea
                  className="author-field"
                  cols={30}
                  onChange={e => this.setState({ author_name: e.target.value })}
                  placeholder="Author's Name"
                  rows={2}
                />
                <br></br>
                <button
                  className={`donate-button`}
                  disabled={!this.state.author_name || !this.state.name}
                  type="submit"
                  onClick={() => this.openModal()}
                >
                  Donate Book
                </button>
                <Modal
                  visible={this.state.visible}
                  width="400"
                  height="300"
                  effect="fadeInUp"
                  onClickAway={() => this.closeModal()}
                >
                  <div>
                    <h1>Donation is Successful</h1>
                    <p>Thank you for Donation</p>
                    <button
                      className="cancel-button"
                      onClick={() => this.props.history.replace("/")}
                    >
                      Close
                    </button>
                  </div>
                </Modal><button className="cancel-button">
                <Link to="/" >
          Cancel
          </Link></button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const INSERT_BOOK_MUTATION = gql`
  mutation InsertBooksMutation($name: String!, $author_name: String!) {
    insert_books(objects: { author_name: $author_name, name: $name }) {
      affected_rows
      returning {
        author_name
        name
      }
    }

    insert_author(objects: { author_name: $author_name }) {
      affected_rows
      returning {
        author_name
      }
    }
  }
`;

export default withRouter(CreatePage);
