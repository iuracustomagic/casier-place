import ProductCard from "./ProductCard";
import translate from "../../assets/translation";
import SwitchPage from "../../common/SwitchPage";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../redux/slices/productSlice";
import constrants from "assets/constrants";

const { itemsToDisplay } = constrants;

export default function CategoryItem({productsList}) {
    const [total, setTotal] = useState(0);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const [page, setPage] = useState(0);

    const lang = useSelector((state) => state.application.lang);
    const updateProductWrapper = useSelector(
        (state) => state.state.toggleUpdateProducts
    );
    const dispatch = useDispatch();

    const addToCart = (product) => {
        // product.weight = 1
        dispatch(addProduct({ product, weight: 1 }));
        // inputRef.current.value = '';
        // inputRef.current.focus();
    }

    const changePage = (value) => {
        const returnVal = parseInt(page) + value;
        // if (! isLoadingProducts) {
        //     getProducts(returnVal, filter, false);
        // }

        setPage(returnVal);
    };
    return (
        <div className="product-container">

            {productsList.length ? (

                productsList.slice(0, itemsToDisplay).map((product, idx) => (
                    <button
                        onKeyDown={(e) => e.preventDefault()}
                        onClick={() => addToCart(product)}
                        type="button"
                        key={`${product._id}-wrapper=${idx}`}
                    >
                        <ProductCard product={product} />
                    </button>
                ))
            ) : (
                <h1>{translate[lang]["Sorry we don't have items"]}</h1>
            )}
            <SwitchPage
                changePage={changePage}
                total={total}
                page={page}
                itemsToDisplay={itemsToDisplay}
            />
        </div>
    )
}
