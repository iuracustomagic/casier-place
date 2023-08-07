
import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {resetDialog, setModal} from 'redux/slices/modalSlice';
// import PropTypes from 'prop-types';
import translate from 'assets/translation';
// import {useNavigate} from "react-router-dom";

function EnterRegistration() {
  const lang = useSelector((state) => state.application.lang);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const sendCredentials = useCallback(async (code) => {
    if (code.length === 13) {
      try {
        // const result = await users.login({ code });
        // if (result.status !== 200)
        //     throw new Error(result?.data || "This code isn't valid");
        // localStorage.setItem("jwt", result.data);
        dispatch(setModal({ success: true, text: translate[lang]["Success enter"] }));
        dispatch(resetDialog());
        // navigate("/paymaster");
      } catch (error) {
        dispatch(setModal({ text: error.message }));
      }
    }
  }, []);

  return (
    <div className="py-3">
      <div className="modal-body ">
        <div className=" pt-3 pb-3 text-center">
          <h4>{translate[lang]["Scan your code"]}</h4>
          <input
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
    </div>
  );
}

// Confirm.propTypes = {
//   settings: PropTypes.objectOf({
//     action: PropTypes.func.isRequired,
//     description: PropTypes.string.isRequired,
//     args: PropTypes.array,
//   }),
// };
//
// Confirm.defaultProps = {
//   settings: PropTypes.objectOf({
//     args: undefined,
//   }),
// };

export default EnterRegistration;
