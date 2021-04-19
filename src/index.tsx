import React from "react"
import { render } from "react-dom"
import App from "./app"

render(
  <App />,
  document.getElementById("root"),
)

if ((module as any).hot) {
  (module as any).hot.accept()
}
