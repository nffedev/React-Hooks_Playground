import React from "react";

export default class UserPosts extends React.Component {
  state = { posts: null };

  apis = {
    users: "https://jsonplaceholder.typicode.com/users",
    userPosts: "https://jsonplaceholder.typicode.com/posts?userId="
  };

  fetchUserPosts = userId => {
    fetch(`${this.apis.userPosts}${userId}`)
      .then(response => response.json())
      .then(postsJson => {
        // if user clicks away (component is unmounted), before response received, don't update state
        if (!this.__isUnmounted) this.setState({ postsJson });
      });
  };

  // fetches user's posts
  componentDidMount() {
    this.fetchUserPosts(this.props.user.id);
  }

  // used to determine if new user was chosen and get new posts if needed
  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.fetchUserPosts(this.props.user.id);
    }
  }

  componentWillUnmount() {
    this.__isUnmounted = true;
  }
}
