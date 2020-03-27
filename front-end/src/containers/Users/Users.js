import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/Modal/Modal";
import User from "../../components/User/User";
import UserForm from "../../components/User/UserEdit/UserForm";
import Button from "../../components/UI/Button/Button";
import Paginator from "../../components/UI/Paginator/Paginator";
class Users extends Component {
  state = {
    users: [],
    show: false,
    addUser: false,
    editPost: null,
    totalUsers: 0,
    postPage: 1,
    userLoading: false,
    deleteConfirm: false
  };

  componentDidMount() {
    this.loadedPosts();
  }
  // fetching users from databse
  loadedPosts = direction => {
    // pagination logic 
    if (direction) {
      this.setState({ postsLoading: true, users: [] });
    }
    let page = this.state.postPage;
    if (direction === "next") {
      page++;
      this.setState({ postPage: page });
    }
    if (direction === "previous") {
      page--;
      this.setState({ postPage: page });
    }
    //fetching data from DB depending on page no.
    fetch("http://localhost:3005/admin/users?page=" + page)
      .then(result => {
        if (result.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        return result.json();
      })
      .then(userData => {
        this.setState({
          users: userData.users,
          totalUsers: userData.totalItems,
          postsLoading: false
        });
      })
      .catch(error => console.log(error));
  };

  // if user starts adding user
  addUserHandler = () => {
    this.setState({ addUser: true });
  };

  // user cancel the add user modal
  editCancelhandler = () => {
    this.setState({ addUser: false });
  };

  // if editing is being done then getting the user whic to edit based on userID
  startEditUserHandler = userId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.users.find(u => u.id === userId) };
      // console.log(loadedPost)
      return {
        addUser: true,
        editPost: loadedPost
      };
    });
  };

  // methhod when editing or adding user has been done
  // GET or POST request will be called based on the property if editPost is there or not
  finisedEditHandler = userData => {
    this.setState({ addUser: true });
    let url = "http://localhost:3005/admin/user";
    let method = "POST";
    if (this.state.editPost) {
      url = "http://localhost:3005/admin/user/" + this.state.editPost.id;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        zipCode: userData.zipCode,
        message: userData.message,
        country: userData.country,
        gender: userData.gender
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      // throw error if any
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      //setting user values
      .then(resData => {
        const user = {
          id: resData.id,
          fullName: resData.fullName,
          email: resData.email,
          zipCode: resData.zipCode,
          message: resData.message,
          country: resData.country,
          gender: resData.gender
        };

        //setting state
        this.setState(prevState => {
          let updatedUsers = [...prevState.users];
          if (prevState.editPost) {
            const postIndex = prevState.users.findIndex(
              u => u.id === prevState.editPost.id
            );
            updatedUsers[postIndex] = user;
          } else if (prevState.users.length < 2) {
            updatedUsers = prevState.users.concat(user);
          }
          //setting states value
          return {
            users: updatedUsers,
            isEdit: false,
            editPost: null,
            addUser: false
          };
        });
      })
      //catching errors if any
      .catch(err => {
        this.setState({
          isEdit: false,
          editPost: null
        });
      });
  };

  // request to delete user based on userID

  userDeleteHandler = userId => {
    this.setState({ userLoading: true, deleteConfirm: true });

    fetch("http://localhost:3005/admin/user/" + userId, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        const users = [...this.state.users]; //copy of current state
        const newUsers = users.filter(user => user.id !== userId); // deleting user with given id
        this.setState({ users: newUsers, userLoading: false }); // setting new state
      })
      .catch(err => {
        this.setState({ userLoading: false });
      });
  };
  // sort data by name in asec order
  sortByName = () => {
    let array = [...this.state.users];
    array.sort((a, b) =>
      a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0
    );
    this.setState({ users: array });
  };

  //sort by name in desc order
  sortByNameDesc = () => {
    let array = [...this.state.users];
    array.sort((a, b) =>
      a.fullName < b.fullName ? 1 : b.fullName < a.fullName ? -1 : 0
    );
    this.setState({ users: array });
  };

  filterNameHandler = event => {
    //const users = [...this.state.users];
    //   const newUsers = users.filter( user => user.fullName.localeCompare(event.target.value)===0);
    //   const newUsers = users.filter( user => user.fullName === event.target.value);

    // console.log(users);
    // this.setState({ users: newUsers });
    // console.log(this.state);
  };
  // conditonally rendering user edit form
  render() {
    let user = null;
    if (this.state.addUser) {
      user = (
        <UserForm
          editCancel={this.editCancelhandler}
          onFinishedEdit={this.finisedEditHandler}
        />
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.addUser} modalClosed={this.editCancelHandler}>
          {user}
        </Modal>
        <Button btnType="AddUser" clicked={this.addUserHandler}>
          Add User
        </Button>
        <Button btnType="AddUser" clicked={() => this.sortByName()}>
          Sort By Name (Asec)
        </Button>
        <Button btnType="AddUser" clicked={() => this.sortByNameDesc()}>
          Sort By Name (Desc)
        </Button>
        <div style={{ width: "10%", margin: "auto" }}>
          <input
            id="filter"
            name="filter"
            onChange={this.filterNameHandler}
          ></input>
          <strong>Enter Name</strong>
        </div>
        {!this.state.userLoading ? (
          <Paginator
            onPrevious={() => this.loadedPosts("previous")}
            onNext={() => this.loadedPosts("next")}
            lastPage={Math.ceil(this.state.totalUsers / 2)}
            currentPage={this.state.postPage}
          >
            {/* generating single user based on the user information */}
            {this.state.users.map(user => (
              <User
                key={user.id}
                fullName={user.fullName}
                email={user.email}
                zipCode={user.zipCode}
                message={user.message}
                country={user.country}
                gender={user.gender}
                onStartEdit={() => this.startEditUserHandler(user.id)}
                userDelete={() => this.userDeleteHandler(user.id)}
              />
            ))}
          </Paginator>
        ) : null}
      </Fragment>
    );
  }
}

export default Users;
