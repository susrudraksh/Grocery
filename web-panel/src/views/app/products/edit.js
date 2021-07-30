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
import EditInventoryForm from "./edit-inventory-form";
import EditWarehouseInvenotryForm from "./edit-warehouse-inventory";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
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
    // ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "color",
  //"link",
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
  product_images: Yup.mixed().test("fileType", "Invalid File Format", (files) => {
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

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.submitBtnRef = React.createRef();
    this.handleProductFormSubmit = this.handleProductFormSubmit.bind(this);
    var userData = JSON.parse(localStorage.getItem("userData")) || {};
    this.state = {
      userRole: userData ? userData.user_role : "",
      itemId: props.match.params.itemId,
      business_category: "",
      product_category: "",
      product_subcategory: "",
      product_brand: "",
      name: "",
      description: "",
      product_images: undefined,
      images: undefined,

      preview_images: [],
      inventory_data: [],

      price: "",
      quantity: "",
      is_discount: "",
      discount_type: "",
      discount_value: "",
      discounted_product_price: "",

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

      currentPage: this.props.history.location.state ? this.props.history.location.state.pageIndex : 1,

      custoimzations: [],

      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
      subCatList: [{ _id: "", name: "Select" }],
      brandList: [{ _id: "", name: "Select" }],
    };
  }

  componentDidMount() {
    this.dataRender();
  }

  // DATA RENDER METHODS
  dataRender = async () => {
    let path = ApiRoutes.GET_PRODUCT + "/" + this.state.itemId;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        var productData = res.data[0];

        this.setState({
          business_category: productData.business_category._id,
          product_category: productData.product_category._id,
          product_subcategory: productData.product_subcategory._id,
          product_brand: productData.brand._id,
          name: productData.name,
          description: productData.description,
          preview_images: productData.images,
          inventory_data: productData.inventory,
        });

        this.getBusinessCategories();
        this.getPerentCategories(productData.business_category._id);
        this.getSubCategories(productData.business_category._id, productData.product_category._id);
        this.getBrands();
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }

    this.setState({ isLoading: true });
  };

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

  onDeleteImage = async (image_id, index) => {
    let previewImagesClone = Object.assign([], this.state.preview_images);

    if (previewImagesClone.length > 1) {
      let formData = new FormData();
      formData.append("product_id", this.state.itemId);
      formData.append("product_image_id", image_id);

      let path = ApiRoutes.DELETE_PRODUCT_IMAGE;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          previewImagesClone.splice(index, 1);
          this.setState({ preview_images: previewImagesClone });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      var message = "Upload a new image to delete this. There should atleast one image for a product.";
      NotificationManager.error(message, "Error!", 3000);
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

  handleProductFormSubmit = async (inputValues, formOptions) => {
    let formData = new FormData();
    formData.append("business_category_id", this.state.business_category);
    formData.append("category_id", this.state.product_category);
    formData.append("sub_category_id", this.state.product_subcategory);
    formData.append("brand_id", this.state.product_brand);
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);

    formData.append("product_images", undefined);
    if (this.state.images) {
      for (let i = 0; i < this.state.images.length; i++) {
        formData.append("product_images", this.state.images[i]);
      }
    }

    let path = ApiRoutes.UPDATE_PRODUCT_DETAILS + "/" + this.state.itemId;
    const res = await Http("PUT", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        this.props.history.push({ pathname: `/app/products`, state: { pageIndex: this.state.currentPage } });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  // ADD NEW INVENTORY
  onAddNewInventory = () => {
    var newInvObj = {
      _id: "",
      product_id: this.state.itemId,
      inventory_name: "",
      price: "",
      is_discount: "",
      discount_type: "",
      discount_value: "",
      discounted_product_price: "",
      sku_code: "",
      sku_name: "",
      batch: "",
      product_quantity: "",
      ProductCustomizationData: [],
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

    this.setState((prevState) => ({
      inventory_data: [...prevState.inventory_data, newInvObj],
    }));
  };

  onDeleteInventory = async (inventoryId, index) => {
    let inventoryDataClone = Object.assign([], this.state.inventory_data);

    if (inventoryDataClone[index]._id != "") {
      var savedInventories = 0;

      for (var i = 0; i < inventoryDataClone.length; i++) {
        if (inventoryDataClone[i]._id != "") {
          savedInventories++;
        }
      }

      if (savedInventories > 1) {
        let path = ApiRoutes.DELETE_PRODUCT_INVENTORY_DATA + "/" + inventoryDataClone[index]._id;
        const res = await Http("DELETE", path);
        if (res) {
          if (res.status == 200) {
            inventoryDataClone.splice(index, 1);
            this.setState({ inventory_data: inventoryDataClone });
          } else {
            NotificationManager.error(res.message, "Error!", 3000);
          }
        } else {
          NotificationManager.error("Server Error", "Error!", 3000);
        }
      } else {
        var message = "Add a new inventory to delete this. There should atleast one saved inventory for a product.";
        NotificationManager.error(message, "Error!", 3000);
      }
    } else {
      inventoryDataClone.splice(index, 1);
      this.setState({ inventory_data: inventoryDataClone });
    }
  };

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="heading.edit-product" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" sm="12">
            <Card>
              <CardBody>
                <h6 className="mb-4">Product Basic Details</h6>

                <Formik
                  enableReinitialize
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
                  onSubmit={this.handleProductFormSubmit}
                >
                  {({ handleProductFormSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
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
                              onChange={(event) => {
                                setFieldValue(
                                  "description",
                                  event.target.value
                                );
                                this.setState({
                                  description: event.target.value,
                                });
                              }}
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
                          {this.state.preview_images.map((item, index) => {
                            return (
                              <div key={index} className="product-img-box-outer">
                                <div id="product-img-box">
                                  <img alt={item.product_image_thumb_url} src={item.product_image_thumb_url} className="img-thumbnail border-0 list-thumbnail align-self-center image-preview" />
                                </div>
                                <div id="delete-btn-box">
                                  <Button
                                    outline
                                    color="danger"
                                    size="xs"
                                    className="mb-2"
                                    title="Delete"
                                    onClick={(e) => window.confirm("Are you sure to delete this record?") && this.onDeleteImage(item._id, index)}
                                  >
                                    <div className="glyph-icon simple-icon-trash"></div>
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </Colxx>
                      </Row>

                      <Button color="primary" type="submit" innerRef={this.submitBtnRef}>
                        <IntlMessages id="button.save" />
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        {this.state.inventory_data.map((item, index) => {
          return <EditInventoryForm {...this.props} key={index} inventoryItem={item} inventoryIndex={index} onDeleteInventory={this.onDeleteInventory} />;
        })}
        {/* {this.state.userRole &&
          this.state.userRole == 1 &&
          this.state.inventory_data.map((item, index) => {
            return (
              <EditWarehouseInvenotryForm
                key={index}
                inventoryItem={item}
                inventoryIndex={index}
                onDeleteInventory={this.onDeleteInventory}
              />
            );
          })} */}

        <Row style={{ marginTop: 30 }}>
          <Colxx xxs="12" sm="6">
            <Button onClick={this.onAddNewInventory} color="secondary" type="button">
              Add Inventory
            </Button>{" "}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(EditProduct);
