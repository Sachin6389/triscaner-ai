import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import "./index.css";


/* Lazy Load Pages */
const Home = lazy(() => import("./components/Home"));
const Services = lazy(() => import("./components/Services"));
const About = lazy(() => import("./components/About"));

const NotFoundpage = lazy(() => import("./pages/NotFound"));
const CtScan = lazy(() => import("./pages/Ct"));
const MriScan = lazy(() => import("./pages/Mri"));
const XrayScan = lazy(() => import("./pages/XRay"));



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-xl font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Layout Route */}
          <Route element={<App />}>
            
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/ct-scan" element={<CtScan />} />
            <Route path="/mri-scan" element={<MriScan />} />
            <Route path="/xray-scan" element={<XrayScan />} />
    
            <Route path="*" element={<NotFoundpage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);