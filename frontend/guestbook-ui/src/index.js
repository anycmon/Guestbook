import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import "./index.css"
import guestBookReducer from "./app/reducers/Guestbook"
import App from "./app/containers/App"
import registerServiceWorker from "./registerServiceWorker"
const initState = {
	author: "",
	message: "",
	notes: []
}
const store = createStore(guestBookReducer, initState)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)
registerServiceWorker()
