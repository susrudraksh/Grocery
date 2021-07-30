import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import Select, { components } from "react-select";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { NotificationManager } from "../../../components/common/react-notifications";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import createClass from "create-react-class";
import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

const FormSchema = Yup.object().shape({
  notification_text: Yup.string().required("Please enter notfication text").min(2, "Too Short! Atleast 2 letters.").max(100, "Too Long! Atmost 100 letters."),
  sent_to: Yup.string().required("Please select an option"),
  user_type: Yup.mixed().required("Please select an option"),
  sent_to_users: Yup.string(),
});

class Notifications extends Component {
  constructor(props) {
    super(props);

    var userData = JSON.parse(localStorage.getItem("userData")) || {};
    var login_id = localStorage.getItem("user_id") || {};

    this.state = {
      userData: userData,
      login_id: login_id,
      notification_text: "",
      sent_to: "all_users",
      sent_to_users: [],

      sendToOpts: [
        { value: "all_users", label: "All Users" },
        { value: "selected_users", label: "Selected Users" },
      ],
      daysFilter: [
        { value: "", label: "Select" },
        { value: "1", label: "Last 30 Days" },
        { value: "2", label: "Last 60 Days" },
        { value: "3", label: "Last 90 Days" },
      ],
      orderFilter: [
        { value: "", label: "Select" },
        { value: "20", label: "20 K" },
        { value: "40", label: "40 K" },
      ],
      activeInactive: [
        { value: "", label: "Select" },
        { value: "1", label: "Active" },
        { value: "0", label: "Inactive" },
      ],
      userType: [
        { value: "", label: "Select" },
        { value: "3", label: "Customer" },
        { value: "4", label: "Driver" },
      ],
      usersList: [],
      selectedUsers: [],
      showUsersField: false,
      usersStatus: 1,
      user_type: "",
      daysCount: 1,
      orderAmount: 20,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  onChangeSendTo = (value) => {
    if (value == "all_users") {
      this.setState({
        showUsersField: false,
        selectedUsers: [],
      });
    } else {
      this.getUsersList();
      this.setState({ showUsersField: true });
    }
  };

  onChangeDays = (value) => {
    this.setState({
      daysCount: value,
    });
  };
  onChangeAmount = (value) => {
    this.setState({
      orderAmount: value,
    });
  };
  onChangeStatus = (value) => {
    this.setState({
      usersStatus: value,
    });
  };

  onChangeUserType = (value) => {
    this.setState({
      user_type: value,
    });
  };

  getUsersList = async () => {
    let path =
      ApiRoutes.GET_CUSTOMER_LIST +
      "?status=" +
      `${this.state.usersStatus}` +
      "&days_limit=" +
      `${this.state.daysCount}` +
      "&amount_limit=" +
      `${this.state.orderAmount}` +
      "&user_type=" +
      `${this.state.user_type}`;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        var usersList = res.data.map((user, index) => {
          return {
            label: user.username,
            value: user._id,
            key: index,
          };
        });
        this.setState({ usersList: usersList });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  handleSubmit = async (inputValues, formOptions) => {
    var userIdsArr = this.state.selectedUsers.map(function (el) {
      return el.value;
    });

    var userIdStr = userIdsArr.length > 0 ? userIdsArr.join(",") : "";

    if (inputValues.sent_to == "selected_users" && userIdStr == "") {
      formOptions.setFieldError("sent_to_users", "Please select an user");
    } else {
      let formData = new FormData();
      formData.append("notification_text", inputValues.notification_text);
      formData.append("sent_to", inputValues.sent_to);
      formData.append("sent_to_users", JSON.stringify(userIdsArr));
      formData.append("sender_id", this.state.login_id);
      formData.append("user_type", this.state.user_type);
      formData.append("status", this.state.usersStatus);
      formData.append("days_limit", this.state.daysCount);
      formData.append("amount_limit", this.state.orderAmount);

      let path = ApiRoutes.ADD_NOTIFICATION;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          NotificationManager.success(res.message, "Success!", 3000);
          window.location.reload();
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    }
  };

  MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
  };

  Option = createClass({
    render() {
      return (
        <div>
          <components.Option {...this.props}>
            <input type="checkbox" checked={this.props.isSelected} onChange={(e) => null} /> <label>{this.props.label} </label>
          </components.Option>
        </div>
      );
    },
  });

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.notifications" match={this.props.match} />
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
                    notification_text: this.state.notification_text,
                    sent_to: this.state.sent_to,
                    sent_to_users: this.state.sent_to_users,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Select User Type</Label>
                            <select
                              name="user_type"
                              className="form-control"
                              value={values.user_type}
                              onChange={(event) => {
                                setFieldValue("user_type", event.target.value);
                                this.setState({ user_type: event.target.value }, () => this.getUsersList());
                              }}
                            >
                              <option value="">Select</option>,<option value="3">Customer</option>,<option value="4">Driver</option>
                            </select>
                            {errors.user_type && touched.user_type ? <div className="invalid-feedback d-block">{errors.user_type}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      {this.state.user_type == 3 ? (
                        <>
                          <Row>
                            <Colxx xxs="12" sm="6">
                              <FormGroup className="form-group has-float-label">
                                <Label>Select Days Filter</Label>
                                <select
                                  name="daysCount"
                                  className="form-control"
                                  value={values.daysCount}
                                  onChange={(e) => {
                                    setFieldValue("daysCount", e.target.value);
                                    this.onChangeDays(e.target.value);
                                    this.getUsersList();
                                  }}
                                >
                                  {this.state.daysFilter.map((item, index) => {
                                    return (
                                      <option key={index} value={item.value}>
                                        {item.label}
                                      </option>
                                    );
                                  })}
                                </select>
                                {errors.daysCount && touched.daysCount ? <div className="invalid-feedback d-block">{errors.daysCount}</div> : null}
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx xxs="12" sm="6">
                              <FormGroup className="form-group has-float-label">
                                <Label>Select Order Filter</Label>
                                <select
                                  name="orderAmount"
                                  className="form-control"
                                  value={values.orderAmount}
                                  onChange={(e) => {
                                    setFieldValue("orderAmount", e.target.value);
                                    this.onChangeAmount(e.target.value);
                                    this.getUsersList();
                                  }}
                                >
                                  {this.state.orderFilter.map((item, index) => {
                                    return (
                                      <option key={index} value={item.value}>
                                        {item.label}
                                      </option>
                                    );
                                  })}
                                </select>
                                {errors.orderAmount && touched.orderAmount ? <div className="invalid-feedback d-block">{errors.orderAmount}</div> : null}
                              </FormGroup>
                            </Colxx>
                          </Row>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {/* <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Status</Label>
                            <select
                              name="usersStatus"
                              className="form-control"
                              value={values.usersStatus}
                              onChange={(e) => {
                                setFieldValue("usersStatus", e.target.value);
                                this.onChangeStatus(e.target.value);
                                this.getUsersList();
                              }}
                            >
                              {this.state.activeInactive.map((item, index) => {
                                return (
                                  <option key={index} value={item.value}>
                                    {item.label}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.usersStatus && touched.usersStatus ? (
                              <div className="invalid-feedback d-block">
                                {errors.usersStatus}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      */}

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Notification Text</Label>
                            <Field className="form-control" name="notification_text" component="textarea" />
                            {errors.notification_text && touched.notification_text ? <div className="invalid-feedback d-block">{errors.notification_text}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Sent To</Label>
                            <select
                              name="sent_to"
                              className="form-control"
                              value={values.sent_to}
                              onChange={(e) => {
                                setFieldValue("sent_to", e.target.value);
                                this.onChangeSendTo(e.target.value);
                              }}
                            >
                              {this.state.sendToOpts.map((item, index) => {
                                return (
                                  <option key={index} value={item.value}>
                                    {item.label}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.sent_to && touched.sent_to ? <div className="invalid-feedback d-block">{errors.sent_to}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      {this.state.showUsersField && (
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Sent To Users</Label>
                              {/* <Select
                                  closeMenuOnSelect={false}
                                  isMulti
                                  name="sent_to_users"
                                  components={()=>{ Option, this.MultiValue }}
                                  value={this.state.selectedUsers}
                                  defaultValue=""
                                  options={this.state.usersList}
                                  hideSelectedOptions={false}
                                  backspaceRemovesValue={false}
                                  onChange={(selectedOptions) => {
                                    this.setState({
                                      selectedUsers: selectedOptions,
                                    });
                                  }}
                                /> */}

                              <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                isMulti
                                name="sent_to_users"
                                options={this.state.usersList}
                                value={this.state.selectedUsers}
                                onChange={(selectedOptions) => {
                                  this.setState({
                                    selectedUsers: selectedOptions,
                                  });
                                }}
                              />
                              {errors.sent_to_users && touched.sent_to_users ? <div className="invalid-feedback d-block">{errors.sent_to_users}</div> : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      )}

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
export default injectIntl(Notifications);
