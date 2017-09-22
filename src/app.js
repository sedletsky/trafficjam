localStorage.debug = "y*"

Model.connect({
  webrtc: "test1",
  types: {
    // history: "array",
    games: "array",
    users: "map"
  }
})

Model.ready(types => {
  types.history.observe(Model.log)
  types.history.observe(Model.logToDOM("pre"))
  // Model.connector.onUserEvent(event => {
  //   console.log("onUserEvent", event)
  // })
  // Model.connector.whenSynced(() => {
  //   console.log("whenSynced")
  // })
})

Model.ready(types => {
  document.querySelector("input[type=button]").addEventListener("click", () => {
    const $text = document.querySelector("input[type=text]")
    types.history.push([{text: $text.value}])
    $text.value = ""
  })
})
