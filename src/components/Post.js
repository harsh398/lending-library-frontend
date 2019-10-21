import React, { Component } from "react";

export default class Post extends Component {
  render() {
    let name = this.props.post.name;

    return (
      <div className="fields">
        <h2 className="f3 black-80 fw4 lh-solid">Name of the Book : {name}</h2>
        <p className="black-80 fw3">
          Author of the Book : {this.props.post.author_name}
        </p>
      </div>
    );
  }
}
