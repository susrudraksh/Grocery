import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() => import("./dashboard"));
const Profile = React.lazy(() => import("./profile"));
const ChangePassword = React.lazy(() => import("./change-password"));

// SUBADMIN
const SubadminAdd = React.lazy(() => import("./subadmins/add"));
const SubadminList = React.lazy(() => import("./subadmins/list"));
const SubadminEdit = React.lazy(() => import("./subadmins/edit"));

// CUSTOMERS
const CustomerAdd = React.lazy(() => import("./customers/add"));
const CustomerList = React.lazy(() => import("./customers/list"));
const CustomerEdit = React.lazy(() => import("./customers/edit"));

// ACTIVE-INACTIVE USERS
const ActiveInactiveList = React.lazy(() => import("./active-inactive-users/list"));

// DRIVERS
const DriverAdd = React.lazy(() => import("./drivers/add"));
const DriverList = React.lazy(() => import("./drivers/list"));
const DriverEdit = React.lazy(() => import("./drivers/edit"));
const DriverTracking = React.lazy(() => import("./drivers/track"));

// BUSINESS CATEGORIES
const BusinessCategoryAdd = React.lazy(() => import("./business-categories/add"));
const BusinessCategoryList = React.lazy(() => import("./business-categories/list"));
const BusinessCategoryEdit = React.lazy(() => import("./business-categories/edit"));

// PRODUCT CATEGORIES
const ProductCategoryAdd = React.lazy(() => import("./product-categories/add"));
const ProductCategoryList = React.lazy(() => import("./product-categories/list"));
const ProductCategoryEdit = React.lazy(() => import("./product-categories/edit"));

// PRODUCT SUBCATEGORIES
const ProductSubCategoryAdd = React.lazy(() => import("./product-subcategories/add"));
const ProductSubCategoryList = React.lazy(() => import("./product-subcategories/list"));
const ProductSubCategoryEdit = React.lazy(() => import("./product-subcategories/edit"));

// PRODUCT CUSTOMIZATIONS TYPES
const CustomizeTypeAdd = React.lazy(() => import("./customize-types/add"));
const CustomizeTypeList = React.lazy(() => import("./customize-types/list"));
const CustomizeTypeEdit = React.lazy(() => import("./customize-types/edit"));

// PRODUCT SUB CUSTOMIZATIONS TYPES
const CustomizeSubTypeAdd = React.lazy(() => import("./customize-subtypes/add"));
const CustomizeSubTypeList = React.lazy(() => import("./customize-subtypes/list"));
const CustomizeSubTypeEdit = React.lazy(() => import("./customize-subtypes/edit"));

// PRODUCTS
const ProductAdd = React.lazy(() => import("./products/add"));
const ProductList = React.lazy(() => import("./products/list"));
const ProductEdit = React.lazy(() => import("./products/edit"));
const ProductListRating = React.lazy(() => import("./products/list-rating"));

// BRANDS
const BrandAdd = React.lazy(() => import("./brands/add"));
const BrandList = React.lazy(() => import("./brands/list"));
const BrandEdit = React.lazy(() => import("./brands/edit"));

// WAREHOUSES
const WarehouseAdd = React.lazy(() => import("./warehouses/add"));
const WarehouseList = React.lazy(() => import("./warehouses/list"));
const WarehouseEdit = React.lazy(() => import("./warehouses/edit"));

// BANNER
const BannerAdd = React.lazy(() => import("./banners/add"));
const BannerList = React.lazy(() => import("./banners/list"));
const BannerEdit = React.lazy(() => import("./banners/edit"));

// BANNER
const DealOfDayAdd = React.lazy(() => import("./dealofday/add"));
const DealOfDayList = React.lazy(() => import("./dealofday/list"));
const DealOfDayEdit = React.lazy(() => import("./dealofday/edit"));

// ORDERS
const OrderList = React.lazy(() => import("./orders/list"));
const OrderDetail = React.lazy(() => import("./orders/order-detail"));

// NOTIFICATIONS
const Notifications = React.lazy(() => import("./notifications/index"));
const NotificationHistory = React.lazy(() => import("./notifications/history"));

// CONTENTS
const AboutUs = React.lazy(() => import("./contents/aboutus"));
const PrivacyPolicy = React.lazy(() => import("./contents/privacy-policy"));

// FAQS
const FaqAdd = React.lazy(() => import("./faqs/add"));
const FaqList = React.lazy(() => import("./faqs/list"));
const FaqEdit = React.lazy(() => import("./faqs/edit"));

