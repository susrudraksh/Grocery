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

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Please enter type name").min(2, "Too Short! Atleast 2 letters.").max(20, "Too Long! Atmost 20 letters."),
});

class EditCustomizationType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.match.params.itemId,
      name: "",
      currentPage: this.props.history.location.state.pageIndex,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
  }

  dataRender = async () => {
    let path = ApiRoutes.GET_CUSTOMIZATION_TYPE + "/" + this.state.itemId;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          name: res.data.name,
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
    formData.append("name", inputValues.name);

    let path = ApiRoutes.UPDATE_CUSTOMIZATION_TYPE + "/" + this.state.itemId;
    const res = await Http("PUT", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push({ pathname: `/app/customization-types`, state: { pageIndex: this.state.currentPage } });
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
            <Breadcrumb heading="heading.edit-customization-type" match={this.props.match} />
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
                    name: this.state.name,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Type Name</Label>
                            <Field className="form-control" name="name" type="text" />
                            {errors.name && touched.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
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
export default injectIntl(EditCustomizationType);
