import "./styles/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PaymasterPage from "./pages/PaymasterPage";
import Modal from "./components/Status/Modal";
// import Dialog from "./components/Status/Dialog";



function App() {
  return (
   <>
       <BrowserRouter>
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/paymaster" element={<PaymasterPage/>} />
       </Routes>
       </BrowserRouter>
       <Modal />
       {/*<Dialog />*/}
   </>
  );
}

export default App;
