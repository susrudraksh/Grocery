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

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const FormSchema = Yup.object().shape({
  business_category: Yup.string().required("Please select a business category"),
  name: Yup.string().required("Please enter category name").min(2, "Too Short! Atleast 2 letters.").max(50, "Too Long! Atmost 50 letters."),
  image: Yup.mixed().test("fileType", "Invalid File Format", (value) => {
    if (value && value != "") {
      return value && SUPPORTED_FORMATS.includes(value.type);
    } else {
      return true;
    }
  }),
});

class EditProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.match.params.itemId,
      business_category: "",
      name: "",
      image: undefined,
      image_preview: "",
      currentPage: this.props.history.location.state.pageIndex,
      businessCatList: [{ _id: "", name: "Select" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
    this.getBusinessCategories();
  }

  getBusinessCategories = async () => {
    this.state.isLoading = true;

    let path = ApiRoutes.GET_BUSSINESS_CATEGORIES + "?page_no=1&limit=100";
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          businessCatList: [...this.state.businessCatList, ...res.data.docs],
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  dataRender = async () => {
    let path = ApiRoutes.GET_PRODUCT_CATEGORY + "/" + this.state.itemId;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          name: res.data.name,
          business_category: res.data.business_category_id,
          image_preview: res.data.image_path_thumb_url,
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
    formData.append("business_category_id", inputValues.business_category);
    formData.append("name", inputValues.name);
    formData.append("image_path", inputValues.image);

    let path = ApiRoutes.UPDATE_PRODUCT_CATEGORY + "/" + this.state.itemId;
    const res = await Http("PUT", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push({ pathname: `/app/product-categories`, state: { pageIndex: this.state.currentPage } });
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
            <Breadcrumb heading="heading.edit-product-category" match={this.props.match} />
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
                    business_category: this.state.business_category,
                    name: this.state.name,
                    image: this.state.image,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Business Category</Label>
                            <select name="business_category" className="form-control" value={values.business_category} onChange={handleChange}>
                              {this.state.businessCatList.map((item, index) => {
                                return (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.business_category && touched.business_category ? <div className="invalid-feedback d-block">{errors.business_category}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Category Name</Label>
                            <Field className="form-control" name="name" type="text" />
                            {errors.name && touched.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Category Image</Label>
                            <Field
                              className="form-control"
                              name="image"
                              type="file"
                              value={this.state.image}
                              onChange={(event) => {
                                setFieldValue("image", event.currentTarget.files[0]);
                              }}
                            />
                            {errors.image && touched.image ? <div className="invalid-feedback d-block">{errors.image}</div> : null}
                          </FormGroup>
                          <img alt={this.state.name} src={this.state.image_preview} className="img-thumbnail border-0 list-thumbnail align-self-center image-preview" />
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
export default injectIntl(EditProductCategory);
