let apiUrl = {
  ADMIN_LOGIN: "/user_service/admin/login",
  ADMIN_LOGOUT: "/user_service/admin/profile/logout",
  ADMIN_GET_PROFILE: "/user_service/admin/profile",
  ADMIN_UPDATE_PROFILE: "/user_service/admin/update_profile",
  ADMIN_CHANGE_PASSWORD: "/user_service/admin/change_password",
  ADMIN_RESEND_OTP: "/user_service/admin/profile/resend_otp",
  ADMIN_UPDATE_FORGET_PASSWORD: "/user_service/admin/profile/update_forgot_password",
  // Dashboard Data
  ADMIN_GET_DASHBOARD: "/user_service/admin/profile/get_dashboard_data",

  // SUBADMINS
  GET_SUBADMINS: "/user_service/admin/subadmins/get_subadmins",
  CREATE_SUBADMIN: "/user_service/admin/subadmins/create_subadmin",
  GET_SUBADMIN: "/user_service/admin/subadmins/get_subadmin",
  UPDATE_SUBADMIN: "/user_service/admin/subadmins/update_subadmin",
  UPDATE_SUBADMIN_STATUS: "/user_service/admin/subadmins/update_status",
  DELETE_SUBADMIN: "/user_service/admin/subadmins/delete_subadmin",
  GET_PERMISSIONS: "/user_service/admin/subadmins/get_permissions",

  // CUSTOMERS
  GET_CUSTOMERS: "/user_service/admin/users",
  CREATE_CUSTOMER: "/user_service/admin/users/create_user",
  GET_CUSTOMER: "/user_service/admin/users/get_user",
  UPDATE_CUSTOMER: "/user_service/admin/users/update_user",
  UPDATE_CUSTOMER_STATUS: "/user_service/admin/users/status",
  DELETE_CUSTOMER: "/user_service/admin/users/delete_user",

  // DRIVERS
  GET_DRIVERS: "/user_service/admin/drivers",
  CREATE_DRIVER: "/user_service/admin/drivers/create_driver",
  GET_DRIVER: "/user_service/admin/drivers/get_driver",
  UPDATE_DRIVER: "/user_service/admin/drivers/update_driver",
  UPDATE_DRIVER_STATUS: "/user_service/admin/drivers/status",
  UPDATE_DRIVER_ONLINE_STATUS: "/user_service/admin/drivers/online_status",
  DELETE_DRIVER: "/user_service/admin/drivers/delete_driver",

  //ORDERS
  GET_ACTIVE_DRIVERS: "/user_service/admin/orders/available_drivers",
  GET_ORDERS: "/user_service/admin/orders",
  GET_ORDER_DETAIL: "/user_service/admin/orders/order_details",
  GET_PDF: "/user_service/admin/orders/downloadOrderInvoice",

  ASSIGN_ORDER: "/user_service/admin/orders/assign_order",
  UPDATE_GROCERY_ORDER_STATUS: "/user_service/admin/orders/update_status",
  UPDATE_NORMAL_ORDER_STATUS: "/user_service/admin/orders/update_normal_status",

  // BUSSINESS CATEGORIES
  GET_BUSSINESS_CATEGORIES: "/user_service/admin/business_categories",
  CREATE_BUSSINESS_CATEGORY: "/user_service/admin/business_categories/create_business_category",
  GET_BUSSINESS_CATEGORY: "/user_service/admin/business_categories/get_business_category",
  UPDATE_BUSSINESS_CATEGORY: "/user_service/admin/business_categories/update_business_category",
  UPDATE_BUSSINESS_CATEGORY_STATUS: "/user_service/admin/business_categories/update_status",
  DELETE_BUSSINESS_CATEGORY: "/user_service/admin/business_categories/delete_business_category",

  // PRODUCT CATEGORIES
  GET_PRODUCT_CATEGORIES: "/user_service/admin/product_categories/get_categories",
  CREATE_PRODUCT_CATEGORY: "/user_service/admin/product_categories/create_category",
  GET_PRODUCT_CATEGORY: "/user_service/admin/product_categories/get_category",
  UPDATE_PRODUCT_CATEGORY: "/user_service/admin/product_categories/update_category",
  UPDATE_PRODUCT_CATEGORY_STATUS: "/user_service/admin/product_categories/status",
  DELETE_PRODUCT_CATEGORY: "/user_service/admin/product_categories/delete_category",

  // PRODUCT SUB CATEGORIES
  GET_PRODUCT_SUBCATEGORIES: "/user_service/admin/product_sub_category/get_subcategories",
  CREATE_PRODUCT_SUBCATEGORY: "/user_service/admin/product_sub_category/create_subcategory",
  GET_PRODUCT_SUBCATEGORY: "/user_service/admin/product_sub_category/get_subcategory",
  UPDATE_PRODUCT_SUBCATEGORY: "/user_service/admin/product_sub_category/update_subcategory",
  UPDATE_PRODUCT_SUBCATEGORY_STATUS: "/user_service/admin/product_sub_category/update_status",
  DELETE_PRODUCT_SUBCATEGORY: "/user_service/admin/product_sub_category/delete_subcategory",

  // CUSTOMIZATION TYPES
  GET_CUSTOMIZATION_TYPES: "/user_service/admin/product_customizations/get_customization_types",
  CREATE_CUSTOMIZATION_TYPE: "/user_service/admin/product_customizations/create_customization_type",
  GET_CUSTOMIZATION_TYPE: "/user_service/admin/product_customizations/get_customization_type",
  UPDATE_CUSTOMIZATION_TYPE: "/user_service/admin/product_customizations/update_customize_type",
  UPDATE_CUSTOMIZATION_TYPE_STATUS: "/user_service/admin/product_customizations/update_status",
  DELETE_CUSTOMIZATION_TYPE: "/user_service/admin/product_customizations/delete_type",

  // CUSTOMIZATION SUB TYPES
  GET_CUSTOMIZATION_SUBTYPES: "/user_service/admin/product_customizations_subtype/get_subtypes",
  CREATE_CUSTOMIZATION_SUBTYPE: "/user_service/admin/product_customizations_subtype/create_subtype",
  GET_CUSTOMIZATION_SUBTYPE: "/user_service/admin/product_customizations_subtype/get_subtype",
  UPDATE_CUSTOMIZATION_SUBTYPE: "/user_service/admin/product_customizations_subtype/update_subtype",
  UPDATE_CUSTOMIZATION_SUBTYPE_STATUS: "/user_service/admin/product_customizations_subtype/update_status",
  DELETE_CUSTOMIZATION_SUBTYPE: "/user_service/admin/product_customizations_subtype/delete_subtype",

  // PRODUCTS
  GET_CATEGORIES_BY_BUSINESS: "/user_service/admin/product/get_category",
  GET_SUBCATEGORIES: "/user_service/admin/product/get_subcategory",
  GET_PRODUCT_CUSTOM_TYPES: "/user_service/admin/product/get_customization_types",
  GET_PRODUCT_CUSTOM_SUBTYPES: "/user_service/admin/product/get_customization_type_values",
  GET_PRODUCTS: "/user_service/admin/product/get_product_lists",
  CREATE_PRODUCT: "/user_service/admin/product/add_product",
  GET_PRODUCT: "/user_service/admin/product/get_product",
  UPDATE_PRODUCT_DETAILS: "/user_service/admin/product/update_product_detail",
  UPDATE_INVENTORY_DETAILS: "/user_service/admin/product/update_inventory_detail",
  UPDATE_PRODUCT_STATUS: "/user_service/admin/product/update_status",
  DELETE_PRODUCT: "/user_service/admin/product/delete_product",
  DELETE_PRODUCT_IMAGE: "/user_service/admin/product/delete_product_image",
  DELETE_INVENTORY_DATA: "/user_service/admin/product/delete_warehouseinventory",
  DELETE_PRODUCT_INVENTORY_DATA: "/user_service/admin/product/delete_inventory_data",

  DELETE_CUSTOMIZE_DATA: "/user_service/admin/product/delete_customize_data",
  //RATING LISTING
  GET_RATING_LIST: "/user_service/admin/rating/get_ratings",
  UPDATE_RATING_STATUS: "/user_service/admin/rating/update_status",

  // BRANDS
  GET_BRANDS: "/user_service/admin/brand/get_brands",
  CREATE_BRAND: "/user_service/admin/brand/create_brand",
  GET_BRAND: "/user_service/admin/brand/get_brand",
  UPDATE_BRAND: "/user_service/admin/brand/update_brand",
  UPDATE_BRAND_STATUS: "/user_service/admin/brand/update_status",
  DELETE_BRAND: "/user_service/admin/brand/delete_brand",

  // WAREHOUSES
  GET_WAREHOUSES: "/user_service/admin/warehouse/get_warehouses",
  CREATE_WAREHOUSE: "/user_service/admin/warehouse/create_warehouse",
  GET_WAREHOUSE: "/user_service/admin/warehouse/get_warehouse",
  UPDATE_WAREHOUSE: "/user_service/admin/warehouse/update_warehouse",
  UPDATE_WAREHOUSE_STATUS: "/user_service/admin/warehouse/update_status",
  DELETE_WAREHOUSE: "/user_service/admin/warehouse/delete_warehouse",

  // BANNERS
  GET_BANNERS: "/user_service/admin/banner/get_banners",
  CREATE_BANNER: "/user_service/admin/banner/create_banner",
  GET_BANNER: "/user_service/admin/banner/get_banner",
  UPDATE_BANNER: "/user_service/admin/banner/update_banner",
  UPDATE_BANNER_STATUS: "/user_service/admin/banner/update_status",
  DELETE_BANNER: "/user_service/admin/banner/delete_banner",
  GET_BANNER_PRODUCTS: "/user_service/admin/banner/get_banner_products",

  // Deal Of day
  GET_DEALOFDAYLIST: "/user_service/admin/dealofday/get_dealofday",
  CREATE_DEALOFDAY: "/user_service/admin/dealofday/create_dealofday",
  GET_DEALOFDAY: "/user_service/admin/dealofday/get_dealofday",
  UPDATE_DEALOFDAY: "/user_service/admin/dealofday/update_dealofday",
  UPDATE_DEALOFDAY_STATUS: "/user_service/admin/dealofday/update_status",
  DELETE_DEALOFDAY: "/user_service/admin/dealofday/delete_dealofday",
  GET_DEALOFDAY_PRODUCTS: "/user_service/admin/dealofday/get_dealofday_products",

  // CONTENTS
  GET_CONTENT: "/content_service/admin/contents",
  UPDATE_CONTENT: "/content_service/admin/contents",

  // FAQs
  GET_FAQS: "/content_service/admin/faqs",
  CREATE_FAQ: "/content_service/admin/faqs",
  GET_FAQ: "/content_service/admin/faqs",
  UPDATE_FAQ: "/content_service/admin/faqs",
  DELETE_FAQ: "/content_service/admin/faqs",

  // OFFERS
  CREATE_OFFER: "/user_service/admin/offer",
  GET_OFFERS: "/user_service/admin/offer",
  GET_OFFER: "/user_service/admin/offer",
  UPDATE_OFFER: "/user_service/admin/offer",
  DELETE_OFFER: "/user_service/admin/offer",
  UPDATE_OFFER_STATUS: "/user_service/admin/offer/update_status",

  // NOTIFICATION
  GET_CUSTOMER_LIST: "/user_service/admin/notification",
  ADD_NOTIFICATION: "/user_service/admin/notification",
  GET_NOTIFICATIONS: "/user_service/admin/notification/list",

  // TRANSACTIONS
  GET_TRANSACTION_LIST: "/user_service/admin/transaction",

  // SETTINGS
  GET_SETTINGS: "/content_service/admin/setting/get_setting",
  UPDATE_SETTINGS: "/content_service/admin/setting/update_setting",
  ADD_DELIVERY_SETTINGS: "/content_service/admin/setting/add_delivery_settings",
  GET_DELIVERY_SETTINGS: "/content_service/admin/setting/get_delivery_settings",

  // REPORTS
  GET_SALE_ORDER_LISTS: "/user_service/admin/report/get_sale_report",
  GET_RECONCILATION_REPORT: "/user_service/admin/report/get_reconcilation_report",
};

export default apiUrl;
