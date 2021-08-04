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
import { FormikDatePicker, FormikReactSelect } from "../../../containers/form-validations/FormikFields";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const FormSchema = Yup.object().shape({
  business_category: Yup.string().required("Please select a business category"),
  product_category: Yup.string().required("Please select a product category"),
  product_subcategory: Yup.string().required("Please select a sub category"),
  // product_inv_id: Yup.string().required("Please select a product inventory"),
  title: Yup.string().required("Please enter deal of the day title").min(2, "Too Short! Atleast 2 letters.").max(50, "Too Long! Atmost 50 letters."),
  description: Yup.string().required("Please enter deal of the day description").min(2, "Too Short! Atleast 2 letters.").max(200, "Too Long! Atmost 200 letters."),
  image: Yup.mixed().test("fileType", "Invalid File Format", (value) => {
    if (value && value != "") {
      return value && SUPPORTED_FORMATS.includes(value.type);
    } else {
      return true;
    }
  }),
});

var options = [];
var reactSelect = [];
class EditDealofDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.match.params.itemId,
      business_category: "",
      product_category: "",
      product_subcategory: "",
      product_inv_id: [],
      title: "",
      description: "",
      statusactiveDate: "",
      image: undefined,
      currentPage: this.props.history.location.state.pageIndex,
      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
      subCatList: [{ _id: "", name: "Select" }],
      productList: [{ id: "", name: "Select" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRender();
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
    console.log(business_category);
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

  getSubCategories = async (business_category, product_category) => {
    this.state.isLoading = true;
    var subCatList = [{ _id: "", name: "Select" }];

    if (product_category) {
      let formData = new FormData();
      formData.append("business_category_id", business_category);
      formData.append("category_id", product_category);

      let path = ApiRoutes.GET_SUBCATEGORIES;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          this.setState({
            subCatList: [...subCatList, ...res.data.docs],
          });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      this.setState({
        subCatList: subCatList,
      });
    }
  };

  getProducts = async (business_category, product_category, product_subcategory, setFieldValue) => {
    this.state.isLoading = true;
    var productList = [{ id: "", name: "Select" }];
    options = [];
    reactSelect = [];
    if (product_subcategory) {
      let formData = new FormData();
      formData.append("business_category_id", business_category);
      formData.append("category_id", product_category);
      formData.append("sub_category_id", product_subcategory);

      let path = ApiRoutes.GET_DEALOFDAY_PRODUCTS;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          this.setState({
            productList: [...productList, ...res.data],
          });
          res.data.map((item, index) => {
            options.push({ key: index, value: item.id, label: item.inventory_name });

            if (Array.isArray(this.state.product_inv_id)) {
              if (this.state.product_inv_id.indexOf(item.id) !== -1) {
                reactSelect.push({ key: index, value: item.id, label: item.inventory_name });
              }
            }
          });
          if (reactSelect.length == 0) {
            options = [];
            this.setState({
              options: options,
            });
            setFieldValue("options", options);
          } else {
            this.setState({
              product_inv_id: reactSelect,
            });
          }
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      this.setState({
        productList: productList,
      });
    }
  };

  dataRender = async () => {
    let path = ApiRoutes.GET_DEALOFDAY + "/" + this.state.itemId;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          business_category: res.data.business_category._id,
          product_category: res.data.category._id,
          product_subcategory: res.data.subcategory._id,
          product_inv_id: res.data.product_id ? res.data.product_id : res.data.product_id,
          image_preview: res.data.image_thumb_url,
          statusactiveDate: res.data.statusactiveDate,
          isLoading: true,
        });

        this.getBusinessCategories();
        this.getPerentCategories(res.data.business_category._id);
        this.getSubCategories(res.data.business_category._id, res.data.category._id);
        this.getProducts(res.data.business_category._id, res.data.category._id, res.data.subcategory._id);
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  handleSubmit = async (inputValues) => {
    if (inputValues.product_inv_id == "") {
      let error = "Please select a product inventory";

      NotificationManager.error(error, "Error!", 3000);
      return false;
    }
    var productData = new Array();
    if (Array.isArray(inputValues.product_inv_id)) {
      inputValues.product_inv_id.map((data, index) => {
        productData.push(data.value);
      });
    } else {
      productData.push(inputValues.product_inv_id.value);
    }
    let formData = new FormData();
    formData.append("business_category_id", inputValues.business_category);
    formData.append("category_id", inputValues.product_category);
    formData.append("sub_category_id", inputValues.product_subcategory);
    formData.append("product_id", typeof inputValues.product_inv_id !== "undefined" ? JSON.stringify(productData) : null);
    formData.append("title", inputValues.title);
    formData.append("description", inputValues.description);
    formData.append("image", inputValues.image);

    let path = ApiRoutes.UPDATE_DEALOFDAY + "/" + this.state.itemId;
    const res = await Http("PUT", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push({ pathname: `/app/dealofday`, state: { pageIndex: this.state.currentPage } });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  calculetetime = (date) => {
    var today = new Date();
    var Christmas = new Date(date);
    var diffMs = today - Christmas; // milliseconds between now & Christmas
    // diffMs = 8.64e+7 - diffMs
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffDays < 1 ? diffHrs + " hours, " + diffMins + " minutes " : "Expired";
  };
  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.edit-dealofday" match={this.props.match} />
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
                    product_category: this.state.product_category,
                    product_subcategory: this.state.product_subcategory,
                    product_inv_id: this.state.product_inv_id,
                    title: this.state.title,
                    description: this.state.description,
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
                                setFieldValue("product_category", "");
                                setFieldValue("product_subcategory", "");
                                setFieldValue("product_inv_id", "");
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
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Category</Label>
                            <select
                              name="product_category"
                              className="form-control"
                              value={values.product_category}
                              onChange={(event) => {
                                setFieldValue("product_category", event.target.value);
                                setFieldValue("product_subcategory", "");
                                setFieldValue("product_inv_id", "");
                                this.getSubCategories(values.business_category, event.target.value);
                              }}
                            >
                              {this.state.parentCatList.map((item, index) => {
                                return (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.product_category && touched.product_category ? <div className="invalid-feedback d-block">{errors.product_category}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Sub Category</Label>
                            <select
                              name="product_subcategory"
                              className="form-control"
                              value={values.product_subcategory}
                              onChange={(event) => {
                                setFieldValue("product_subcategory", event.target.value);
                                setFieldValue("product_inv_id", "");
                                console.log(values.business_category, values.product_category, event.target.value);
                                this.getProducts(values.business_category, values.product_category, event.target.value, setFieldValue);
                              }}
                            >
                              {this.state.subCatList.map((item, index) => {
                                return (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.product_subcategory && touched.product_subcategory ? <div className="invalid-feedback d-block">{errors.product_subcategory}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Inventory</Label>
                            <FormikReactSelect
                              name="product_inv_id"
                              id="product_inv_id"
                              value={values.product_inv_id}
                              isMulti={true}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.product_inv_id && touched.product_inv_id ? <div className="invalid-feedback d-block">{errors.product_inv_id}</div> : null}
                            {/* <select
                              name="product_inv_id"
                              className="form-control"
                              value={values.product_inv_id}
                              onChange={(event) => {
                                setFieldValue(
                                  "product_inv_id",
                                  event.target.value
                                );
                              }}
                            >
                              {this.state.productList.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                    {item.inventory_name
                                      ? " (" + item.inventory_name + ")"
                                      : ""}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.product_inv_id && touched.product_inv_id ? (
                              <div className="invalid-feedback d-block">
                                {errors.product_inv_id}
                              </div>
                            ) : null} */}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Deal Of Day Title</Label>
                            <Field className="form-control" name="title" type="text" />
                            {errors.title && touched.title ? <div className="invalid-feedback d-block">{errors.title}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Deal Of Day Description</Label>
                            <Field className="form-control" name="description" component="textarea" />
                            {errors.description && touched.description ? <div className="invalid-feedback d-block">{errors.description}</div> : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Deal Of Day Image</Label>
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
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Activated time </Label>
                            <br />
                            {this.calculetetime(this.state.statusactiveDate)}
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
export default injectIntl(EditDealofDay);
