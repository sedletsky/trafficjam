const helpers = {
  connector(options) {
    return options.webrtc && {
      name: "webrtc",
      room: options.webrtc,
      generateUserId: true
    }
  },
  share(options) {
    return _.extend(
      {
        sessions: "map",
        sessionsCache: "map"

      },
      _.mapValues(options.types, value => _.upperFirst(value))
    )
  },
  event(event) {
    return {type: event.type, data: event.values || event.oldValues}
  },
  signin(id) {
    Model.y.share.sessions.set(id || Model.y.db.userId, Model.y.db.userId)
  },
  getSessionId() {
    Model.y.share.sessionsCache.get(Model.y.db.userId) || Model.y.db.userId
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
    })
  }

  static ready(action) {
    Model.actions.ready.push(action)
  }
}

Model.actions = {
  ready: []
}
