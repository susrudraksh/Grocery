import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

var priceRegExp = /^\d+(?:[.]\d+)*$/;

const FormSchema = Yup.object().shape({
  contact_email: Yup.string().required("Please enter email contact_address").email("Invalid email format").max(50, "Too Long! Atmost 50 letters."),
  contact_address: Yup.string().required("Please enter an contact_address").max(100, "Too Long! Atmost 100 letters."),
  admin_commission: Yup.string().required("Please enter an amount").matches(priceRegExp, "Invalid amount value").max(15, "Too Long! Atmost 15 letters."),
  normal_order_amount: Yup.number().typeError("Please enter valid amount").required("Please enter order amount"),
  normal_start_delivery_time: Yup.number().required("Please enter start time"),
  normal_end_delivery_time: Yup.number().required("Please enter end time"),
  premium_order_amount: Yup.number().typeError("Please enter valid amount").required("Please enter order amount"),
  premium_start_delivery_time: Yup.number().required("Please enter start time"),
  premium_end_delivery_time: Yup.number().required("Please enter end time"),
  total_sale: Yup.number().typeError("Please enter valid amount"),
  reward_points: Yup.number().typeError("Please enter valid amount"),
  expiration_time: Yup.number(),
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setting_id: "",
      contact_email: "",
      contact_address: "",
      admin_commission: "",
      premium_order_amount: "",
      premium_start_delivery_time: "",
      premium_end_delivery_time: "",
      normal_order_amount: "",
      normal_start_delivery_time: "",
      normal_end_delivery_time: "",
      total_sale: "",
      reward_points: "",
      expiration_time: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
  }

  dataRender = async () => {
    let path = ApiRoutes.GET_SETTINGS;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          setting_id: res.data._id,
          contact_email: res.data.contact_us_email,
          contact_address: res.data.office_address,
          admin_commission: res.data.admin_commission,
          normal_order_amount: res.data.normal_order_amount,
          normal_start_delivery_time: res.data.normal_start_delivery_time,
          normal_end_delivery_time: res.data.normal_end_delivery_time,
          premium_order_amount: res.data.premium_order_amount,
          premium_start_delivery_time: res.data.premium_start_delivery_time,
          premium_end_delivery_time: res.data.premium_end_delivery_time,
          total_sale: res.data.total_sale,
          reward_points: res.data.reward_points,
          expiration_time: res.data.expiration_time,
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
    formData.append("setting_id", this.state.setting_id);
    formData.append("contact_us_email", inputValues.contact_email);
    formData.append("office_address", inputValues.contact_address);
    formData.append("admin_commission", inputValues.admin_commission);
    formData.append("normal_order_amount", inputValues.normal_order_amount);
    formData.append("normal_start_delivery_time", inputValues.normal_start_delivery_time);
    formData.append("normal_end_delivery_time", inputValues.normal_end_delivery_time);
    formData.append("premium_order_amount", inputValues.premium_order_amount);
    formData.append("premium_start_delivery_time", inputValues.premium_start_delivery_time);
    formData.append("premium_end_delivery_time", inputValues.premium_end_delivery_time);
    formData.append("total_sale", inputValues.total_sale);
    formData.append("reward_points", inputValues.reward_points);
    formData.append("expiration_time", inputValues.expiration_time);

    let path = ApiRoutes.UPDATE_SETTINGS;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.settings" match={this.props.match} />
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
                    contact_email: this.state.contact_email,
                    contact_address: this.state.contact_address,
                    admin_commission: this.state.admin_commission,
                    normal_order_amount: this.state.normal_order_amount,
                    normal_start_delivery_time: this.state.normal_start_delivery_time,
                    normal_end_delivery_time: this.state.normal_end_delivery_time,
                    premium_order_amount: this.state.premium_order_amount,
                    premium_start_delivery_time: this.state.premium_start_delivery_time,
                    premium_end_delivery_time: this.state.premium_end_delivery_time,
                    total_sale: this.state.total_sale,
                    reward_points: this.state.reward_points,
                    expiration_time: this.state.expiration_time,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Normal Order Minimum Amount</Label>
                            <Field className="form-control" name="normal_order_amount" type="text" />
                            {errors.normal_order_amount && touched.normal_order_amount ? <div className="invalid-feedback d-block">{errors.normal_order_amount}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Normal Start Delivery Time</Label>
                            <Field className="form-control" name="normal_start_delivery_time" type="text" />

                            {errors.normal_start_delivery_time && touched.normal_start_delivery_time ? <div className="invalid-feedback d-block">{errors.normal_start_delivery_time}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Normal End Delivery Time</Label>
                            <Field className="form-control" name="normal_end_delivery_time" type="text" />
                            {errors.normal_end_delivery_time && touched.normal_end_delivery_time ? <div className="invalid-feedback d-block">{errors.normal_end_delivery_time}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Premium Order Minimum Amount</Label>
                            <Field className="form-control" name="premium_order_amount" type="text" />
                            {errors.premium_order_amount && touched.premium_order_amount ? <div className="invalid-feedback d-block">{errors.premium_order_amount}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Premium Start Delivery Time</Label>
                            <Field className="form-control" name="premium_start_delivery_time" type="text" />
                            {errors.premium_start_delivery_time && touched.premium_start_delivery_time ? <div className="invalid-feedback d-block">{errors.contact_email}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Premium End Delivery Time</Label>
                            <Field className="form-control" name="premium_end_delivery_time" type="text" />
                            {errors.premium_end_delivery_time && touched.premium_end_delivery_time ? <div className="invalid-feedback d-block">{errors.premium_end_delivery_time}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      <Row>
                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Total Sale</Label>
                            <Field className="form-control" name="total_sale" type="text" />
                            {errors.total_sale && touched.total_sale ? <div className="invalid-feedback d-block">{errors.total_sale}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Reward Points</Label>
                            <Field className="form-control" name="reward_points" type="text" />
                            {errors.reward_points && touched.reward_points ? <div className="invalid-feedback d-block">{errors.reward_points}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="4">
                          <FormGroup className="form-group has-float-label">
                            <Label>Expiration Time(In Days)</Label>
                            <Field className="form-control" name="expiration_time" type="text" />
                            {errors.expiration_time && touched.expiration_time ? <div className="invalid-feedback d-block">{errors.expiration_time}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Contact Email</Label>
                            <Field className="form-control" name="contact_email" type="text" />
                            {errors.contact_email && touched.contact_email ? <div className="invalid-feedback d-block">{errors.contact_email}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Contact Address</Label>
                            <Field className="form-control" name="contact_address" component="textarea" />
                            {errors.contact_address && touched.contact_address ? <div className="invalid-feedback d-block">{errors.contact_address}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Admin Commission</Label>
                            <Field className="form-control" name="admin_commission" type="text" />
                            {errors.admin_commission && touched.admin_commission ? <div className="invalid-feedback d-block">{errors.admin_commission}</div> : null}
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
export default injectIntl(Settings);
