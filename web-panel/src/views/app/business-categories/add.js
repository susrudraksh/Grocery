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

const numberRegExp = /^-?\d+\.?\d*$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter category name")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(50, "Too Long! Atmost 50 letters."),
  cancelation_time: Yup.string()
    .required("Please enter cancellation time")
    .matches(numberRegExp, "Please enter a numeric value")
    .min(2, "Too Short! Atleast 2 letters."),
   // .max(5, "Too Long! Atmost 5 letters."),
  return_time: Yup.string()
    .required("Please enter return time")
    .matches(numberRegExp, "Please enter a numeric value")
    .min(2, "Too Short! Atleast 2 letters."),
   // .max(5, "Too Long! Atmost 5 letters."),
  order_number: Yup.string()
    .required("Please enter return time")
    .matches(numberRegExp, "Please enter a numeric value")
    .min(1, "Too Short! Atleast 2 letters."),
  image: Yup.mixed()
    .required("Please choose a category image")
    .test("fileType", "Invalid File Format", (value) => {
      if (value && value != "") {
        return value && SUPPORTED_FORMATS.includes(value.type);
      } else {
        return true;
      }
    }),
});

class AddBusinessCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      order_number: "",
      cancelation_time: "",
      return_time: "",
      image: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("order_number", inputValues.order_number);
    formData.append("cancelation_time", inputValues.cancelation_time);
    formData.append("return_time", inputValues.return_time);
    formData.append("category_image", inputValues.image);

    let path = ApiRoutes.CREATE_BUSSINESS_CATEGORY;
    const res = await Http("POST", path, formData);

    if (res.status == 200) {
      NotificationManager.success(res.message, "Success!", 3000);
      this.props.history.push("/app/business-categories");
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
            <Breadcrumb
              heading="heading.add-business-category"
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
                  initialValues={{
                    name: this.state.name,
                    order_number: this.state.order_number,
                    cancelation_time: this.state.cancelation_time,
                    return_time: this.state.return_time,
                    image: this.state.image,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Category Name</Label>
                              <Field
                                className="form-control"
                                name="name"
                                type="text"
                              />
                              {errors.name && touched.name ? (
                                <div className="invalid-feedback d-block">
                                  {errors.name}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Order Number</Label>
                              <Field
                                className="form-control"
                                name="order_number"
                                type="text"
                              />
                              {errors.order_number &&
                                touched.order_number ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.order_number}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Cancellation Time(In minutes)</Label>
                              <Field
                                className="form-control"
                                name="cancelation_time"
                                type="text"
                              />
                              {errors.cancelation_time &&
                                touched.cancelation_time ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.cancelation_time}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Return Time(In minutes)</Label>
                              <Field
                                className="form-control"
                                name="return_time"
                                type="text"
                              />
                              {errors.return_time && touched.return_time ? (
                                <div className="invalid-feedback d-block">
                                  {errors.return_time}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Category Image</Label>
                              <Field
                                className="form-control"
                                name="image"
                                type="file"
                                value={this.state.image}
                                onChange={(event) => {
                                  setFieldValue(
                                    "image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              {errors.image && touched.image ? (
                                <div className="invalid-feedback d-block">
                                  {errors.image}
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
export default injectIntl(AddBusinessCategory);
