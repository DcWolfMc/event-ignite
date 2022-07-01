import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MasterClass} from "./pages/MasterClass"
import { Subscription } from "./pages/Subscription";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Subscription/>} />
        <Route path="/masterClass" element={<MasterClass/>} />
        <Route path="/masterClass/lesson/:slug" element={<MasterClass/>} />
      </Routes>
    </BrowserRouter>
  );
};
