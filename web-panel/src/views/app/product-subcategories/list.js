import React, { Component, Fragment } from "react";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";

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

const swalWithBootstrapButtonsDelete = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-danger",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

class ProductCategoriesList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        addNewBtn: true,
        keyword: true,
        statusOptions: true,
        pageSizes: true,
      },
      addNewItemRoute: "/app/add-product-subcategory",

      pageSizes: [10, 20, 30],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by Category Name",
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
  async componentDidMount() {
    console.log(this.props.location, "history");
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
      ApiRoutes.GET_PRODUCT_SUBCATEGORIES +
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

  onSearchKey = (e) => {
    this.setState({
      searchKeyword: e.target.value.toLowerCase(),
      currentPage: 1,
    });
    if (e.key === "Enter") {
      this.dataListRender();
    }
  };

  changeStatus = (value) => {
    this.setState(
      {
        filterStatus: value,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
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

          let path = ApiRoutes.UPDATE_PRODUCT_SUBCATEGORY_STATUS + "/" + itemId;
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
          let path = ApiRoutes.DELETE_PRODUCT_SUBCATEGORY + "/" + itemId;
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

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.product-subcategories"
            match={match}
            addNewItemRoute={this.state.addNewItemRoute}
            displayOpts={this.state.displayOpts}
            pageSizes={this.state.pageSizes}
            selectedPageSize={this.state.selectedPageSize}
            searchPlaceholder={this.state.searchPlaceholder}
            searchKeyword={this.state.searchKeyword}
            filterStatus={this.state.filterStatus}
            onSearchKey={this.onSearchKey}
            changeStatus={this.changeStatus}
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
                        <th>Image</th>
                        <th>Sub Category Name</th>
                        <th>Business Category</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{this.state.selectedPageSize * (this.state.currentPage - 1) + index + 1}</td>
                            <td>
                              <img alt={item.name} src={item.image_path_thumb_url} className="img-thumbnail border-0 list-thumbnail align-self-center xsmall" />
                            </td>
                            <td>
                              <Link
                                to={{
                                  pathname: `edit-product-subcategory/${item._id}`,
                                  state: {
                                    pageIndex: this.state.currentPage,
                                  },
                                }}
                              >
                                {item.name}
                              </Link>
                            </td>
                            <td>{item.business_category_id ? item.business_category_id.name : ""}</td>
                            <td>
                              <Badge color={item.is_active ? "outline-success" : "outline-danger"} pill>
                                {item.is_active ? <IntlMessages id="label.active" /> : <IntlMessages id="label.inactive" />}
                              </Badge>
                            </td>
                            <td>
                              <Switch
                                className="custom-switch custom-switch-small custom-switch-primary-inverse"
                                checked={item.is_active == 1 ? true : false}
                                title={item.is_active ? "Deactivate" : "Activate"}
                                onChange={(e) => this.onChangeItemStatus(item._id, index, item.is_active)}
                              />{" "}
                              <Link
                                to={{
                                  pathname: `edit-product-subcategory/${item._id}`,
                                  state: {
                                    pageIndex: this.state.currentPage,
                                  },
                                }}
                              >
                                <Button outline color="info" size="xs" className="mb-2" title="Edit">
                                  <div className="glyph-icon simple-icon-note"></div>
                                </Button>
                              </Link>{" "}
                              <Button outline color="danger" size="xs" className="mb-2" title="Delete" onClick={(e) => this.onDeleteItem(item._id, index)}>
                                <div className="glyph-icon simple-icon-trash"></div>
                              </Button>
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
      </Fragment>
    );
  }
}
export default ProductCategoriesList;
