import React, { Component, Fragment } from "react";
import { Row, Button, Card, CardBody, Badge, Table } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import "rc-switch/assets/index.css";

import Pagination from "../../../containers/pages/Pagination";
import ListPageHeading from "../../../containers/pages/ListPageHeading";

import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

const swalWithBootstrapButtonsDelete = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-danger",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

class FaqList extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayOpts: {
        addNewBtn: true,
        keyword: false,
        statusOptions: false,
        pageSizes: false,
      },
      addNewItemRoute: "/app/add-faq",

      pageSizes: [10, 20, 30],
      selectedPageSize: 10,
      dropdownSplitOpen: false,

      searchPlaceholder: "Search by Question",
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

    let path = ApiRoutes.GET_FAQS;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          items: res.data.content_data.option_value,
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
          let path = ApiRoutes.DELETE_FAQ + "/" + itemId;
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
            heading="menu.faqs"
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
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.question}</td>
                            <td>{item.answer}</td>
                            <td>
                              <NavLink to={`edit-faq/${item.question_id}`}>
                                <Button outline color="info" size="xs" className="mb-2" title="Edit">
                                  <div className="glyph-icon simple-icon-note"></div>
                                </Button>
                              </NavLink>{" "}
                              <Button outline color="danger" size="xs" className="mb-2" title="Delete" onClick={(e) => this.onDeleteItem(item.question_id, index)}>
                                <div className="glyph-icon simple-icon-trash"></div>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}

                      {this.state.items.length == 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
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
export default FaqList;
