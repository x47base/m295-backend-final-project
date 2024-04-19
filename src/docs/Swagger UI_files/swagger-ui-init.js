
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "swagger": "2.0",
    "info": {
      "title": "M295 Abschlussprojekt",
      "description": "Description",
      "version": "1.0.0"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "schemes": [
      "http"
    ],
    "paths": {
      "/": {
        "get": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            }
          }
        }
      },
      "/login": {
        "post": {
          "description": "",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "example": "any"
                  },
                  "password": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/verify": {
        "get": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/logout": {
        "delete": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/tasks/": {
        "get": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        },
        "post": {
          "description": "",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "done": {
                    "example": "any"
                  },
                  "duedate": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "422": {
              "description": "Unprocessable Entity"
            }
          }
        }
      },
      "/tasks/{id}": {
        "get": {
          "description": "",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "put": {
          "description": "",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            },
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "done": {
                    "example": "any"
                  },
                  "duedate": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "description": "",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
