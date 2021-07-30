define({ "api": [
  {
    "type": "delete",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Delete",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"FAQ has deleted successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "DeleteContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/:content_key",
    "title": "Contents - Get Data",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"content_data\": \"<h5 style=\\\"text-align:left;\\\">'by Cicero, writection 1.10.32.</span></p>\\n\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "GetContent_serviceAdminContentsContent_key"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Get",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"question_id\": \"faq_1587727510744\",\n        \"question\": \"What is Lorem\",\n        \"answer\": \"LoremLorem Ipsum is simply dummy \"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Invalid Question Id\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "GetContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "get",
    "url": "/content_service/admin/contents/faqs",
    "title": "FAQ - Listing",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {\n        \"content_data\": [\n            {\n                \"question_id\": \"faq_1587727510744\",\n                \"question\": \"What is Lorem\",\n                \"answer\": \"LoremLorem Ipsum is simply dummy \"\n            },\n            {\n                \"question_id\": \"faq_1587727535192\",\n                \"question\": \"Why do we use it?\",\n                \"answer\": \"It is a long established fact that.\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "GetContent_serviceAdminContentsFaqs"
  },
  {
    "type": "post",
    "url": "/content_service/admin/contents/faq",
    "title": "FAQ - Create",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"FAQ has created successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "PostContent_serviceAdminContentsFaq"
  },
  {
    "type": "put",
    "url": "/content_service/admin/contents/:content_key",
    "title": "Contents - Update",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Content has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Invalid content key.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "PutContent_serviceAdminContentsContent_key"
  },
  {
    "type": "put",
    "url": "/content_service/admin/contents/faq/:question_id",
    "title": "FAQ - Update",
    "group": "Admin-Content",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"FAQ details has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"FAQ data not found in database.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Content.js",
    "groupTitle": "Admin-Content",
    "name": "PutContent_serviceAdminContentsFaqQuestion_id"
  },
  {
    "type": "get",
    "url": "/content_service/admin/settings",
    "title": "Settings - Get",
    "group": "Admin-Settings",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Success\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Settings.js",
    "groupTitle": "Admin-Settings",
    "name": "GetContent_serviceAdminSettings"
  },
  {
    "type": "post",
    "url": "/content_service/admin/settings",
    "title": "Settings - Update",
    "group": "Admin-Settings",
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
            "type": "Object",
            "optional": false,
            "field": "settingsData",
            "description": "<p>Settings Data: {&quot;referral_amount&quot;:40,&quot;money_transfer_limit&quot;:{&quot;customer&quot;:{&quot;withdraw_money_limit&quot;:10000,&quot;transaction_fees&quot;:20}}</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Settings has updated successfully.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Example",
          "content": "HTTP/1.1 400 Error\n{\n    \"message\": \"Error.\",\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin/Settings.js",
    "groupTitle": "Admin-Settings",
    "name": "PostContent_serviceAdminSettings"
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
          "content": "{\n    \"Content-Type\": \"multipart/form-data\",\n    \"X-Access-Token\": \"Access token generated at client for every request.\",\n    \"Authorization\": \"Auth token received from server after user login.\",\n    \"device_token\": \"FCM Device Token for Push Notification\",\n    \"device_type\": \"Device Type. Ex: android / ios / web\",\n    \"local_timezone\": \"Local Timezone String. Ex: Asia/Kolkata\",\n    \"language\": \"Language. Ex: en / es\"\n}",
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
          "title": "200 OK",
          "content": "HTTP/1.1 200 Response\n{\n    \"message\": \"Success\",\n    \"data\": {}\n}",
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
            "description": "<p>Bad Request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402",
            "description": "<p>Payment Required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "408",
            "description": "<p>Request Timeout</p>"
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
          "content": "HTTP/1.1 400 Response\n{\n    \"message\": \"Bad Request.\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Response\n{\n    \"message\": \"Unauthorized\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Response\n{\n    \"message\": \"Forbidden\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Response\n{\n    \"message\": \"Not Found\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "402 Request Timeout",
          "content": "HTTP/1.1 408 Response\n{\n    \"message\": \"Request Timeout\",\n    \"data\": {}\n}",
          "type": "json"
        },
        {
          "title": "500 Internal Server Error",
          "content": "HTTP/1.1 500 Response\n{\n  \"message\": \"Internal Server Error\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/index.js",
    "groupTitle": "GlobalErrors",
    "name": "All"
  }
] });
