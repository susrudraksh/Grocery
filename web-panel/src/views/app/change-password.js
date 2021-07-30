import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";

const passwordRegExp = /[a-zA-Z]/;

const FormSchema = Yup.object().shape({
  old_password: Yup.string()
    .required("Please enter your old password")
    .min(6, "Too Short! Atleast 6 letters.")
    .max(20, "Too Long! Atmost 20 letters."),
  new_password: Yup.string()
    .required("Please enter your new password")
    .min(6, "Too Short! Atleast 6 letters.")
    .max(20, "Too Long! Atmost 20 letters."),
  //.matches(passwordRegExp, 'Password can only contain Latin letters.'),
  confirm_password: Yup.string()
    .required("Please confirm your new password")
    .min(6, "Too Short! Atleast 6 letters.")
    .max(20, "Too Long! Atmost 20 letters.")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: "",
      new_password: "",
      confirm_password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (inputValues, formOptions) => {
    let formData = new FormData();
    formData.append("old_password", inputValues.old_password);
    formData.append("new_password", inputValues.new_password);

    let path = ApiRoutes.ADMIN_CHANGE_PASSWORD;
    const res = await Http("PUT", path, formData);

    if (res.status == 200) {
      NotificationManager.success(res.message, "Success!", 3000);
      formOptions.resetForm();
    } else {
      formOptions.setFieldError("old_password", res.message);
      NotificationManager.error(res.message, "Error!", 3000);
    }
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
              heading="heading.change-password"
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" sm="12">
            <Card>
              <CardBody>
                <Formik
                  enableReinitialize
                  initialValues={{
                    old_password: this.state.old_password,
                    new_password: this.state.new_password,
                    confirm_password: this.state.confirm_password,
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
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Old Password</Label>
                              <Field
                                className="form-control"
                                name="old_password"
                                type="password"
                              />
                              {errors.old_password && touched.old_password ? (
                                <div className="invalid-feedback d-block">
                                  {errors.old_password}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>New Password</Label>
                              <Field
                                className="form-control"
                                name="new_password"
                                type="password"
                              />
                              {errors.new_password && touched.new_password ? (
                                <div className="invalid-feedback d-block">
                                  {errors.new_password}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Confirm Password</Label>
                              <Field
                                className="form-control"
                                name="confirm_password"
                                type="password"
                              />
                              {errors.confirm_password &&
                                touched.confirm_password ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.confirm_password}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>

                        <Button color="primary" type="submit">
                          <IntlMessages id="button.save" />
                        </Button>
                      </Form>
                    )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(ChangePassword);
