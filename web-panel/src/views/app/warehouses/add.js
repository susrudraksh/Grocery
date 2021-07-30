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

var latLongRegExp = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/;

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Please enter warehouse name").min(2, "Too Short! Atleast 2 letters.").max(20, "Too Long! Atmost 20 letters."),
  address: Yup.string().required("Please enter warehouse address").min(2, "Too Short! Atleast 2 letters.").max(150, "Too Long! Atmost 150 letters."),
  latitude: Yup.string().required("Please enter latitude for address").matches(latLongRegExp, "Invalid latitude value").min(2, "Too Short! Atleast 2 letters.").max(15, "Too Long! Atmost 15 letters."),
  longitude: Yup.string()
    .required("Please enter longitude for address")
    .matches(latLongRegExp, "Invalid longitude value")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(15, "Too Long! Atmost 15 letters."),
});

class AddWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("name", inputValues.name);
    formData.append("address", inputValues.address);
    formData.append("latitude", inputValues.latitude);
    formData.append("longitude", inputValues.longitude);

    let path = ApiRoutes.CREATE_WAREHOUSE;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push("/app/warehouses");
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
            <Breadcrumb heading="heading.add-warehouse" match={this.props.match} />
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
                    address: this.state.address,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Warehouse Name</Label>
                            <Field className="form-control" name="name" type="text" />
                            {errors.name && touched.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Address</Label>
                            <Field className="form-control" name="address" component="textarea" />
                            {errors.address && touched.address ? <div className="invalid-feedback d-block">{errors.address}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Latitude</Label>
                            <Field className="form-control" name="latitude" type="text" />
                            {errors.latitude && touched.latitude ? <div className="invalid-feedback d-block">{errors.latitude}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Longitude</Label>
                            <Field className="form-control" name="longitude" type="text" />
                            {errors.longitude && touched.longitude ? <div className="invalid-feedback d-block">{errors.longitude}</div> : null}
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
export default injectIntl(AddWarehouse);
