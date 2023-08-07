/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDialog, resetDialog, setModal } from "redux/slices/modalSlice";
import {
    setApplicationSettings,
    setShowKeyboard
} from "redux/slices/applicationSlice";
import { editState } from "redux/slices/productSlice";

import { settings } from "controllers/index";
import Error from "components/Status/Error";
import Version from "common/Version";
import Header from "../components/Header/Header";
import {Content} from "../components/Content/Content";

export default function PaymasterPage() {
    const [headerState, setHeaderState] = useState(false);
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const blur = useSelector((state) => state.modal.dialogBlur);
    const issues = useSelector((state) => state.state.issues);
    const errors = useSelector((state) => state.state.errors);
    const cart = useSelector((state) => state.product.cart);
    const app = useSelector((state) => state.application.applicationSettings);
    const [modal] = useSelector((state) => state.modal.dialog);
    const dispatch = useDispatch();

    const collapseHeader = useCallback(() => {
        setHeaderState((prev) => !prev);
    }, []);

    return (
        <div className="layout" style={{ filter: blur ? "blur(1px)" : "" }}>
            {errors.length ? (
                <Error errors={errors} issues={issues} />
            ) : (
                <>
                    <Version />
                    <Header collapseHeader={collapseHeader} mode={headerState} />
                    <Content />
                </>
            )}
        </div>
    )
}
