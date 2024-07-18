import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import FirstPage from "./components/first-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/initial" element={<FirstPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
