import React, { Component, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Button, Card, CardBody, Badge, Table, FormGroup, Label } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { FormikDatePicker, FormikReactSelect } from "../../../containers/form-validations/FormikFields";
import moment from "moment";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import Swal from "sweetalert2";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import { CSVLink, CSVDownload } from "react-csv";

const swalWithBootstrapButtonsStatus = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-success",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

const swalWithBootstrapButtonsDelete = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-danger",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

const FormSchema = Yup.object().shape({
  startDate: Yup.date().nullable().required("Start date is required"),
  endDate: Yup.date().nullable().required("End date is required"),
});

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        // addNewBtn: true,
        // keyword: true,
        fromDate: true,
        toDate: true,
        // orderOptions: false,
        // statusOptions: true,
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
    };
  }

  // LifeCycle Methods
  componentDidMount() {
    //  this.dataListRender();
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  handleSubmit = async (inputValues, formOptions) => {
    let startDate1 = new Date(inputValues.startDate);
    let endDate1 = new Date(inputValues.endDate);
    if (startDate1.getTime() > endDate1.getTime()) {
      formOptions.setFieldError("startDate", "Start Date cannot be greater than end date");
      return false;
    }
    this.setState({ isLoading: true });
    let formData = new FormData();
    formData.append("startDate", moment(inputValues.startDate).format("YYYY-MM-DD"));
    formData.append("endDate", moment(inputValues.endDate).format("YYYY-MM-DD"));
    formData.append("page_no", this.state.currentPage ? this.state.currentPage : 1);
    formData.append("limit", this.state.limit ? this.state.limit : undefined);

    let path = ApiRoutes.GET_SALE_ORDER_LISTS;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        this.setState({
          totalPage: res.data.totalPages,
          items: res.data.docs,
          totalItemCount: res.data.totalDocs,
        });

        let resultUsersJson = res.data || {};

        const csvData = [];

        resultUsersJson.docs.map((user, index) => {
          user.products.map((product, index) => {
            var gross = 0;
            gross = product.price * product.quantity;
            var discounted_amount = 0;
            discounted_amount = product.price - product.offer_price;
            discounted_amount = discounted_amount * product.quantity;
            var value = gross - discounted_amount;
            var tax_rate = product.tax_rate && product.tax_rate != 0 ? parseFloat(1 + product.tax_rate / 100) : 0;

            var taxable_amount = tax_rate != 0 ? value / tax_rate : 0;

            var cgst_rate = product.cgst_rate && product.cgst_rate != 0 ? product.cgst_rate / 100 : 0;
            var sgst_rate = product.sgst_rate && product.sgst_rate != 0 ? product.sgst_rate / 100 : 0;
            var igst_rate = product.igst_rate && product.igst_rate != 0 ? product.igst_rate / 100 : 0;

            var cgst_amount = 0;
            var sgst_amount = 0;
            var igst_amount = 0;

            var gst_amount = tax_rate != 0 ? value - taxable_amount : 0;
            var tax_type = product.tax_type;
            if (tax_type == 1) {
              cgst_amount = taxable_amount * cgst_rate;
              cgst_amount = cgst_amount.toFixed(2);
              sgst_amount = taxable_amount * sgst_rate;
              sgst_amount = sgst_amount.toFixed(2);
            } else {
              igst_amount = taxable_amount * igst_rate;
              igst_amount = igst_amount.toFixed(2);
            }

            const csvData1 = {};
            csvData1["Order No."] = user.order_id;
            csvData1["Invoice No."] = user.invoice_no && "ATW-" + user.invoice_no;
            csvData1["Order Date."] = moment(user.createdAt).format("lll");
            csvData1["Invoice Date."] = moment(user.createdAt).format("lll");
            csvData1["Delivery Date."] = user.delivery_date && user.delivery_date.time && moment(user.delivery_date.time).format("lll");
            csvData1["Delivery Type."] = "Door Drop";
            csvData1["Delivery Agent"] = user.driver_id[0] && user.driver_id[0].username;
            csvData1["Delivery Agent Phone"] = user.driver_id[0] && user.driver_id[0].phone;
            csvData1["Customer ID"] = user.user_id && "REG-" + user.user_id;
            csvData1["Customer Name"] = user.user_name;
            csvData1["Customer Contact No."] = user.phone;
            csvData1["Customer Type"] = "Normal";
            csvData1["Product Code"] = product.inventory_id.inventory_product_code;
            csvData1["Product Name-Inventory Name"] = product.product_id.name + "-" + product.inventory_id.inventory_name;
            csvData1["Business Category"] = product.business_category_id.name;
            csvData1["Product Category"] = product.product_id.category_id.name;
            csvData1["Product Sub categpry"] = product.product_id.sub_category_id.name;
            csvData1["Brand"] = product.product_id.brand_id.name;
            csvData1["Warehouse Name"] = user.warehouse_id.name;
            csvData1["HSN"] = product.inventory_id.hsn_code;
            csvData1["Payment Mode"] = user.payment_mode;
            csvData1["MRP"] = product.price;
            csvData1["Qty"] = product.quantity;
            csvData1["Gross"] = gross;
            csvData1["Discount % per unit"] = "";
            csvData1["Disc. Amount"] = discounted_amount / product.quantity;
            csvData1["Total Discount"] = discounted_amount;
            csvData1["Value (gross-disc)"] = value;
            csvData1["Taxable Amount"] = taxable_amount;
            csvData1["GST Rate"] = product.tax_rate;
            csvData1["GST Amount"] = gst_amount;
            csvData1["CGST Rate"] = product.cgst_rate;
            csvData1["CGST Amount"] = cgst_amount;
            csvData1["SGST Rate"] = product.sgst_rate;
            csvData1["SGST Amount"] = sgst_amount;
            csvData1["IGST Rate"] = product.igst_rate;
            csvData1["IGST Amount"] = igst_amount;
            csvData1["Net Amount"] = value;
            csvData1["Vendor/Company"] = "";
            csvData1["Additional Disc. Type"] = "";
            csvData1["Discount %"] = "";
            csvData1["Promo code"] = user.promo_code && user.promo_code[0];
            csvData1["Additional Discount Amount"] = user.discounted_amount;
            csvData1["Round Off"] = "";
            csvData1["Shipping"] = user.delivery_fee;
            csvData1["Total Amount"] = value;
            csvData.push(csvData1);
          });
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
            <CSVLink data={(this.state.csvData && this.state.csvData) || []} filename={"gst-report.csv"}>
              <IntlMessages id="pages.download" />
            </CSVLink>
          </Button>
        </div>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <Breadcrumb heading="heading.gst-report" match={this.props.match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" sm="12">
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{
                      startDate: this.state.startDate,
                      endDate: this.state.endDate,
                    }}
                    validationSchema={FormSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Limit</Label>
                              <select
                                name="limit"
                                className="form-control"
                                value={values.limit}
                                onChange={(event) => {
                                  setFieldValue("limit", event.target.value);
                                  this.setState({ limit: event.target.value });
                                }}
                              >
                                <option value="">Select</option>,<option value="50">50</option>,<option value="100">100</option>,<option value="500">500</option>,<option value="1000">1000</option>
                              </select>
                              {errors.limit && touched.limit ? <div className="invalid-feedback d-block">{errors.limit}</div> : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label className="d-block">Start Date</Label>
                              <FormikDatePicker name="startDate" value={values.startDate} onChange={setFieldValue} onBlur={setFieldTouched} />
                              {errors.startDate && touched.startDate ? <div className="invalid-feedback d-block">{errors.startDate}</div> : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label className="d-block">End Date</Label>
                              <FormikDatePicker name="endDate" value={values.endDate} onChange={setFieldValue} onBlur={setFieldTouched} />
                              {errors.endDate && touched.endDate ? <div className="invalid-feedback d-block">{errors.endDate}</div> : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="3">
                            <Button color="primary" type="submit">
                              <IntlMessages id="button.submit" />
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
                          <th>User Name</th>
                          <th>Phone</th>
                          <th>Order Id</th>
                          <th>Payment Mode</th>
                          <th>Net Amount</th>
                          <th>Created On</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.user_name}</td>
                              <td>{item.phone}</td>
                              <td>{item.order_id}</td>
                              <td>{item.payment_mode}</td>
                              <td>{item.net_amount}</td>
                              <td>{moment(item.createdAt).format("lll")}</td>
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
