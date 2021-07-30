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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const countryCodes = [
  { value: "", label: "Select" },
  { value: "91", label: "+91" },
  { value: "1", label: "+1" },
];

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Please enter user name").min(2, "Too Short! Atleast 2 letters.").max(50, "Too Long! Atmost 50 letters."),
  email: Yup.string().required("Please enter email address").email("Invalid email format").max(50, "Too Long! Atmost 50 letters."),
  //country_code: Yup.string().required("Please select country code"),
  phone: Yup.string().required("Please enter phone number").matches(phoneRegExp, "Phone number is not valid").min(7, "Too Short! Atleast 7 letters.").max(15, "Too Long! Atmost 15 letters."),
  user_image: Yup.mixed().test("fileType", "Invalid File Format", (value) => {
    if (value && value != "") {
      return value && SUPPORTED_FORMATS.includes(value.type);
    } else {
      return true;
    }
  }),
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      country_code: "91",
      phone: "",
      user_image: undefined,
      image_preview: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
  }

  dataRender = async () => {
    let path = ApiRoutes.ADMIN_GET_PROFILE;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          country_code: res.data.country_code,
          phone: res.data.phone_no,
          image_preview: res.data.user_image_thumb_url,
          isLoading: true,
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("username", inputValues.username);
    formData.append("email", inputValues.email);
    formData.append("country_code", inputValues.country_code);
    formData.append("phone", inputValues.phone);
    formData.append("user_image", inputValues.user_image);

    let path = ApiRoutes.ADMIN_UPDATE_PROFILE;
    const res = await Http("PUT", path, formData);

    if (res.status == 200) {
      // Update local storage data
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: res.data.username,
          user_image_url: res.data.user_image_url,
          user_image_thumb_url: res.data.user_image_thumb_url,
        })
      );

      NotificationManager.success(res.message, "Success!", 3000);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.profile" match={this.props.match} />
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
                    username: this.state.username,
                    email: this.state.email,
                    country_code: this.state.country_code,
                    phone: this.state.phone,
                    address: this.state.address,
                    user_image: undefined,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>User Name</Label>
                            <Field className="form-control" name="username" type="text" />
                            {errors.username && touched.username ? <div className="invalid-feedback d-block">{errors.username}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Email</Label>
                            <Field className="form-control" name="email" type="email" />
                            {errors.email && touched.email ? <div className="invalid-feedback d-block">{errors.email}</div> : null}
                          </FormGroup>
                        </Colxx>
                        {/* <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Country Code</Label>
                              <select
                                name="country_code"
                                className="form-control"
                                value={values.country_code}
                                onChange={handleChange}
                              >
                                {countryCodes.map((item, index) => {
                                  return (
                                    <option key={index} value={item.value}>
                                      {item.label}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.country_code && touched.country_code ? (
                                <div className="invalid-feedback d-block">
                                  {errors.country_code}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx> */}
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Phone</Label>
                            <Field className="form-control" name="phone" type="text" />
                            {errors.phone && touched.phone ? <div className="invalid-feedback d-block">{errors.phone}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Profile Image</Label>
                            <Field
                              className="form-control"
                              name="user_image"
                              type="file"
                              value={this.state.user_image}
                              onChange={(event) => {
                                setFieldValue("user_image", event.currentTarget.files[0]);
                              }}
                            />
                            {errors.user_image && touched.user_image ? <div className="invalid-feedback d-block">{errors.user_image}</div> : null}
                          </FormGroup>
                          <img alt={this.state.username} src={this.state.image_preview} className="img-thumbnail border-0 list-thumbnail align-self-center image-preview" />
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
export default injectIntl(Profile);
