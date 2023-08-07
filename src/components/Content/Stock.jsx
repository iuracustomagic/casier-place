import React, { useState, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "common/Loader";
import translate from "assets/translation";
import { setModal } from "redux/slices/modalSlice";
import { addProduct, editState } from "redux/slices/productSlice";
import styled from 'styled-components';
import {Link, NavLink, Outlet} from "react-router-dom";





export default function Stock() {

    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState(null);
    const container = useRef(null);
    const inputRef = useRef(null);
    const lang = useSelector((state) => state.application.lang);

    const dispatch = useDispatch();

    const CategoryLink = styled(NavLink)`
    &.active {
    opacity: 0.7
    }
    `

    const searchBarcode = async (value) => {
        setFilter(value);
        setPage(0);
        try {
            // const result = await products.getProductByFilter( value);
            //
            // if (result.status !== 200) throw new Error(result.data);
            //
            // setProductsList([result.data.product] );
            // addToCart(result.data.product)


        } catch (error) {
            dispatch(setModal({ text: error.message }));
        }

        // getProducts(0, value, true);
    };

    return (
        <div className="col-md-8">
            <div ref={container} className="card-box products-wrapper">
                {isLoadingProducts ? (
                    <Loader withoutClose />
                ) : (
                    <>

                        <div className="modal-body-header">
                            <input ref = {inputRef}
                                   type = "text"
                                   onChange={(e) => { searchBarcode(e.target.value); }} placeholder={translate[lang]['Search by barcode']} className="form-control mb-2" />
                        </div>
                        <ul className='d-flex'>
                            <li className='mr-3'>
                                <CategoryLink className='btn btn-primary' to='category-1'>Категория 1</CategoryLink>
                            </li>
                            <li className='ms-3'>
                                <CategoryLink className='btn btn-primary' to='category-2'>Категория 2</CategoryLink>
                            </li>
                            <li className='ms-3'>
                                <CategoryLink className='btn btn-primary' to='category-3'>Категория 3</CategoryLink>
                            </li>
                        </ul>

                        <Suspense fallback={<div>Loading ...</div>}>
                            <Outlet/>

                        </Suspense>

                        {/*<div className="product-container">*/}
                        {/*    {productsList.length ? (*/}
                        {/*        productsList.slice(0, itemsToDisplay).map((product, idx) => (*/}
                        {/*            <button*/}
                        {/*                onKeyDown={(e) => e.preventDefault()}*/}
                        {/*                onClick={() => addToCart(product)}*/}
                        {/*                type="button"*/}
                        {/*                key={`${product._id}-wrapper=${idx}`}*/}
                        {/*            >*/}
                        {/*                <ProductCard product={product} />*/}
                        {/*            </button>*/}
                        {/*        ))*/}
                        {/*    ) : (*/}
                        {/*        <h1>{translate[lang]["Sorry we don't have items"]}</h1>*/}
                        {/*    )}*/}
                        {/*    <SwitchPage*/}
                        {/*        changePage={changePage}*/}
                        {/*        total={total}*/}
                        {/*        page={page}*/}
                        {/*        itemsToDisplay={itemsToDisplay}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </>
                )}
            </div>
        </div>
    )
}
