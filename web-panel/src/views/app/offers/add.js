import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormikDatePicker, FormikReactSelect } from "../../../containers/form-validations/FormikFields";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

var digitRegExp = /^\d+(?:[.]\d+)*$/;

const FormSchema = Yup.object().shape({
  offer_type: Yup.string().required("Please select offer type"),
  title: Yup.string().required("Please enter title").min(2, "Too Short! Atleast 2 letters.").max(30, "Too Long! Atmost 30 letters."),
  description: Yup.string().required("Please enter title").min(2, "Too Short! Atleast 2 letters.").max(200, "Too Long! Atmost 200 letters."),
  coupon_code: Yup.string().min(2, "Too Short! Atleast 2 letters.").max(10, "Too Long! Atmost 10 letters."),
  // offer_price: Yup.string()
  //    .required("Please enter price")
  //   .matches(digitRegExp, "Invalid offer price")
  //   .max(5, "Too Long! Atmost 5 Digit."),
  // offer_amount: Yup.string()
  //   //.required("Please enter offer amount")
  //   .matches(digitRegExp, "Invalid offer amount")
  //   .max(5, "Too Long! Atmost 5 Digit."),
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date().nullable().required("End date is required"),
  // quantity: Yup.string()
  //   .required("Please enter quantity")
  //   .matches(digitRegExp, "Invalid quantity")
  //   .max(5, "Too Long! Atmost 5 Digit."),
  // offer_quantity: Yup.string()
  //   .required("Please enter offer quantity")
  //   .matches(digitRegExp, "Invalid offer quantity")
  //   .max(5, "Too Long! Atmost 5 Digit."),
});
var options = [];
class AddOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_type: "",
      coupon_code: "",
      title: "",
      description: "",
      business_category: "",
      product_category: "",
      product_subcategory: "",
      product_inv_id: [],
      options: [],
      card_type: "",
      bank_type: "",
      startDate: null,
      endDate: null,
      offer_amount_type: "",
      offer_price: "",
      offer_amount: "",
      offer_max_amount: "",
      offer_product: "",
      quantity: "",
      offer_quantity: "",

      image: undefined,

      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
      subCatList: [{ _id: "", name: "Select" }],
      productList: [{ id: "", name: "Select" }],
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

    if (product_subcategory) {
      let formData = new FormData();
      formData.append("business_category_id", business_category);
      formData.append("category_id", product_category);
      formData.append("sub_category_id", product_subcategory);

      let path = ApiRoutes.GET_BANNER_PRODUCTS;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          this.setState({
            productList: [...productList, ...res.data],
          });
          res.data.map((item, index) => {
            options.push({ value: item.id, label: item.inventory_name });
          });
          this.setState({
            options: options,
          });
          setFieldValue("options", options);
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

  handleSubmit = async (inputValues, formOptions) => {
    var error = "";
    let formData = new FormData();

    if (inputValues.offer_type == 2 || inputValues.offer_type == 3 || inputValues.offer_type == 4) {
      if (inputValues.business_category == "") {
        error = "Please select Business category.";
        NotificationManager.error(error, "Error!", 3000);
        return false;
      }
      if (inputValues.product_category == "") {
        error = "Please select product category.";
        NotificationManager.error(error, "Error!", 3000);
        return false;
      }
      if (inputValues.product_subcategory == "") {
        error = "Please select product sub category.";
        NotificationManager.error(error, "Error!", 3000);
        return false;
      }
      if (inputValues.product_inv_id == "") {
        error = "Please select product.";
        NotificationManager.error(error, "Error!", 3000);
        return false;
      }
    }

    if (inputValues.offer_type != "1") {
      if (inputValues.offer_type == "2") {
        var productData = new Array();
        inputValues.product_inv_id.map((data, index) => {
          productData.push(data.value);
        });
      } else {
        var productData = new Array();
        productData.push(inputValues.product_inv_id.value);
      }
    }
    let startDate1 = new Date(inputValues.startDate);
    let endDate1 = new Date(inputValues.endDate);
    if (startDate1.getTime() > endDate1.getTime()) {
      formOptions.setFieldError("startDate", "Start Date cannot be greater than end date");
      return false;
    }
    formData.append("offer_type", inputValues.offer_type);
    formData.append("coupon_code", inputValues.coupon_code);

    formData.append("business_category_id", inputValues.business_category != "" ? inputValues.business_category : "");
    formData.append("category_id", inputValues.product_category != "" ? inputValues.product_category : "");
    formData.append("sub_category_id", inputValues.product_subcategory != "" ? inputValues.product_subcategory : "");
    formData.append("product_id", inputValues.product_inv_id != "" ? JSON.stringify(productData) : "");

    formData.append("title", inputValues.title);
    formData.append("description", inputValues.description);

    formData.append("startDate", moment(inputValues.startDate).format("YYYY-MM-DD"));
    formData.append("endDate", moment(inputValues.endDate).format("YYYY-MM-DD"));

    formData.append("offer_amount_type", inputValues.offer_amount_type != "" ? inputValues.offer_amount_type : "");
    formData.append("offer_price", inputValues.offer_price != "" ? inputValues.offer_price : "");
    formData.append("offer_amount", inputValues.offer_amount != "" ? inputValues.offer_amount : "");

    formData.append("offer_product", inputValues.offer_product);
    formData.append("offer_quantity", inputValues.offer_quantity);

    formData.append("card_type", inputValues.card_type);
    formData.append("bank_type", inputValues.bank_type);

    formData.append("image_path", inputValues.image);

    let path = ApiRoutes.CREATE_OFFER;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push("/app/offers");
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  render() {
    const { messages } = this.props.intl;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.add-offer" match={this.props.match} />
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
                    product_category: this.state.product_category,
                    product_subcategory: this.state.product_subcategory,
                    product_inv_id: this.state.product_inv_id,
                    options: this.state.options,

                    card_type: this.state.card_type,
                    bank_type: this.state.bank_type,
                    // offer_max_amount: this.stata.offer_max_amount,
                    offer_product: this.state.offer_product,
                    offer_quantity: this.state.offer_quantity,

                    offer_type: this.state.offer_type,
                    coupon_code: this.state.coupon_code,
                    title: this.state.title,
                    description: this.state.description,
                    offer_amount_type: this.state.offer_amount_type,
                    offer_price: this.state.offer_price,
                    offer_amount: this.state.offer_amount,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    image: this.state.image,
                  }}
                  validationSchema={FormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, handleChangeStartDate, handleChangeEndDate, values, errors, touched, isSubmitting }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Offer Type</Label>
                            <select
                              name="offer_type"
                              className="form-control"
                              value={values.offer_type}
                              onChange={(event) => {
                                setFieldValue("offer_type", event.target.value);
                                this.setState({ offer_type: event.target.value });
                              }}
                            >
                              <option value="">Select</option>,<option value="1">Promocode Offer</option>,<option value="2">Bundle Offer</option>,<option value="3">Promotional Offer</option>,
                              <option value="4">Bank Offer</option>
                            </select>
                            {errors.offer_type && touched.offer_type ? <div className="invalid-feedback d-block">{errors.offer_type}</div> : null}
                          </FormGroup>
                        </Colxx>
                        {this.state.offer_type != 4 ? (
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Coupon Code</Label>
                              <Field className="form-control" name="coupon_code" type="text" />
                              {errors.coupon_code && touched.coupon_code ? <div className="invalid-feedback d-block">{errors.coupon_code}</div> : null}
                            </FormGroup>
                          </Colxx>
                        ) : null}
                      </Row>

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Title</Label>
                            <Field className="form-control" name="title" type="text" />
                            {errors.title && touched.title ? <div className="invalid-feedback d-block">{errors.title}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Description</Label>
                            <Field className="form-control" name="description" type="text" />
                            {errors.description && touched.description ? <div className="invalid-feedback d-block">{errors.description}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      {this.state.offer_type != 1 ? (
                        <div>
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
                          </Row>

                          <Row>
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
                                    this.getProducts(values.business_category, values.product_category, event.target.value, setFieldValue);
                                    setFieldValue("product_inv_id", "");
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
                                <Label>Product</Label>

                                <FormikReactSelect
                                  name="product_inv_id"
                                  id="product_inv_id"
                                  value={values.product_inv_id}
                                  isMulti={this.state.offer_type == 2 ? true : false}
                                  options={values.options}
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
                          </Row>
                        </div>
                      ) : null}

                      {this.state.offer_type == 4 || this.state.offer_type == "" ? (
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Card Type</Label>
                              <select
                                name="card_type"
                                className="form-control"
                                value={values.card_type}
                                onChange={(event) => {
                                  setFieldValue("card_type", event.target.value);
                                }}
                              >
                                <option value="">Select</option>,<option value="Debit">Debit Card</option>,<option value="Credit">Credit Card</option>
                              </select>
                              {errors.card_type && touched.card_type ? <div className="invalid-feedback d-block">{errors.card_type}</div> : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Bank Type</Label>
                              <select
                                name="bank_type"
                                className="form-control"
                                value={values.bank_type}
                                onChange={(event) => {
                                  setFieldValue("bank_type", event.target.value);
                                }}
                              >
                                <option value="">Select</option>,<option value="Debit">Hsbc</option>,<option value="Credit">Icici</option>
                              </select>
                              {errors.bank_type && touched.bank_type ? <div className="invalid-feedback d-block">{errors.bank_type}</div> : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      ) : null}

                      {this.state.offer_type != 3 ? (
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Offer Amount Type</Label>
                              <select
                                name="offer_amount_type"
                                className="form-control"
                                value={values.offer_amount_type}
                                onChange={(event) => {
                                  setFieldValue("offer_amount_type", event.target.value);
                                }}
                              >
                                <option value="">Select</option>,<option value="1">Fixed</option>,<option value="2">Percentage(%)</option>
                              </select>
                              {errors.offer_amount_type && touched.offer_amount_type ? <div className="invalid-feedback d-block">{errors.offer_amount_type}</div> : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Offer Price</Label>
                              <Field className="form-control" name="offer_price" type="text" />
                              {errors.offer_price && touched.offer_price ? <div className="invalid-feedback d-block">{errors.offer_price}</div> : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Offer Amount</Label>
                              <Field className="form-control" name="offer_amount" type="text" />
                              {errors.offer_amount && touched.offer_amount ? <div className="invalid-feedback d-block">{errors.offer_amount}</div> : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      ) : null}

                      {this.state.offer_type == 3 || this.state.offer_type == "" ? (
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Offer Price</Label>
                              <Field className="form-control" name="offer_price" type="text" />
                              {errors.offer_price && touched.offer_price ? <div className="invalid-feedback d-block">{errors.offer_price}</div> : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Offer Quantity</Label>
                              <Field className="form-control" name="offer_quantity" type="text" />
                              {errors.offer_quantity && touched.offer_quantity ? <div className="invalid-feedback d-block">{errors.offer_quantity}</div> : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      ) : null}

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label className="d-block">Start Date</Label>
                            <FormikDatePicker name="startDate" value={values.startDate} onChange={setFieldValue} onBlur={setFieldTouched} minDate={new Date()} />
                            {errors.startDate && touched.startDate ? <div className="invalid-feedback d-block">{errors.startDate}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label className="d-block">End Date</Label>
                            <FormikDatePicker name="endDate" value={values.endDate} onChange={setFieldValue} onBlur={setFieldTouched} minDate={new Date()} />
                            {errors.endDate && touched.endDate ? <div className="invalid-feedback d-block">{errors.endDate}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      <Row>
                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Image</Label>
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
export default injectIntl(AddOffer);
