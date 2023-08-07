
import React, { useState, useCallback, createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useContext from "../../hooks/stockContext";
import ControlPanel from "./ControlPanel";
import Stock from "./Stock";

const StockContext = createContext();
const { ipcRenderer } = window.require
    ? window.require("electron")
    : { ipcRenderer: { send: () => {}, on: () => {} } };

function Content() {
const {decrement, increment, clearOrders, deletePosition} = useContext()
    const cart = useSelector((state) => state.product.cart);
    useEffect(() => {
        ipcRenderer.send("transaction", cart);

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    return (
        <StockContext.Provider
            value={{
                decrement,
                increment,
                clearOrders,
                deletePosition
            }}
        >
        <div className="layout-content">
            <div className="row">
                <Stock />
                <ControlPanel />
            </div>
        </div>
        </StockContext.Provider>
    )
}

export {Content, StockContext }
