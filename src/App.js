import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RouterProvider from "./hooks/useRouter";

import store from "./store";

import "./App.css";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RouterProvider />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
