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
import OrdersList from "../../../data/orders";

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        keyword: true,
        pageSizes: true,
        // fromDate: true,
        // toDate: true,
      },

      pageSizes: [10, 20, 30],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by Transaction Number",
      searchKeyword: "",
      filterStatus: "",
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
  async componentDidMount() {
    (await this.props.history.location.state) ? this.setState({ currentPage: this.props.history.location.state.pageIndex }) : this.setState({ currentPage: 1 });

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
      ApiRoutes.GET_TRANSACTION_LIST +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
      "&start_date=" +
      `${this.state.filterFromDate == "" ? "" : moment(this.state.filterFromDate).format("YYYY-MM-DD")}` +
      "&end_date=" +
      `${this.state.filterToDate == "" ? "" : moment(this.state.filterToDate).format("YYYY-MM-DD")}` +
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
        filterFromDate: "",
        filterToDate: "",
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
            heading="menu.transactions"
            match={match}
            displayOpts={this.state.displayOpts}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            searchPlaceholder={this.state.searchPlaceholder}
            searchKeyword={this.state.searchKeyword}
            filterStatus={this.state.filterStatus}
            filterFromDate={this.state.filterFromDate}
            filterToDate={this.state.filterToDate}
            onSearchKey={this.onSearchKey}
            changePageSize={this.changePageSize}
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
                        <th>#</th>
                        <th>Transaction#</th>
                        <th>Customer Name</th>
                        <th>Transaction Date</th>
                        <th>Reason</th>
                        <th>Amount</th>
                        <th>Payment Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{this.state.selectedPageSize * (this.state.currentPage - 1) + index + 1}</td>
                            <td>{item.transition_id} </td>
                            <td>{item.userData.username} </td>
                            <td>{moment(item.createdAt).format("ll")} </td>
                            <td style={{ textTransform: "capitalize" }}>{item.reason}</td>
                            <td>{item.amount}</td>
                            <td>{item.payment_type ? item.payment_type : "-"}</td>
                            {/* <td> <Badge color={item.statusColor} pill>
                                {item.status}
                              </Badge>
                              </td> */}
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
      </Fragment>
    );
  }
}
export default TransactionList;
