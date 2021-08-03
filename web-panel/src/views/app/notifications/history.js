import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import moment from "moment";

import "rc-switch/assets/index.css";
import Swal from "sweetalert2";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import { connect } from "react-redux";
import { updateNotificationCounter } from "../../../redux/actions";

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        addNewBtn: false,
        keyword: false,
        fromDate: true,
        toDate: true,
        orderOptions: false,
        statusOptions: false,
        pageSizes: true,
      },
      addNewItemRoute: "/app/add-customer",

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
    this.props.updateNotificationCounter(0);
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
      ApiRoutes.GET_NOTIFICATIONS +
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
          isLoading: false
        });
      } else {
        this.setState({ isLoading: false });
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      this.setState({ isLoading: false });
      NotificationManager.error("Server Error", "Error!", 3000);
    }
    //this.setState({ isLoading: true });
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
      () => this.dataListRender()
    );
  };

  onChangeFromDate = (e) => {
    this.setState(
      {
        filterFromDate: e.target.value,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };

  onChangeToDate = (e) => {
    this.setState(
      {
        filterToDate: e.target.value,
        currentPage: 1,
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

  render() {
    const { match } = this.props;
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize + 1;
    const endIndex = this.state.currentPage * this.state.selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.notifications"
            match={match}
            displayOpts={this.state.displayOpts}
            addNewItemRoute={this.state.addNewItemRoute}
            orderOptions={this.state.orderOptions}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            selectedOrderOption={this.state.selectedOrderOption}
            searchKeyword={this.state.searchKeyword}
            searchPlaceholder={this.state.searchPlaceholder}
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
                        <th>Title</th>
                        <th>Message</th>
                        <th>Customer Name</th>
                        <th>Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{this.state.selectedPageSize * (this.state.currentPage - 1) + index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.message}</td>
                            <td>{item.userData && item.userData.length > 0 && item.userData[0].username}</td>
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
//export default CustomersList;

const mapStateToProps = ({ globalstate }) => {
  const { notification_count } = globalstate;
  return {
    notification_count,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    updateNotificationCounter,
  })(CustomersList)
);
