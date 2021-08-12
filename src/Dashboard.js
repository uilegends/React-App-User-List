import React, { Component } from "react";
import axios from "axios";
import Postlist from "./Postlist";
export class Dashboard extends Component {
  // Set State for Users
  state = {
    users: [],
    selectedUser: "",
  }; // Loads as component call
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      // Update State for Users
      this.setState({
        users: result.data,
        selectedUser: result.data[0],
      });
    });
  }

  changeSelectedUser = (user) => {
    this.setState({ selectedUser: user });
  };
  // Render when component loads
  render() {
    const { users, selectedUser } = this.state;
    return (
      <div className="container">
        <div className="row">
          <section className="col-sm">
            {users.length === 0 ? (
              "Loading..."
            ) : (
              <ul className="list-group">
                {users.map((user, index) => {
                  return (
                    <li
                      key={index}
                      className={`list-group-item ${
                        user.id === selectedUser.id ? "active" : ""
                      }`}
                      onClick={() => {
                        this.changeSelectedUser(user);
                      }}
                    >
                      {user.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          <section className="col-md">
            {selectedUser !== null && <Postlist user={selectedUser} />}
          </section>
        </div>
      </div>
    );
  }
}

export default Dashboard;
