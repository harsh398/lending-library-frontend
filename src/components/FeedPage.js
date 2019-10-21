import React, { Component, Fragment } from "react";
import Post from "../components/Post";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={GET_BOOKS}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            );
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            );
          }

          return (
            <Fragment>
              <h1 className=" book ">All Books </h1>
              {data.books &&
                data.books.map(post => (
                  <Post key={post.id} post={post} refresh={() => refetch()} />
                ))}
              {this.props.children}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export const GET_BOOKS = gql`
  query MyQuery {
    books {
      author_id
      author_name
      id
      name
    }
  }
`;
