import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import axios from "axios"
import cardTop from "../images/1x/card-top.png"
import iconFacebook from "../images/1x/icon-facebook.png"
import iconGooglePlus from "../images/1x/icon-googleplus.png"
import iconTwitter from "../images/1x/icon-twitter.png"
function ForgotPassword() {
  const initialState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
    },
    success: null,
    error: null,
    submitCount: 0,
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailChange":
        draft.email.hasErrors = false
        draft.email.value = action.value
        draft.error = null
        return
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "You must provide a valid email address"
        }
        return
      case "submitForm":
        if (!draft.email.hasErrors) {
          draft.submitCount++
        }
        return
      case "setSuccess":
        draft.success = action.value
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "emailAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = axios.CancelToken.source()
      async function reset() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/password/forgot-password`,
            {
              email: state.email.value,
            },
            { cancelToken: ourRequest.token }
          )
          if (response.data) {
            dispatch({ type: "setSuccess", value: response.data.message })
          }
          console.log("response.data.forgot", response)
        } catch (e) {
          console.log(e, "there was an error")
          // if (e.response.data) {
          //   dispatch({ type: "setError", value: e.response.data.message })
          // }
        }
      }
      reset()
      return () => ourRequest.cancel()
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    // console.log("form submitted", state.email.value)
    // dispatch({ type: "emailChange", valule: state.email.value })
    // dispatch({ type: "emailAfterDelay", value: state.email.value })
    // dispatch({ type: "passwordChange", value: state.password.value })
    dispatch({ type: "submitForm" })
  }
  return (
    <div className="before-login login-form forgot-password-form">
      <div className="container">
        <div className="card-container">
          <div className="card card-center">
            <div className="card-header">
              <div className="image-container">
                <img src={cardTop} alt="" />
              </div>
              <div className="header-box">
                <h2>Reset Password</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <label>
                  <span>Email</span>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      {/* <FontAwesomeIcon icon={faCofee} /> */}
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) =>
                        dispatch({ type: "emailChange", value: e.target.value })
                      }
                      value={state.email.value}
                    />
                  </div>
                  <CSSTransition
                    in={state.email.hasErrors}
                    timeout={330}
                    classNames="liveValidateMessage"
                    unmountOnExit
                  >
                    <p className="error-msg">{state.email.message}</p>
                  </CSSTransition>
                  <CSSTransition
                    in={state.success}
                    timeout={330}
                    classNames="liveValidateMessage"
                    unmountOnExit
                  >
                    <p className="error-msg">{state.success}</p>
                  </CSSTransition>
                </label>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-large">Reset</button>
                <div className="icon-box my-4">
                  <div className="image-container">
                    <img src={iconFacebook} alt="" />
                  </div>
                  <div className="image-container">
                    <img src={iconGooglePlus} alt="" />
                  </div>
                  <div className="image-container">
                    <img src={iconTwitter} alt="" />
                  </div>
                </div>
                <div className="text-box mt-3">
                  <Link className="text-small" to="/">
                    Don't have an ac?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
