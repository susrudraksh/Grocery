import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ListPageHeading from "../../containers/pages/ListPageHeading";
import moment from "moment";
import IconCard from "../../components/cards/IconCard";
import { NotificationManager } from "../../components/common/react-notifications";
import IntlMessages from "../../helpers/IntlMessages";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";

import { connect } from "react-redux";
import { updateNotificationCounter } from "../../redux/actions";

import ticketsData from "../../data/tickets";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    var userData = JSON.parse(localStorage.getItem("userData")) || {};

    this.state = {
      userPermissions: userData.user_permissions ? JSON.parse(userData.user_permissions) : {},
      userRole: userData ? userData.user_role : "",

      displayOpts: {
        fromDate: true,
        toDate: true,
      },

      filterFromDate: "",
      filterToDate: "",

      iconCardsData: [
        {
          title: "dashboards.total-subadmins",
          link: "/app/subadmins",
          icon: "iconsminds-network",
          value: 0,
          check_permission: true,
          module_slug: "subadmins",
          permission_type: "list",
        },
        {
          title: "dashboards.total-customers",
          link: "/app/customers",
          icon: "iconsminds-mens",
          value: 0,
          check_permission: true,
          module_slug: "users",
          permission_type: "list",
        },
        {
          title: "dashboards.total-drivers",
          link: "/app/drivers",
          icon: "iconsminds-mens",
          value: 0,
          check_permission: true,
          module_slug: "drivers",
          permission_type: "list",
        },
        {
          title: "dashboards.total-business-categories",
          link: "/app/business-categories",
          icon: "iconsminds-box-with-folders",
          value: 0,
          check_permission: true,
          module_slug: "business_categories",
          permission_type: "list",
        },
        {
          title: "dashboards.total-product-categories",
          link: "/app/product-categories",
          icon: "iconsminds-dice",
          value: 0,
          check_permission: true,
          module_slug: "product_categories",
          permission_type: "list",
        },
        {
          title: "dashboards.total-products",
          link: "/app/products",
          icon: "iconsminds-shopping-bag",
          value: 0,
          check_permission: true,
          module_slug: "product",
          permission_type: "list",
        },
        {
          title: "dashboards.total-brands",
          link: "/app/brands",
          icon: "iconsminds-tag-3",
          value: 0,
          check_permission: true,
          module_slug: "brand",
          permission_type: "list",
        },
        {
          title: "dashboards.total-warehouses",
          link: "/app/warehouses",
          icon: "iconsminds-clothing-store",
          value: 0,
          check_permission: true,
          module_slug: "warehouse",
          permission_type: "list",
        },
        {
          title: "dashboards.total-banners",
          link: "/app/banners",
          icon: "iconsminds-blackboard",
          value: 0,
          check_permission: true,
          module_slug: "banner",
          permission_type: "list",
        },
      ],

      recentCustomers: [],
      recentDrivers: [],
    };
  }

  componentDidMount() {
    this.modifyCardItemsByPermissions();
    // this.getDashboardData();
  }

  modifyCardItemsByPermissions() {
    var iconCardsData = this.state.iconCardsData;
    var permittedModules = Object.keys(this.state.userPermissions);

    iconCardsData = iconCardsData.map((item) => {
      item.showItem = true;

      if (
        this.state.userRole == 2 &&
        item.check_permission &&
        (!this.state.userPermissions[item.module_slug] || (this.state.userPermissions[item.module_slug] && this.state.userPermissions[item.module_slug].indexOf(item.permission_type) == -1))
      ) {
        item.showItem = false;
      }

      return item;
    });

    this.setState({ iconCardsData: iconCardsData }, () => this.getDashboardData());
  }

  getDashboardData() {
    this.getCountsData();
    this.getRecentCustomers();
    this.getRecentDrivers();
  }

  // Methods for Filters Actions
  onChangeFromDate = (e) => {
    this.setState(
      {
        filterFromDate: e.target.value,
      },
      () => this.getDashboardData()
    );
  };

  onChangeToDate = (e) => {
    this.setState(
      {
        filterToDate: e.target.value,
      },
      () => this.getDashboardData()
    );
  };

  onResetFilters = () => {
    this.setState(
      {
        filterFromDate: "",
        filterToDate: "",
      },
      () => this.getDashboardData()
    );
  };

  // Methods for Data Rendering
  getCountsData = async () => {
    this.state.isLoading = true;

    let path =
      ApiRoutes.ADMIN_GET_DASHBOARD +
      "?page_no=1" +
      "&start_date=" +
      `${this.state.filterFromDate == "" ? "" : moment(this.state.filterFromDate).format("YYYY-MM-DD")}` +
      "&end_date=" +
      `${this.state.filterToDate == "" ? "" : moment(this.state.filterToDate).format("YYYY-MM-DD")}`;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        var iconCardsData = this.state.iconCardsData;
        iconCardsData[0]["value"] = res.data.subadminCount || 0;
        iconCardsData[1]["value"] = res.data.customersCount || 0;
        iconCardsData[2]["value"] = res.data.driversCount || 0;
        iconCardsData[3]["value"] = res.data.businessCategoryCount || 0;
        iconCardsData[4]["value"] = res.data.productCategoryCount || 0;
        iconCardsData[5]["value"] = res.data.productCount || 0;
        iconCardsData[6]["value"] = res.data.brandsCount || 0;
        iconCardsData[7]["value"] = res.data.warehouseCount || 0;
        iconCardsData[8]["value"] = res.data.bannersCount || 0;

        this.props.updateNotificationCounter(res.data.NotificationCount);

        this.setState({
          iconCardsData: iconCardsData,
        });
      } else {
        // NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      // NotificationManager.error("Server Error", "Error!", 3000);
    }

    this.setState({ isLoading: true });
  };

  getRecentCustomers = async () => {
    this.state.isLoading = true;

    let path =
      ApiRoutes.GET_CUSTOMERS +
      "?page_no=1&limit=5" +
      "&start_date=" +
      `${this.state.filterFromDate == "" ? "" : moment(this.state.filterFromDate).format("YYYY-MM-DD")}` +
      "&end_date=" +
      `${this.state.filterToDate == "" ? "" : moment(this.state.filterToDate).format("YYYY-MM-DD")}`;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          recentCustomers: res.data.docs,
          isLoading: true,
        });
      } else {
        //   NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      // NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  getRecentDrivers = async () => {
    this.state.isLoading = true;

    let path =
      ApiRoutes.GET_DRIVERS +
      "?page_no=1&limit=5" +
      "&start_date=" +
      `${this.state.filterFromDate == "" ? "" : moment(this.state.filterFromDate).format("YYYY-MM-DD")}` +
      "&end_date=" +
      `${this.state.filterToDate == "" ? "" : moment(this.state.filterToDate).format("YYYY-MM-DD")}`;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          recentDrivers: res.data.docs,
          isLoading: true,
        });
      } else {
        //   NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      //  NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  render() {
    const { match } = this.props;
    const { messages } = this.props.intl;

    return (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.dashboard"
            match={match}
            displayOpts={this.state.displayOpts}
            filterFromDate={this.state.filterFromDate}
            filterToDate={this.state.filterToDate}
            onChangeFromDate={this.onChangeFromDate}
            onChangeToDate={this.onChangeToDate}
            onResetFilters={this.onResetFilters}
          />

          <Row className="icon-cards-row mb-2">
            {this.state.iconCardsData.map((item, index) => {
              return (
                item.showItem && (
                  <Colxx xxs="6" sm="4" md="3" lg="2" key={`icon_card_${index}`}>
                    <NavLink to={item.link}>
                      <IconCard {...item} className="mb-4" />
                    </NavLink>
                  </Colxx>
                )
              );
            })}
          </Row>

          {this.state.iconCardsData[1].showItem && (
            <Row>
              <Colxx lg="4" md="4" className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="dashboards.recently-customers" />
                    </CardTitle>
                    <div className="dashboard-list-with-user">
                      <PerfectScrollbar
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {this.state.recentCustomers.map((item, index) => {
                          return (
                            <div key={index} className="d-flex flex-row mb-3 pb-3 border-bottom">
                              <img src={item.user_image_thumb_url} alt={item.username} className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />

                              <div className="pl-3 pr-2">
                                <p className="font-weight-medium mb-0 ">{item.username}</p>
                                <p className="text-muted mb-0 text-small">{moment(item.createdAt).format("lll")}</p>
                              </div>
                            </div>
                          );
                        })}
                      </PerfectScrollbar>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx lg="4" md="4" className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="dashboards.recently-drivers" />
                    </CardTitle>
                    <div className="dashboard-list-with-user">
                      <PerfectScrollbar
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: false,
                        }}
                      >
                        {this.state.recentDrivers.map((item, index) => {
                          return (
                            <div key={index} className="d-flex flex-row mb-3 pb-3 border-bottom">
                              <img src={item.user_image_thumb_url} alt={item.username} className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />

                              <div className="pl-3 pr-2">
                                <p className="font-weight-medium mb-0 ">{item.username}</p>
                                <p className="text-muted mb-0 text-small">{moment(item.createdAt).format("lll")}</p>
                              </div>
                            </div>
                          );
                        })}
                      </PerfectScrollbar>
                    </div>
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

const mapStateToProps = ({ globalstate }) => {
  const { notification_count } = globalstate;
  return {
    notification_count,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    updateNotificationCounter,
  })(Dashboard)
);
