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
import InventoryForm from "./inventory-form";
import WarehouseInventoryForm from "./warehouse-inventory-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    //["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "color",
  // "link",
  // "image",
];

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const ProductFormSchema = Yup.object().shape({
  business_category: Yup.string().required("Please select a business category"),
  product_category: Yup.string().required("Please select a product category"),
  product_subcategory: Yup.string().required("Please select a product sub category"),
  product_brand: Yup.string().required("Please select a brand"),
  name: Yup.string().required("Please enter product name").min(2, "Too Short! Atleast 2 letters.").max(120, "Too Long! Atmost 120 letters."),
  description: Yup.string().required("Please enter product description"),
  product_images: Yup.mixed()
    .required("Please choose a product image")
    .test("fileType", "Invalid File Format", (files) => {
      let valid = true;
      if (files && files != undefined) {
        for (let i = 0; i < files.length; i++) {
          if (files[i] && !SUPPORTED_FORMATS.includes(files[i].type)) {
            valid = false;
            continue;
          }
        }
      }
      return valid;
    }),
});

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.submitBtnRef = React.createRef();
    this.inventoryFormBtnRef = React.createRef();
    this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
    var userData = JSON.parse(localStorage.getItem("userData")) || {};
    this.state = {
      userRole: userData ? userData.user_role : "",
      business_category: "",
      product_category: "",
      product_subcategory: "",
      product_brand: "",
      name: "",
      description: "",
      product_images: undefined,
      images: undefined,

      price: "",
      quantity: "",

      is_discount: "",
      discount_type: "",
      discount_value: "",
      discounted_product_price: "",

      custoimzations: [],
      warehouse_inventory: [],
      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
      subCatList: [{ _id: "", name: "Select" }],
      brandList: [{ _id: "", name: "Select" }],

      sku_code: "",
      sku_name: "",
      batch: "",

      tax_type: 1,
      hsn_code: "",
      inventory_product_code: "",
      tax_rate: 0,
      taxable_amount: 0,
      gst_amount: 0,
      cgst_rate: 0,
      cgst_amount: 0,
      sgst_rate: 0,
      sgst_amount: 0,
      igst_rate: 0,
      igst_amount: 0,
      min_inventory: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getBusinessCategories();
    this.getBrands();
  }

  // PRODUCT FORM METHODS
  getBusinessCategories = async () => {
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
    var parentCatList = [{ _id: "", name: "Select" }];

    if (business_category != "") {
      let formData = new FormData();
      formData.append("business_category_id", business_category);

      let path = ApiRoutes.GET_CATEGORIES_BY_BUSINESS;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          this.setState({
            parentCatList: [...parentCatList, ...res.data.docs],
          });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      this.setState({
        parentCatList: parentCatList,
      });
    }
  };

  getSubCategories = async (business_category, product_category) => {
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

  getBrands = async () => {
    var brandList = [{ _id: "", name: "Select" }];
    let path = ApiRoutes.GET_BRANDS + "?page_no=1&limit=10000";
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          brandList: [...brandList, ...res.data.docs],
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  // PRODUCT FORM METHODS
  handleProductFormChange = (event, values, errors) => {
    if (event.target.type != "file") {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ images: event.target.files });
    }
  };

  handleSubmit = async (inputValues, formOptions) => {};

  // PRODUCT INVENTORY FORM METHODS
  handleInventoryFormChange = (e) => {
    if (e.target.type != "file") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ images: e.target.files });
    }
  };

  handleInventorySubmit = async (inputValues) => {
    this.setState({
      tax_type: inputValues.tax_type,

      taxable_amount: inputValues.taxable_amount,
      gst_amount: inputValues.gst_amount,
      cgst_rate: inputValues.cgst_rate,
      cgst_amount: inputValues.cgst_amount,
      sgst_rate: inputValues.sgst_rate,
      sgst_amount: inputValues.sgst_amount,
      igst_rate: inputValues.igst_rate,
      igst_amount: inputValues.igst_amount,
      min_inventory: inputValues.min_inventory,

      price: inputValues.price,
      quantity: inputValues.quantity,
      is_discount: inputValues.is_discount,
      discounted_product_price: inputValues.discounted_product_price,
    });
  };

  // PRODUCT CUSTOMIZATION FORM METHODS
  handleCustomizationSubmit = (inputValues) => {
    this.setState({
      custoimzations: inputValues,
    });
  };
  // PRODUCT CUSTOMIZATION FORM METHODS
  handleCustomizationWarehouseSubmit = (inputValues) => {
    this.setState({
      warehouse_inventory: inputValues,
    });
  };
  // Final Submit Methods
  // validateFinalSubmit = (stateData) => {
  //   var valid = true;

  //   return valid;
  // };
  // Final Submit Methods
  validateFinalSubmit = async (stateData) => {
    var valid = false;
    var error = "";

    if (
      stateData.business_category == "" ||
      stateData.product_category == "" ||
      stateData.product_subcategory == "" ||
      stateData.product_brand == "" ||
      stateData.name == "" ||
      stateData.description == "" ||
      stateData.inventory_name == "" ||
      stateData.price == "" ||
      //stateData.quantity == "" ||
      !stateData.images
    ) {
    } else if (stateData.custoimzations.length == 0) {
      error = "Please select atleast 1 customization.";
      NotificationManager.error(error, "Error!", 3000);
    } else {
      valid = true;
    }
    return valid;
  };

  handleFinalSubmit = async (e) => {
    this.submitBtnRef.current.click();
    this.inventoryFormBtnRef.current.click();
    setTimeout(async () => {
      //console.log(this.state);
      if (await this.validateFinalSubmit(this.state)) {
        // if(this.state.description.length > 500 || this.state.name.length > 50){
        //   return false;
        // }

        var custoimzations = this.state.custoimzations;
        custoimzations.pop();
        var warhouseCustoimzations = this.state.warehouse_inventory;
        //warhouseCustoimzations.pop();
        console.log(this.state);
        let formData = new FormData();
        formData.append("business_category_id", this.state.business_category);
        formData.append("category_id", this.state.product_category);
        formData.append("sub_category_id", this.state.product_subcategory);
        formData.append("brand_id", this.state.product_brand);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);

        formData.append("sku_code", this.state.sku_code);
        formData.append("sku_name", this.state.sku_name);
        formData.append("batch", this.state.batch);

        formData.append("customize", JSON.stringify(custoimzations));
        formData.append("warehouse_inventory", JSON.stringify(warhouseCustoimzations));
        formData.append("inventory_name", this.state.inventory_name);
        formData.append("price", this.state.price);
        formData.append("is_discount", this.state.is_discount ? this.state.is_discount : 0);
        formData.append("discount_type", this.state.discount_type ? this.state.discount_type : 2);
        formData.append("discount_value", this.state.discount_value ? this.state.discount_value : 0);

        // formData.append("is_discount", this.state.is_discount);
        // formData.append("discount_type", this.state.discount_type);
        // formData.append("discount_value", this.state.discount_value);
        formData.append("discounted_product_price", this.state.discounted_product_price);
        formData.append("quantity", this.state.quantity);

        //Sales Product Field
        formData.append("tax_type", this.state.tax_type ? this.state.tax_type : 0);
        formData.append("hsn_code", this.state.hsn_code);
        formData.append("inventory_product_code", this.state.inventory_product_code);
        formData.append("tax_rate", this.state.tax_rate);
        formData.append("taxable_amount", this.state.taxable_amount);
        formData.append("gst_amount", this.state.gst_amount);
        formData.append("cgst_rate", this.state.cgst_rate);
        formData.append("cgst_amount", this.state.cgst_amount);
        formData.append("sgst_rate", this.state.sgst_rate);
        formData.append("sgst_amount", this.state.sgst_amount);
        formData.append("igst_rate", this.state.igst_rate);
        formData.append("igst_amount", this.state.igst_amount);
        formData.append("min_inventory", this.state.min_inventory);

        //

        if (this.state.images) {
          for (let i = 0; i < this.state.images.length; i++) {
            formData.append("product_images", this.state.images[i]);
          }
        }

        let path = ApiRoutes.CREATE_PRODUCT;
        const res = await Http("POST", path, formData);
        if (res) {
          if (res.status == 200) {
            NotificationManager.success(res.message, "Success!", 3000);
            this.props.history.push("/app/products");
          } else {
            NotificationManager.error(res.message, "Error!", 3000);
          }
        } else {
          NotificationManager.error("Server Error", "Error!", 3000);
        }
      }
    }, 2000);
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.add-product" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" sm="12">
            <Card>
              <CardBody>
                <h6 className="mb-4">Product Basic Details</h6>

                <Formik
                  initialValues={{
                    business_category: this.state.business_category,
                    product_category: this.state.product_category,
                    product_subcategory: this.state.product_subcategory,
                    product_brand: this.state.product_brand,
                    name: this.state.name,
                    description: this.state.description,
                    product_images: this.state.product_images,
                  }}
                  validationSchema={ProductFormSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form
                      onChange={(event) => {
                        this.handleProductFormChange(event, values, errors);
                      }}
                      className="av-tooltip tooltip-label-bottom"
                    >
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

                        <Colxx xxs="12" sm="3">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Category</Label>
                            <select
                              name="product_category"
                              className="form-control"
                              value={values.product_category}
                              onChange={(event) => {
                                setFieldValue("product_category", event.target.value);
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

                        <Colxx xxs="12" sm="3">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Sub Category</Label>
                            <select
                              name="product_subcategory"
                              className="form-control"
                              value={values.product_subcategory}
                              onChange={(event) => {
                                setFieldValue("product_subcategory", event.target.value);
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
                            <Label>Product Name</Label>
                            <Field
                              className="form-control"
                              name="name"
                              type="text"
                              onChange={(event) => {
                                setFieldValue("name", event.target.value);
                                this.setState({
                                  name: event.target.value,
                                });
                              }}
                            />
                            {errors.name && touched.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Brand</Label>
                            <select
                              name="product_brand"
                              className="form-control"
                              value={values.product_brand}
                              onChange={(event) => {
                                setFieldValue("product_brand", event.target.value);
                              }}
                            >
                              {this.state.brandList.map((item, index) => {
                                return (
                                  <option key={index} value={item._id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.product_brand && touched.product_brand ? <div className="invalid-feedback d-block">{errors.product_brand}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Description</Label>
                            <Field className="form-control" name="description">
                              {({ field }) => (
                                <ReactQuill
                                  theme="snow"
                                  onChange={(value) => {
                                    this.setState({
                                      description: value,
                                    });
                                  }}
                                  modules={quillModules}
                                  formats={quillFormats}
                                  placeholder="Start to enter..."
                                  value={this.state.description}
                                />
                              )}
                            </Field>

                            {/* <Field
                              className="form-control"
                              name="description"
                              component="textarea"
                             
                            /> */}
                            {errors.description && touched.description ? <div className="invalid-feedback d-block">{errors.description}</div> : null}
                          </FormGroup>
                        </Colxx>

                        <Colxx xxs="12" sm="6">
                          <FormGroup className="form-group has-float-label">
                            <Label>Product Images</Label>
                            <Field
                              className="form-control"
                              name="product_images"
                              type="file"
                              multiple
                              value={this.state.product_images}
                              onChange={(event) => {
                                setFieldValue("product_images", event.currentTarget.files);
                              }}
                            />
                            {errors.product_images && touched.product_images ? <div className="invalid-feedback d-block">{errors.product_images}</div> : null}
                          </FormGroup>
                        </Colxx>
                      </Row>

                      <Button className="hide-element" type="submit" innerRef={this.submitBtnRef}></Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <InventoryForm
          handleInventoryFormChange={this.handleInventoryFormChange}
          handleInventorySubmit={this.handleInventorySubmit}
          inventoryFormBtnRef={this.inventoryFormBtnRef}
          handleCustomizationSubmit={this.handleCustomizationSubmit}
          handleCustomizationWarehouseSubmit={this.handleCustomizationWarehouseSubmit}
        />
        {/* {this.state.userRole && this.state.userRole == 1 && (
          <WarehouseInventoryForm
            handleInventoryFormChange={this.handleInventoryFormChange}
            handleInventorySubmit={this.handleInventorySubmit}
            inventoryFormBtnRef={this.inventoryFormBtnRef}
            handleCustomizationSubmit={this.handleCustomizationSubmit}
          />
        )} */}

        <Row style={{ marginTop: 30 }}>
          <Colxx xxs="12" sm="6">
            <Button color="primary" type="button" onClick={this.handleFinalSubmit}>
              <IntlMessages id="button.save" />
            </Button>{" "}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(AddProduct);
