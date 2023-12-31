import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "redux/slices/modalSlice";
import translate from "assets/translation";
import { users } from "controllers/index";
import TurnOffButton from "../components/Header/TunrOffButton";


export default function Login() {

    const lang = useSelector((state) => state.application.lang);
    const navigate = useNavigate();
    const loginInput = useRef(null);
    const dispatch = useDispatch();

    const sendCredentials = useCallback(async (code) => {
        if (code.length === 13) {
            try {
                // const result = await users.login({ code });
                // if (result.status !== 200)
                //     throw new Error(result?.data || "This code isn't valid");
                // localStorage.setItem("jwt", result.data);
                // dispatch(setModal({ success: true, text: translate[lang]["Success enter"] }));
                navigate("/paymaster");
            } catch (error) {
                dispatch(setModal({ text: error.message }));
            }
        }
    }, []);

    return (
        <div className="login-layout">
            <div className="topnav">
                <TurnOffButton className="btn-transparent" />
            </div>
            <div className="login-container">
                <h4>{translate[lang]["Scan your code"]}</h4>
                <input
                    ref={loginInput}
                    onChange={(e) => sendCredentials(e.target.value)}
                    onBlur={(e) => e.target.focus()}
                    autoFocus
                    className="form-control"
                />
                <button
                    className="btn btn-primary mt-2"
                    type="button"
                    onClick={() => sendCredentials("4840842025153")}
                >{translate[lang].Enter}
                </button>
            </div>
        </div>
    );
}
