import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email address").email("Invalid email format").max(50, "Too Long! Atmost 50 letters."),
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("email", inputValues.email);
    formData.append("otp_for", "forgot_password");

    let path = ApiRoutes.ADMIN_RESEND_OTP;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);

        // redirect to reset password page
        this.props.history.push({
          pathname: "/user/reset-password",
          state: {
            user_id: res.data._id,
            email: res.data.email,
            otp_number: res.data.otp_number,
          },
        });
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
                <IntlMessages id="panel-reset-password-text" />
              </p>
            </div> */}
            <div className="w-100 form-side p-5">
              <div className="text-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-single" />
                </NavLink>
              </div>
              <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle>

              <Formik
                enableReinitialize
                initialValues={{
                  email: this.state.email,
                }}
                validationSchema={FormSchema}
                onSubmit={this.handleSubmit}
              >
                {({ handleSubmit, setFieldValue, setFieldTouched, values, errors, touched, isSubmitting }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field className="form-control" name="email" type="text" />
                      {errors.email && touched.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/login`}>
                        <IntlMessages id="user.back-to-login" />
                      </NavLink>
                      <Button color="primary" type="submit" className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`} size="lg">
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="button.submit" />
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPassword,
})(ForgotPassword);
