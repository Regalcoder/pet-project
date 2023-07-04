import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./Create";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Update from "./Update";
import Read from "./Read";
import { ToastContainer } from "react-toastify";
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />{" "}
          {/* the id is added to the url so as to target a single value with a unique id in the server*/}
          <Route path="/read/:id" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
