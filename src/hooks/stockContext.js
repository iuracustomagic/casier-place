import React, {  useCallback, useState } from "react";
import { countSumIfArray } from "helpers/products";
import { useSelector, useDispatch } from "react-redux";
import {
    editState,
    countPromotion,
    removePromotion
} from "redux/slices/productSlice";

export default function useContext() {
    const [applyDiscount, setApplyDiscount] = useState(false);
    const cart = useSelector((state) => state.product.cart);
    const dispatch = useDispatch();
    const sum = useSelector((state) => state.product.sum);
    const fullSum = useSelector((state) => state.product.full);
    const items = useSelector((state) => state.product.items);
    const discount = useSelector((state) => state.product.discount);

    const { ipcRenderer } = window.require
        ? window.require("electron")
        : { ipcRenderer: { send: () => {}, on: () => {} } };

    const deletePosition = useCallback(
        (idx) => {
            const promotion = cart[idx].discount?.some((cur) => cur.guarantee?.items);
            const copy = [...cart];
            copy.splice(idx, 1);

            ipcRenderer.send("product-logs", { items: [cart[idx]] });

            if (!promotion) {
                dispatch(
                    editState({
                        type: "sum",
                        sum: +(sum - parseFloat(cart[idx].countedPrice)).toFixed(2)
                    })
                );
            }
            dispatch(
                editState({
                    type: "items",
                    items: items - (cart[idx].weight ? 1 : cart[idx].qty)
                })
            );
            dispatch(
                editState({
                    type: "full",
                    full: +(fullSum - cart[idx].fullPrice).toFixed(2)
                })
            );

            if (promotion) {
                dispatch(removePromotion({ cart: copy, ref: cart[idx]._id, idx }));
                return;
            }

            dispatch(editState({ type: "cart", cart: copy }));
        },
        [cart, fullSum, items, sum]
    );

    const decrement = (idx) => {
        if (cart[idx].qty <= 1) {
            deletePosition(idx);
            return;
        }

        ipcRenderer.send("product-logs", {
            items: [{ ...cart[idx], qty: cart[idx].qty - 1 }]
        });

        dispatch(editState({ type: "items", items: items - 1 }));
        dispatch(
            editState({ type: "full", full: +(fullSum - cart[idx].price).toFixed(2) })
        );

        const copy = cart.map((item, index) => {
            if (idx === index) {
                const price = item.weight
                    ? (item.price * item.weight) / 1000
                    : item.price * (item.qty - 1 || 1);

                return {
                    ...item,
                    qty: item.qty - 1,
                    fullPrice: price,
                    countedPrice: countSumIfArray(
                        item.discount,
                        price,
                        item.qty - 1,
                        discount
                    )
                };
            }

            return item;
        });

        dispatch(editState({ type: "cart", cart: copy }));
        dispatch(countPromotion(idx));
    };

    const increment = (idx) => {
        dispatch(editState({ type: "items", items: items + 1 }));
        dispatch(
            editState({ type: "full", full: +(fullSum + cart[idx].price).toFixed(2) })
        );

        const copy = cart.map((item, index) => {
            if (idx === index) {
                const price = item.weight
                    ? (item.price * item.weight) / 1000
                    : item.price * (item.qty + 1 || 1) * item.measure;

                return {
                    ...item,
                    qty: item.qty + 1,
                    fullPrice: price,
                    countedPrice: countSumIfArray(
                        item.discount,
                        price,
                        item.qty + 1,
                        discount
                    )
                };
            }
            return item;
        });

        dispatch(editState({ type: "cart", cart: copy }));
        dispatch(countPromotion(idx));
    };

    const clearOrders = useCallback(() => {
        ipcRenderer.send("product-logs", { items: cart });

        setApplyDiscount(false);

        dispatch(editState({ type: "cart", cart: [] }));
        dispatch(editState({ type: "sum", sum: 0 }));
        dispatch(editState({ type: "full", full: 0 }));
        dispatch(editState({ type: "items", items: 0 }));
        dispatch(editState({ type: "discount", discount: null }));
        localStorage.setItem("cart", "[]");
    }, [cart]);


    return {deletePosition, clearOrders, decrement, increment }
}


