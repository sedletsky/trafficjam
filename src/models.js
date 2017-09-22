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
  signin(credentials) {
    console.log(Model.y.db.userId)
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
    Y({
      db: {
        name: options.persist || "memory"
      },
      connector: helpers.connector(options),
      sourceDir: "/bower_components",
      share: helpers.share(options)
    }).then(y => {
      Model.y = y
      Model.actions.ready.map(action => {
        action(y.share)
      })
      helpers.signin({})
    })
  }

  static ready(action) {
    Model.actions.ready.push(action)
  }
}

Model.actions = {
  ready: []
}

class Data {
  constructor(data, options, collection=null) {
    this.data = data
    this.options = options
    this.collection = collection
  }
}

class Collection {
  constructor(options) {
    this.collection = options.collection || []
    this.options = options
  }
}

class Game extends Data {
  constructor(
  ) {
    super({
      id,
      title,
      // localizedTitle
    })
  }
}

class Games extends Collection {
  constructor() {
    super({collection: []})
  }
}
