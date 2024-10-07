import { BrowserRouter, Routes as AllRoutes, Route } from "react-router-dom";
import Index from "./pages/index";
import Configuration from "./pages/configuration";
import Queries from "./pages/queries";
import Insights from "./pages/insights";
import Report2 from "./pages/report2";
import Report3 from "./pages/report3";
import Authorization from "./pages/authorization";
import "react-toastify/dist/ReactToastify.css";
import TrustedDataAccess from "./pages/tda";
import DataAccess from "./pages/data-access";

const Routes = () => {
  return (
    // <BrowserRouter basename="/pov2">
    <BrowserRouter>
      <AllRoutes>
        <Route path="/data-access" element={<DataAccess />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/report2" element={<Report2 />} />
        <Route path="/report3" element={<Report3 />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/tda" element={<TrustedDataAccess />} />
        <Route path="/" element={<Index />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/queries" element={<Queries />} />
      </AllRoutes>
    </BrowserRouter>
  );
};

export default Routes;
