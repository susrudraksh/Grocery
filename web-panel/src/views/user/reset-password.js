import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { resetPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";

const FormSchema = Yup.object().shape({
  otp_number: Yup.string().required("Please enter your OTP").min(4, "It should have 4 letters").max(4, "It should have 4 letters"),
  new_password: Yup.string().required("Please enter your new password").min(6, "Too Short! Atleast 6 letters.").max(20, "Too Long! Atmost 20 letters."),
  confirm_password: Yup.string()
    .required("Please confirm your new password")
    .min(6, "Too Short! Atleast 6 letters.")
    .max(20, "Too Long! Atmost 20 letters.")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.location.state ? this.props.location.state.email : null,
      view_otp_number: this.props.location.state ? this.props.location.state.otp_number : null,
      user_id: this.props.location.state ? this.props.location.state.user_id : null,
      new_password: "",
      confirm_password: "",
      otp_number: "",
      otp_for: "forgot_password",
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    if (!this.props.location.state) {
      this.props.history.push("/user/forgot-password");
    }
  }

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("email", inputValues.email);
    formData.append("user_id", inputValues.user_id);
    formData.append("new_password", inputValues.new_password);
    formData.append("otp_number", inputValues.otp_number);
    formData.append("otp_for", inputValues.otp_for);

    let path = ApiRoutes.ADMIN_UPDATE_FORGET_PASSWORD;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push("/user/login");
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

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
                <IntlMessages id="panel-otp-verify-text" />
                {" (OTP: " + this.state.view_otp_number + ")"}
              </p>
            </div> */}
            <div className="w-100 form-side p-5">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.reset-password" />
              </CardTitle>

              <Formik
                enableReinitialize
                initialValues={{
                  email: this.state.email,
                  user_id: this.state.user_id,
                  otp_number: this.state.otp_number,
                  new_password: this.state.new_password,
                  confirm_password: this.state.confirm_password,
                  otp_for: this.state.otp_for,
                }}
                validationSchema={FormSchema}
                onSubmit={this.handleSubmit}
              >
                {({ handleSubmit, setFieldValue, setFieldTouched, values, errors, touched, isSubmitting }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>OTP Number</Label>
                      <Field className="form-control" name="otp_number" type="text" />
                      {errors.otp_number && touched.otp_number && <div className="invalid-feedback d-block">{errors.otp_number}</div>}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>New Password</Label>
                      <Field className="form-control" name="new_password" type="password" />
                      {errors.new_password && touched.new_password && <div className="invalid-feedback d-block">{errors.new_password}</div>}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>Confirm Password</Label>
                      <Field className="form-control" name="confirm_password" type="password" />
                      {errors.confirm_password && touched.confirm_password && <div className="invalid-feedback d-block">{errors.confirm_password}</div>}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/forgot-password`}>Change Email?</NavLink>
                      <Button color="primary" type="submit" className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`} size="lg">
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.reset-password-button" />
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
  const { newPassword, resetPasswordCode, loading, error } = authUser;
  return { newPassword, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPassword);
