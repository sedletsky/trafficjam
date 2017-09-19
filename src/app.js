localStorage.debug = "y*"

Model.connect({
  webrtc: "test",
  types: {
    history: "array"
  }
})

Model.ready(types => {
  types.history.observe(Model.log)
  types.history.observe(Model.logToDOM("pre"))
})

Model.ready(types => {
  document.querySelector("input[type=button]").addEventListener("click", () => {
    const $text = document.querySelector("input[type=text]")
    types.history.push([{text: $text.value}])
    $text.value = ""
  })
})
