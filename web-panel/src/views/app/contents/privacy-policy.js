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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const quillModules = {
  toolbar: [["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
};

const quillFormats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

const FormSchema = Yup.object().shape({
  content_text: Yup.string().required("Please enter some content"),
});

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content_key: "privacy_policy",
      content_text: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
  }

  dataRender = async () => {
    let path = ApiRoutes.GET_CONTENT + "/" + this.state.content_key;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          content_text: res.data.content_data,
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }
  };

  handleChangeContent = (content_text) => {
    this.setState({ content_text });
  };

  handleSubmit = async (inputValues) => {
    let formData = new FormData();
    formData.append("content_value", inputValues.content_text);

    let path = ApiRoutes.UPDATE_CONTENT + "/" + this.state.content_key;
    const res = await Http("PUT", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.privacy-policy" match={this.props.match} />
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
                    content_text: this.state.content_text,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="12">
                          <FormGroup className="form-group has-float-label">
                            <Label>Content</Label>
                            <Field className="form-control" name="content_text">
                              {({ field }) => (
                                <ReactQuill
                                  theme="snow"
                                  onChange={this.handleChangeContent}
                                  modules={quillModules}
                                  formats={quillFormats}
                                  placeholder="Start to enter..."
                                  value={this.state.content_text}
                                />
                              )}
                            </Field>
                            {errors.content_text && touched.content_text ? <div className="invalid-feedback d-block">{errors.content_text}</div> : null}
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
export default injectIntl(AboutUs);
