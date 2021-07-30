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
  parent_category: Yup.string().required("Please select a parent category"),
  name: Yup.string().required("Please enter category name").min(2, "Too Short! Atleast 2 letters.").max(30, "Too Long! Atmost 30 letters."),
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

class AddProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business_category: "",
      parent_category: "",
      name: "",
      image: undefined,

      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  getPerentCategories = async (business_category) => {
    this.state.isLoading = true;

    let formData = new FormData();
    formData.append("business_category_id", business_category);

    let path = ApiRoutes.GET_CATEGORIES_BY_BUSINESS;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        var parentCatList = [{ _id: "", name: "Select" }];
        this.setState({
          parentCatList: [...parentCatList, ...res.data.docs],
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
    formData.append("category_id", inputValues.parent_category);
    formData.append("name", inputValues.name);
    formData.append("image_path", inputValues.image);

    let path = ApiRoutes.CREATE_PRODUCT_SUBCATEGORY;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push("/app/product-subcategories");
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
            <Breadcrumb heading="heading.add-product-subcategory" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" sm="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    business_category: this.state.business_category,
                    parent_category: this.state.parent_category,
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
                            <select
                              name="business_category"
                              className="form-control"
                              value={values.business_category}
                              onChange={(event) => {
                                setFieldValue("business_category", event.target.value);
                                this.getPerentCategories(event.target.value);
                              }}
                            >
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
                            <Label>Parent Category</Label>
                            <select name="parent_category" className="form-control" value={values.parent_category} onChange={handleChange}>
                              {this.state.parentCatList.map((item, index) => {
                                return (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.parent_category && touched.parent_category ? <div className="invalid-feedback d-block">{errors.parent_category}</div> : null}
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
export default injectIntl(AddProductCategory);
