import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import store from "./store/index.ts";
dayjs.extend(utc);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
