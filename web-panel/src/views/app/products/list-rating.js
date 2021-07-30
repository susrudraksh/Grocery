import React, { Component, Fragment } from "react";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import moment from "moment";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import Swal from "sweetalert2";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

const swalWithBootstrapButtonsStatus = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-success",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      itemId: props.match.params.itemId,
      displayOpts: {
        //addNewBtn: true,
        keyword: true,
        // statusOptions: true,
        pageSizes: true,
      },
      addNewItemRoute: "/app/add-product",

      pageSizes: [10, 20, 30],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by Product Name",
      searchKeyword: "",
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
      ApiRoutes.GET_RATING_LIST +
      "/" +
      this.state.itemId +
      "?page_no=" +
      `${this.state.currentPage}` +
      "&limit=" +
      `${this.state.selectedPageSize}` +
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

  // Methods for Actions
  onChangeItemStatus = async (itemId, index, currentStatus, ratingId, ratingStatus) => {
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
          if (ratingStatus == "accept") {
            var newStatus = 1;
          } else if (ratingStatus == "reject") {
            var newStatus = 2;
          } else {
            var newStatus = 0;
          }
          //var newStatus = currentStatus == 1 ? 0 : 1;

          let formData = new FormData();
          formData.append("status", newStatus);

          let path = ApiRoutes.UPDATE_RATING_STATUS + "/" + itemId + "/" + ratingId;
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
            heading="menu.ratings"
            match={match}
            addNewItemRoute={this.state.addNewItemRoute}
            displayOpts={this.state.displayOpts}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            searchPlaceholder={this.state.searchPlaceholder}
            searchKeyword={this.state.searchKeyword}
            filterStatus={this.state.filterStatus}
            onSearchKey={this.onSearchKey}
            changePageSize={this.changePageSize}
            changeStatus={this.changeStatus}
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
                        <th>Product Inventory Name</th>
                        <th>Customer Name</th>
                        <th>Rating</th>
                        <th>Review</th>
                        {/* <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{item.inventory_name}</td>
                            <td>{item ? item.UserData.username : ""}</td>
                            <td>{item ? item.ratings.rating : ""}</td>
                            <td>{item ? item.ratings.review : ""}</td>

                            {/* <td>

                              {item &&  (item.ratings.status==0) ? (
                                <>
                                <Button
                                  outline
                                  color="success"
                                  size="xs"
                                  className="mb-2"
                                  onClick={(e) =>
                                    this.onChangeItemStatus(item._id, index, item.ratings.status, item.ratings._id, "accept")
                                  }
                                >
                                  Accept
                                  </Button>{" "}

                                <Button
                                  outline
                                  color="danger"
                                  size="xs"
                                  className="mb-2"
                                  onClick={(e) =>
                                    this.onChangeItemStatus(item._id, index, item.ratings.status, item.ratings._id, "reject")
                                  }
                                >
                                  Reject
                                    </Button>
                                    </>)
                                    :  
                                    (<Badge
                                    color={
                                      (item.ratings.status==1)
                                        ? "outline-success"
                                        : "outline-danger"
                                    }
                                    pill
                                  >
                                    {(item.ratings.status==1) ? (
                                      <IntlMessages id="label.accept" />
                                    ) : (
                                        <IntlMessages id="label.reject" />
                                      )}
                                  </Badge>)
                                }
                              </td> */}
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
export default ProductList;
