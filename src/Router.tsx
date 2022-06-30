import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MasterClass} from "./pages/MasterClass"
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/masterClass" element={<MasterClass/>} />
        <Route path="/masterClass/lesson/:slug" element={<MasterClass/>} />
      </Routes>
    </BrowserRouter>
  );
};
