import React, { Component } from "react";
import { Row, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Collapse, Tooltip, Popover, PopoverBody } from "reactstrap";
import { injectIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";

var statusOptions = [
  { column: "", label: "All" },
  { column: "1", label: "Active" },
  { column: "0", label: "Inactive" },
];
var daysOptions = [
  { value: "", label: "Select" },
  { value: "1", label: "Last 30 Days" },
  { value: "2", label: "Last 60 Days" },
  { value: "3", label: "Last 90 Days" },
];
var amountOptions = [
  { value: "", label: "Select" },
  { value: "20", label: "20 K" },
  { value: "40", label: "40 K" },
];
var orderStatus = [
  { value: "", label: "Select" },
  { value: "", label: "All" },
  { value: "2", label: "Passed" },
  { value: "1", label: "Current" },
];

class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      popoverOpen: false,
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      selectedStatusOption: statusOptions[0],
      selectedDaysOption: daysOptions[0],
      selectedAmountOption: amountOptions[0],
      selectedOrderStatus: orderStatus[0],
    };
  }

  togglePopover = () => {
    this.setState((prevState) => ({
      popoverOpen: !prevState.popoverOpen,
    }));
  };

  showPopover = () => {
    this.setState((prevState) => ({ popoverOpen: true }));
  };

  hidePopover = () => {
    this.setState((prevState) => ({ popoverOpen: false }));
  };

  toggleDisplayOptions = () => {
    this.setState((prevState) => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen,
    }));
  };

  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  render() {
    const { messages } = this.props.intl;
    const {
      heading,
      match,
      addNewItemRoute,
      displayOpts,
      orderOptions,
      pageSizes,
      selectedPageSize,
      selectedOrderOption,
      searchKeyword,
      searchPlaceholder,
      filterFromDate,
      filterToDate,
      filterStatus,
      onSearchKey,
      onChangeFromDate,
      onChangeToDate,
      changeOrderBy,
      changeStatus,
      changeDaysStatus,
      changeAmountStatus,
      changeOrderStatus,
      changePageSize,
      onResetFilters,
      onSearchFilters,
      totalItemCount,
      startIndex,
      endIndex,
      daysStatus,
      amountStatus,
    } = this.props;

    var newfilter = filterStatus;
    if(!newfilter || newfilter==""){
      newfilter = 0;
    }

    const { displayOptionsIsOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>

            {displayOpts && displayOpts.addNewBtn && (
              <div className="text-zero top-right-button-container">
                <NavLink to={addNewItemRoute}>
                  <Button color="primary" size="lg" className="top-right-button">
                    <IntlMessages id="pages.add-new" />
                  </Button>
                </NavLink>
              </div>
            )}

            <Breadcrumb match={match} />
          </div>

          {displayOpts && (displayOpts.addNewBtn || displayOpts.orderOptions || displayOpts.pageSizes || displayOpts.keyword || displayOpts.fromDate || displayOpts.toDate) && (
            <div className="mb-2">
              <Collapse isOpen={displayOptionsIsOpen} className="d-md-block" id="displayOptions">
                <div className="d-block d-md-inline-block pt-1">
                  {displayOpts && displayOpts.orderOptions && (
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.orderby" />
                        {selectedOrderOption.label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {orderOptions.map((order, index) => {
                          return (
                            <DropdownItem key={index} onClick={() => changeOrderBy(order.column)}>
                              {order.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  {displayOpts && displayOpts.keyword && (
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input
                        type="text"
                        name="keyword"
                        id="search"
                        value={searchKeyword}
                        placeholder="Type and enter..."
                        onChange={(e) => {
                          onSearchKey(e);
                          this.hidePopover();
                        }}
                        onKeyPress={(e) => onSearchKey(e)}
                        onFocus={this.showPopover}
                        onBlur={this.hidePopover}
                      />
                      {displayOpts && (displayOpts.keyword || displayOpts.daysOptions || displayOpts.orderStatus || displayOpts.amountOptions || displayOpts.fromDate || displayOpts.toDate) && (
                        <Button
                          outline
                          color="danger"
                          className="mb-2 btn-xs search_btn"
                          onClick={() => {
                            onSearchFilters();
                          }}
                        ></Button>
                      )}{" "}
                      <Popover className="search-popover" placement="top" isOpen={this.state.popoverOpen} target={"search"}>
                        <PopoverBody>{searchPlaceholder}</PopoverBody>
                      </Popover>
                    </div>
                  )}

                  {displayOpts && displayOpts.fromDate && (
                    <div className="filter-date-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input type="date" name="fromdate" id="fromdate" value={filterFromDate} placeholder="dd/mm/yyyy" onChange={(e) => onChangeFromDate(e)} />
                    </div>
                  )}

                  {displayOpts && displayOpts.toDate && (
                    <div className="filter-date-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                      <input type="date" name="todate" id="todate" value={filterToDate} placeholder="dd/mm/yyyy" onChange={(e) => onChangeToDate(e)} />
                    </div>
                  )}

                  {displayOpts && displayOpts.daysOptions && (
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.status" />
                        {this.state.selectedDaysOption.label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {daysOptions.map((status, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => {
                                this.setState({ selectedDaysOption: daysOptions[index] });
                                changeDaysStatus(status.value);
                              }}
                            >
                              {status.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                  {displayOpts && displayOpts.amountOptions && (
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.status" />
                        {this.state.selectedAmountOption.label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {amountOptions.map((status, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => {
                                this.setState({ selectedAmountOption: amountOptions[index] });
                                changeAmountStatus(status.value);
                              }}
                            >
                              {status.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  {displayOpts && displayOpts.orderStatus && (
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.status" />
                        {orderStatus[newfilter].label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {orderStatus.map((status, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => {
                                this.setState({ selectedOrderStatus: orderStatus[index] });
                                changeOrderStatus(status.value);
                              }}
                            >
                              {status.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  {displayOpts && displayOpts.statusOptions && (
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.status" />
                        {this.state.selectedStatusOption.label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {statusOptions.map((status, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => {
                                this.setState({ selectedStatusOption: statusOptions[index] });
                                changeStatus(status.column);
                              }}
                            >
                              {status.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

                  {displayOpts && (displayOpts.keyword || displayOpts.daysOptions || displayOpts.orderStatus || displayOpts.amountOptions || displayOpts.fromDate || displayOpts.toDate) && (
                    <Button
                      outline
                      color="danger"
                      className="mb-2 btn-xs"
                      onClick={() => {
                        this.setState({ selectedOrderStatus: orderStatus[0] });
                        this.setState({ selectedStatusOption: statusOptions[0] });
                        onResetFilters();
                      }}
                    >
                      <IntlMessages id="button.reset" />
                    </Button>
                  )}
                </div>

                {displayOpts && displayOpts.pageSizes && (
                  <div className="float-md-right pt-1">
                    <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {selectedPageSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {pageSizes.map((size, index) => {
                          return (
                            <DropdownItem key={index} onClick={() => changePageSize(size)}>
                              {size}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                )}
              </Collapse>
            </div>
          )}
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
