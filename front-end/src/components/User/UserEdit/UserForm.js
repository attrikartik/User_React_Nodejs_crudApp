import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import { Form, Input, Label, FormGroup, FormFeedback } from "reactstrap";
import { isEmail } from "validator";
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      fullName: "",
      email: "",
      zipCode: "",
      message: "",
      country: "",
    },
    gender:"",
    errors: {},
    formIsValid: false
  });

  handleChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      },
      errors: {
        ...this.state.errors,
        [event.target.name]: ""
      }
    });
  };

  handleGenderChange = ( event ) => {
    console.log(event.target)
      this.setState({
        ...this.state,
        [event.target.name]:event.target.value
      })
  }

  validate = () => {
    const { data } = this.state;
    let errors = {};

    if (data.fullName === "") errors.fullName = "Enter Name";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Enter Email";
    if (data.zipCode === "") errors.zipCode = "Enter ZipCode";
    if (data.message === "") errors.message = "Add Message";
    if (this.state.gender === "") errors.gender = "Select Gender";
    if (data.country === "") errors.country = "Select Country";
    return errors;
  };
  // if editing of values is accepted then valid the user form
  acceptPostUserHandler = event => {
    event.preventDefault();
    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      const user = {
        fullName: this.state.data.fullName,
        email: this.state.data.email,
        zipCode: this.state.data.zipCode,
        message: this.state.data.message,
        country: this.state.data.country,
        gender: this.state.gender
      };
      console.log(user)
      // caling porps function from users and passing the user values from edit form
      this.props.onFinishedEdit(user);
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            invalid={errors.fullName ? true : false}
            name="fullName"
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.fullName}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            value={data.email}
            invalid={errors.email ? true : false}
            name="email"
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="text">ZipCode</Label>
          <Input
            id="zipCode"
            value={data.zipCode}
            type="text"
            name="zipCode"
            invalid={errors.zipCode ? true : false}
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.zipCode}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="message">Message</Label>
          <Input
            id="message"
            value={data.message}
            type="textarea"
            name="message"
            invalid={errors.message ? true : false}
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Input
            id="gender"
            value="male"
            type="radio"
            name="gender"
            invalid={errors.gender ? true : false}
            checked={this.state.gender === "male"}
            onChange={this.handleGenderChange}
          />
          Male
          <FormFeedback>{errors.gender}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Input
            id="gender"
            value="female"
            type="radio"
            name="gender"
            checked={this.state.gender === "female"}
            invalid={errors.gender ? true : false}
            onChange={this.handleGenderChange}
          />
          FeMale
          <FormFeedback>{errors.gender}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="country">Select Country</Label>
          <select
            type="select"
            name="country"
            id="country"
            value={data.country}
            onChange={this.handleChange}
          >
            <option>India</option>
            <option>Germany</option>
          </select>
        </FormGroup>
        <Button btnType="Danger" clicked={this.props.editCancel}>
          CANCEL
        </Button>
        <Button
          btnType="Success"
          clicked={event => this.acceptPostUserHandler(event)}
        >
          DONE
        </Button>
      </Form>
    );
  }
}

export default Register;
