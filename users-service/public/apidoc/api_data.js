define({ "api": [
  {
    "type": "delete",
    "url": "/user_service/admin/banner/delete_banner/:banner_id",
    "title": "Banner - Delete",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/delete_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Banner has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/delete_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Sub category doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "DeleteUser_serviceAdminBannerDelete_bannerBanner_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/banner/get_banner/:banner_id",
    "title": "Banner - Get Single",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/get_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Success\",\n\"data\": {\n\"description\": \"Testing\",\n\"_id\": \"5f8d3c433913e1214061d2c7\",\n\"title\": \"Diwali special\",\n\"banner_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/1603091523526iStock000004792809Small.jpg\",\n\"banner_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/thumb_1603091523526iStock000004792809Small.jpg\",\n\"business_category\": {\n\"_id\": \"5f73158c500ead10f8fcdca1\",\n\"name\": \"Clothes\"\n},\n\"category\": {\n\"_id\": \"5f8040ee08707c11ecb09db8\",\n\"name\": \"Hand Soap\"\n},\n\"subcategory\": {\n\"_id\": \"5f80412a08707c11ecb09db9\",\n\"name\": \"Hand Soap\"\n},\n\"product\": {\n\"_id\": \"5f7c38339ed8b93ac4a93bff\",\n\"name\": \"Maggi\"\n},\n\"is_active\": 1\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/get_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Banner doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "GetUser_serviceAdminBannerGet_bannerBanner_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/banner/get_banners",
    "title": "Banner - Listing",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/get_banners\",\n\"message\": \"Success\",\n\"data\": {\n\"docs\": [\n{\n\"description\": \"Testing\",\n\"_id\": \"5f8d3c433913e1214061d2c7\",\n\"title\": \"Diwali special\",\n\"banner_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/1603091523526iStock000004792809Small.jpg\",\n\"banner_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/banners/5f8d3c433913e1214061d2c7/thumb_1603091523526iStock000004792809Small.jpg\",\n\"business_category\": {\n\"_id\": \"5f73158c500ead10f8fcdca1\",\n\"name\": \"Clothes\"\n},\n\"category\": {\n\"_id\": \"5f8040ee08707c11ecb09db8\",\n\"name\": \"Hand Soap\"\n},\n\"subcategory\": {\n\"_id\": \"5f80412a08707c11ecb09db9\",\n\"name\": \"Hand Soap\"\n},\n\"product\": {\n\"_id\": \"5f7c38339ed8b93ac4a93bff\",\n\"name\": \"Maggi\"\n},\n\"is_active\": 1\n}\n],\n\"totalDocs\": 1,\n\"limit\": 10,\n\"page\": 1,\n\"totalPages\": 1,\n\"pagingCounter\": 1,\n\"hasPrevPage\": false,\n\"hasNextPage\": false,\n\"prevPage\": null,\n\"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/get_banners\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "GetUser_serviceAdminBannerGet_banners"
  },
  {
    "type": "post",
    "url": "/user_service/admin/banner/create_banner",
    "title": "Banner - Create",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product_id",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "banner_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/create_banner\",\n\"message\": \"Banner has created successfully.\",\n\"data\": {\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f8d3c433913e1214061d2c7\",\n\"title\": \"Diwali special\",\n\"description\": \"Testing\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"category_id\": \"5f8040ee08707c11ecb09db8\",\n\"sub_category_id\": \"5f80412a08707c11ecb09db9\",\n\"product_id\": \"5f7c38339ed8b93ac4a93bff\",\n\"createdAt\": \"2020-10-19T07:12:03.461Z\",\n\"updatedAt\": \"2020-10-19T07:12:03.532Z\",\n\"__v\": 0,\n\"banner_image\": \"1603091523526iStock000004792809Small.jpg\",\n\"id\": \"5f8d3c433913e1214061d2c7\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/create_banner\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "PostUser_serviceAdminBannerCreate_banner"
  },
  {
    "type": "post",
    "url": "/user_service/admin/banner/get_banner_products",
    "title": "Banner - Product Listing",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/banner/get_banner_products\",\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"_id\": \"5f8546a6eb7b292138cd7226\",\n            \"is_active\": 0,\n            \"is_deleted\": 0,\n            \"product_id\": \"5f7c38339ed8b93ac4a93bff\",\n            \"price\": \"400\",\n            \"product_quantity\": 2,\n            \"product_code\": \"dsada\",\n            \"createdAt\": \"2020-10-13T06:18:14.063Z\",\n            \"updatedAt\": \"2020-10-15T06:03:48.318Z\",\n            \"__v\": 0,\n            \"ProductsData\": [\n                {\n                    \"_id\": \"5f7c38339ed8b93ac4a93bff\",\n                    \"name\": \"Maggi\"\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/get_banner_products\",\n\"message\": \"Banner doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "PostUser_serviceAdminBannerGet_banner_products"
  },
  {
    "type": "put",
    "url": "/user_service/admin/banner/update_banner/:banner_id",
    "title": "Banner - Update",
    "group": "Admin_-_Banner",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product_id",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "banner_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/update_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Banner details has updated successfully.\",\n\"data\": {\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f8d3c433913e1214061d2c7\",\n\"title\": \"Diwali speciall\",\n\"description\": \"Testing\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"category_id\": \"5f8040ee08707c11ecb09db8\",\n\"sub_category_id\": \"5f80412a08707c11ecb09db9\",\n\"product_id\": \"5f7c38339ed8b93ac4a93bff\",\n\"createdAt\": \"2020-10-19T07:12:03.461Z\",\n\"updatedAt\": \"2020-10-19T10:01:20.541Z\",\n\"__v\": 0,\n\"banner_image\": \"1603101680535iStock000004792809Small.jpg\",\n\"id\": \"5f8d3c433913e1214061d2c7\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/update_banner/5f8d3c433913e1214061d2c7\",\n\"message\": \"Sub category doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "PutUser_serviceAdminBannerUpdate_bannerBanner_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/banner/update_status/:banner_id",
    "title": "Banner - Update Status",
    "group": "Admin_-_Banner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/banner/update_status/5f8d3c433913e1214061d2c7\",\n\"message\": \"Banner status has updated successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/banner/update_status/5f8d3c433913e1214061d2c7\",\n\"message\": \"Banner doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Banner.js",
    "groupTitle": "Admin_-_Banner",
    "name": "PutUser_serviceAdminBannerUpdate_statusBanner_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/brand/delete_brand/:brand_id",
    "title": "Brand - Delete",
    "group": "Admin_-_Brand",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/brand/delete_brand/5f744d2ea1bd7f352c619577\",\n\"message\": \"Brand has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/brand/delete_brand/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "DeleteUser_serviceAdminBrandDelete_brandBrand_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/brand/get_brand/:brand_id",
    "title": "Brand - Get Single",
    "group": "Admin_-_Brand",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/brand/get_brand/5f744d2ea1bd7f352c619577\",\n\"message\": \"Success\",\n\"data\": {\n\"parent_id\": 0,\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f744d2ea1bd7f352c619577\",\n\"name\": \"Fashion\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"createdAt\": \"2020-09-30T09:17:34.761Z\",\n\"updatedAt\": \"2020-09-30T09:17:34.778Z\",\n\"__v\": 0,\n\"image_path\": \"16014574547667218af6.jpg\",\n\"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014574547667218af6.jpg\",\n\"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014574547667218af6.jpg\",\n\"id\": \"5f744d2ea1bd7f352c619577\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/brand/get_brand/5f744d2ea1bd7f352c619577\",\n\"message\": \"Brand doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "GetUser_serviceAdminBrandGet_brandBrand_id"
  },
  {
    "type": "get",
    "url": "/user_service/brand/get_brands",
    "title": "Brand - Listing",
    "group": "Admin_-_Brand",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/brand/get_brands\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f7aff895bc4f9245c8209be\",\n                \"name\": \"One plus\",\n                \"createdAt\": \"2020-10-05T11:12:09.529Z\",\n                \"updatedAt\": \"2020-10-05T11:12:09.529Z\",\n                \"__v\": 0,\n                \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/undefined\",\n                \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/thumb_undefined\",\n                \"id\": \"5f7aff895bc4f9245c8209be\"\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n \"api_name\": \"/brand/get_brands\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "GetUser_serviceBrandGet_brands"
  },
  {
    "type": "post",
    "url": "/user_service/admin/brand/create_brand",
    "title": "Brand - Create",
    "group": "Admin_-_Brand",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/brand/create_brand\",\n    \"message\": \"Brand has created successfully.\",\n    \"data\": {\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f7b003e1a8e363b30e6e3e4\",\n        \"name\": \"One plus\",\n        \"createdAt\": \"2020-10-05T11:15:10.462Z\",\n        \"updatedAt\": \"2020-10-05T11:15:10.472Z\",\n        \"__v\": 0,\n        \"image_path\": \"16018965104672aae1d6.jpg\",\n        \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7b003e1a8e363b30e6e3e4/16018965104672aae1d6.jpg\",\n        \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7b003e1a8e363b30e6e3e4/thumb_16018965104672aae1d6.jpg\",\n        \"id\": \"5f7b003e1a8e363b30e6e3e4\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/brand/create_brand\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "PostUser_serviceAdminBrandCreate_brand"
  },
  {
    "type": "put",
    "url": "/user_service/admin/brand/update_brand/:brand_id",
    "title": "Brand - Update",
    "group": "Admin_-_Brand",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/brand/update_brand/5f744d2ea1bd7f352c619577\",\n\"message\": \"Brand details has updated successfully.\",\n\"data\": {\n\"parent_id\": 0,\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f744d2ea1bd7f352c619577\",\n\"name\": \"Fashionsss\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"createdAt\": \"2020-09-30T09:17:34.761Z\",\n\"updatedAt\": \"2020-09-30T10:04:53.071Z\",\n\"__v\": 0,\n\"image_path\": \"16014602930669dcc9e6.png\",\n\"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014602930669dcc9e6.png\",\n\"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014602930669dcc9e6.png\",\n\"id\": \"5f744d2ea1bd7f352c619577\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/brand/update_brand/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Brand doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "PutUser_serviceAdminBrandUpdate_brandBrand_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/brand/update_status/:brand_id",
    "title": "Brand - Update Status",
    "group": "Admin_-_Brand",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/Brand/update_status/5f7428a688444b3074ce512a\",\n    \"message\": \"Brand status has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/brand/update_status/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Brand doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Brand.js",
    "groupTitle": "Admin_-_Brand",
    "name": "PutUser_serviceAdminBrandUpdate_statusBrand_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/category/delete_business_category/:business_id",
    "title": "Business Category - Delete",
    "group": "Admin_-_Business_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n\"status\": \"success\",\n\"api_name\": \"/category/delete_business_category/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Business category has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/category/delete_business_category/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Business category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "DeleteUser_serviceAdminCategoryDelete_business_categoryBusiness_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/categories",
    "title": "Categories - Listing",
    "group": "Admin_-_Business_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n\"status\": \"success\",\n\"api_name\": \"/categories\",\n\"message\": \"Success\",\n\"data\": {\n    \"docs\": [\n        {\n            \"is_active\": 1,\n            \"is_deleted\": 0,\n            \"_id\": \"5f731c3efae7b5304ce6ae78\",\n            \"name\": \"Home essentials\",\n            \"cancelation_time\": 45,\n            \"return_time\": 30,\n            \"createdAt\": \"2020-09-29T11:36:30.589Z\",\n            \"updatedAt\": \"2020-09-29T11:36:30.599Z\",\n            \"__v\": 0,\n            \"category_image\": \"16013793905944e3f421.jpg\",\n            \"category_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg\",\n            \"category_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg\",\n            \"id\": \"5f731c3efae7b5304ce6ae78\"\n        },\n    ],\n    \"totalDocs\": 4,\n    \"limit\": 10,\n    \"totalPages\": 1,\n    \"page\": 1,\n    \"pagingCounter\": 1,\n    \"hasPrevPage\": false,\n    \"hasNextPage\": false,\n    \"prevPage\": null,\n    \"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"get_users\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "GetUser_serviceAdminCategories"
  },
  {
    "type": "get",
    "url": "/user_service/admin/category/get_business_category/:business_id",
    "title": "Business Category - Get Single",
    "group": "Admin_-_Business_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/category/get_business_category/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Success\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f731c3efae7b5304ce6ae78\",\n    \"name\": \"Home essentials\",\n    \"cancelation_time\": 45,\n    \"return_time\": 30,\n    \"createdAt\": \"2020-09-29T11:36:30.589Z\",\n    \"updatedAt\": \"2020-09-29T11:36:30.599Z\",\n    \"__v\": 0,\n    \"category_image\": \"16013793905944e3f421.jpg\",\n    \"category_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg\",\n    \"category_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg\",\n    \"id\": \"5f731c3efae7b5304ce6ae78\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/category/get_business_category/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Business category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "GetUser_serviceAdminCategoryGet_business_categoryBusiness_id"
  },
  {
    "type": "post",
    "url": "/user_service/admin/category/create_business_category",
    "title": "Business Category - Create",
    "group": "Admin_-_Business_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cancelation_time",
            "description": "<p>Cancelation Time</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "return_time",
            "description": "<p>Return Time</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "category_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/category/create_business_category\",\n\"message\": \"Business category has created successfully.\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f7316ddb038fe182482a154\",\n    \"name\": \"Grocery\",\n    \"cancelation_time\": 45,\n    \"return_time\": 30,\n    \"createdAt\": \"2020-09-29T11:13:33.649Z\",\n    \"updatedAt\": \"2020-09-29T11:13:33.649Z\",\n    \"__v\": 0,\n    \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/undefined\",\n    \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/thumb_undefined\",\n    \"id\": \"5f7316ddb038fe182482a154\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/users/create_user\",\n\"message\": \"You are already registered with this phone number.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "PostUser_serviceAdminCategoryCreate_business_category"
  },
  {
    "type": "put",
    "url": "/user_service/admin/category/update_business_category/:business_id",
    "title": "Business Category - Update",
    "group": "Admin_-_Business_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cancelation_time",
            "description": "<p>Cancelation Time</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "return_time",
            "description": "<p>Return Time</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "category_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/category/update_business_category/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Business category details has updated successfully.\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f731c3efae7b5304ce6ae78\",\n    \"name\": \"Home essentialsss\",\n    \"cancelation_time\": 40,\n    \"return_time\": 35,\n    \"createdAt\": \"2020-09-29T11:36:30.589Z\",\n    \"updatedAt\": \"2020-09-29T12:29:49.100Z\",\n    \"__v\": 0,\n    \"category_image\": \"16013793905944e3f421.jpg\",\n    \"category_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/16013793905944e3f421.jpg\",\n    \"category_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f731c3efae7b5304ce6ae78/thumb_16013793905944e3f421.jpg\",\n    \"id\": \"5f731c3efae7b5304ce6ae78\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/category/update_business_category/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Buisness category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "PutUser_serviceAdminCategoryUpdate_business_categoryBusiness_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/category/update_status/:business_id",
    "title": "Business Category - Update Status",
    "group": "Admin_-_Business_Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/category/update_status/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Business category status has updated successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/category/update_status/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Business category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/BusinessCategory.js",
    "groupTitle": "Admin_-_Business_Category",
    "name": "PutUser_serviceAdminCategoryUpdate_statusBusiness_id"
  },
  {
    "type": "delete",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Delete",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/faq/gfggfgg\",\n    \"message\": \"FAQ has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/faq/gfggfgg\",\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "DeleteContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/:content_key",
    "title": "Contents - Get Data",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content_key",
            "description": "<p>Content Key: privacy_policy | about_us | terms_of_use | careers | faq</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/privacy_policy\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"content_data\": \"<h5 style=\\\"text-align:left;\\\">'by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\\"Lorem ipsum dolor sit amet..\\\", comes from a line in section 1.10.32.</span></p>\\n\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/privacy_policy\",\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "GetContent_serviceAdminContentsContent_key"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Get",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/faq/faq_1587727510744\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"question_id\": \"faq_1587727510744\",\n        \"question\": \"What is Lorem\",\n        \"answer\": \"LoremLorem Ipsum is simply dummy \"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/faq/faq_1587727510744\",\n    \"message\": \"Invalid Question Id\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "GetContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/faqs",
    "title": "FAQ - Listing",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/faq\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"content_data\": [\n            {\n                \"question_id\": \"faq_1587727510744\",\n                \"question\": \"What is Lorem\",\n                \"answer\": \"LoremLorem Ipsum is simply dummy \"\n            },\n            {\n                \"question_id\": \"faq_1587727535192\",\n                \"question\": \"Why do we use it?\",\n                \"answer\": \"It is a long established fact that.\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/faq\",\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "GetContent_serviceAdminContentsFaqs"
  },
  {
    "type": "post",
    "url": "/content_service/admin/contents/faq",
    "title": "FAQ - Create",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": "<p>Question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": "<p>Answer</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/faq\",\n    \"message\": \"FAQ has created successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/faq\",\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "PostContent_serviceAdminContentsFaq"
  },
  {
    "type": "put",
    "url": "/content_service/admin/contents/:content_key",
    "title": "Contents - Update",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content_value",
            "description": "<p>Content Value</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/privacy_policy\",\n    \"message\": \"Content has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/privacy_policy\",\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "PutContent_serviceAdminContentsContent_key"
  },
  {
    "type": "put",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Update",
    "group": "Admin_-_Content",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": "<p>Question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": "<p>Answer</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/contents/faq/faq_1587725188437\",\n    \"message\": \"FAQ details has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"status\": \"error\",\n    \"api_name\": \"/contents/faq/faq_1587725188437\",\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin_-_Content",
    "name": "PutContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/customize/delete_subtype/:subtype_id",
    "title": "Customize Sub Type - Delete",
    "group": "Admin_-_Customize_Sub_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/customize/delete_subtype/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub type has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/customize/delete_subtype/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub type doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationSubType.js",
    "groupTitle": "Admin_-_Customize_Sub_Type",
    "name": "DeleteUser_serviceAdminCustomizeDelete_subtypeSubtype_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/customize/get_subtype/:subtype_id",
    "title": "Customize Sub Type - Get Single",
    "group": "Admin_-_Customize_Sub_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/customize/get_subtype/5f8997a469640625383ebe48\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"_id\": \"5f8997a469640625383ebe48\",\n        \"parent_id\": \"5f892e28a5847d23c07afbdb\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"name\": \"demo test\",\n        \"createdAt\": \"2020-10-16T12:52:52.133Z\",\n        \"updatedAt\": \"2020-10-16T12:52:52.133Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/customize/get_subtype/5f8997a469640625383ebe48\",\n    \"message\": \"Sub type doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationSubType.js",
    "groupTitle": "Admin_-_Customize_Sub_Type",
    "name": "GetUser_serviceAdminCustomizeGet_subtypeSubtype_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/customize/get_subtypes",
    "title": "Customize Sub Type - Listing",
    "group": "Admin_-_Customize_Sub_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/customize/get_subtypes\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f8997a469640625383ebe48\",\n                \"parent_id\": \"5f892e28a5847d23c07afbdb\",\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"name\": \"demo test\",\n                \"createdAt\": \"2020-10-16T12:52:52.133Z\",\n                \"updatedAt\": \"2020-10-16T12:52:52.133Z\",\n                \"__v\": 0\n            },\n         \n        ],\n        \"totalDocs\": 8,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_sub_category/get_subcategories\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationSubType.js",
    "groupTitle": "Admin_-_Customize_Sub_Type",
    "name": "GetUser_serviceAdminCustomizeGet_subtypes"
  },
  {
    "type": "post",
    "url": "/user_service/admin/customize/create_subtype",
    "title": "Customize Sub Type - Create Subtype",
    "group": "Admin_-_Customize_Sub_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_id",
            "description": "<p>Type Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/customize/create_subtype\",\n    \"data\": {\n        \"parent_id\": \"5f892e28a5847d23c07afbdb\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f89966b7a9f761cb0b79c73\",\n        \"name\": \"test\",\n        \"createdAt\": \"2020-10-16T12:47:39.672Z\",\n        \"updatedAt\": \"2020-10-16T12:47:39.672Z\",\n        \"__v\": 0,\n        \"id\": \"5f89966b7a9f761cb0b79c73\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/customize/create_subtype\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationSubType.js",
    "groupTitle": "Admin_-_Customize_Sub_Type",
    "name": "PostUser_serviceAdminCustomizeCreate_subtype"
  },
  {
    "type": "put",
    "url": "/user_service/admin/customize/update_subtype/:subtype_id",
    "title": "Customize Sub Type - Update",
    "group": "Admin_-_Customize_Sub_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_id",
            "description": "<p>Type Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/customize/update_subtype/5f8997a469640625383ebe48\",\n    \"message\": \"Type details has updated successfully.\",\n    \"data\": {\n        \"parent_id\": \"5f892e28a5847d23c07afbdb\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f8997a469640625383ebe48\",\n        \"name\": \"demo\",\n        \"createdAt\": \"2020-10-16T12:52:52.133Z\",\n        \"updatedAt\": \"2020-10-16T13:13:00.947Z\",\n        \"__v\": 0,\n        \"id\": \"5f8997a469640625383ebe48\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_sub_category/update_subcategory/5f7569396225c836a868f7e7\",\n    \"message\": \"Sub category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationSubType.js",
    "groupTitle": "Admin_-_Customize_Sub_Type",
    "name": "PutUser_serviceAdminCustomizeUpdate_subtypeSubtype_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/customize/delete_type/:type_id",
    "title": "Customize Type - Delete",
    "group": "Admin_-_Customize_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "  HTTP/1.1 200 OK\n  {\n    \"status\": \"success\",\n    \"api_name\": \"/customize/delete_type/5f892e2fa5847d23c07afbdc\",\n    \"message\": \"Type has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/customize/delete_type/5f892e2fa5847d23c07afbdc\",\n    \"message\": \"Type doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationType.js",
    "groupTitle": "Admin_-_Customize_Type",
    "name": "DeleteUser_serviceAdminCustomizeDelete_typeType_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/customize/get_customization_type/:type_id",
    "title": "Customize Type - Get Single",
    "group": "Admin_-_Customize_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/customize/get_customization_type/5f892e2fa5847d23c07afbdc\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"_id\": \"5f892e2fa5847d23c07afbdc\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"name\": \"RAM\",\n        \"createdAt\": \"2020-10-16T05:22:55.590Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/customize/get_customization_type/5f892e2fa5847d23c07afbdc\",\n\"message\": \"Type doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationType.js",
    "groupTitle": "Admin_-_Customize_Type",
    "name": "GetUser_serviceAdminCustomizeGet_customization_typeType_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/customize/get_customization_types",
    "title": "Customize Type - Listing",
    "group": "Admin_-_Customize_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n   {\n    \"status\": \"success\",\n    \"api_name\": \"/customize/get_customization_types\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"parent_id\": \"1dsfsdsdf\",\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f7da509c46aed38b4b43429\",\n                \"name\": \"Test\",\n                \"createdAt\": \"2020-10-07T11:22:49.482Z\",\n                \"updatedAt\": \"2020-10-07T11:22:49.482Z\",\n                \"__v\": 0,\n                \"id\": \"5f7da509c46aed38b4b43429\"\n            },\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/customize/get_customization_types\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationType.js",
    "groupTitle": "Admin_-_Customize_Type",
    "name": "GetUser_serviceAdminCustomizeGet_customization_types"
  },
  {
    "type": "post",
    "url": "/user_service/admin/customize/create_customization_type",
    "title": "Customize Type - Create Type",
    "group": "Admin_-_Customize_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/customize/create_customization_type\",\n\"message\": \"Customization type has created successfully.\",\n    \"data\": {\n        \"parent_id\": \"\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f87e04ab695872c68a55ba9\",\n        \"name\": \"Color\",\n        \"createdAt\": \"2020-10-15T05:38:18.318Z\",\n        \"updatedAt\": \"2020-10-15T05:38:18.318Z\",\n        \"__v\": 0,\n        \"id\": \"5f87e04ab695872c68a55ba9\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/customize/create_customization_type\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationType.js",
    "groupTitle": "Admin_-_Customize_Type",
    "name": "PostUser_serviceAdminCustomizeCreate_customization_type"
  },
  {
    "type": "put",
    "url": "/user_service/admin/customize/update_customize_type/:type_id",
    "title": "Customize Type - Update",
    "group": "Admin_-_Customize_Type",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n   \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/customize/update_customize_type/5f892e2fa5847d23c07afbdc\",\n    \"message\": \"Type details has updated successfully.\",\n    \"data\": {\n        \"parent_id\": \"\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f892e2fa5847d23c07afbdc\",\n        \"name\": \"RAMS\",\n        \"createdAt\": \"2020-10-16T05:22:55.590Z\",\n        \"updatedAt\": \"2020-10-16T05:47:21.917Z\",\n        \"__v\": 0,\n        \"id\": \"5f892e2fa5847d23c07afbdc\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": \"error\",\n   \"api_name\": \"/customize/update_customize_type/5f892e2fa5847d23c07afbdc\",\n   \"message\": \"Type doesn't exist.\",\n   \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/CustomizationType.js",
    "groupTitle": "Admin_-_Customize_Type",
    "name": "PutUser_serviceAdminCustomizeUpdate_customize_typeType_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/drivers/:user_id",
    "title": "Drivers - Delete",
    "group": "Admin_-_Driver",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"delete_driver\",\n    \"message\": \"User has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"delete_driver\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "DeleteUser_serviceAdminDriversUser_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/drivers",
    "title": "Driver - Listing",
    "group": "Admin_-_Driver",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start Date ( Format: YYYY-MM-DD )</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End Date ( Format: YYYY-MM-DD )</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/drivers\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f6c6fce1705fe1da05de2ea\",\n                \"wallet\": \"0.00\",\n                \"is_email_varify\": 0,\n                \"show_notification\": 0,\n                \"is_available\": 0,\n                \"device_type\": 0,\n                \"auth_token\": \"\",\n                \"firebase_token\": \"\",\n                \"is_active\": 0,\n                \"is_deleted\": 0,\n                \"first_name\": \"Nishant\",\n                \"last_name\": \"Jain\",\n                \"user_role\": \"3\",\n                \"email\": \"jain@gmail.com\",\n                \"country_code\": \"+91\",\n                \"phone\": 369963258,\n                \"password\": \"$2a$10$nnwoIZo81Mb98VUo3rEIOeX/8FuW6Sa5dDNbav4KdC6BlSYATXEqW\",\n                \"user_image\": \"\",\n                \"createdAt\": \"2020-09-24T10:07:10.506Z\",\n                \"updatedAt\": \"2020-09-24T10:07:10.506Z\",\n                \"__v\": 0\n            },\n            \n        ],\n        \"totalDocs\": 5,\n        \"limit\": 10,\n        \"page\": null,\n        \"totalPages\": 1,\n        \"pagingCounter\": null,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"drivers\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "GetUser_serviceAdminDrivers"
  },
  {
    "type": "get",
    "url": "/user_service/admin/drivers/get_driver/:user_id",
    "title": "Drivers - Get Single",
    "group": "Admin_-_Driver",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/drivers/get_driver/5f6dd9b10c6b0f0ce4629108\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"wallet\": \"0.00\",\n        \"is_email_varify\": 0,\n        \"show_notification\": 0,\n        \"is_available\": 0,\n        \"device_type\": 0,\n        \"auth_token\": \"\",\n        \"firebase_token\": \"\",\n        \"is_active\": 0,\n        \"is_deleted\": 0,\n        \"_id\": \"5f6dd9b10c6b0f0ce4629108\",\n        \"username\": \"vishnu kumar\",\n        \"user_role\": 4,\n        \"email\": \"vishnu04@gmail.com\",\n        \"country_code\": \"+91\",\n        \"phone\": 367795218,\n        \"password\": \"$2a$10$rcFku396kWB4acyxsq8fQenaCAjJayez/21DMRZFaFiwTIxLbtq/C\",\n        \"user_image\": \"\",\n        \"createdAt\": \"2020-09-25T11:51:13.185Z\",\n        \"updatedAt\": \"2020-09-25T11:51:13.185Z\",\n        \"__v\": 0,\n        \"register_id\": \"419195f6dd9b10c6b0f0ce4629108\",\n        \"user_image_url\": \"http://192.168.1.131:3051/service/assets?service=user_service&filepath=default/placeholder-user.jpg\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3051/service/assets?service=user_service&filepath=default/placeholder-user.jpg\",\n        \"id\": \"5f6dd9b10c6b0f0ce4629108\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/drivers/get_driver/5f195d3ce3c67c75b42fc145\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "GetUser_serviceAdminDriversGet_driverUser_id"
  },
  {
    "type": "post",
    "url": "/user_service/admin/drivers/create_driver",
    "title": "Drivers - Create",
    "group": "Admin_-_Driver",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/drivers/create_driver\",\n    \"message\": \"User has created successfully.\",\n    \"data\": {\n        \"address\": \"malviya nagar,jaipur\",\n        \"geoLocation\": {\n            \"type\": \"Point\",\n            \"coordinates\": [\n                75.8242966,\n                26.8548662\n            ],\n            \"_id\": \"5f75a2bc51a90d3694328d66\"\n        },\n        \"wallet\": \"0.00\",\n        \"is_user_verified\": 1,\n        \"is_email_verified\": 1,\n        \"show_notification\": 0,\n        \"is_available\": 0,\n        \"device_type\": 0,\n        \"auth_token\": \"\",\n        \"device_token\": \"\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f75a2bc51a90d3694328d65\",\n        \"username\": \"Vimal sharma\",\n        \"user_role\": 4,\n        \"email\": \"vimal02@gmail.com\",\n        \"country_code\": \"91\",\n        \"phone\": \"111222444\",\n        \"password\": \"$2a$10$Fwl1FBbtUD9IqKnop6R1Xey7zX.LTzEHbLvBpiWMFPyhmk4R5kkF6\",\n        \"user_image\": \"16015448924324e3f421.jpg\",\n        \"createdAt\": \"2020-10-01T09:34:52.427Z\",\n        \"updatedAt\": \"2020-10-01T09:34:52.437Z\",\n        \"__v\": 0,\n        \"register_id\": \"178445f75a2bc51a90d3694328d65\",\n        \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f75a2bc51a90d3694328d65/16015448924324e3f421.jpg\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f75a2bc51a90d3694328d65/thumb_16015448924324e3f421.jpg\",\n        \"id\": \"5f75a2bc51a90d3694328d65\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"error\",\n    \"api_name\": \"/drivers/create_driver\",\n    \"message\": \"You are already registered with this phone number.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "PostUser_serviceAdminDriversCreate_driver"
  },
  {
    "type": "put",
    "url": "/user_service/admin/drivers/status/:user_id",
    "title": "Drivers - Update Status",
    "group": "Admin_-_Driver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"update_status\",\n    \"message\": \"User status has changed successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_status\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "PutUser_serviceAdminDriversStatusUser_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/drivers/update_driver/:user_id",
    "title": "Drivers - Update",
    "group": "Admin_-_Driver",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/drivers/update_driver/5f202034cf946713ced6bd52\",\n    \"message\": \"User details has updated successfully.\",\n    \"data\": {\n            \"_id\": \"5f6c6fce1705fe1da05de2ea\",\n            \"wallet\": \"0.00\",\n            \"is_email_varify\": 0,\n            \"show_notification\": 0,\n            \"is_available\": 0,\n            \"device_type\": 0,\n            \"auth_token\": \"\",\n            \"firebase_token\": \"\",\n            \"is_active\": 0,\n            \"is_deleted\": 0,\n            \"first_name\": \"Nishant\",\n            \"last_name\": \"Jain\",\n            \"user_role\": \"4\",\n            \"email\": \"jain@gmail.com\",\n            \"country_code\": \"+91\",\n            \"phone\": 369963258,\n            \"password\": \"$2a$10$nnwoIZo81Mb98VUo3rEIOeX/8FuW6Sa5dDNbav4KdC6BlSYATXEqW\",\n            \"user_image\": \"\",\n            \"createdAt\": \"2020-09-24T10:07:10.506Z\",\n            \"updatedAt\": \"2020-09-24T10:07:10.506Z\",\n            \"__v\": 0\n        },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_driver\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Driver.js",
    "groupTitle": "Admin_-_Driver",
    "name": "PutUser_serviceAdminDriversUpdate_driverUser_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/profile/",
    "title": "Admin - Get Profile",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/profile/5f18295dd364c8608604b992\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiIxIiwidXNlcl9wZXJtaXNzaW9ucyI6Int9IiwiaWF0IjoxNjAxMDEyMDUyLCJleHAiOjE2MDEwOTg0NTJ9.0Ff-mg5FJgcv_zqtwhD-RbqtZG9wUO-j-t8aGK9HPow\",\n        \"wallet\": \"0.00\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f18295dd364c8608604b992\",\n        \"username\": \"admin\",\n        \"first_name\": \"Admin\",\n        \"last_name\": \"admin\",\n        \"email\": \"tivoadmin@mailinator.com\",\n        \"country_code\": \"+91\",\n        \"phone_no\": 5656666666,\n        \"password\": \"$2a$10$pDvfNbADsrQE4USqsPpZC.Mv8piQo3bdHY7gzplBmkhE7xc96wVl2\",\n        \"user_role\": \"1\",\n        \"user_image\": \"1598531599011banner1.png\",\n        \"user_permissions\": \"{}\",\n        \"createdAt\": \"2020-02-10T08:47:06.799Z\",\n        \"updatedAt\": \"2020-09-25T05:34:12.011Z\",\n        \"__v\": 0,\n        \"last_login_time\": \"2020-09-25T05:34:12.010Z\",\n        \"user_image_url\": \"public/uploads/users//5f18295dd364c8608604b992/1598531599011banner1.png\",\n        \"id\": \"5f18295dd364c8608604b992\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/profile/5f18295dd364c8608604b992\",\n    \"message\": \"Admin not exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "GetUser_serviceAdminProfile"
  },
  {
    "type": "post",
    "url": "/user_service/admin/profile/resend_otp",
    "title": "Profile - Resend OTP",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_for",
            "description": "<p>OTP For What : forgot_password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/resend_otp\",\n    \"message\": \"OTP has sent to your email.\",\n    \"data\": {\n        \"_id\": \"5f18295dd364c8608604b992\",\n        \"email\": \"tivoadmin@mailinator.com\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"resend_otp\",\n    \"message\": \"User email is not exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PostUser_serviceAdminProfileResend_otp"
  },
  {
    "type": "post",
    "url": "/user_service/admin/profile/update_forgot_password",
    "title": "Profile - Update Forgot Password",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_number",
            "description": "<p>OTP Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_for",
            "description": "<p>OTP For What : forgot_password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"update_forgot_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_forgot_password\",\n    \"message\": \"Invalid email. User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PostUser_serviceAdminProfileUpdate_forgot_password"
  },
  {
    "type": "post",
    "url": "/user_service/admin/user_login",
    "title": "Admin - Login",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username / Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/admin_login\",\n    \"message\": \"You have logged in successfully.\",\n    \"data\": {\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiIxIiwidXNlcl9wZXJtaXNzaW9ucyI6Int9IiwiaWF0IjoxNjAxMDEyMDUyLCJleHAiOjE2MDEwOTg0NTJ9.0Ff-mg5FJgcv_zqtwhD-RbqtZG9wUO-j-t8aGK9HPow\",\n        \"wallet\": \"0.00\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f18295dd364c8608604b992\",\n        \"username\": \"admin\",\n        \"first_name\": \"Admin\",\n        \"last_name\": \"admin\",\n        \"email\": \"tivoadmin@mailinator.com\",\n        \"country_code\": \"+91\",\n        \"phone_no\": 5656666666,\n        \"password\": \"$2a$10$pDvfNbADsrQE4USqsPpZC.Mv8piQo3bdHY7gzplBmkhE7xc96wVl2\",\n        \"user_role\": \"1\",\n        \"user_image\": \"1598531599011banner1.png\",\n        \"user_permissions\": \"{}\",\n        \"createdAt\": \"2020-02-10T08:47:06.799Z\",\n        \"updatedAt\": \"2020-09-25T05:34:12.011Z\",\n        \"__v\": 0,\n        \"last_login_time\": \"2020-09-25T05:34:12.010Z\",\n        \"user_image_url\": \"public/uploads/users//5f18295dd364c8608604b992/1598531599011banner1.png\",\n        \"id\": \"5f18295dd364c8608604b992\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"admin_login\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PostUser_serviceAdminUser_login"
  },
  {
    "type": "put",
    "url": "/user_service/admin/change_password/",
    "title": "Admin - Change Password",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"change_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"change_password\",\n    \"message\": \"Admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PutUser_serviceAdminChange_password"
  },
  {
    "type": "put",
    "url": "/user_service/admin/profile/dashboard",
    "title": "Profile - Dashboard",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/profile/get_dashboard_data\",\n\"message\": \"Success\",\n\"data\": {\n\"customersCount\": 2,\n\"driversCount\": 7,\n\"brandsCount\": 2,\n\"warehouseCount\": 2,\n\"businessCategoryCount\": 3,\n\"productCategoryCount\": 3\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/profile/get_dashboard_data\",\n\"message\": \"Error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PutUser_serviceAdminProfileDashboard"
  },
  {
    "type": "put",
    "url": "/user_service/admin/profile/logout",
    "title": "Profile - Logout",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/admin_logout/5f1ea69772b93269067003c5\",\n    \"message\": \"You have logged out successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/admin_logout/5f1ea69772b93269067003c5\",\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PutUser_serviceAdminProfileLogout"
  },
  {
    "type": "put",
    "url": "/user_service/admin/update_profile",
    "title": "Profile - Update",
    "group": "Admin_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "\nHTTP/1.1 200 OK\n\n{\n    \"status\": \"success\",\n    \"api_name\": \"/update_profile/5f18295dd364c8608604b992\",\n    \"message\": \"Profile has updated successfully.\",\n    \"data\": {\n        \"_id\": \"5f18295dd364c8608604b992\",\n        \"username\": \"admin\",\n        \"first_name\": \"Admin\",\n       \"last_name\": \"admin\",\n        \"email\": \"tivoadmin@mailinator.com\",\n        \"phone\": \"5656666666\",\n        \"password\": \"$2a$10$.bk/R8sWp7oY1XVivtmsmuD0h2AEzWJfOU5So1mErSL/b4Hq64KpW\",\n        \"user_role\": \"admin\",\n        \"user_image\": \"1596105854180sampleprofilepic.png\",\n        \"user_permissions\": \"{}\",\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Mjk1ZGQzNjRjODYwODYwNGI5OTIiLCJ1c2VyX3JvbGUiOiJhZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOiJ7fSIsImlhdCI6MTU5NjEwNTAyMywiZXhwIjoxNTk2NzA5ODIzfQ.siG-2KlBTETi4lNytf6WQBD0rA8WDyJXtfYpQVBK0qQ\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"createdAt\": \"2020-02-10T08:47:06.799Z\",\n        \"updatedAt\": \"2020-07-30T10:44:14.184Z\",\n        \"__v\": 0,\n        \"user_image_url\": \"http://192.168.1.154:3031/uploads/admins/5f18295dd364c8608604b992/1596105854180sampleprofilepic.png\",\n        \"user_image_thumb_url\": \"http://192.168.1.154:3031/uploads/admins/5f18295dd364c8608604b992/thumb_1596105854180sampleprofilepic.png\",\n        \"id\": \"5f18295dd364c8608604b992\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "\nHTTP/1.1 200 OK\n\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_profile\",\n    \"message\": \"Admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "Admin_-_Login",
    "name": "PutUser_serviceAdminUpdate_profile"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product/delete_customize_data/:customize_id",
    "title": "Product - Customize Data Delete",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/delete_customize_data/5f8ffda451ae342f080fedbc\",\n    \"message\": \"Product customize has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/delete_customize_data/5f8ffda451ae342f080fedbc\",\n\"message\": \"Data doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "DeleteUser_serviceAdminProductDelete_customize_dataCustomize_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product/delete_inventory_data/:inventory_id",
    "title": "Product - Inventory Data Delete",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/delete_inventory_data/5f8ffda451ae342f080fedbc\",\n    \"message\": \"Product customize has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/delete_customize_data/5f8ffda451ae342f080fedbc\",\n\"message\": \"Data doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "DeleteUser_serviceAdminProductDelete_inventory_dataInventory_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product/delete_product/:product_id",
    "title": "Product - Delete",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/delete_product/5f8546a6eb7b292138cd7226\",\n\"message\": \"Product has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n   \"api_name\": \"/product/delete_product/5f744d2ea1bd7f352c619577\",\n    \"message\": \"Product doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "DeleteUser_serviceAdminProductDelete_productProduct_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product/delete_product_image/:product_image_id",
    "title": "Product - Delete Images",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/delete_product_image/5f744d2ea1bd7f352c619577\",\n\"message\": \"Product image has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n   \"api_name\": \"/product/delete_product_image/5f744d2ea1bd7f352c619577\",\n    \"message\": \"Product Image doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "DeleteUser_serviceAdminProductDelete_product_imageProduct_image_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product/add_product",
    "title": "Product - Add Product",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\" : \"mutipart/form-data\",\n    \"Autherization\" : \"Bearer auth token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Product description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "product_images",
            "description": "<p>Formdata Image Object array</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customize",
            "description": "<p>Customize array</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price of product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>product quantity</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/add_product\",\n\"message\": \"Product has created successfully.\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f7316ddb038fe182482a154\",\n    \"name\": \"Grocery\",\n    \"cancelation_time\": 45,\n    \"return_time\": 30,\n    \"createdAt\": \"2020-09-29T11:13:33.649Z\",\n    \"updatedAt\": \"2020-09-29T11:13:33.649Z\",\n    \"__v\": 0,\n    \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/undefined\",\n    \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/business_category/5f7316ddb038fe182482a154/thumb_undefined\",\n    \"id\": \"5f7316ddb038fe182482a154\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/add_product\",\n\"message\": \"You are already registered with this phone number.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "GetUser_serviceAdminProductAdd_product"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product/get_customization_types",
    "title": "Product - Type",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n   {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_customization_types\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"parent_id\": \"1dsfsdsdf\",\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f7da509c46aed38b4b43429\",\n                \"name\": \"Test\",\n                \"createdAt\": \"2020-10-07T11:22:49.482Z\",\n                \"updatedAt\": \"2020-10-07T11:22:49.482Z\",\n                \"__v\": 0,\n                \"id\": \"5f7da509c46aed38b4b43429\"\n            },\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/get_customization_types\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "GetUser_serviceAdminProductGet_customization_types"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product/get_product/:product_id",
    "title": "Product - Details",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "        HTTP/1.1 200 OK\n       {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_product/5f883814eb8b082d3404edc8\",\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"_id\": \"5f883814eb8b082d3404edc8\",\n            \"name\": \"Redmi note 10\",\n            \"images\": [\n                {\n                    \"_id\": \"5f883815eb8b082d3404edca\",\n                    \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                    \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                }\n            ],\n            \"business_category\": {\n                \"_id\": \"5f74508abd58a077d3db6329\",\n                \"name\": \"Electronics\"\n            },\n            \"product_category\": {\n                \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                \"name\": \"Mobiles\"\n            },\n            \"product_subcategory\": {\n                \"_id\": \"5f75b811a0236828b231fd68\",\n                \"name\": \"Samsung\"\n            },\n            \"inventory\": [\n                {\n                    \"_id\": \"5f883814eb8b082d3404edc9\",\n                    \"is_active\": 1,\n                    \"inventry_name\": \"Red ,64 GB\",\n                    \"product_id\": \"5f883814eb8b082d3404edc8\",\n                    \"price\": 500.5,\n                    \"product_quantity\": 2,\n                    \"product_code\": \"Ele-Mob-Sam-4222-Red\",\n                    \"ProductCustomizationData\": [\n                        {\n                            \"_id\": \"5f883815eb8b082d3404edcb\",\n                            \"title\": {\n                                \"_id\": \"5f8974d737fa3ff404686305\",\n                                \"name\": \"RAMS\",\n                                \"value\": {\n                                    \"_id\": \"5f8974d737fa3ff404686308\",\n                                    \"name\": \"5\"\n                                }\n                            }\n                        },\n                        {\n                            \"_id\": \"5f883815eb8b082d3404edcd\",\n                            \"title\": {\n                                \"_id\": \"5f87e04ab695872c68a55ba9\",\n                                \"name\": \"Color\",\n                                \"value\": {\n                                    \"_id\": \"5f8974d737fa3ff4046862ff\",\n                                    \"name\": \"Red\"\n                                }\n                            }\n                        }\n                    ]\n                },\n                {\n                    \"_id\": \"5f8e73f08a613f62470f6e20\",\n                    \"is_active\": 1,\n                    \"inventry_name\": \"Black ,64 GB\",\n                    \"product_id\": \"5f883814eb8b082d3404edc8\",\n                    \"price\": 600.5,\n                    \"product_quantity\": 2,\n                    \"product_code\": \"Ele-Mob-Sam-4222-Black\",\n                    \"ProductCustomizationData\": []\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product/get_product/5f883814eb8b082d3404edc8\",\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "GetUser_serviceAdminProductGet_productProduct_id"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product/get_category",
    "title": "Product - Category",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_category\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f757eda6fcbe90a537e2507\",\n                \"name\": \"Category 4\",\n                \"cancelation_time\": 40,\n                \"return_time\": 40,\n                \"createdAt\": \"2020-10-01T07:01:46.672Z\",\n                \"updatedAt\": \"2020-10-01T07:01:46.677Z\",\n                \"__v\": 0,\n                \"category_image\": \"1601535706675reliencefresh.jpg\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg\",\n                \"id\": \"5f757eda6fcbe90a537e2507\"\n            },\n        ],\n        \"totalDocs\": 3,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_category\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PostUser_serviceAdminProductGet_category"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product/get_customization_type_values",
    "title": "Product - Subtype",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": " {\n     \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_id",
            "description": "<p>Typer Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_customization_type_values/5f87e04ab695872c68a55ba9\",\n    \"message\": \"Product type list fetch successfully.\",\n    \"data\": [\n        {\n            \"_id\": \"5f87e098c1594a27f0b41be0\",\n            \"parent_id\": \"5f87e04ab695872c68a55ba9\",\n            \"is_active\": 1,\n            \"is_deleted\": 0,\n            \"name\": \"Color\",\n            \"createdAt\": \"2020-10-15T05:39:36.076Z\",\n            \"updatedAt\": \"2020-10-15T05:39:36.076Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n   \"api_name\": \"/product/get_customization_type_values/5f87e04ab695872c68a55ba9\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PostUser_serviceAdminProductGet_customization_type_values"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product/get_product_lists",
    "title": "Product - Listing",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_product_lists\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f7dc621b5849b1c50de79ae\",\n                \"name\": \"Maggi\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f7dc621b5849b1c50de79b2\",\n                        \"product_image_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f7dc621b5849b1c50de79b3\",\n                        \"product_image_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f7449b1769cc375d2f49929\",\n                    \"name\": \"Clothes\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b6e80b0e2127b1361e3d\",\n                    \"name\": \"Prod subcat 1\"\n                },\n                \"price\": \"200\"\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/get_product_lists\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PostUser_serviceAdminProductGet_product_lists"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product/get_subcategory",
    "title": "Product - Sub Category",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/get_subcategory\",\n\"data\": {\n    \"docs\": [\n        {\n            \"is_active\": 1,\n            \"is_deleted\": 0,\n            \"_id\": \"5f757eda6fcbe90a537e2507\",\n            \"name\": \"Category 4\",\n            \"cancelation_time\": 40,\n            \"return_time\": 40,\n            \"createdAt\": \"2020-10-01T07:01:46.672Z\",\n            \"updatedAt\": \"2020-10-01T07:01:46.677Z\",\n            \"__v\": 0,\n            \"category_image\": \"1601535706675reliencefresh.jpg\",\n            \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg\",\n            \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg\",\n            \"id\": \"5f757eda6fcbe90a537e2507\"\n        }\n    ],\n    \"totalDocs\": 3,\n    \"limit\": 10,\n    \"totalPages\": 1,\n    \"page\": 1,\n    \"pagingCounter\": 1,\n    \"hasPrevPage\": false,\n    \"hasNextPage\": false,\n    \"prevPage\": null,\n    \"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_subcategory\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PostUser_serviceAdminProductGet_subcategory"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product/update_inventory_detail",
    "title": "Product - Update Inventory detail",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\" : \"mutipart/form-data\",\n\"Autherization\" : \"Bearer auth token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customize",
            "description": "<p>Customize array</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inventory_name",
            "description": "<p>Inventory Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product_id",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inventory_id",
            "description": "<p>Inventry Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>Quantity</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"status\": \"success\",\n    \"api_name\": \"/product/update_inventory_detail/5f8546a6eb7b292138cd7226\",\n    \"message\": \"Product details has updated successfully.\",\n    \"data\": {\n        \"is_active\": 0,\n        \"is_deleted\": 0,\n        \"_id\": \"5f8546a6eb7b292138cd7226\",\n        \"product_id\": \"5f7c38339ed8b93ac4a93bff\",\n        \"price\": 5000,\n        \"product_quantity\": 3,\n        \"product_code\": \"dsada\",\n        \"createdAt\": \"2020-10-13T06:18:14.063Z\",\n        \"updatedAt\": \"2020-10-21T09:21:40.044Z\",\n        \"__v\": 0,\n        \"inventory_name\": \"demo namee\",\n        \"id\": \"5f8546a6eb7b292138cd7226\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/update_inventory_detail/5f8546a6eb7b292138cd7226\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PostUser_serviceAdminProductUpdate_inventory_detail"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product/update_product_detail/:product_id",
    "title": "Product - Update Product deta",
    "group": "Admin_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\" : \"mutipart/form-data\",\n\"Autherization\" : \"Bearer auth token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "product_images",
            "description": "<p>Formdata Image Object array</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "   HTTP/1.1 200 OK\n   {\n   \"status\": \"success\",\n   \"api_name\": \"/product/update_product_detail/5f7c38339ed8b93ac4a93bff\",\n   \"message\": \"Product details has updated successfully.\",\n   \"data\": {\n       \"images\": [\n           \"5f8fd74f1ea4c120d07b1bb3\",\n           \"5f8fd74f1ea4c120d07b1bb4\"\n       ],\n       \"is_active\": 1,\n       \"is_deleted\": 0,\n       \"_id\": \"5f7c38339ed8b93ac4a93bff\",\n       \"name\": \"Maggi\",\n       \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n       \"category_id\": \"5f8040ee08707c11ecb09db8\",\n       \"sub_category_id\": \"5f80412a08707c11ecb09db9\",\n       \"createdAt\": \"2020-10-06T09:26:11.670Z\",\n       \"updatedAt\": \"2020-10-21T06:38:07.937Z\",\n       \"__v\": 0,\n       \"product_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/product/5f7c38339ed8b93ac4a93bff/undefined\",\n       \"product_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/product/5f7c38339ed8b93ac4a93bff/thumb_undefined\",\n       \"id\": \"5f7c38339ed8b93ac4a93bff\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/update_product_detail/5f7c38339ed8b93ac4a93bff\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PutUser_serviceAdminProductUpdate_product_detailProduct_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product/update_status/:product_id",
    "title": "Product - Update Status",
    "group": "Admin_-_Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/update_status/5f8546a6eb7b292138cd7226\",\n\"message\": \"Product status has updated successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product/update_status/5f8546a6eb7b292138cd7226\",\n    \"message\": \"Product doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Product.js",
    "groupTitle": "Admin_-_Product",
    "name": "PutUser_serviceAdminProductUpdate_statusProduct_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product_category/delete_category/:category_id",
    "title": "Product Category - Delete",
    "group": "Admin_-_Product_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product_category/delete_category/5f744d2ea1bd7f352c619577\",\n    \"message\": \"Category has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_category/delete_business_category/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "DeleteUser_serviceAdminProduct_categoryDelete_categoryCategory_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product_category/get_category/:category_id",
    "title": "Product Category - Get Single",
    "group": "Admin_-_Product_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product_category/get_category/5f744d2ea1bd7f352c619577\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"parent_id\": 0,\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f744d2ea1bd7f352c619577\",\n        \"name\": \"Fashion\",\n        \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n        \"createdAt\": \"2020-09-30T09:17:34.761Z\",\n        \"updatedAt\": \"2020-09-30T09:17:34.778Z\",\n        \"__v\": 0,\n        \"image_path\": \"16014574547667218af6.jpg\",\n        \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014574547667218af6.jpg\",\n        \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014574547667218af6.jpg\",\n        \"id\": \"5f744d2ea1bd7f352c619577\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_category/get_category/5f744d2ea1bd7f352c619577\",\n\"message\": \"Category doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "GetUser_serviceAdminProduct_categoryGet_categoryCategory_id"
  },
  {
    "type": "get",
    "url": "/user_service/product_category/get_categories",
    "title": "Product Categories - Listing",
    "group": "Admin_-_Product_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product_category/get_categories\",\n\"message\": \"Success\",\n\"data\": {\n\"docs\": [\n{\n\"parent_id\": 0,\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f744d2ea1bd7f352c619577\",\n\"name\": \"Fashion\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"createdAt\": \"2020-09-30T09:17:34.761Z\",\n\"updatedAt\": \"2020-09-30T09:17:34.778Z\",\n\"__v\": 0,\n\"image_path\": \"16014574547667218af6.jpg\",\n\"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014574547667218af6.jpg\",\n\"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014574547667218af6.jpg\",\n\"id\": \"5f744d2ea1bd7f352c619577\"\n},\n],\n\"totalDocs\": 2,\n\"limit\": 10,\n\"totalPages\": 1,\n\"page\": 1,\n\"pagingCounter\": 1,\n\"hasPrevPage\": false,\n\"hasNextPage\": false,\n\"prevPage\": null,\n\"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_category/get_categories\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "GetUser_serviceProduct_categoryGet_categories"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product_category/create_category",
    "title": "Product Category - Create",
    "group": "Admin_-_Product_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product_category/create_category\",\n\"message\": \"Category has created successfully.\",\n\"data\": {\n\"parent_id\": 0,\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f7428a688444b3074ce512a\",\n\"name\": \"Bills\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"createdAt\": \"2020-09-30T06:41:42.475Z\",\n\"updatedAt\": \"2020-09-30T06:41:42.503Z\",\n\"__v\": 0,\n\"image_path\": \"16014481024972aae1d6.jpg\",\n\"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7428a688444b3074ce512a/16014481024972aae1d6.jpg\",\n\"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7428a688444b3074ce512a/thumb_16014481024972aae1d6.jpg\",\n\"id\": \"5f7428a688444b3074ce512a\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_category/create_category\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "PostUser_serviceAdminProduct_categoryCreate_category"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product_category/status/:category_id",
    "title": "Product Category - Update Status",
    "group": "Admin_-_Product_Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product_category/status/5f7428a688444b3074ce512a\",\n    \"message\": \"Category status has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_category/update_status/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "PutUser_serviceAdminProduct_categoryStatusCategory_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product_category/update_category/:category_id",
    "title": "Product Category - Update",
    "group": "Admin_-_Product_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product_category/update_category/5f744d2ea1bd7f352c619577\",\n    \"message\": \"Category details has updated successfully.\",\n    \"data\": {\n        \"parent_id\": 0,\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f744d2ea1bd7f352c619577\",\n        \"name\": \"Fashionsss\",\n        \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n        \"createdAt\": \"2020-09-30T09:17:34.761Z\",\n        \"updatedAt\": \"2020-09-30T10:04:53.071Z\",\n        \"__v\": 0,\n        \"image_path\": \"16014602930669dcc9e6.png\",\n        \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/16014602930669dcc9e6.png\",\n        \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f744d2ea1bd7f352c619577/thumb_16014602930669dcc9e6.png\",\n        \"id\": \"5f744d2ea1bd7f352c619577\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_category/update_business_category/5f731c3efae7b5304ce6ae78\",\n    \"message\": \"Category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Category.js",
    "groupTitle": "Admin_-_Product_Category",
    "name": "PutUser_serviceAdminProduct_categoryUpdate_categoryCategory_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/product_sub_category/delete_subcategory/:subcategory_id",
    "title": "Product Sub Category - Delete",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product_sub_category/delete_subcategory/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub Category has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_sub_category/delete_subcategory/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "DeleteUser_serviceAdminProduct_sub_categoryDelete_subcategorySubcategory_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product_sub_category/get_category_by_business/:business_category_id",
    "title": "Product Sub Category - Get Business Single",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product_sub_category/get_category_by_business/5f73158c500ead10f8fcdca1\",\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"parent_id\": \"\",\n            \"is_active\": 1,\n            \"is_deleted\": 0,\n            \"_id\": \"5f757787edb15f37b88fe0c0\",\n            \"name\": \"Fashion\",\n            \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n            \"createdAt\": \"2020-10-01T06:30:31.031Z\",\n            \"updatedAt\": \"2020-10-01T06:30:31.040Z\",\n            \"__v\": 0,\n            \"image_path\": \"16015338310352aae1d6.jpg\",\n            \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f757787edb15f37b88fe0c0/16015338310352aae1d6.jpg\",\n            \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f757787edb15f37b88fe0c0/thumb_16015338310352aae1d6.jpg\",\n            \"id\": \"5f757787edb15f37b88fe0c0\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_sub_category/get_category_by_business/5f73158c500ead10f8fcdca1\",\n\"message\": \"Category doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "GetUser_serviceAdminProduct_sub_categoryGet_category_by_businessBusiness_category_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product_sub_category/get_subcategories",
    "title": "Product Sub Categories - Listing",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product_sub_category/get_subcategories\",\n\"message\": \"Success\",\n\"data\": {\n\"docs\": [\n{\n    \"parent_id\": \"5f7569396225c836a868f7e7\",\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f7569b05bbadd2914a19c58\",\n    \"name\": \"Hand Soap\",\n    \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n    \"createdAt\": \"2020-10-01T05:31:28.414Z\",\n    \"updatedAt\": \"2020-10-01T05:31:28.435Z\",\n    \"__v\": 0,\n    \"image_path\": \"16015302884199dcc9e6.png\",\n    \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/16015302884199dcc9e6.png\",\n    \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/thumb_16015302884199dcc9e6.png\",\n    \"id\": \"5f7569b05bbadd2914a19c58\"\n}\n],\n\"totalDocs\": 1,\n\"limit\": 10,\n\"totalPages\": 1,\n\"page\": 1,\n\"pagingCounter\": 1,\n\"hasPrevPage\": false,\n\"hasNextPage\": false,\n\"prevPage\": null,\n\"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_sub_category/get_subcategories\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "GetUser_serviceAdminProduct_sub_categoryGet_subcategories"
  },
  {
    "type": "get",
    "url": "/user_service/admin/product_sub_category/get_subcategory/:subcategory_id",
    "title": "Product Sub Category - Get Single",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product_sub_category/get_subcategory/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"parent_id\": \"5f7569396225c836a868f7e7\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f7569b05bbadd2914a19c58\",\n        \"name\": \"Hand Soap\",\n        \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n        \"createdAt\": \"2020-10-01T05:31:28.414Z\",\n        \"updatedAt\": \"2020-10-01T05:31:28.435Z\",\n        \"__v\": 0,\n        \"image_path\": \"16015302884199dcc9e6.png\",\n        \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/16015302884199dcc9e6.png\",\n        \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569b05bbadd2914a19c58/thumb_16015302884199dcc9e6.png\",\n        \"id\": \"5f7569b05bbadd2914a19c58\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_sub_category/get_subcategory/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "GetUser_serviceAdminProduct_sub_categoryGet_subcategorySubcategory_id"
  },
  {
    "type": "post",
    "url": "/user_service/admin/product_sub_category/create_subcategory",
    "title": "Product Sub Category - Create",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product_sub_category/create_category\",\n\"message\": \"Sub Category has created successfully.\",\n\"data\": {\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f75679d6b4f8d1114e98fb7\",\n\"name\": \"Fashion\",\n\"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n\"parent_id\": \"5f7428a688444b3074ce512a\",\n\"createdAt\": \"2020-10-01T05:22:37.873Z\",\n\"updatedAt\": \"2020-10-01T05:22:37.892Z\",\n\"__v\": 0,\n\"image_path\": \"16015297578779dcc9e6.png\",\n\"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f75679d6b4f8d1114e98fb7/16015297578779dcc9e6.png\",\n\"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f75679d6b4f8d1114e98fb7/thumb_16015297578779dcc9e6.png\",\n\"id\": \"5f75679d6b4f8d1114e98fb7\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product_sub_category/create_category\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "PostUser_serviceAdminProduct_sub_categoryCreate_subcategory"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product_sub_category/update_status/:subcategory_id",
    "title": "Product Sub Category - Update Status",
    "group": "Admin_-_Product_Sub_Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product_sub_category/update_status/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub Category status has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n     \"api_name\": \"/product_sub_category/update_status/5f7569b05bbadd2914a19c58\",\n    \"message\": \"Sub category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "PutUser_serviceAdminProduct_sub_categoryUpdate_statusSubcategory_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/product_sub_category/update_subcategory/:subcategory_id",
    "title": "Product Sub Category - Update",
    "group": "Admin_-_Product_Sub_Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "image_path",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product_sub_category/update_subcategory/5f7569396225c836a868f7e7\",\n    \"message\": \"Sub Category details has updated successfully.\",\n    \"data\": {\n        \"parent_id\": \"5f7569396225c836a868f7e7\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f7569396225c836a868f7e7\",\n        \"name\": \"Hand Soap\",\n        \"business_category_id\": \"5f73158c500ead10f8fcdca1\",\n        \"createdAt\": \"2020-10-01T05:29:29.727Z\",\n        \"updatedAt\": \"2020-10-01T06:07:58.848Z\",\n        \"__v\": 0,\n        \"image_path\": \"16015301697402aae1d6.jpg\",\n        \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569396225c836a868f7e7/16015301697402aae1d6.jpg\",\n        \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/category/5f7569396225c836a868f7e7/thumb_16015301697402aae1d6.jpg\",\n        \"id\": \"5f7569396225c836a868f7e7\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product_sub_category/update_subcategory/5f7569396225c836a868f7e7\",\n    \"message\": \"Sub category doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/SubCategory.js",
    "groupTitle": "Admin_-_Product_Sub_Category",
    "name": "PutUser_serviceAdminProduct_sub_categoryUpdate_subcategorySubcategory_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/setting/get_setting",
    "title": "Setting - Get Single",
    "group": "Admin_-_Setting",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/setting/get_setting\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"_id\": \"5f90327edafaecab7c32cb7b\",\n        \"office_address\": \"Nokia\",\n        \"contact_us_email\": \"raj@gmail.com\",\n        \"admin_commission\": 5,\n        \"createdAt\": \"2020-10-13T12:09:32.037Z\",\n        \"updatedAt\": \"2020-10-13T12:09:32.162Z\",\n        \"__v\": 0,\n        \"image_path\": \"1602590972156iStock000004792809Small.jpg\",\n        \"id\": \"5f90327edafaecab7c32cb7b\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/setting/get_setting\",\n\"message\": \"Setting doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Setting.js",
    "groupTitle": "Admin_-_Setting",
    "name": "GetUser_serviceAdminSettingGet_setting"
  },
  {
    "type": "post",
    "url": "/user_service/admin/setting/update_setting",
    "title": "Setting - Update",
    "group": "Admin_-_Setting",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seeting_id",
            "description": "<p>Setting Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "office_address",
            "description": "<p>Office address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contact_us_email",
            "description": "<p>contact us Email</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "admin_commission",
            "description": "<p>Admin Commission</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/setting/update_setting\",\n    \"message\": \"Setting details has updated successfully.\",\n    \"data\": {\n        \"_id\": \"5f90327edafaecab7c32cb7b\",\n        \"office_address\": \"Jaipur\",\n        \"contact_us_email\": \"raj123@gmail.com\",\n        \"admin_commission\": 10,\n        \"createdAt\": \"2020-10-13T12:09:32.037Z\",\n        \"updatedAt\": \"2020-10-21T13:10:07.667Z\",\n        \"__v\": 0,\n        \"image_path\": \"1602590972156iStock000004792809Small.jpg\",\n        \"id\": \"5f90327edafaecab7c32cb7b\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/brand/update_brand/5f731c3efae7b5304ce6ae78\",\n\"message\": \"Brand doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Setting.js",
    "groupTitle": "Admin_-_Setting",
    "name": "PostUser_serviceAdminSettingUpdate_setting"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/subadmins/delete_subadmin/:subadmin_id",
    "title": "Subadmins - Delete",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"delete_subadmin\",\n    \"message\": \"Sub admin has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"delete_subadmin\",\n    \"message\": \"Sub admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "DeleteUser_serviceAdminSubadminsDelete_subadminSubadmin_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/subadmins/get_subadmin/:subadmin_id",
    "title": "Subadmins - Get Single",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/subadmins/5f192da347132e3ed5a4420e\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"_id\": \"5f192da347132e3ed5a4420e\",\n        \"username\": \"rajesh\",\n        \"first_name\": \"Rajesh\",\n        \"last_name\": \"Kumar\",\n        \"email\": \"rajesh11@mailinator.com\",\n        \"phone\": \"87678687688\",\n        \"user_role\": \"subadmin\",\n        \"password\": \"$2a$10$sDbgglPMaqOb33GlFKMd8eHuMOcFmTxFidDgvsAU./TnpCcbNkyUm\",\n        \"user_image\": \"http://localhost:3031/uploads/admins/5f192da347132e3ed5a4420e/1595485603032sampleprofilepic.png\",\n        \"user_permissions\": \"{}\",\n        \"address\": \"\",\n        \"auth_token\": \"\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"createdAt\": \"2020-07-23T06:26:43.028Z\",\n        \"updatedAt\": \"2020-07-23T06:26:43.036Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"get_subadmin\",\n    \"message\": \"Admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "GetUser_serviceAdminSubadminsGet_subadminSubadmin_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/subadmins/get_subadmins",
    "title": "Subadmins - Listing",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "        HTTP/1.1 200 OK\n       {\n    \"status\": \"success\",\n    \"api_name\": \"/subadmins/get_subadmins\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f86d72d680d7021ac2d0250\",\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"username\": \"Sub admin 1\",\n                \"email\": \"subadmin01@gmail.com\",\n                \"phone_no\": 9865986531,\n                \"password\": \"$2a$10$XYAsMLEG2ElvFRcos09.CO0KzId/n.3zqDg5qIXEf6hL7sgnrYJUG\",\n                \"user_permissions\": \"{}\",\n                \"createdAt\": \"2020-10-14T10:47:09.300Z\"\n            },\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/subadmins/get_subadmins\",\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "GetUser_serviceAdminSubadminsGet_subadmins"
  },
  {
    "type": "get",
    "url": "/user_service/admin/subadmins/permissions",
    "title": "Subadmins - Permissions",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",isFileTypeImage\n    \"api_name\": \"/subadmins/permissions\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"permissionsData\": [\n            {\n                \"permissions\": [\n                    {\n                        \"title\": \"Delete\",\n                        \"slug\": \"delete\"\n                    }\n                ],\n                \"_id\": \"5f1934023e007bce3ee78c5b\",\n                \"module_name\": \"Users\",\n                \"module_slug\": \"users\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"get_permissions\",\n    \"message\": \"Error\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "GetUser_serviceAdminSubadminsPermissions"
  },
  {
    "type": "post",
    "url": "/user_service/admin/subadmins/create_subadmin",
    "title": "Subadmins - Create",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_permissions",
            "description": "<p>String of JSON Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/subadmins/create_subadmin\",\n\"message\": \"Sub admin has created successfully.\",\n    \"data\": {\n        \"auth_token\": \"\",\n        \"wallet\": \"0.00\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f86d2993425140c203e1208\",\n        \"username\": \"Sub admin\",\n        \"email\": \"subadmin@gmail.com\",\n        \"phone_no\": 9865986532,\n        \"user_role\": 2,\n        \"user_image\": \"1602671257638iStock000004792809Small.jpg\",\n        \"user_permissions\": \"{}\",\n        \"createdAt\": \"2020-10-14T10:27:37.633Z\",\n        \"updatedAt\": \"2020-10-14T10:27:37.643Z\",\n        \"__v\": 0,\n        \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/admins/5f86d2993425140c203e1208/1602671257638iStock000004792809Small.jpg\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/admins/5f86d2993425140c203e1208/thumb_1602671257638iStock000004792809Small.jpg\",\n        \"id\": \"5f86d2993425140c203e1208\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"create_subadmin\",\n    \"message\": \"Either Email or Username is already exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "PostUser_serviceAdminSubadminsCreate_subadmin"
  },
  {
    "type": "put",
    "url": "/user_service/admin/subadmins/update_status/:subadmin_id",
    "title": "Subadmins - Update Status",
    "group": "Admin_-_Subadmin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"update_status\",\n    \"message\": \"Sub admin status has changed successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_status\",\n    \"message\": \"Sub admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "PutUser_serviceAdminSubadminsUpdate_statusSubadmin_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/subadmins/update_subadmin/:subadmin_id",
    "title": "Subadmins - Update",
    "group": "Admin_-_Subadmin",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_permissions",
            "description": "<p>String of JSON Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/subadmins/update_subadmin/5f192da347132e3ed5a4420e\",\n    \"message\": \"Sub admin details has updated successfully.\",\n    \"data\": {\n        \"_id\": \"5f192da347132e3ed5a4420e\",\n        \"username\": \"rajesh12\",\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"rajesh12@mailinator.com\",\n        \"phone\": \"8767868761\",\n        \"user_role\": \"subadmin\",\n        \"password\": \"$2a$10$sDbgglPMaqOb33GlFKMd8eHuMOcFmTxFidDgvsAU./TnpCcbNkyUm\",\n        \"user_image\": \"http://localhost:3031/uploads/admins/5f192da347132e3ed5a4420e/1595485603032sampleprofilepic.png\",\n        \"address\": \"\",\n        \"user_permissions\": \"{}\",\n        \"auth_token\": \"\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"createdAt\": \"2020-07-23T06:26:43.028Z\",\n        \"updatedAt\": \"2020-07-23T06:39:41.269Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/subadmins/update_subadmin/5f192da347132e3ed5a4420e\",\n    \"message\": \"Sub admin doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Subadmin.js",
    "groupTitle": "Admin_-_Subadmin",
    "name": "PutUser_serviceAdminSubadminsUpdate_subadminSubadmin_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/users/delete_user/:user_id",
    "title": "Users - Delete",
    "group": "Admin_-_User",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"delete_user\",\n    \"message\": \"User has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"delete_user\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "DeleteUser_serviceAdminUsersDelete_userUser_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/users",
    "title": "Users - Listing",
    "group": "Admin_-_User",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start Date ( Format: YYYY-MM-DD )</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": "<p>End Date ( Format: YYYY-MM-DD )</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/users\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n             {\n                \"_id\": \"5f6daa41ab1e3719e88db2e1\",\n                \"wallet\": \"0.00\",\n                \"is_email_varify\": 0,\n                \"show_notification\": 0,\n                \"is_available\": 0,\n                \"device_type\": 0,\n                \"auth_token\": \"\",\n                \"firebase_token\": \"\",\n                \"is_active\": 0,\n                \"is_deleted\": 0,\n                \"username\": \"nishant\",\n                \"user_role\": \"3\",\n                \"email\": \"jain21231@gmail.com\",\n                \"country_code\": \"+91\",\n                \"phone\": 3699621889,\n                \"password\": \"$2a$10$0yGZ5qfZeUWD.ZRI03/KiedPN5kFTdQVCpfZxuwQ7ftHRShI7sL.C\",\n                \"user_image\": \"\",\n                \"createdAt\": \"2020-09-25T08:28:49.691Z\",\n                \"updatedAt\": \"2020-09-25T08:28:49.691Z\",\n                \"__v\": 0\n            }\n            \n        ],\n        \"totalDocs\": 5,\n        \"limit\": 10,\n        \"page\": null,\n        \"totalPages\": 1,\n        \"pagingCounter\": null,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"get_users\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "GetUser_serviceAdminUsers"
  },
  {
    "type": "get",
    "url": "/user_service/admin/users/get_user/:user_id",
    "title": "Users - Get Single",
    "group": "Admin_-_User",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/users/get_user/5f195d3ce3c67c75b42fc145\",\n    \"message\": \"Success\",\n        \"data\": {\n        \"wallet\": \"0.00\",\n        \"is_email_varify\": 0,\n        \"show_notification\": 0,\n        \"is_available\": 0,\n        \"device_type\": 0,\n        \"auth_token\": \"\",\n        \"firebase_token\": \"\",\n        \"is_active\": 0,\n        \"is_deleted\": 0,\n        \"_id\": \"5f6daa41ab1e3719e88db2e1\",\n        \"username\": \"nishant\",\n        \"user_role\": \"3\",\n        \"email\": \"jain21231@gmail.com\",\n        \"country_code\": \"+91\",\n        \"phone\": 3699621889,\n        \"password\": \"$2a$10$0yGZ5qfZeUWD.ZRI03/KiedPN5kFTdQVCpfZxuwQ7ftHRShI7sL.C\",\n        \"user_image\": \"\",\n        \"createdAt\": \"2020-09-25T08:28:49.691Z\",\n        \"updatedAt\": \"2020-09-25T08:28:49.691Z\",\n        \"__v\": 0,\n        \"register_id\": \"532085f6daa41ab1e3719e88db2e1\",\n        \"user_image_url\": \"public/uploads//placeholder-user.jpg\",\n        \"user_image_thumb_url\": \"public/uploads//placeholder-user.jpg\",\n        \"id\": \"5f6daa41ab1e3719e88db2e1\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"get_user\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "GetUser_serviceAdminUsersGet_userUser_id"
  },
  {
    "type": "post",
    "url": "/user_service/admin/users/create_user",
    "title": "Users - Create",
    "group": "Admin_-_User",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/users/create_user\",\n    \"message\": \"User has created successfully.\",\n    \"data\": {\n        \"wallet\": \"0.00\",\n        \"is_email_varify\": 0,\n        \"show_notification\": 0,\n        \"is_available\": 0,\n        \"device_type\": 0,\n        \"auth_token\": \"\",\n        \"firebase_token\": \"\",\n        \"is_active\": 0,\n        \"is_deleted\": 0,\n        \"_id\": \"5f6c73d3ae46333b44a315a4\",\n        \"first_name\": \"Nishant\",\n        \"last_name\": \"Jain\",\n        \"user_role\": \"3\",\n        \"email\": \"jain21231@gmail.com\",\n        \"country_code\": \"+91\",\n        \"phone\": 3699621889,\n        \"user_image\": \"\",\n        \"createdAt\": \"2020-09-24T10:24:19.026Z\",\n        \"updatedAt\": \"2020-09-24T10:24:19.026Z\",\n        \"__v\": 0,\n        \"register_id\": \"195355f6c73d3ae46333b44a315a4\",\n        \"user_image_url\": \"public/uploads//placeholder-user.jpg\",\n        \"user_image_thumb_url\": \"public/uploads//placeholder-user.jpg\",\n        \"id\": \"5f6c73d3ae46333b44a315a4\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"error\",\n    \"api_name\": \"/users/create_user\",\n    \"message\": \"You are already registered with this phone number.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "PostUser_serviceAdminUsersCreate_user"
  },
  {
    "type": "put",
    "url": "/user_service/admin/users/status/:user_id",
    "title": "Users - Update Status",
    "group": "Admin_-_User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"update_status\",\n    \"message\": \"User status has changed successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_status\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "PutUser_serviceAdminUsersStatusUser_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/users/update_user/:user_id",
    "title": "Users - Update",
    "group": "Admin_-_User",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user_image",
            "description": "<p>Formdata Image Object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/users/update_user/5f202034cf946713ced6bd52\",\n    \"message\": \"User details has updated successfully.\",\n    \"data\": {\n            \"_id\": \"5f6c6fce1705fe1da05de2ea\",\n            \"wallet\": \"0.00\",\n            \"is_email_varify\": 0,\n            \"show_notification\": 0,\n            \"is_available\": 0,\n            \"device_type\": 0,\n            \"auth_token\": \"\",\n            \"firebase_token\": \"\",\n            \"is_active\": 0,\n            \"is_deleted\": 0,\n            \"first_name\": \"Nishant\",\n            \"last_name\": \"Jain\",\n            \"user_role\": \"3\",\n            \"email\": \"jain@gmail.com\",\n            \"country_code\": \"+91\",\n            \"phone\": 369963258,\n            \"password\": \"$2a$10$nnwoIZo81Mb98VUo3rEIOeX/8FuW6Sa5dDNbav4KdC6BlSYATXEqW\",\n            \"user_image\": \"\",\n            \"createdAt\": \"2020-09-24T10:07:10.506Z\",\n            \"updatedAt\": \"2020-09-24T10:07:10.506Z\",\n            \"__v\": 0\n        },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"update_user\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Customer.js",
    "groupTitle": "Admin_-_User",
    "name": "PutUser_serviceAdminUsersUpdate_userUser_id"
  },
  {
    "type": "delete",
    "url": "/user_service/admin/warehouse/delete_warehouse/:warehouse_id",
    "title": "Warehouse - Delete",
    "group": "Admin_-_Warehouse",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/delete_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"WAREHOUSE has deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/delete_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"Warehouse doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "DeleteUser_serviceAdminWarehouseDelete_warehouseWarehouse_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/warehouse/get_warehouse/:warehouse_id",
    "title": "Warehouse - Get Single",
    "group": "Admin_-_Warehouse",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/get_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"Success\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f7ee30347b0a120d8991e35\",\n    \"name\": \"Demo 3\",\n    \"address\": \"Jaipur\",\n    \"id\": \"5f7ee30347b0a120d8991e35\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/get_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"Warehouse doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "GetUser_serviceAdminWarehouseGet_warehouseWarehouse_id"
  },
  {
    "type": "get",
    "url": "/user_service/admin/warehouse/get_warehouses",
    "title": "Warehouse - Listing",
    "group": "Admin_-_Warehouse",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search Keyword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/get_warehouses\",\n\"message\": \"Success\",\n\"data\": {\n    \"docs\": [\n        {\n            \"is_active\": 1,\n            \"is_deleted\": 0,\n            \"_id\": \"5f7ee30347b0a120d8991e35\",\n            \"name\": \"Demo 3\",\n            \"address\": \"Jaipur\",\n            \"id\": \"5f7ee30347b0a120d8991e35\"\n        },\n    ],\n    \"totalDocs\": 2,\n    \"limit\": 10,\n    \"totalPages\": 1,\n    \"page\": 1,\n    \"pagingCounter\": 1,\n    \"hasPrevPage\": false,\n    \"hasNextPage\": false,\n    \"prevPage\": null,\n    \"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/get_warehouses\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "GetUser_serviceAdminWarehouseGet_warehouses"
  },
  {
    "type": "post",
    "url": "/user_service/admin/warehouse/create_warehouse",
    "title": "Warehouse - Create",
    "group": "Admin_-_Warehouse",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/create_warehouse\",\n\"message\": \"WAREHOUSE has created successfully.\",\n\"data\": {\n\"is_active\": 1,\n\"is_deleted\": 0,\n\"_id\": \"5f7ea8c5bd16c11634edf7a3\",\n\"name\": \"Demo\",\n\"address\": \"Jaipur\",\n\"createdAt\": \"2020-10-08T05:51:01.382Z\",\n\"updatedAt\": \"2020-10-08T05:51:01.382Z\",\n\"__v\": 0,\n\"id\": \"5f7ea8c5bd16c11634edf7a3\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/create_warehouse\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "PostUser_serviceAdminWarehouseCreate_warehouse"
  },
  {
    "type": "put",
    "url": "/user_service/admin/warehouse/update_status/:brand_id",
    "title": "Warehouse - Update Status",
    "group": "Admin_-_Warehouse",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status: 1 | 0</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/update_status/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"WAREHOUSE status has updated successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/update_status/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"Warehouse doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "PutUser_serviceAdminWarehouseUpdate_statusBrand_id"
  },
  {
    "type": "put",
    "url": "/user_service/admin/warehouse/update_warehouse/:warehouse_id",
    "title": "Warehouse - Update",
    "group": "Admin_-_Warehouse",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/warehouse/update_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"WAREHOUSE details has updated successfully.\",\n\"data\": {\n    \"is_active\": 1,\n    \"is_deleted\": 0,\n    \"_id\": \"5f7ea8c5bd16c11634edf7a3\",\n    \"name\": \"Demo 1\",\n    \"address\": \"Delhi\",\n    \"createdAt\": \"2020-10-08T05:51:01.382Z\",\n    \"updatedAt\": \"2020-10-08T06:10:26.622Z\",\n    \"__v\": 0,\n    \"id\": \"5f7ea8c5bd16c11634edf7a3\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/warehouse/update_warehouse/5f7ea8c5bd16c11634edf7a3\",\n\"message\": \"Warehouse doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Warehouse.js",
    "groupTitle": "Admin_-_Warehouse",
    "name": "PutUser_serviceAdminWarehouseUpdate_warehouseWarehouse_id"
  },
  {
    "type": "delete",
    "url": "/user_service/customer/address/delete_address",
    "title": "Address - Delete",
    "group": "App_-_Address",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address_id",
            "description": "<p>Address Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/address/delete_address\",\n    \"message\": \"Address has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/address/delete_address\",\n\"message\": \"Adderss doesn't exist.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Address.js",
    "groupTitle": "App_-_Address",
    "name": "DeleteUser_serviceCustomerAddressDelete_address"
  },
  {
    "type": "get",
    "url": "/user_service/customer/address/get_addresses",
    "title": "Address - Delivery Address Listing",
    "group": "App_-_Address",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/address/get_addresses\",\n\"message\": \"User details has updated successfully.\",\n    \"data\": {\n        \"is_user_verified\": 1,\n        \"is_email_verified\": 0,\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MzBlMDRiOGNhNjYzYWU4NGEzNmNlIiwiaWF0IjoxNjAyMTYxMjUwLCJleHAiOjE2MDIyNDc2NTB9.7b6dpRhavZ_EWxhzmgd2HQgkOA0NxOGcqfjMJMhSI84\",\n        \"_id\": \"5f730e04b8ca663ae84a36ce\",\n        \"username\": \"rohit ajmera12\",\n        \"country_code\": \"91\",\n        \"phone\": \"123456789\",\n        \"email\": \"rr@c.com\",\n        \"delivery_address\": [\n            {\n                \"type\": \"Point\",\n                \"geoLocation\": {\n                    \"type\": \"Point\",\n                    \"coordinates\": [\n                        75.7872709,\n                        26.9124336\n                    ],\n                    \"_id\": \"5f880159eaa10f236cc0737e\"\n                },\n                \"_id\": \"5f880159eaa10f236cc0737d\",\n                \"user_id\": \"5f730e04b8ca663ae84a36ce\",\n                \"location_name\": \"Malviya nagar\",\n                \"mobile\": \"989898996\",\n                \"floor\": \"4\",\n                \"way\": \"\",\n                \"building\": \"1\",\n                \"address_type\": \"Work\",\n                \"flat\": \"108\",\n                \"landmark\": \"Kanha heights\",\n                \"full_address\": \"Jaipur\"\n            },\n        ],\n        \"register_id\": \"477105f730e04b8ca663ae84a36ce\",\n        \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/undefined\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/thumb_undefined\",\n        \"id\": \"5f730e04b8ca663ae84a36ce\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/address/get_addresses\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Address.js",
    "groupTitle": "App_-_Address",
    "name": "GetUser_serviceCustomerAddressGet_addresses"
  },
  {
    "type": "post",
    "url": "/user_service/customer/address/create_address",
    "title": "Address - Create",
    "group": "App_-_Address",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location_name",
            "description": "<p>Location Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "floor",
            "description": "<p>Floor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "building",
            "description": "<p>Building</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address_type",
            "description": "<p>Address Type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "flat",
            "description": "<p>Flat</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "landmark",
            "description": "<p>Landmark</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "full_address",
            "description": "<p>Full Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/address/create_address\",\n    \"message\": \"User details has updated successfully.\",\n    \"data\": {\n        \"is_user_verified\": 0,\n        \"is_email_verified\": 0,\n        \"auth_token\": \"\",\n        \"_id\": \"5f6dd9b10c6b0f0ce4629108\",\n        \"username\": \"vishnu kumar\",\n        \"email\": \"vishnu04@gmail.com\",\n        \"country_code\": \"+91\",\n        \"phone\": \"367795218\",\n        \"delivery_address\": [\n            {\n                \"type\": \"Point\",\n                \"geoLocation\": {\n                    \"type\": \"Point\",\n                    \"coordinates\": [\n                        75.7872709,\n                        26.9124336\n                    ],\n                    \"_id\": \"5f801139fe54cd3338df99d1\"\n                },\n                \"_id\": \"5f801139fe54cd3338df99d0\",\n                \"user_id\": \"5f6dd9b10c6b0f0ce4629108\",\n                \"location_name\": \"Malviya nagar\",\n                \"mobile\": \"989898996\",\n                \"floor\": \"4\",\n                \"way\": \"\",\n                \"building\": \"1\",\n                \"address_type\": \"Work\",\n                \"flat\": \"108\",\n                \"landmark\": \"Kanha heights\",\n                \"full_address\": \"Jaipur\"\n            }\n        ],\n        \"register_id\": \"165135f6dd9b10c6b0f0ce4629108\",\n        \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f6dd9b10c6b0f0ce4629108/undefined\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f6dd9b10c6b0f0ce4629108/thumb_undefined\",\n        \"id\": \"5f6dd9b10c6b0f0ce4629108\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/address/create_address\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Address.js",
    "groupTitle": "App_-_Address",
    "name": "PostUser_serviceCustomerAddressCreate_address"
  },
  {
    "type": "post",
    "url": "/user_service/customer/registration",
    "title": "Customer - Register",
    "group": "App_-_Customer_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Device Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "device_type",
            "description": "<p>Device Type : 1 for android / 2 for ios</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/registration\",\n\"message\": \"Please verify OTP which is sent to your phone.\",\n\"data\": {\n    \"otp_number\": 4505\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/customer_register\",\n    \"message\": \"Provided email is already exist. Provided phone is already exist. \",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Login.js",
    "groupTitle": "App_-_Customer_-_Login",
    "name": "PostUser_serviceCustomerRegistration"
  },
  {
    "type": "post",
    "url": "/user_service/customer/resend_otp",
    "title": "Login - Resend OTP",
    "group": "App_-_Customer_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_for",
            "description": "<p>OTP For What: register | forgot_password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/resend_otp\",\n    \"message\": \"OTP has sent to your phone.\",\n    \"data\": {\n        \"country_code\": \"+91\",\n        \"phone\": \"9987667777\"\n        \"otp_number\": \"2121\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/resend_otp\",\n    \"message\": \"Invalid Phone Number. No account exist with this phone number.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Login.js",
    "groupTitle": "App_-_Customer_-_Login",
    "name": "PostUser_serviceCustomerResend_otp"
  },
  {
    "type": "post",
    "url": "/user_service/customer/update_forgot_password",
    "title": "Login - Update Forget Password",
    "group": "App_-_Customer_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone/Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_number",
            "description": "<p>OTP Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/update_forgot_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/update_forgot_password\",\n    \"message\": \"Invalid OTP.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Login.js",
    "groupTitle": "App_-_Customer_-_Login",
    "name": "PostUser_serviceCustomerUpdate_forgot_password"
  },
  {
    "type": "post",
    "url": "/user_service/customer/user_login",
    "title": "Customer - Login",
    "group": "App_-_Customer_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone/email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Device id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "device_type",
            "description": "<p>Device Type : 1 for android / 1 for ios</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/user_login\",\n\"message\": \"You have logged in successfully.\",\n\"data\": {\n    \"is_user_verified\": 1,\n    \"is_email_verified\": 0,\n    \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MzBlMDRiOGNhNjYzYWU4NGEzNmNlIiwiaWF0IjoxNjAyMTYxMjUwLCJleHAiOjE2MDIyNDc2NTB9.7b6dpRhavZ_EWxhzmgd2HQgkOA0NxOGcqfjMJMhSI84\",\n    \"_id\": \"5f730e04b8ca663ae84a36ce\",\n    \"username\": \"rohit ajmera12\",\n    \"country_code\": \"91\",\n    \"phone\": \"123456789\",\n    \"email\": \"rr@c.com\",\n    \"register_id\": \"200285f730e04b8ca663ae84a36ce\",\n    \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/undefined\",\n    \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/thumb_undefined\",\n    \"id\": \"5f730e04b8ca663ae84a36ce\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/user_login\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Login.js",
    "groupTitle": "App_-_Customer_-_Login",
    "name": "PostUser_serviceCustomerUser_login"
  },
  {
    "type": "post",
    "url": "/user_service/customer/verify_otp",
    "title": "Login - Verify OTP",
    "group": "App_-_Customer_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_number",
            "description": "<p>OTP Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_for",
            "description": "<p>OTP For What: register | forgot_password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_type",
            "description": "<p>Device Type : 1 for android / 2 for ios</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/verify_otp\",\n    \"message\": \"OTP has verified successfully.\",\n    \"data\": {\n        \"wallet\": \"0.00\",\n        \"is_user_verified\": 1,\n        \"is_email_verified\": 0,\n        \"show_notification\": 0,\n        \"is_available\": 0,\n        \"device_type\": 1,\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MGVlMWU2ZjlkYzAyZDZjZjYxOTM3IiwibG9naW5fdXNlcl9yb2xlIjozLCJpYXQiOjE2MDEyMzc2NTcsImV4cCI6MTYwMTMyNDA1N30.4sIPECFVe-rWfp0TXIO-i6lI4KTwg_5a-Z6lODjtjaw\",\n        \"device_token\": \"sds\",\n        \"is_active\": 1,\n        \"is_deleted\": 0,\n        \"_id\": \"5f70ee1e6f9dc02d6cf61937\",\n        \"username\": \"hello\",\n        \"user_role\": 3,\n        \"country_code\": \"91\",\n        \"phone\": 123456789,\n        \"email\": \"s@gmail.com\",\n        \"device_id\": \"hdjhj\",\n        \"user_image\": \"\",\n        \"last_login_time\": null,\n        \"createdAt\": \"2020-09-27T19:55:10.044Z\",\n        \"updatedAt\": \"2020-09-27T20:14:17.105Z\",\n        \"__v\": 0,\n        \"id\": \"5f70ee1e6f9dc02d6cf61937\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/verify_otp\",\n    \"message\": \"Invalid OTP.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Login.js",
    "groupTitle": "App_-_Customer_-_Login",
    "name": "PostUser_serviceCustomerVerify_otp"
  },
  {
    "type": "delete",
    "url": "/user_service/customer/notifications",
    "title": "Customer - Notification - Delete All",
    "group": "App_-_Customer_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/notifications\",\n\"message\": \"Notification has been deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Notification.js",
    "groupTitle": "App_-_Customer_-_Notification",
    "name": "DeleteUser_serviceCustomerNotifications"
  },
  {
    "type": "delete",
    "url": "/user_service/customer/notifications/5f9915010495120f8cd71aad",
    "title": "Customer - Notification - Delete One",
    "group": "App_-_Customer_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/notifications\",\n\"message\": \"Notification has been deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Notification.js",
    "groupTitle": "App_-_Customer_-_Notification",
    "name": "DeleteUser_serviceCustomerNotifications5f9915010495120f8cd71aad"
  },
  {
    "type": "get",
    "url": "/user_service/customer/notifications",
    "title": "Customer - Notification - Listing",
    "group": "App_-_Customer_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"Successfully fetch notifications list.\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f992b510976901f50599f18\",\n                \"read_status\": 0,\n                \"notification_type\": 1,\n                \"title\": \"Hello2\",\n                \"message\": \"Test message2\",\n                \"createdAt\": \"2020-10-28T08:26:57.756Z\"\n            },\n            {\n                \"_id\": \"5f992ad56d9c7d3150924422\",\n                \"read_status\": 0,\n                \"notification_type\": 1,\n                \"title\": \"Hello2\",\n                \"message\": \"Test message2\",\n                \"createdAt\": \"2020-10-28T08:24:53.393Z\"\n            }\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Notification.js",
    "groupTitle": "App_-_Customer_-_Notification",
    "name": "GetUser_serviceCustomerNotifications"
  },
  {
    "type": "get",
    "url": "/user_service/customer/product/banner/get_banners",
    "title": "Product Banners - Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/brand/get_brands\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f7aff895bc4f9245c8209be\",\n                \"name\": \"One plus\",\n                \"createdAt\": \"2020-10-05T11:12:09.529Z\",\n                \"updatedAt\": \"2020-10-05T11:12:09.529Z\",\n                \"__v\": 0,\n                \"image_path_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/undefined\",\n                \"image_path_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/brands/5f7aff895bc4f9245c8209be/thumb_undefined\",\n                \"id\": \"5f7aff895bc4f9245c8209be\"\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n \"api_name\": \"/brand/get_brands\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "GetUser_serviceCustomerProductBannerGet_banners"
  },
  {
    "type": "get",
    "url": "/user_service/customer/product/brand/get_brands",
    "title": "Product Brand - Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "   HTTP/1.1 200 OK\n  {\n\"status\": \"success\",\n\"api_name\": \"/notifications\",\n\"message\": \"Successfully fetch notifications list.\",\n\"data\": {\n    \"docs\": [\n        {\n            \"_id\": \"5f9915010495120f8cd71aad\",\n            \"user_type\": 3,\n            \"sender_type\": 1,\n            \"read_status\": 0,\n            \"notification_type\": 1,\n            \"title\": \"Hello\",\n            \"message\": \"Test message\",\n            \"user_id\": \"5f730e04b8ca663ae84a36ce\",\n            \"sender_id\": \"5f18295dd364c8608604b992\",\n            \"createdAt\": \"2020-10-28T06:51:45.359Z\",\n            \"updatedAt\": \"2020-10-28T06:51:45.359Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f991431b8e2dd17d4a4cc68\",\n            \"user_type\": 3,\n            \"sender_type\": 1,\n            \"read_status\": 0,\n            \"notification_type\": 1,\n            \"title\": \"Hello\",\n            \"message\": \"Test message\",\n            \"user_id\": \"5f730e04b8ca663ae84a36ce\",\n            \"sender_id\": \"5f18295dd364c8608604b992\",\n            \"createdAt\": \"2020-10-28T06:48:18.192Z\",\n            \"updatedAt\": \"2020-10-28T06:48:18.192Z\",\n            \"__v\": 0\n        }\n    ],\n    \"totalDocs\": 2,\n    \"limit\": 10,\n    \"page\": 1,\n    \"totalPages\": 1,\n    \"pagingCounter\": 1,\n    \"hasPrevPage\": false,\n    \"hasNextPage\": false,\n    \"prevPage\": null,\n    \"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n \"api_name\": \"/brand/get_brands\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "GetUser_serviceCustomerProductBrandGet_brands"
  },
  {
    "type": "get",
    "url": "/user_service/customer/product/get_business_category",
    "title": "Customer - Product - Business Category",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_business_category\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f757eda6fcbe90a537e2507\",\n                \"name\": \"Category 4\",\n                \"cancelation_time\": 40,\n                \"return_time\": 40,\n                \"createdAt\": \"2020-10-01T07:01:46.672Z\",\n                \"updatedAt\": \"2020-10-01T07:01:46.677Z\",\n                \"__v\": 0,\n                \"category_image\": \"1601535706675reliencefresh.jpg\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg\",\n                \"id\": \"5f757eda6fcbe90a537e2507\"\n            },\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f74508abd58a077d3db6329\",\n                \"name\": \"Office\",\n                \"cancelation_time\": 45,\n                \"return_time\": 30,\n                \"createdAt\": \"2020-09-30T09:31:54.818Z\",\n                \"updatedAt\": \"2020-10-01T05:36:48.549Z\",\n                \"__v\": 0,\n                \"category_image\": \"16015306085469dcc9e6.png\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f74508abd58a077d3db6329/16015306085469dcc9e6.png\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f74508abd58a077d3db6329/thumb_16015306085469dcc9e6.png\",\n                \"id\": \"5f74508abd58a077d3db6329\"\n            },\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f7449b1769cc375d2f49929\",\n                \"name\": \"Category 1\",\n                \"cancelation_time\": 30,\n                \"return_time\": 30,\n                \"createdAt\": \"2020-09-30T09:02:41.702Z\",\n                \"updatedAt\": \"2020-09-30T09:03:45.531Z\",\n                \"__v\": 0,\n                \"category_image\": \"1601456625522catimage1586043727128180.jpg\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f7449b1769cc375d2f49929/1601456625522catimage1586043727128180.jpg\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f7449b1769cc375d2f49929/thumb_1601456625522catimage1586043727128180.jpg\",\n                \"id\": \"5f7449b1769cc375d2f49929\"\n            }\n        ],\n        \"totalDocs\": 3,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_business_category\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "GetUser_serviceCustomerProductGet_business_category"
  },
  {
    "type": "get",
    "url": "/user_service/customer/product/get_favourite_items",
    "title": "Product-Favourite-Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/get_favourite_items\",\n\"message\": \"Success\",\n\"data\": {\n\"docs\": [\n{\n    \"_id\": \"5f7c03dbe2905729e44cc715\",\n    \"user_id\": {\n        \"_id\": \"5f6dc48c84a2a93308b879f1\",\n        \"username\": \"pramod kumar\",\n        \"register_id\": \"606465f6dc48c84a2a93308b879f1\",\n        \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f6dc48c84a2a93308b879f1/undefined\",\n        \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f6dc48c84a2a93308b879f1/thumb_undefined\",\n        \"id\": \"5f6dc48c84a2a93308b879f1\"\n    },\n    \"product_id\": \"5f7569396225c836a868f7e7\",\n    \"createdAt\": \"2020-10-06T05:42:51.106Z\",\n    \"updatedAt\": \"2020-10-06T05:42:51.106Z\",\n    \"__v\": 0,\n    \"id\": \"5f7c03dbe2905729e44cc715\"\n}\n],\n\"totalDocs\": 1,\n\"limit\": 10,\n\"totalPages\": 1,\n\"page\": 1,\n\"pagingCounter\": 1,\n\"hasPrevPage\": false,\n\"hasNextPage\": false,\n\"prevPage\": null,\n\"nextPage\": null\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/get_favourite_items\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "GetUser_serviceCustomerProductGet_favourite_items"
  },
  {
    "type": "get",
    "url": "/user_service/customer/product/get_product_detail/:product_id",
    "title": "Product - Details",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "        HTTP/1.1 200 OK\n       {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_product_detail/5f883814eb8b082d3404edc9\",\n    \"message\": \"Success\",\n    \"data\": [\n        {\n            \"_id\": \"5f883814eb8b082d3404edc9\",\n            \"name\": \"Redmi note 10\",\n            \"inventry_name\": \"Red ,64 GB\",\n            \"price\": 500.5,\n            \"quantity\": 2,\n            \"product_code\": \"Ele-Mob-Sam-4222-Red\",\n            \"images\": [\n                {\n                    \"_id\": \"5f883815eb8b082d3404edca\",\n                    \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                    \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                }\n            ],\n            \"business_category\": {\n                \"_id\": \"5f74508abd58a077d3db6329\",\n                \"name\": \"Electronics\"\n            },\n            \"product_category\": {\n                \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                \"name\": \"Mobiles\"\n            },\n            \"product_subcategory\": [\n                {\n                    \"_id\": \"5f75b811a0236828b231fd68\",\n                    \"name\": \"Samsung\"\n                }\n            ],\n            \"customizations\": [\n                {\n                    \"_id\": \"5f883815eb8b082d3404edcb\",\n                    \"title\": {\n                        \"_id\": \"5f8974d737fa3ff404686305\",\n                        \"name\": \"RAMS\",\n                        \"value\": {\n                            \"_id\": \"5f8974d737fa3ff404686308\",\n                            \"name\": \"5\"\n                        }\n                    }\n                },\n                {\n                    \"_id\": \"5f883815eb8b082d3404edcd\",\n                    \"title\": {\n                        \"_id\": \"5f87e04ab695872c68a55ba9\",\n                        \"name\": \"Color\",\n                        \"value\": {\n                            \"_id\": \"5f8974d737fa3ff4046862ff\",\n                            \"name\": \"Red\"\n                        }\n                    }\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/product/get_product_detail/5f7c42ce754bf32e54cb458a\",\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "GetUser_serviceCustomerProductGet_product_detailProduct_id"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/add_favourite_item",
    "title": "Product - Favourite - Add",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product_id",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/product/add_favourite_item\",\n\"message\": \"Item has favourite successfully.\",\n\"data\": {\n\"_id\": \"5f7b183dd1896b18b0c6bc43\",\n\"user_id\": \"5f18295dd364c8608604b992\",\n\"product_id\": \"5f7569396225c836a868f7e7\",\n\"createdAt\": \"2020-10-05T12:57:33.488Z\",\n\"updatedAt\": \"2020-10-05T12:57:33.488Z\",\n\"__v\": 0,\n\"id\": \"5f7b183dd1896b18b0c6bc43\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/add_favourite_item\",\n\"message\": \"Error\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductAdd_favourite_item"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/get_category",
    "title": "Customer - Product - Category",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_category\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f757eda6fcbe90a537e2507\",\n                \"name\": \"Category 4\",\n                \"cancelation_time\": 40,\n                \"return_time\": 40,\n                \"createdAt\": \"2020-10-01T07:01:46.672Z\",\n                \"updatedAt\": \"2020-10-01T07:01:46.677Z\",\n                \"__v\": 0,\n                \"category_image\": \"1601535706675reliencefresh.jpg\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg\",\n                \"id\": \"5f757eda6fcbe90a537e2507\"\n            },\n        ],\n        \"totalDocs\": 3,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_category\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductGet_category"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/get_products",
    "title": "Product - Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_no",
            "description": "<p>Page No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand_id",
            "description": "<p>for Brand id for filter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price_start",
            "description": "<p>Price start range</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price_end",
            "description": "<p>Price end range</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortby",
            "description": "<p>for sort by for sorting values(newest/price_high_to_low/price_low_to_high)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_products\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f7dc621b5849b1c50de79ae\",\n                \"name\": \"Maggi\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f7dc621b5849b1c50de79b2\",\n                        \"product_image_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241354ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f7dc621b5849b1c50de79b3\",\n                        \"product_image_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.99:221/static/CricketCategory/1602078241362ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f7449b1769cc375d2f49929\",\n                    \"name\": \"Clothes\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b6e80b0e2127b1361e3d\",\n                    \"name\": \"Prod subcat 1\"\n                },\n                \"price\": \"200\"\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/get_products\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductGet_products"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/get_subcategory",
    "title": "Customer - Product - Sub Category",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_category_id",
            "description": "<p>Business Category Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/product/get_subcategory\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"is_active\": 1,\n                \"is_deleted\": 0,\n                \"_id\": \"5f757eda6fcbe90a537e2507\",\n                \"name\": \"Category 4\",\n                \"cancelation_time\": 40,\n                \"return_time\": 40,\n                \"createdAt\": \"2020-10-01T07:01:46.672Z\",\n                \"updatedAt\": \"2020-10-01T07:01:46.677Z\",\n                \"__v\": 0,\n                \"category_image\": \"1601535706675reliencefresh.jpg\",\n                \"category_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/1601535706675reliencefresh.jpg\",\n                \"category_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/business_category/5f757eda6fcbe90a537e2507/thumb_1601535706675reliencefresh.jpg\",\n                \"id\": \"5f757eda6fcbe90a537e2507\"\n            }\n        ],\n        \"totalDocs\": 3,\n        \"limit\": 10,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_subcategory\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductGet_subcategory"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/other_customization_products",
    "title": "Product - Other Customization Product - Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "main_product_id",
            "description": "<p>Main Product Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"status\": \"success\",\n    \"api_name\": \"/product/other_customization_products\",\n    \"message\": \"Success\",\n    \"data\": {\n    \"docs\": [\n            {\n                \"_id\": \"5f883814eb8b082d3404edc9\",\n                \"name\": \"Redmi note 10\",\n                \"inventry_name\": \"Red ,64 GB\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edca\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edcc\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f74508abd58a077d3db6329\",\n                    \"name\": \"Electronics\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b811a0236828b231fd68\",\n                    \"name\": \"Samsung\"\n                },\n                \"price\": 500.5\n            },\n            {\n                \"_id\": \"5f8e73f08a613f62470f6e20\",\n                \"name\": \"Redmi note 10\",\n                \"inventry_name\": \"Black ,64 GB\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edca\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edcc\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f74508abd58a077d3db6329\",\n                    \"name\": \"Electronics\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b811a0236828b231fd68\",\n                    \"name\": \"Samsung\"\n                },\n                \"price\": 600.5\n            }\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/other_customization_products\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductOther_customization_products"
  },
  {
    "type": "post",
    "url": "/user_service/customer/product/similar_products",
    "title": "Product - Similar Product - Listing",
    "group": "App_-_Customer_-_Product",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n\"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sub_category_id",
            "description": "<p>Sub Category Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"status\": \"success\",\n    \"api_name\": \"/product/similar_products\",\n    \"message\": \"Success\",\n    \"data\": {\n    \"docs\": [\n            {\n                \"_id\": \"5f883814eb8b082d3404edc9\",\n                \"name\": \"Redmi note 10\",\n                \"inventry_name\": \"Red ,64 GB\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edca\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edcc\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f74508abd58a077d3db6329\",\n                    \"name\": \"Electronics\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b811a0236828b231fd68\",\n                    \"name\": \"Samsung\"\n                },\n                \"price\": 500.5\n            },\n            {\n                \"_id\": \"5f8e73f08a613f62470f6e20\",\n                \"name\": \"Redmi note 10\",\n                \"inventry_name\": \"Black ,64 GB\",\n                \"images\": [\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edca\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762772996ArchitectureDiagram.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762772996ArchitectureDiagram.png\"\n                    },\n                    {\n                        \"_id\": \"5f883815eb8b082d3404edcc\",\n                        \"product_image_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/1602762773188ENAQDfunctionalarchitecher.png\",\n                        \"product_image_thumb_url\": \"http://192.168.1.69:3050/service/assets?service=user_service&filepath=uploads/product/5f883814eb8b082d3404edc8/thumb_1602762773188ENAQDfunctionalarchitecher.png\"\n                    }\n                ],\n                \"business_category\": {\n                    \"_id\": \"5f74508abd58a077d3db6329\",\n                    \"name\": \"Electronics\"\n                },\n                \"category\": {\n                    \"_id\": \"5f75b6292fa6b92669f3a7fb\",\n                    \"name\": \"Mobiles\"\n                },\n                \"subcategory\": {\n                    \"_id\": \"5f75b811a0236828b231fd68\",\n                    \"name\": \"Samsung\"\n                },\n                \"price\": 600.5\n            }\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"error\",\n\"api_name\": \"/product/similar_products\",\n\"message\": \"error.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Product.js",
    "groupTitle": "App_-_Customer_-_Product",
    "name": "PostUser_serviceCustomerProductSimilar_products"
  },
  {
    "type": "get",
    "url": "/user_service/customer/profile/get_profile",
    "title": "Profile - Get Profile Customer",
    "group": "App_-_Customer_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/profile/get_profile\",\n\"message\": \"Data fetch successfully\",\n\"data\": {\n    \"_id\": \"5f75cdcebd87422d76c5be1d\",\n    \"wallet\": 1700,\n    \"is_email_verified\": 0,\n    \"username\": \"Yogesh\",\n    \"email\": \"yog@mailinator.com\",\n    \"country_code\": \"91\",\n    \"phone\": \"9782498071\",\n    \"user_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f75cdcebd87422d76c5be1d/1601555918576zuckerberg.jpg\",\n    \"user_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f75cdcebd87422d76c5be1d/thumb_1601555918576zuckerberg.jpg\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"profile/get_profile\",\n    \"message\": \"Invalid data.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Profile.js",
    "groupTitle": "App_-_Customer_-_Profile",
    "name": "GetUser_serviceCustomerProfileGet_profile"
  },
  {
    "type": "post",
    "url": "/user_service/customer/profile/change_password",
    "title": "Profile - Change Password",
    "group": "App_-_Customer_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"change_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"change_password\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Profile.js",
    "groupTitle": "App_-_Customer_-_Profile",
    "name": "PostUser_serviceCustomerProfileChange_password"
  },
  {
    "type": "post",
    "url": "/user_service/customer/profile/update_profile",
    "title": "Profile - Update Profile Customer",
    "group": "App_-_Customer_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field_key",
            "description": "<p>(new_email,new_phone,username,user_image)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field_value",
            "description": "<p>(Phone/Email)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/profile/update_profile\",\n    \"message\": \"Please verify Email which is sent to your email id.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/update_profile\",\n    \"message\": \"Invalid data.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Profile.js",
    "groupTitle": "App_-_Customer_-_Profile",
    "name": "PostUser_serviceCustomerProfileUpdate_profile"
  },
  {
    "type": "post",
    "url": "/user_service/customer/resend_verification_email",
    "title": "Customer - Resend Verification Email",
    "group": "App_-_Customer_-_Resend_Verification_Email",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": value\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/resend_verification_email\",\n    \"message\": \"Please verify Email which is sent to your email id.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/resend_verification_email\",\n    \"message\": \"Invalid email.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Profile.js",
    "groupTitle": "App_-_Customer_-_Resend_Verification_Email",
    "name": "PostUser_serviceCustomerResend_verification_email"
  },
  {
    "type": "post",
    "url": "/user_service/customer/verify_email",
    "title": "Customer  - Verify Email",
    "group": "App_-_Customer_-_Verify_Email",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{ \n Render ejs template\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/verify_email\",\n    \"message\": \"Invalid Email.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Profile.js",
    "groupTitle": "App_-_Customer_-_Verify_Email",
    "name": "PostUser_serviceCustomerVerify_email"
  },
  {
    "type": "get",
    "url": "/user_service/customer/wallet/get_transaction_history",
    "title": "Customer - Wallet - Get Transaction History",
    "group": "App_-_Customer_-_Wallet",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n     {\n    \"status\": \"success\",\n    \"api_name\": \"/wallet/get_transaction_history\",\n    \"message\": \"Success\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f87f8cdac7fbc4f9c182b73\",\n                \"amount\": \"20\",\n                \"wallet_amount\": \"121.25\",\n                \"user_id\": \"5f83f8d0b4730b48870bc111\",\n                \"transition_id\": \"1234\",\n                \"reason\": \"\",\n                \"sender_id\": \"5f83f8d0b4730b48870bc111\",\n                \"user_type\": 1,\n                \"sender_type\": 1,\n                \"payment_type\": 1,\n                \"amount_type\": 1,\n                \"request_type\": 1,\n                \"order_id\": \"\",\n                \"createdAt\": \"2020-10-15T07:22:53.689Z\",\n                \"updatedAt\": \"2020-10-15T07:22:53.689Z\",\n                \"__v\": 0\n            },\n            \n        ],\n        \"totalDocs\": 1,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null,\n        \"user_wallet\": 141.25\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/get_business_category\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Wallet.js",
    "groupTitle": "App_-_Customer_-_Wallet",
    "name": "GetUser_serviceCustomerWalletGet_transaction_history"
  },
  {
    "type": "post",
    "url": "/user_service/customer/wallet/add_to_wallet",
    "title": "Customer - Wallet - Add Money To Wallet",
    "group": "App_-_Customer_-_Wallet",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>Reason</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n  {\n    \"status\": \"success\",\n    \"api_name\": \"/wallet/add_to_wallet\",\n    \"message\": \"Money has been added into wallet successfully.\",\n    \"data\": {\n        \"wallet_balance\": 102.5\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/wallet/add_to_wallet\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/customer/Wallet.js",
    "groupTitle": "App_-_Customer_-_Wallet",
    "name": "PostUser_serviceCustomerWalletAdd_to_wallet"
  },
  {
    "type": "post",
    "url": "/user_service/driver/resend_otp",
    "title": "Login - Resend OTP",
    "group": "App_-_Driver_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_for",
            "description": "<p>OTP For What: register | forgot_password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/resend_otp\",\n    \"message\": \"OTP has sent to your phone.\",\n    \"data\": {\n        \"country_code\": \"+91\",\n        \"phone\": \"9987667777\"\n        \"otp_number\": \"2121\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/resend_otp\",\n    \"message\": \"Invalid Phone Number. No account exist with this phone number.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Login.js",
    "groupTitle": "App_-_Driver_-_Login",
    "name": "PostUser_serviceDriverResend_otp"
  },
  {
    "type": "post",
    "url": "/user_service/driver/update_forgot_password",
    "title": "Login - Update Forget Password",
    "group": "App_-_Driver_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone/Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_number",
            "description": "<p>OTP Number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/update_forgot_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/update_forgot_password\",\n    \"message\": \"Invalid OTP.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Login.js",
    "groupTitle": "App_-_Driver_-_Login",
    "name": "PostUser_serviceDriverUpdate_forgot_password"
  },
  {
    "type": "post",
    "url": "/user_service/driver/user_login",
    "title": "Driver - Login",
    "group": "App_-_Driver_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone/email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Device id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "device_type",
            "description": "<p>Device Type : 1 for android / 1 for ios</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/user_login\",\n\"message\": \"You have logged in successfully.\",\n\"data\": {\n    \"is_user_verified\": 1,\n    \"is_email_verified\": 0,\n    \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl91c2VyX2lkIjoiNWY3MzBlMDRiOGNhNjYzYWU4NGEzNmNlIiwiaWF0IjoxNjAyMTYxMjUwLCJleHAiOjE2MDIyNDc2NTB9.7b6dpRhavZ_EWxhzmgd2HQgkOA0NxOGcqfjMJMhSI84\",\n    \"_id\": \"5f730e04b8ca663ae84a36ce\",\n    \"username\": \"rohit ajmera12\",\n    \"country_code\": \"91\",\n    \"phone\": \"123456789\",\n    \"email\": \"rr@c.com\",\n    \"register_id\": \"200285f730e04b8ca663ae84a36ce\",\n    \"user_image_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/undefined\",\n    \"user_image_thumb_url\": \"http://192.168.1.131:3050/service/assets?service=user_service&filepath=uploads/users/5f730e04b8ca663ae84a36ce/thumb_undefined\",\n    \"id\": \"5f730e04b8ca663ae84a36ce\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/user_login\",\n    \"message\": \"Login credentials are invalid.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Login.js",
    "groupTitle": "App_-_Driver_-_Login",
    "name": "PostUser_serviceDriverUser_login"
  },
  {
    "type": "post",
    "url": "/user_service/driver/verify_otp",
    "title": "Login - Verify OTP",
    "group": "App_-_Driver_-_Login",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_code",
            "description": "<p>Country Code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone/Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Device Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_token",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "device_type",
            "description": "<p>Device Type : 1 for android / 2 for ios</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/verify_otp\",\n    \"message\": \"OTP has verified successfully.\",\n    \"data\": {\n        \"security_pin\": \"\",\n        \"referral_code\": \"GG55\",\n        \"auth_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjJkM2Q3NWQ3ZjMyNDFiYjQwNDVmZDMiLCJpYXQiOjE1OTY4MDAzODEsImV4cCI6MTU5NzQwNTE4MX0.Xhw0tDmpsHpR2GNei1j528R6pyyoqy6IzBGMPX5aXVk\",\n        \"is_user_verified\": 1,\n        \"is_phone_verified\": 1,\n        \"is_email_verified\": 0,\n        \"allow_notifications\": 1,\n        \"enable_security_pin\": 0,\n        \"qr_code_image\": \"1596800381_qr.png\",\n        \"address\": \"\",\n        \"is_acNotifications failed. NotRegistered (node:27800) Warning: a promise was rejected with a non-error: [object String]tive\": 1,\n        \"is_deleted\": 0,\n        \"user_image\": \"\",\n        \"available_wallet_balance\": 0,\n        \"total_orders_count\": 0,\n        \"default_payment_option\": \"\",\n        \"default_country\": \"\",\n        \"default_language\": \"\",\n        \"kyc_reference_id\": \"\",\n        \"kyc_validation_url\": \"\",\n        \"is_kyc_done\": 0,\n        \"_id\": \"5f2d3d75d7f3241bb4045fd3\",\n        \"first_name\": \"Chandan\",\n        \"last_name\": \"Chhajer\",\n        \"user_role\": \"customer\",\n        \"country_code\": \"+91\",\n        \"phone\": \"9987667777\",\n        \"email\": \"chandan@mailinator.com\",\n        \"password\": \"$2a$10$Yk7qOI7sBp9rl5h0pv5rTOHY/RwBkbBQt7LEAER9/nblPGGcwXq7S\",\n        \"last_login_time\": \"2020-08-07T11:39:41.258Z\",\n        \"geoLocation\": {\n            \"type\": \"Point\",\n            \"coordinates\": [],\n            \"_id\": \"5f2d3d75d7f3241bb4045fd4\"\n        },\n        \"createdAt\": \"2020-08-07T11:39:33.646Z\",\n        \"updatedAt\": \"2020-08-07T11:39:41.259Z\",\n        \"__v\": 0,\n        \"user_image_url\": \"http://192.168.1.154:3031/default/placeholder-user.jpg\",\n        \"user_image_thumb_url\": \"http://192.168.1.154:3031/default/placeholder-user.jpg\",\n        \"qr_code_image_url\": \"http://192.168.1.154:3031/uploads/users/5f2d3d75d7f3241bb4045fd3/1596800381_qr.png\",\n        \"id\": \"5f2d3d75d7f3241bb4045fd3\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/verify_otp\",\n    \"message\": \"Invalid OTP.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Login.js",
    "groupTitle": "App_-_Driver_-_Login",
    "name": "PostUser_serviceDriverVerify_otp"
  },
  {
    "type": "delete",
    "url": "/user_service/driver/notifications",
    "title": "Driver - Notification - Delete All",
    "group": "App_-_Driver_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/notifications\",\n\"message\": \"Notification has been deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Notification.js",
    "groupTitle": "App_-_Driver_-_Notification",
    "name": "DeleteUser_serviceDriverNotifications"
  },
  {
    "type": "delete",
    "url": "/user_service/driver/notifications/5f9915010495120f8cd71aad",
    "title": "Driver - Notification - Delete One",
    "group": "App_-_Driver_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n\"status\": \"success\",\n\"api_name\": \"/notifications\",\n\"message\": \"Notification has been deleted successfully.\",\n\"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Notification.js",
    "groupTitle": "App_-_Driver_-_Notification",
    "name": "DeleteUser_serviceDriverNotifications5f9915010495120f8cd71aad"
  },
  {
    "type": "get",
    "url": "/user_service/driver/notifications",
    "title": "Driver - Notification - Listing",
    "group": "App_-_Driver_-_Notification",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"x-access-token\": \"your token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"Successfully fetch notifications list.\",\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"5f992b510976901f50599f18\",\n                \"read_status\": 0,\n                \"notification_type\": 1,\n                \"title\": \"Hello2\",\n                \"message\": \"Test message2\",\n                \"createdAt\": \"2020-10-28T08:26:57.756Z\"\n            },\n            {\n                \"_id\": \"5f992ad56d9c7d3150924422\",\n                \"read_status\": 0,\n                \"notification_type\": 1,\n                \"title\": \"Hello2\",\n                \"message\": \"Test message2\",\n                \"createdAt\": \"2020-10-28T08:24:53.393Z\"\n            }\n        ],\n        \"totalDocs\": 2,\n        \"limit\": 10,\n        \"page\": 1,\n        \"totalPages\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"/notifications\",\n    \"message\": \"error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Notification.js",
    "groupTitle": "App_-_Driver_-_Notification",
    "name": "GetUser_serviceDriverNotifications"
  },
  {
    "type": "get",
    "url": "/user_service/driver/profile/get_profile",
    "title": "Profile - Get Profile  Driver",
    "group": "App_-_Driver_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": \"success\",\n    \"api_name\": \"/profile/get_profile\",\n    \"message\": \"Data fetch successfully\",\n    \"data\": {\n        \"_id\": \"5f804f253bb6af24919995a0\",\n        \"username\": \"Test Driver\",\n        \"email\": \"testdriver@gmail.com\",\n        \"country_code\": \"91\",\n        \"phone\": \"7867868767\",\n        \"online_status\": 0,\n        \"vehicle_no\": \"fg15r255\",\n        \"user_image_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f804f253bb6af24919995a0/1602739039485zuckerberg.jpg\",\n        \"user_image_thumb_url\": \"http://13.235.188.102:3060/service/assets?service=user_service&filepath=uploads/users/5f804f253bb6af24919995a0/thumb_1602739039485zuckerberg.jpg\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"profile/get_profile\",\n    \"message\": \"Invalid data.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Profile.js",
    "groupTitle": "App_-_Driver_-_Profile",
    "name": "GetUser_serviceDriverProfileGet_profile"
  },
  {
    "type": "post",
    "url": "/user_service/driver/profile/change_password",
    "title": "Profile - Change Password",
    "group": "App_-_Driver_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"change_password\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"change_password\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Profile.js",
    "groupTitle": "App_-_Driver_-_Profile",
    "name": "PostUser_serviceDriverProfileChange_password"
  },
  {
    "type": "post",
    "url": "/user_service/driver/profile/update_profile",
    "title": "Profile - Update Profile  Driver",
    "group": "App_-_Driver_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"Authorization\": \"Bearer token\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field_key",
            "description": "<p>(new_email,new_phone,username,vehicle_no,user_image)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field_value",
            "description": "<p>(Phone/Email)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"/profile/update_profile\",\n    \"message\": \"Please verify Email which is sent to your email id.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"driver/profile/update_profile\",\n    \"message\": \"Invalid data.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Profile.js",
    "groupTitle": "App_-_Driver_-_Profile",
    "name": "PostUser_serviceDriverProfileUpdate_profile"
  },
  {
    "type": "put",
    "url": "/user_service/driver/profile/change_online_status",
    "title": "Profile - Change Online Status",
    "group": "App_-_Driver_-_Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"success\",\n    \"api_name\": \"change_online_status\",\n    \"message\": \"You have changed password successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"error\",\n    \"api_name\": \"change_online_status\",\n    \"message\": \"User doesn't exist.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/driver/Profile.js",
    "groupTitle": "App_-_Driver_-_Profile",
    "name": "PutUser_serviceDriverProfileChange_online_status"
  },
  {
    "type": "All",
    "url": "/",
    "title": "Global Errors",
    "group": "GlobalErrors",
    "description": "<p>These errors may occurs globally when either of other apis called. Each error has different status and reason of occurance. These all are for security purpose to protect apis access.</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"X-Access-Token\": \"Access token generated at client for every request.\",\n    \"Authorization\": \"Auth token received from server after user login.\",\n    \"login_user_id\": \"5f2bd5bf6d252675e46d0271\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success with Data",
          "content": "HTTP/1.1 200 Response\n{\n    \"status\": \"success\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Success\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "Success with Error",
          "content": "HTTP/1.1 200 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Invalid Credentials.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Login Timeout.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402",
            "description": "<p>Unauthorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Bad Request.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "401 Login Timeout",
          "content": "HTTP/1.1 401 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Login Session Expired\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "402 Unauthorized",
          "content": "HTTP/1.1 401 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Unauthorized\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"You are not allowed to access webservices.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Not Found\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "500 Internal Server Error",
          "content": "HTTP/1.1 500 Response\n{\n  \"status\": \"error\",\n  \"api_name\": \"user_login\",\n  \"message\": \"Can't set headers after they are sent.\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "GlobalErrors",
    "name": "All"
  },
  {
    "type": "All",
    "url": "/",
    "title": "Global Errors",
    "group": "GlobalErrors",
    "description": "<p>These errors may occurs globally when either of other apis called. Each error has different status and reason of occurance. These all are for security purpose to protect apis access.</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"X-Access-Token\": \"Access token generated at client for every request.\",\n    \"Authorization\": \"Auth token received from server after user login.\",\n    \"login_user_id\": \"5f2bd5bf6d252675e46d0271\",\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success with Data",
          "content": "HTTP/1.1 200 Response\n{\n    \"status\": \"success\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Success\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "Success with Error",
          "content": "HTTP/1.1 200 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Invalid Credentials.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400 Bad Request",
          "content": "HTTP/1.1 400 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Bad Request.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Login session expired. Please login again to continue.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"You are not allowed to access webservices.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Response\n{\n    \"status\": \"error\",\n    \"api_name\": \"user_login\",\n    \"message\": \"Not Found\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "500 Internal Server Error",
          "content": "HTTP/1.1 500 Response\n{\n  \"status\": \"error\",\n  \"api_name\": \"user_login\",\n  \"message\": \"Can't set headers after they are sent.\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Login.js",
    "groupTitle": "GlobalErrors",
    "name": "All"
  }
] });
