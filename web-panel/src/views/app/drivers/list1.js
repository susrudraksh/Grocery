import React, { Component, Fragment } from "react";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import moment from "moment";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import Swal from "sweetalert2";

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

class DriversList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        addNewBtn: true,
        keyword: true,
        fromDate: true,
        toDate: true,
        orderOptions: false,
        statusOptions: true,
        pageSizes: true,
      },
      addNewItemRoute: "/app/add-driver",

      orderOptions: [
        { column: "createdAt", label: "Created On" },
        { column: "user_name", label: "User Name" },
        { column: "email", label: "Email" },
        { column: "status", label: "Status" },
      ],
      selectedOrderOption: { column: "createdAt", label: "Created On" },

      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by User Name, Email, Phone, Address",
      searchKeyword: "",
      filterFromDate: "",
      filterToDate: "",
      filterStatus: "",

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
    this.dataListRender();
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  // Methods for Data Rendering
  dataListRender = async () => {
    this.state.isLoading = true;

    let path =
      ApiRoutes.GET_DRIVERS +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
      "&order_by=" +
      `${this.state.selectedOrderOption.column}` +
      "&start_date=" +
      `${this.state.filterFromDate == "" ? "" : moment(this.state.filterFromDate).format("YYYY-MM-DD")}` +
      "&end_date=" +
      `${this.state.filterToDate == "" ? "" : moment(this.state.filterToDate).format("YYYY-MM-DD")}` +
      "&status=" +
      `${this.state.filterStatus}` +
      "&keyword=" +
      `${this.state.searchKeyword}`;

    const res = await Http("GET", path);

    if (res) {
      if (res.status == 200) {
        this.setState({
          totalPage: res.data.totalPages,
          items: res.data.docs,
          totalItemCount: res.data.totalDocs,
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }

    this.setState({ isLoading: true });
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
  };

  onSearchKey = (e) => {
    this.setState({
      searchKeyword: e.target.value.toLowerCase(),
    });

    if (e.key === "Enter") {
      this.dataListRender();
    }
  };

  changeStatus = (value) => {
    this.setState(
      {
        filterStatus: value,
      },
      () => this.dataListRender()
    );
  };

  onChangeFromDate = (e) => {
    this.setState(
      {
        filterFromDate: e.target.value,
      },
      () => this.dataListRender()
    );
  };

  onChangeToDate = (e) => {
    this.setState(
      {
        filterToDate: e.target.value,
      },
      () => this.dataListRender()
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

  // Methods for Actions
  onChangeItemStatus = async (itemId, index, currentStatus) => {
    swalWithBootstrapButtonsStatus
      .fire({
        title: "<h5><b>Are you sure?</b></h5>",
        text: "You want change status !",
        type: "success",
        width: 315,
        heightAuto: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: '<span class="btn-wrapper--label">Yes</span>',
        cancelButtonText: '<span class="btn-wrapper--label">Cancel</span>',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.value) {
          var newStatus = currentStatus == 1 ? 0 : 1;

          let formData = new FormData();
          formData.append("status", newStatus);

          let path = ApiRoutes.UPDATE_DRIVER_STATUS + "/" + itemId;
          const res = await Http("PUT", path, formData);

          if (res.status == 200) {
            this.dataListRender();

            NotificationManager.success(res.message, "Success!", 3000);
          } else {
            NotificationManager.error(res.message, "Error!", 3000);
          }
        }
      });
  };

  onDeleteItem = async (itemId, index) => {
    swalWithBootstrapButtonsDelete
      .fire({
        title: "<h5><b>Are you sure you want to delete this entry?</b></h5>",
        text: "You cannot undo this operation.",
        type: "error",
        width: 315,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: '<span class="btn-wrapper--label">Delete</span>',
        cancelButtonText: '<span class="btn-wrapper--label">Cancel</span>',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.value) {
          let path = ApiRoutes.DELETE_DRIVER + "/" + itemId;
          const res = await Http("DELETE", path);
          if (res) {
            if (res.status == 200) {
              this.dataListRender();

              NotificationManager.success(res.message, "Success!", 3000);
            } else {
              NotificationManager.error(res.message, "Error!", 3000);
            }
          } else {
            NotificationManager.error("Server Error", "Error!", 3000);
          }
        }
      });
  };

  render() {
    const { match } = this.props;
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize + 1;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.drivers"
            match={match}
            displayOpts={this.state.displayOpts}
            addNewItemRoute={this.state.addNewItemRoute}
            orderOptions={this.state.orderOptions}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            selectedOrderOption={this.state.selectedOrderOption}
            searchPlaceholder={this.state.searchPlaceholder}
            searchKeyword={this.state.searchKeyword}
            filterFromDate={this.state.filterFromDate}
            filterToDate={this.state.filterToDate}
            filterStatus={this.state.filterStatus}
            onSearchKey={this.onSearchKey}
            onChangeFromDate={this.onChangeFromDate}
            onChangeToDate={this.onChangeToDate}
            changeOrderBy={this.changeOrderBy}
            changeStatus={this.changeStatus}
            changePageSize={this.changePageSize}
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
                        <th>#</th>
                        <th>Image</th>
                        <th>User Name</th>
                        <th>User Code</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Online Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img alt={item.username} src={item.user_image_thumb_url} className="img-thumbnail border-0 list-thumbnail align-self-center xsmall" />
                            </td>
                            <td>
                              <NavLink to={`edit-driver/${item._id}`}>{item.username}</NavLink>
                            </td>
                            <td>{item.register_id}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                              <Badge color={item.is_active ? "outline-success" : "outline-danger"} pill>
                                {item.is_active ? <IntlMessages id="label.active" /> : <IntlMessages id="label.inactive" />}
                              </Badge>
                            </td>
                            <td>{moment(item.createdAt).format("lll")}</td>
                            <td>
                              <Switch
                                className="custom-switch custom-switch-small custom-switch-primary-inverse"
                                checked={item.is_active == 1 ? true : false}
                                title={item.is_active ? "Deactivate" : "Activate"}
                                onChange={(e) => this.onChangeItemStatus(item._id, index, item.is_active)}
                              />{" "}
                              <NavLink to={`edit-driver/${item._id}`}>
                                <Button outline color="info" size="xs" className="mb-2" title="Edit">
                                  <div className="glyph-icon simple-icon-note"></div>
                                </Button>
                              </NavLink>{" "}
                              <Button outline color="danger" size="xs" className="mb-2" title="Delete" onClick={(e) => this.onDeleteItem(item._id, index)}>
                                <div className="glyph-icon simple-icon-trash"></div>
                              </Button>
                            </td>
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

                  <Pagination currentPage={this.state.currentPage} totalPage={this.state.totalPage} onChangePage={(i) => this.onChangePage(i)} />
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default DriversList;
