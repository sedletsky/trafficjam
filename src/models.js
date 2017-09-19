const helpers = {
  connector(options) {
    return options.webrtc && {
      name: "webrtc",
      room: options.webrtc,
      generateUserId: true
    }
  },
  share(options) {
    return _.mapValues(options.types, value => _.upperFirst(value))
  },
  event(event) {
    return {type: event.type, data: event.values || event.oldValues}
  }
}

class Model {
  static log(event) {
    console.log(helpers.event(event))
  }

  static logToDOM(selector) {
    return event => {
      document.querySelector(selector).innerHTML += 
        `${JSON.stringify(helpers.event(event))}\n`
    }
  }

  static connect(options) {
    return (Model.connector = Y({
      db: {
        name: options.persist || "memory"
      },
      connector: helpers.connector(options),
      sourceDir: "/bower_components",
      share: helpers.share(options)
    }).then(y => {
      Model.readyActions.map(action => {
        action(y.share)
      })
    }))
  }

  static ready(action) {
    Model.readyActions.push(action)
  }
}

Model.connector = null
Model.readyActions = []

class Message {
  constructor(data, options, collection=null) {
    this.data = data
    this.options = options
    this.collection = collection
  }
}

class Messages {
  constructor(options) {
    this.collection = options.collection || []
    this.options = options
  }
}
