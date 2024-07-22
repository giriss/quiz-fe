import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { BlueprintProvider } from "@blueprintjs/core"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "animate.css"
import App from "@/App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BlueprintProvider>
        <App />
      </BlueprintProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
