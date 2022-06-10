import "bootstrap/dist/css/bootstrap.css";

import "../styles/helper.scss";
import "../styles/globals.scss";

import store from "../store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
