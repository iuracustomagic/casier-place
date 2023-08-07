import "./styles/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PaymasterPage from "./pages/PaymasterPage";
import Modal from "./components/Status/Modal";
import Dialog from "./components/Status/Dialog";
import CategoryItem from "./components/Content/CategoryItem";
import {category_1, category_2, category_3} from "assets/CategoryProducts";


function App() {
  return (
   <>
       <BrowserRouter>
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/paymaster" element={<PaymasterPage/>}>
               <Route path='category-1' element={<CategoryItem productsList={category_1}/>}/>
               <Route path='category-2' element={<CategoryItem productsList={category_2}/>}/>
               <Route path='category-3' element={<CategoryItem productsList={category_3}/>}/>
           </Route>
       </Routes>
       </BrowserRouter>
       <Modal />
       <Dialog />
   </>
  );
}

export default App;
