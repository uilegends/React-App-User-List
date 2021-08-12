import React, { Component } from "react";
import axios from "axios";
import { externalUrl } from "./Constants";

class Postlist extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    const { user } = this.props;
    this.getUserpostsList(user.id);
  }

  getUserpostsList = (id) => {
    axios.get(`${externalUrl}=${id}`).then((result) => {
      this.setState({
        posts: result.data,
      });
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.id !== this.props.user.id) {
      this.getUserpostsList(this.props.user.id);
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts.map((post, index) => {
          return (
            <div key={post.id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Postlist;
