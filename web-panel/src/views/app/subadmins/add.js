import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Input, Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const lettersRegex = /^\S+$/;

const countryCodes = [
  { value: "", label: "Select" },
  { value: "91", label: "+91" },
  { value: "1", label: "+1" },
];

const FormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter user name")
    .matches(lettersRegex, "Please input alphabet characters only")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(50, "Too Long! Atmost 50 letters."),
  email: Yup.string().required("Please enter email address").email("Invalid email format").max(50, "Too Long! Atmost 50 letters."),
  country_code: Yup.string().required("Please select country code"),
  phone: Yup.string().required("Please enter phone number").matches(phoneRegExp, "Phone number is not valid").min(7, "Too Short! Atleast 7 letters.").max(15, "Too Long! Atmost 15 letters."),
  password: Yup.string().required("Please enter a password").min(6, "Too Short! Atleast 6 letters.").max(20, "Too Long! Atmost 20 letters."),
  warehouse_id: Yup.string().required("Please select a warehouse"),
  user_image: Yup.mixed().test("fileType", "Invalid File Format", (value) => {
    if (value && value != "") {
      return value && SUPPORTED_FORMATS.includes(value.type);
    } else {
      return true;
    }
  }),
  user_permissions: Yup.array().required("Please choose a permission"),
});

class AddSubadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      country_code: "91",
      phone: "",
      password: "",
      warehouse_id: "",
      user_image: undefined,
      user_permissions: {},

      permissionsList: [],
      warehousesList: [{ _id: "", name: "Select" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getPermissionsList();
    this.getWarehouses();
  }

  getPermissionsList = async () => {
    this.state.isLoading = true;

    let path = ApiRoutes.GET_PERMISSIONS;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          permissionsList: [...this.state.permissionsList, ...res.data.permissionsData],
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  handleChangePermissions = (e) => {
    var checked_value = e.target.value;
    var is_checked = e.target.checked;
    var module_slug = e.target.getAttribute("data-module");
    var user_permissions = this.state.user_permissions;

    // if any permission is checked
    if (is_checked) {
      if (!user_permissions[module_slug]) {
        user_permissions[module_slug] = [];
      }

      user_permissions[module_slug].push(checked_value);
    } else {
      let index = user_permissions[module_slug].indexOf(checked_value);
      user_permissions[module_slug].splice(index, 1);

      if (user_permissions[module_slug].length == 0) {
        delete user_permissions[module_slug];
      }
    }

    this.setState({ user_permissions: user_permissions });
  };

  getWarehouses = async () => {
    var warehousesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_WAREHOUSES + "?page_no=1&limit=1000";
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          warehousesList: [...warehousesList, ...res.data.docs],
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
    formData.append("password", inputValues.password);
    formData.append("warehouse_id", inputValues.warehouse_id);
    formData.append("user_image", inputValues.user_image);
    formData.append("user_permissions", JSON.stringify(this.state.user_permissions));

    let path = ApiRoutes.CREATE_SUBADMIN;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push("/app/subadmins");
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.add-subadmin" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" sm="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    username: this.state.username,
                    email: this.state.email,
                    country_code: this.state.country_code,
                    phone: this.state.phone,
                    password: this.state.password,
                    warehouse_id: this.state.warehouse_id,
                    user_image: this.state.user_image,
                    user_permissions: ["unicorns"],
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
                        {/* <Colxx xxs="12" sm="2">
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
                            <Label>Password</Label>
                            <Field className="form-control" name="password" type="password" />
                            {errors.password && touched.password ? <div className="invalid-feedback d-block">{errors.password}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Assign Warehouse</Label>
                            <select
                              name="warehouse_id"
                              className="form-control"
                              value={values.warehouse_id}
                              onChange={(event) => {
                                setFieldValue("warehouse_id", event.target.value);
                              }}
                            >
                              {this.state.warehousesList.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.warehouse_id && touched.warehouse_id ? <div className="invalid-feedback d-block">{errors.warehouse_id}</div> : null}
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
                        </Colxx>

                        <Colxx xxs="12" sm="12">
                          <Label>
                            <h3>Permissions</h3>
                          </Label>
                          {this.state.permissionsList.map((module, index) => (
                            <Colxx md="12" key={index}>
                              <Row>
                                <Colxx md="3">
                                  <Label>{module.module_name}</Label>
                                </Colxx>
                                <Colxx md="9">
                                  {module.permissions.map((permission_type, index) => (
                                    <FormGroup check inline key={index}>
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) => {
                                          this.handleChangePermissions(e);
                                        }}
                                        id={module.module_name + "_" + permission_type.slug}
                                        name={module.module_slug}
                                        data-module={module.module_slug}
                                        value={permission_type.slug}
                                      />

                                      <Label className="form-check-label" check htmlFor={module.module_name + "_" + permission_type.slug}>
                                        {permission_type.title}
                                      </Label>
                                    </FormGroup>
                                  ))}
                                </Colxx>
                              </Row>
                            </Colxx>
                          ))}
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
export default injectIntl(AddSubadmin);
