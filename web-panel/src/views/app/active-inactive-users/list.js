import React, { Component, Fragment } from "react";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink, Link } from "react-router-dom";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        //addNewBtn: true,
        //keyword: true,
        // fromDate: true,
        //toDate: true,
        //orderOptions: false,

        // statusOptions: true,
        daysOptions: true,
        amountOptions: true,
        pageSizes: true,
        activeOptions: true,
      },

      // addNewItemRoute: "/app/add-customer",

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
      daysStatus: "",
      amountStatus: "",
      filterStatus: "",

      items: [],
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      activeStatus: 1,
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
    this.setState({ isLoading: true });

    let path =
      ApiRoutes.GET_CUSTOMERS +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
      "&order_by=" +
      `${this.state.selectedOrderOption.column}` +
      "&days_limit=" +
      `${this.state.daysStatus}` +
      "&amount_limit=" +
      `${this.state.amountStatus}` +
      "&status=" +
      `${this.state.activeStatus}` +
      "&keyword=" +
      `${this.state.searchKeyword}`;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          totalPage: res.data.totalPages,
          items: res.data.docs,
          totalItemCount: res.data.totalDocs,
          isLoading: false,
        });

        let resultUsersJson = res.data || {};

        this.setState({ pageSize: resultUsersJson.limit, users: resultUsersJson, totalDocs: res.data.totalDocs, totalPages: res.data.totalPages, activePage: resultUsersJson.page || 1 });
        const csvData = [];

        resultUsersJson.docs.map((user, index) => {
          const csvData1 = {};
          csvData1["username"] = user.username;
          csvData1["phone"] = user.phone;
          csvData1["email"] = user.email;
          csvData1["status"] = user.is_active ? "Active" : "Inactive";
          csvData.push(csvData1);
        });

        this.setState({ csvData: csvData });
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

  onSearchKey = (e) => {
    this.setState({
      searchKeyword: e.target.value.toLowerCase(),
    });

    if (e.key === "Enter") {
      this.dataListRender();
    }
  };

  changeActiveStatus = (value) => {
     this.setState(
      {
       activeStatus: value,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };
  changeDaysStatus = (value) => {
    this.setState(
      {
        daysStatus: value,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };
  changeAmountStatus = (value) => {
    this.setState(
      {
        amountStatus: value,
        currentPage: 1,
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

  onResetFilters = () => {
    this.setState(
      {
        selectedOrderOption: { column: "createdAt", label: "Created On" },
        selectedPageSize: 10,
        currentPage: 1,
        filterStatus: "",
        daysStatus: "",
        amountStatus: "",
        activeStatus: 1,
      },
      () => this.dataListRender()
    );
  };

  // Methods for Actions
  onChangeItemStatus = async (itemId, index, currentStatus) => {
    var newStatus = currentStatus == 1 ? 0 : 1;

    let formData = new FormData();
    formData.append("status", newStatus);

    let path = ApiRoutes.UPDATE_CUSTOMER_STATUS + "/" + itemId;
    const res = await Http("PUT", path, formData);
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
  };

  onDeleteItem = async (itemId, index) => {
    let path = ApiRoutes.DELETE_CUSTOMER + "/" + itemId;
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
  };

  render() {
    const { match } = this.props;
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize + 1;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div>
          <Button color="primary" size="xs" style={{ float: "right", color: "white" }}>
            <CSVLink data={(this.state.csvData && this.state.csvData) || []} filename={"user-list.csv"} style={{ color: "white" }}>
              <IntlMessages id="pages.download" />
            </CSVLink>
          </Button>
        </div>

        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.customers"
            match={match}
            displayOpts={this.state.displayOpts}
            orderOptions={this.state.orderOptions}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            selectedOrderOption={this.state.selectedOrderOption}
            searchKeyword={this.state.searchKeyword}
            searchPlaceholder={this.state.searchPlaceholder}
            filterFromDate={this.state.filterFromDate}
            filterToDate={this.state.filterToDate}
            // filterStatus={this.state.filterStatus}
            daysStatus={this.state.daysStatus}
            amountStatus={this.state.amountStatus}
            onSearchKey={this.onSearchKey}
            onChangeFromDate={this.onChangeFromDate}
            onChangeToDate={this.onChangeToDate}
            changeOrderBy={this.changeOrderBy}
            // changeStatus={this.changeStatus}
            changeDaysStatus={this.changeDaysStatus}
            changeAmountStatus={this.changeAmountStatus}
            changePageSize={this.changePageSize}
            onResetFilters={this.onResetFilters}
            totalItemCount={this.state.totalItemCount}
            startIndex={startIndex}
            endIndex={endIndex}
            activeStatus={this.state.activeStatus}
            changeActiveStatus={this.changeActiveStatus}
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
                        <th>Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{this.state.selectedPageSize * (this.state.currentPage - 1) + index + 1}</td>
                            <td>
                              <img alt={item.username} src={item.user_image_thumb_url} className="img-thumbnail border-0 list-thumbnail align-self-center xsmall" />
                            </td>
                            <td>
                              <Link
                                to={{
                                  pathname: `edit-customer/${item._id}`,
                                  state: {
                                    pageIndex: this.state.currentPage,
                                  },
                                }}
                              >
                                {/* <NavLink to={`edit-customer/${item._id}`}> */}
                                {item.username}
                              </Link>
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
export default CustomersList;
