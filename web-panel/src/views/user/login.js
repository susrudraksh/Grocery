import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format"),
    //.max(50, "Too Long! Atmost 50 letters."),
  password: Yup.string()
    .required("Please enter your password"),
    // .min(6, "Too Short! Atleast 6 letters.")
    // .max(20, "Too Long! Atmost 20 letters."),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit = async (inputValues) => {
  //   let formData = new FormData();
  //   formData.append("username", inputValues.email);
  //   formData.append("password", inputValues.password);

  //   let path = ApiRoutes.ADMIN_LOGIN;
  //   const res = await Http("POST", path, formData);

  //   if (res.status == "success") {
  //     localStorage.setItem("user_id", res.data._id);
  //     this.props.user = res.data._id;
  //   } else {
  //     NotificationManager.error(res.message, "Error!", 3000);
  //   }
  // };

  handleSubmit = (inputValues) => {
    if (!this.props.loading) {
      if (inputValues.email !== "" && inputValues.password !== "") {
        this.props.loginUser(inputValues, this.props.history);
      }
    }
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }
  }

  render() {
    return (
      <Row className="h-100 justify-content-center">
        <Colxx xxs="12" md="5" className="mx-auto my-auto">
          <Card className="auth-card">
            {/* <div className="position-relative image-side ">
              <p className="text-black h2">
                <IntlMessages id="panel-heading" />
              </p>
              <p className="black mb-0">
                <IntlMessages id="panel-login-text" />
              </p>
              <img />
            </div> */}
            <div className="w-100 form-side p-5">
              <div className="text-center">
                <NavLink to={`/`} className="white logoDisplay">
                  <span className="logo-single" />
                  {/* <h1 style={{ color: "black" }}>ATHWAS</h1> */}
                </NavLink>
              </div>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
                <p className="black mt-2 mb-5">
                  <span>Please use your credentials to login.</span>
                </p>
              </CardTitle>

              <Formik
                enableReinitialize
                initialValues={{
                  email: this.state.email,
                  password: this.state.password,
                }}
                validationSchema={FormSchema}
                onSubmit={this.handleSubmit}
              >
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup className="form-group has-float-label">
                        <Label>Email</Label>
                        <Field
                          className="form-control"
                          name="email"
                          type="text"
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.password" />
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/user/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>

                        <Button
                          color="primary"
                          type="submit"
                          className={`btn-shadow btn-multiple-state ${
                            this.props.loading ? "show-spinner" : ""
                            }`}
                          size="lg"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.login-button" />
                          </span>
                        </Button>
                      </div>
                    </Form>
                  )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
