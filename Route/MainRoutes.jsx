import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../screen/Home";
import { CreatedTypes } from "../screen/CreatedTypes";
import { Edit } from "../screen/Edit";

export function MainRoutes() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/created-type" element={<CreatedTypes />} />
        <Route path="/product/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
