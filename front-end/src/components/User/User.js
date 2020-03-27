import React, { Component, Fragment } from "react";
import Button from "../UI/Button/Button";
import UserForm from "./UserEdit/UserForm";
import Modal from "../UI/Modal/Modal";
import style from "./User.module.css";

// class that will handle single user and return that user to Users containers
class User extends Component {
  state = {
    isEdit: false
  };

  // method to show modal and start editing of user details
  editStartHandler = () => {
    this.setState({ isEdit: true });
  };
  // method to hide modal and stop editing of user details
  editCancelhandler = () => {
    this.setState({ isEdit: false });
  };

  render() {
    // conditionally rendering modal for editing details
    let user = null;
    if (this.state.isEdit) {
      user = <UserForm editCancel={this.editCancelhandler} />;
    }

    return (
      <Fragment>
        <Modal show={this.state.isEdit} modalClosed={this.editCancelHandler}>
          {user}
        </Modal>
        {/* rendering user data on front end */}
        <article>
          <div className={style.UserDetails}>
            <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>ZipCode</th>
                <th>Message</th>
                <th>Country</th>
                <th>Gender</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{this.props.fullName}</td>
                <td>{this.props.email}</td>
                <td> {this.props.zipCode}</td>
                <td> {this.props.message}</td>
                <td>{this.props.country}</td>
                <td> {this.props.gender}</td>
              </tr>
              </tbody>
            
            </table>
            <Button btnType="Edit" clicked={this.props.onStartEdit}>
              Edit
            </Button>
            <Button btnType="Danger" clicked={this.props.userDelete}>
              Delete
            </Button>
          </div>
        </article>
      </Fragment>
    );
  }
}

export default User;
