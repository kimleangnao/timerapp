import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/Home";
import Clock from "./routes/Clock";


const App = () => {
    return(
      <BrowserRouter>
        <Routes>
            <Route path="/clock/:type" element={<Clock />} />
            <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    )
}

let dom = document.getElementById("root");
let root = createRoot(dom);
root.render(<App />)