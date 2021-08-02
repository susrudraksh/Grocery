import React, { Component, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Button, Card, CardBody, Badge, Table, FormGroup, Label } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { FormikReactSelect } from "../../../containers/form-validations/FormikFields";

import "rc-switch/assets/index.css";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import { CSVLink, CSVDownload } from "react-csv";

const FormSchema = Yup.object().shape({
  physical_quantity: Yup.number().required("Please enter valid quantity").typeError("Please enter valid quantity"),
  // .test(
  //   'is-decimal',
  //   'invalid amount value',
  //   value => (value + "").match(/^\d*\.{1}\d*$/),
  // ),
});

var options = [];
class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        fromDate: false,
        toDate: false,
        pageSizes: true,
      },
      selectedOrderOption: { column: "createdAt", label: "Created On" },

      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by User Name, Email, Phone, Address",
      searchKeyword: "",
      filterFromDate: "",
      filterToDate: "",
      filterStatus: "",

      startDate: null,
      endDate: null,
      limit: "",

      items: [],
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      selectedItems: [],
      lastChecked: null,
      isLoading: false,

      product_inv_id: [],
      options: [],

      businessCatList: [{ _id: "", name: "Select" }],
      parentCatList: [{ _id: "", name: "Select" }],
      subCatList: [{ _id: "", name: "Select" }],
      productList: [{ id: "", name: "Select" }],
      physical_quantity: "",
      variance: "",
      ira: "",
      ph_quantity: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  componentDidMount() {
    this.getBusinessCategories();
  }

  getBusinessCategories = async () => {
    // this.state.isLoading = true;

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
    // this.state.isLoading = true;
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
    // this.state.isLoading = true;
    var productList = [{ id: "", name: "Select" }];
    options = [];
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

  handleSubmit = async (inputValues) => {
    this.setState({ isLoading: true });
    let formData = new FormData();
    formData.append("product_inv_id", inputValues.product_inv_id.value);

    let path = ApiRoutes.GET_RECONCILATION_REPORT;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        this.setState({
          totalPage: res.data.totalPages,
          items: res.data.docs,
          totalItemCount: res.data.totalDocs,
          ph_quantity: inputValues.physical_quantity,
        });

        let resultUsersJson = res.data || {};

        const csvData = [];

        resultUsersJson.docs.map((product, index) => {
          const csvData1 = {};
          csvData1["SKU Code"] = product.sku_name;
          csvData1["SKU Name"] = product.sku_code;
          csvData1["Batch"] = product.batch;
          csvData1["MRP"] = product.price;
          csvData1["Product Code"] = product.inventory_product_code ? product.inventory_product_code : "";

          csvData1["Prod Name"] = product.name + "-" + product.inventory_name;
          csvData1["Business Category"] = product.business_category.name;
          csvData1["Product Category"] = product.category.name;
          csvData1["Product Sub categpry"] = product.subcategory.name;
          csvData1["Physical quantity"] = inputValues.physical_quantity;
          csvData1["Available quantity"] = product.available_quantity;
          csvData1["variance"] = inputValues.physical_quantity - product.available_quantity;
          csvData1["ira"] = (product.available_quantity * inputValues.physical_quantity) / 100;

          csvData.push(csvData1);
        });

        this.setState({ csvData: csvData, isLoading: false });
        NotificationManager.success(res.message, "Success!", 3000);
        //this.props.history.push("/app/customization-types");
      } else {
        this.setState({ isLoading: false });
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      this.setState({ isLoading: false });
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  // Methods for Filters Actions
  changeOrderBy = (column) => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find((x) => x.column === column),
      },
      () => this.dataListRender()
    );
  };

  changeStatus = (value) => {
    this.setState(
      {
        filterStatus: value,
      },
      () => this.dataListRender()
    );
  };

  changePageSize = (size) => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };

  onChangePage = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.handleSubmit()
    );
  };

  onResetFilters = () => {
    this.setState(
      {
        selectedOrderOption: { column: "createdAt", label: "Created On" },
        selectedPageSize: 10,
        currentPage: 1,
        searchKeyword: "",
        filterFromDate: "",
        filterToDate: "",
        filterStatus: "",
      },
      () => this.dataListRender()
    );
  };

  render() {
    const { match } = this.props;
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize + 1;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;

    return (
      <Fragment>
        <div>
          <Button color="primary downloadcsv" size="xs" style={{ float: "right" }}>
            <CSVLink data={(this.state.csvData && this.state.csvData) || []} filename={"reconcilation-analysis.csv"}>
              <IntlMessages id="pages.download" />
            </CSVLink>
          </Button>
        </div>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="heading.reconcilation-report" match={this.props.match} />
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
                      physical_quantity: this.state.physical_quantity,
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

                              <FormikReactSelect name="product_inv_id" id="product_inv_id" value={values.product_inv_id} options={values.options} onChange={setFieldValue} onBlur={setFieldTouched} />
                              {errors.product_inv_id && touched.product_inv_id ? <div className="invalid-feedback d-block">{errors.product_inv_id}</div> : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx xxs="12" sm="6">
                            <FormGroup className="form-group has-float-label">
                              <Label>Physical quantity</Label>
                              <Field className="form-control" name="physical_quantity" type="text" />
                              {errors.physical_quantity && touched.physical_quantity ? <div className="invalid-feedback d-block">{errors.physical_quantity}</div> : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="3">
                            <Button color="primary" type="submit">
                              <IntlMessages id="button.calculate" />
                            </Button>
                          </Colxx>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          <br />
          {this.state.isLoading ? (
            <div className="loading" />
          ) : (
            <Row>
              <Colxx xxs="12">
                <Card className="mb-4">
                  <CardBody>
                    <Table hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>SKU code</th>
                          <th>SKU name</th>
                          <th>Batch</th>
                          <th>Physical Quantity</th>
                          <th>Available Quantity</th>
                          <th>Variance</th>
                          <th>IRA(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.sku_code}</td>
                              <td>{item.sku_name}</td>
                              <td>{item.batch}</td>
                              <td>{this.state.ph_quantity}</td>
                              <td>{item.available_quantity}</td>
                              <td>{this.state.ph_quantity - item.available_quantity}</td>
                              <td>{(item.available_quantity * this.state.ph_quantity) / 100}</td>
                            </tr>
                          );
                        })}

                        {this.state.items.length == 0 && (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>

                    {/* <Pagination
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    onChangePage={(i) => this.onChangePage(i)}
                  /> */}
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          )}
        </div>
      </Fragment>
    );
  }
}
export default CustomersList;