// OFFERS
const OfferList = React.lazy(() => import("./offers/list"));
const OfferAdd = React.lazy(() => import("./offers/add"));
const OfferEdit = React.lazy(() => import("./offers/edit"));

//REPORTS
const SaleReport = React.lazy(() => import("./reports/sales-report"));
const CollectionReport = React.lazy(() => import("./reports/collection-report"));
const ReconcilationReport = React.lazy(() => import("./reports/reconcilation-report"));
const GstReport = React.lazy(() => import("./reports/gst-report"));

// SETTINGS
const Settings = React.lazy(() => import("./settings/normal-settings"));
const DeliverySettings = React.lazy(() => import("./settings/delivery-settings"));

const Transactions = React.lazy(() => import("./transactions/history"));
const Page403 = React.lazy(() => import("../page403"));

const routesItems = [
  {
    path: "/dashboard",
    name: "",
    component: Dashboard,
    check_permission: false,
  },
  {
    path: "/profile",
    name: "",
    component: Profile,
    check_permission: false,
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePassword,
    check_permission: false,
  },

  {
    path: "/subadmins",
    name: "Manage Sub Admins",
    component: SubadminList,
    check_permission: true,
    module_slug: "subadmins",
    permission_type: "list",
  },
  {
    path: "/add-subadmin",
    name: "",
    component: SubadminAdd,
    check_permission: true,
    module_slug: "subadmins",
    permission_type: "add",
  },
  {
    path: "/edit-subadmin/:itemId",
    name: " Edit Sub Admin",
    component: SubadminEdit,
    check_permission: true,
    module_slug: "subadmins",
    permission_type: "edit",
  },

  {
    path: "/customers",
    name: "",
    component: CustomerList,
    check_permission: true,
    module_slug: "users",
    permission_type: "list",
  },
  {
    path: "/add-customer",
    name: "",
    component: CustomerAdd,
    check_permission: true,
    module_slug: "users",
    permission_type: "add",
  },
  {
    path: "/edit-customer/:itemId",
    name: "",
    component: CustomerEdit,
    check_permission: true,
    module_slug: "users",
    permission_type: "edit",
  },
  {
    path: "/active-inactive-users",
    name: "",
    component: ActiveInactiveList,
    check_permission: true,
    module_slug: "users",
    permission_type: "list",
  },
  {
    path: "/drivers",
    name: "",
    component: DriverList,
    check_permission: true,
    module_slug: "drivers",
    permission_type: "list",
  },
  {
    path: "/add-driver",
    name: "",
    component: DriverAdd,
    check_permission: true,
    module_slug: "drivers",
    permission_type: "add",
  },
  {
    path: "/edit-driver/:itemId",
    name: "",
    component: DriverEdit,
    check_permission: true,
    module_slug: "drivers",
    permission_type: "edit",
  },
  {
    path: "/track-driver/:itemId",
    name: "",
    component: DriverTracking,
    check_permission: true,
    module_slug: "drivers",
    permission_type: "list",
  },

  {
    path: "/business-categories",
    name: "",
    component: BusinessCategoryList,
    check_permission: true,
    module_slug: "business_categories",
    permission_type: "list",
  },
  {
    path: "/add-business-category",
    name: "",
    component: BusinessCategoryAdd,
    check_permission: true,
    module_slug: "business_categories",
    permission_type: "add",
  },
  {
    path: "/edit-business-category/:itemId",
    name: "",
    component: BusinessCategoryEdit,
    check_permission: true,
    module_slug: "business_categories",
    permission_type: "edit",
  },

  {
    path: "/product-categories",
    name: "",
    component: ProductCategoryList,
    check_permission: true,
    module_slug: "product_categories",
    permission_type: "list",
  },
  {
    path: "/add-product-category",
    name: "",
    component: ProductCategoryAdd,
    check_permission: true,
    module_slug: "product_categories",
    permission_type: "add",
  },
  {
    path: "/edit-product-category/:itemId",
    name: "",
    component: ProductCategoryEdit,
    check_permission: true,
    module_slug: "product_categories",
    permission_type: "edit",
  },

  {
    path: "/product-subcategories",
    name: "",
    component: ProductSubCategoryList,
    check_permission: true,
    module_slug: "product_sub_category",
    permission_type: "list",
  },
  {
    path: "/add-product-subcategory",
    name: "",
    component: ProductSubCategoryAdd,
    check_permission: true,
    module_slug: "product_sub_category",
    permission_type: "add",
  },
  {
    path: "/edit-product-subcategory/:itemId",
    name: "",
    component: ProductSubCategoryEdit,
    check_permission: true,
    module_slug: "product_sub_category",
    permission_type: "edit",
  },

  {
    path: "/customization-types",
    name: "",
    component: CustomizeTypeList,
    check_permission: true,
    module_slug: "product_customizations",
    permission_type: "list",
  },
  {
    path: "/add-customization-type",
    name: "",
    component: CustomizeTypeAdd,
    check_permission: true,
    module_slug: "product_customizations",
    permission_type: "add",
  },
  {
    path: "/edit-customization-type/:itemId",
    name: "",
    component: CustomizeTypeEdit,
    check_permission: true,
    module_slug: "product_customizations",
    permission_type: "edit",
  },

  {
    path: "/customization-subtypes",
    name: "",
    component: CustomizeSubTypeList,
    check_permission: true,
    module_slug: "product_customizations_subtype",
    permission_type: "list",
  },
  {
    path: "/add-customization-subtype",
    name: "",
    component: CustomizeSubTypeAdd,
    check_permission: true,
    module_slug: "product_customizations_subtype",
    permission_type: "add",
  },
  {
    path: "/edit-customization-subtype/:itemId",
    name: "",
    component: CustomizeSubTypeEdit,
    check_permission: true,
    module_slug: "product_customizations_subtype",
    permission_type: "edit",
  },

  {
    path: "/products",
    name: "",
    component: ProductList,
    check_permission: true,
    module_slug: "product",
    permission_type: "list",
  },
  {
    path: "/add-product",
    name: "",
    component: ProductAdd,
    check_permission: true,
    module_slug: "product",
    permission_type: "add",
  },
  {
    path: "/edit-product/:itemId",
    name: "",
    component: ProductEdit,
    check_permission: true,
    module_slug: "product",
    permission_type: "edit",
  },

  {
    path: "/list-rating/:itemId",
    name: "",
    component: ProductListRating,
    check_permission: true,
    module_slug: "product",
    permission_type: "list-rating",
  },

  {
    path: "/brands",
    name: "",
    component: BrandList,
    check_permission: true,
    module_slug: "brand",
    permission_type: "list",
  },
  {
    path: "/add-brand",
    name: "",
    component: BrandAdd,
    check_permission: true,
    module_slug: "brand",
    permission_type: "add",
  },
  {
    path: "/edit-brand/:itemId",
    name: "",
    component: BrandEdit,
    check_permission: true,
    module_slug: "brand",
    permission_type: "edit",
  },

  {
    path: "/warehouses",
    name: "",
    component: WarehouseList,
    check_permission: true,
    module_slug: "warehouse",
    permission_type: "list",
  },
  {
    path: "/add-warehouse",
    name: "",
    component: WarehouseAdd,
    check_permission: true,
    module_slug: "warehouse",
    permission_type: "add",
  },
  {
    path: "/edit-warehouse/:itemId",
    name: "",
    component: WarehouseEdit,
    check_permission: true,
    module_slug: "warehouse",
    permission_type: "edit",
  },

  {
    path: "/banners",
    name: "",
    component: BannerList,
    check_permission: true,
    module_slug: "banner",
    permission_type: "list",
  },
  {
    path: "/add-banner",
    name: "",
    component: BannerAdd,
    check_permission: true,
    module_slug: "banner",
    permission_type: "add",
  },
  {
    path: "/edit-banner/:itemId",
    name: "",
    component: BannerEdit,
    check_permission: true,
    module_slug: "banner",
    permission_type: "edit",
  },

  {
    path: "/dealofday",
    name: "",
    component: DealOfDayList,
    check_permission: true,
    module_slug: "dealofday",
    permission_type: "list",
  },
  {
    path: "/add-dealofday",
    name: "",
    component: DealOfDayAdd,
    check_permission: true,
    module_slug: "dealofday",
    permission_type: "add",
  },
  {
    path: "/edit-dealofday/:itemId",
    name: "",
    component: DealOfDayEdit,
    check_permission: true,
    module_slug: "dealofday",
    permission_type: "edit",
  },

  {
    path: "/orders",
    name: "",
    component: OrderList,
    check_permission: true,
    module_slug: "orders",
    permission_type: "list",
  },

  {
    path: "/notifications",
    name: "",
    component: Notifications,
    check_permission: true,
    module_slug: "notification",
    permission_type: "add",
  },

  {
    path: "/notification-history",
    name: "",
    component: NotificationHistory,
    check_permission: true,
    module_slug: "notification",
    permission_type: "list",
  },

  {
    path: "/contents/about-us",
    name: "",
    component: AboutUs,
    check_permission: true,
    module_slug: "contents",
    permission_type: "edit",
  },
  {
    path: "/contents/privacy-policy",
    name: "",
    component: PrivacyPolicy,
    check_permission: true,
    module_slug: "contents",
    permission_type: "edit",
  },

  {
    path: "/faqs",
    name: "",
    component: FaqList,
    check_permission: true,
    module_slug: "faqs",
    permission_type: "list",
  },
  {
    path: "/add-faq",
    name: "",
    component: FaqAdd,
    check_permission: true,
    module_slug: "faqs",
    permission_type: "add",
  },
  {
    path: "/edit-faq/:itemId",
    name: "",
    component: FaqEdit,
    check_permission: true,
    module_slug: "faqs",
    permission_type: "edit",
  },

  {
    path: "/settings/normal-settings",
    name: "",
    component: Settings,
    check_permission: true,
    module_slug: "setting",
    permission_type: "edit",
  },

  {
    path: "/settings/delivery-settings",
    name: "",
    component: DeliverySettings,
    check_permission: true,
    module_slug: "setting",
    permission_type: "edit",
  },

  {
    path: "/add-offers",
    name: "",
    component: OfferAdd,
    check_permission: true,
    module_slug: "offer",
    permission_type: "add",
  },

  {
    path: "/offers",
    name: "",
    component: OfferList,
    check_permission: true,
    module_slug: "offer",
    permission_type: "list",
  },

  {
    path: "/settings/sale-report",
    name: "",
    component: SaleReport,
    check_permission: true,
    module_slug: "reports",
    permission_type: "list",
  },
  {
    path: "/settings/collection-report",
    name: "",
    component: CollectionReport,
    check_permission: true,
    module_slug: "reports",
    permission_type: "list",
  },
  {
    path: "/settings/reconcilation-report",
    name: "",
    component: ReconcilationReport,
    check_permission: true,
    module_slug: "reports",
    permission_type: "list",
  },
  {
    path: "/settings/gst-report",
    name: "",
    component: GstReport,
    check_permission: true,
    module_slug: "reports",
    permission_type: "list",
  },

  {
    path: "/edit-offer/:itemId",
    name: "",
    component: OfferEdit,
    check_permission: true,
    module_slug: "offer",
    permission_type: "edit",
  },

  {
    path: "/transactions",
    name: "",
    component: Transactions,
    check_permission: false,
    module_slug: "transaction",
    permission_type: "list",
  },

  {
    path: "/order-detail/:itemId",
    name: "",
    component: OrderDetail,
    check_permission: false,
    module_slug: "order-detail",
    permission_type: "list",
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    var userData = JSON.parse(localStorage.getItem("userData")) || {};

    this.state = {
      routesItems: routesItems,
      userPermissions: userData.user_permissions ? JSON.parse(userData.user_permissions) : {},
      userRole: userData ? userData.user_role : "",
    };
  }

  componentDidMount() {
    // Modify menu items based on permissions
    this.modifyRoutesItemsByPermissions();
  }

  modifyRoutesItemsByPermissions() {
    var routesItems = this.state.routesItems;
    var permittedModules = Object.keys(this.state.userPermissions);

    routesItems = routesItems.map((item) => {
      item.allowItem = true;

      if (
        this.state.userRole == 2 &&
        item.check_permission &&
        (!this.state.userPermissions[item.module_slug] || (this.state.userPermissions[item.module_slug] && this.state.userPermissions[item.module_slug].indexOf(item.permission_type) == -1))
      ) {
        item.allowItem = false;
      }

      return item;
    });

    this.setState({ routesItems: routesItems });
  }

  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />

              {(this.state.routesItems || []).map((item, idx) => {
                if (item.allowItem) {
                  return item.component ? <Route key={idx} path={`${match.url}` + `${item.path}`} render={(props) => <item.component {...props} />} /> : null;
                } else {
                  return <Route key={idx} path={`${match.url}` + `${item.path}`} render={(props) => <Page403 {...props} />} />;
                }
              })}

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
