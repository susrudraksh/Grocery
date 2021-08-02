"use strict";

import React, { Component, Fragment, StrictMode } from "react";
import { Row, Button, Card, CardBody, Table, Modal, ModalHeader, FormGroup, Label, ModalBody, ModalFooter, Input, CustomInput } from "reactstrap";
import _ from "lodash";
import moment from "moment";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import "rc-switch/assets/index.css";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";
import IntlMessages from "../../../helpers/IntlMessages";

import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

const FormSchema = Yup.object().shape({
  driver_id: Yup.string().required("Please select available driver"),
});

const newstatus = ["", "Assigned", "Completed", "Rejected", "Cancelled", "Cancelled/Rejected"];

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        keyword: true,
        pageSizes: true,
        orderStatus: true,
        activeItemId: null,
      },
      modal: false,

      activeDriverList: [{ _id: "", username: "Select Driver" }],

      pageSizes: [10, 20, 30],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by Order Number",
      searchKeyword: "",
      filterStatus: "",

      items: [],
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      ischecked: false,
      user_permissions: [],
      warehouseId: "",
    };
  }

  // LifeCycle Methods
  async componentDidMount() {
    (await this.props.history.location.state) ? this.setState({ currentPage: this.props.history.location.state.pageIndex }) : this.setState({ currentPage: 1 });

    this.dataListRender();
  }

  getActiveDrivers = async () => {
    // this.state.isLoading = true;
    this.setState({ isLoading: true });
    // let path = ApiRoutes.GET_ACTIVE_DRIVERS + "?page_no=1&limit=100";
    let path = ApiRoutes.GET_ACTIVE_DRIVERS;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({ activeDriverList: [""] });
        this.setState({
          activeDriverList: [...this.state.activeDriverList, ...res.data],
          isLoading: false,
        });
      } else {
        this.setState({ isLoading: false });
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      this.setState({ isLoading: false });
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  dataListRender = async () => {
    // this.state.isLoading = true;
    this.setState({ isLoading: true });
    let path =
      ApiRoutes.GET_ORDERS +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
      "&keyword=" +
      `${this.state.searchKeyword}` +
      "&order_status=" +
      `${this.state.filterStatus}`;
    // {
    //   this.state.filterStatus == "" && this.setState({ isLoading: true });
    // }

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          items: res.data.docs,
          totalPage: res.data.totalPages,
          totalItemCount: res.data.totalDocs,
          filterStatus: this.state.filterStatus,
          isLoading: false,
        });
      } else {
        this.setState({ isLoading: false });
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
    // this.setState({ isLoading: true });
  };

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  // Methods for Filters Actions
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
      () => this.dataListRender()
    );
    this.props.history.push({ pathname: this.props.location.pathname, state: { pageIndex: page } });
  };

  onSearchKey = (e) => {
    this.setState({
      searchKeyword: e.target.value.toLowerCase(),
      currentPage: 1,
    });

    if (e.key === "Enter") {
      this.dataListRender();
    }
  };

  changeOrderStatus = (value) => {
    this.setState(
      {
        filterStatus: value,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };

  onSearchFilters = () => {
    this.setState(
      {
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };

  onResetFilters = () => {
    this.setState(
      {
        selectedPageSize: 10,
        currentPage: 1,
        searchKeyword: "",
        filterStatus: "",
      },
      () => this.dataListRender()
    );
  };

  toggle = (item) => {
    this.getActiveDrivers();
    this.setState((prevState) => ({
      modal: !prevState.modal,
      //activeItemId: item.name,
    }));
  };

  handleSubmit = async (inputValues) => {
    if (!_.isEmpty(this.state.user_permissions)) {
      let formData = new FormData();

      formData.append("driver_id", inputValues.driver_id);
      formData.append("order_arr", JSON.stringify(this.state.user_permissions));

      let path = ApiRoutes.ASSIGN_ORDER;
      const res = await Http("POST", path, formData);
      if (res) {
        if (res.status == 200) {
          NotificationManager.success(res.message, "Success!", 3000);
          window.location.reload();
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      NotificationManager.error("Please select atleast one order.", "Error!", 3000);
    }
  };

  handleChangePermissions = (e, warehouse_id) => {
    var checked_value = e.target.value;
    var is_checked = e.target.checked;
    var user_permissions = this.state.user_permissions;

    // if any permission is checked
    if (is_checked) {
      if (!user_permissions) {
        user_permissions = [];
      }
      user_permissions.push(checked_value);
    } else {
      let index = user_permissions.indexOf(checked_value);
      user_permissions.splice(index, 1);

      if (user_permissions.length == 0) {
        //delete user_permissions;
      }
    }
    this.setState({ user_permissions: user_permissions });
  };

  render() {
    const { ischecked } = this.state;
    const { match } = this.props;
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize + 1;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div>
          <Button color="primary" size="xs" className="top-right-button" style={{ float: "right" }} onClick={() => this.toggle()}>
            <IntlMessages id="pages.assign-new" />
          </Button>
        </div>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.orders"
            match={match}
            displayOpts={this.state.displayOpts}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            searchPlaceholder={this.state.searchPlaceholder}
            searchKeyword={this.state.searchKeyword}
            filterStatus={this.state.filterStatus}
            onSearchKey={this.onSearchKey}
            changePageSize={this.changePageSize}
            changeOrderStatus={this.changeOrderStatus}
            onSearchFilters={this.onSearchFilters}
            onResetFilters={this.onResetFilters}
            totalItemCount={this.state.totalItemCount}
            startIndex={startIndex}
            endIndex={endIndex}
          />

          <Row>
            <Colxx xxs="12">
              <Card className="mb-4">
                <CardBody>
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                          Select order
                          {/* <FormGroup className="mb-0">
                              <CustomInput
                                type="checkbox"
                                id="check1"
                                label=""
                                title="Select All"
                              // onChange={this.Itemschecked}
                              />
                            </FormGroup> */}
                        </th>
                        <th>Order#</th>
                        <th>Customer Name</th>
                        <th>Customer Phone Number</th>
                        <th>Order Status</th>
                        <th>Order On</th>
                        <th>Total Price</th>
                        <th>Discounted Price</th>
                        <th>Payment Mode</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {(() => {
                                if (item.hasOwnProperty("driver_id")) {
                                  if (item.driver_id.length == 0 && item.order_status == 0) {
                                    return (
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) => {
                                          this.handleChangePermissions(e, item.warehouse_id);
                                        }}
                                        id={item._id}
                                        name={item._id}
                                        data-module={item._id}
                                        value={item._id}
                                      />
                                    );
                                  } else {
                                    if (item.order_status > 2) {
                                      return <div>Not Available</div>;
                                    } else {
                                      return <div>Assigned</div>;
                                    }
                                  }
                                } else {
                                  if (item.order_status > 2) {
                                    return <div>Not Available</div>;
                                  } else {
                                    return (
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) => {
                                          this.handleChangePermissions(e, item.warehouse_id);
                                        }}
                                        id={item._id}
                                        name={item._id}
                                        data-module={item._id}
                                        value={item._id}
                                      />
                                    );
                                  }
                                }
                              })()}

                              {/* {!item.hasOwnProperty('driver_id') && item.driver_id == "" ?
                                  (<Input
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(e) => {
                                      this.handleChangePermissions(e, item.warehouse_id);
                                    }}
                                    id={item._id}
                                    name={item._id}
                                    data-module={item._id}
                                    value={item._id}
                                  />) : "Assigned"
                                } */}
                            </td>
                            <td>{item.order_id}</td>
                            <td>{item.user_name} </td>
                            <td>{item.phone} </td>
                            <td>{item.order_status != 0 ? newstatus[item.order_status] : "Pending"}</td>
                            <td>{moment(item.createdAt).format("lll")}</td>
                            <td>{item.net_amount}</td>
                            <td>{item.discounted_amount}</td>
                            <td>{item.payment_mode}</td>

                            <td>
                              {/* {
                                (item.driver_id.length == 0)?
                                <Button
                                  outline
                                  color="primary"
                                  size="xs"
                                  className="mb-2"
                                  title="Available Drivers"
                                  onClick={() => this.toggle(item)}
                                >
                                  <div
                                    className="glyph-icon simple-icon-user"
                                    item={item}
                                  ></div>
                                </Button> 
                                :""} */}
                              <NavLink to={`order-detail/${item._id}`}>
                                <Button outline color="info" size="xs" className="mb-2" title="More info">
                                  <div className="glyph-icon simple-icon-info" item={item}></div>
                                </Button>
                              </NavLink>{" "}
                            </td>
                          </tr>
                        );
                      })}

                      {this.state.items.length == 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  <Pagination currentPage={this.state.currentPage} totalPage={this.state.totalPage} onChangePage={(i) => this.onChangePage(i)} />
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{"Assign Driver"}</ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                driver_id: this.state.driver_id,
              }}
              validationSchema={FormSchema}
              onSubmit={this.handleSubmit}
            >
              {({ handleSubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="align-items-center">
                    <Colxx className="text-center" xxs="12" sm="4">
                      <Label>Drivers</Label>
                    </Colxx>
                    <Colxx xxs="12" sm="8">
                      <FormGroup className="form-group has-float-label">
                        <select
                          name="driver_id"
                          className="form-control"
                          value={values.driver_id}
                          onChange={(event) => {
                            setFieldValue("driver_id", event.target.value);
                          }}
                        >
                          <option value="">Assign Driver</option>
                          {this.state.activeDriverList.length > 0 &&
                            this.state.activeDriverList.map((item, index) => {
                              return (
                                <option key={index} value={item._id}>
                                  {item.username}
                                </option>
                              );
                            })}
                        </select>

                        {errors.driver_id && touched.driver_id ? <div className="invalid-feedback d-block">{errors.driver_id}</div> : null}
                      </FormGroup>
                    </Colxx>
                  </Row>

                  <ModalFooter>
                    <Button color="primary" type="submit">
                      Assign
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default OrderList;
