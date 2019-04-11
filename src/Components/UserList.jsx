import React, { Component } from "react";
import { UserItem } from ".";
import { firebase } from "../Firebase";
import { db } from "../Firebase/firebase";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

export class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isActiveUser: "",
      userId: "",
    };
  }

  handleClick = userId => {
    this.setState({ isActiveUser: userId });
    this.props.getActiveUser(userId);
  };

  setAuthUser() {
    let uid;
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        uid = authUser.uid;
        this.setState(updateByPropertyName("userId", uid));
        //       console.log("User is present =>" + uid);
      } else {
        //      console.log("user is not present");
      }
    });
  }
  componentWillMount() {
    this.setAuthUser();
    const ref = db.ref("users");
    ref.on("value", usersnapshot => {
      let newUsers = [];
      usersnapshot.forEach(snapshot => {
        const key = snapshot.key;
        const val = snapshot.val();
        newUsers.push({
          userId: key,
          username: val["username"],
          email: val["email"],
        });
        //        console.log(key + "," + val["username"] + "," + val["email"]);
      });
      this.setState({ users: newUsers });
    });
  }

  render() {
    // if (this.state.users.length == 0) {
    //   return <h1>...Loading</h1>;
    // }
    const users = this.state.users;

    //    console.log(users);
    return (
      <div className="inbox_chat">
        {users.map(user => {
          // console.log(user.userId + " , " + user.username + " , " + user.email);
          return (
            <React.Fragment>
              {this.state.userId !== user.userId && (
                <UserItem
                  key={user.userId}
                  userId={user.userId}
                  username={user.username}
                  email={user.email}
                  isActive={user.userId === this.state.isActiveUser ? true : false}
                  onClick={this.handleClick}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
