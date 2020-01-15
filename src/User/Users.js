import React, { useState, useEffect } from "react";
import { useRenderCount } from "../Hooks/useRenderCount";

const apis = {
  users: "https://jsonplaceholder.typicode.com/users",
  userPosts: "https://jsonplaceholder.typicode.com/posts?userId="
};
// Using React.memo will only cause a re-render if
// the child props change, when the parent renders
export const Users = React.memo(({ clickCount }) => {
  const [users, setUsers] = useState({ user: "", userList: [] });
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const generateRandomUserId = () => Math.floor(Math.random() * 10);

  useRenderCount();

  // fetches users on componentDidMount only
  useEffect(() => {
    let currentUsers = true;
    fetch(`${apis.users}`)
      .then(response => response.json())
      .then(usersJson => {
        if (currentUsers)
          setUsers(users => ({
            ...users,
            user: usersJson[0].name,
            userList: usersJson
          }));
      });
    return () => {
      currentUsers = false;
    };
  }, []);

  // DEMONSTRATE DEEP STATE UPDATE
  useEffect(() => {
    console.log("cDU: ", users);
  }, [users]);

  const fetchUserPosts = userId => {
    fetch(`${apis.userPosts}${userId}`)
      .then(response => response.json())
      .then(json => setPosts(json));
  };

  const changeUser = () => {
    const randomUserId = generateRandomUserId();
    clickCount();
    setUser(users.userList[randomUserId]);
  };

  useEffect(() => {
    if (user) fetchUserPosts(user.id);
  }, [user]);

  return (
    <>
      <h2>User Data</h2>
      <button onClick={() => changeUser()}>Change User</button>
      {user ? (
        <div>
          <h1>{`${user.name}`}</h1>
          <p>{`${user.company.catchPhrase}`}</p>
        </div>
      ) : null}
      {posts ? (
        <div>
          {posts.map(post => (
            <div key={post.id}>
              <h4>{`${post.title}`}</h4>
              <p>{`${post.body}`}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
});
