module.exports = {
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 50
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log"
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "app",
        "errors"
      ],
      "level": "DEBUG"
    },
    "http": {
      "appenders": [
        "access"
      ],
      "level": "DEBUG"
    }
  }
}
