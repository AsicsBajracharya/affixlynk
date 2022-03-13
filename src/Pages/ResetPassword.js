import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { Link, useLocation } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import axios from "axios"
import cardTop from "../images/1x/card-top.png"
import iconFacebook from "../images/1x/icon-facebook.png"
import iconGooglePlus from "../images/1x/icon-googleplus.png"
import iconTwitter from "../images/1x/icon-twitter.png"
function ResetPassword() {
  const search = useLocation().search
  const token = new URLSearchParams(search).get("token")
  const initialState = {
    password: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
    },
    confirmPassword: {
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
      case "passwordChange":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true
          draft.password.message = "Password cannot exceed 50 characters"
        }
        return
      case "passwordAfterDelay":
        if (draft.password.value.length < 8) {
          draft.password.hasErrors = true
          draft.password.message = "Password must be 8 characters long"
        }
        return
      case "confirmPasswordChange":
        draft.confirmPassword.hasErrors = false
        draft.confirmPassword.value = action.value
        return
      case "confirmPasswordAfterDelay":
        if (draft.password.value !== draft.confirmPassword.value) {
          draft.confirmPassword.hasErrors = true
          draft.confirmPassword.message = "Passwords do not match"
        }
        return
      case "submitForm":
        if (!draft.password.hasErrors & !draft.confirmPassword.hasErrors) {
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
    if (state.password.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "passwordAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  useEffect(() => {
    if (state.confirmPassword.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "confirmPasswordAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.confirmPassword.value])

  useEffect(() => {
    if (state.submitCount && token) {
      const ourRequest = axios.CancelToken.source()
      async function reset() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/password/reset`,
            {
              token: token,
              password: state.password.value,
              password_confirmation: state.confirmPassword.value,
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
    dispatch({ type: "passwordChange", value: state.password.value })
    dispatch({ type: "passwordAfterDelay", value: state.password.value })
    dispatch({
      type: "confirmPasswordChange",
      value: state.confirmPassword.value,
    })
    dispatch({
      type: "confirmPasswordAfterDelay",
      value: state.confirmPassword.value,
    })
    dispatch({ type: "submitForm" })
  }
  return (
    <div className="before-login login-form  forgot-password-form">
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
                  <span>Password</span>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      dispatch({
                        type: "passwordChange",
                        value: e.target.value,
                      })
                    }
                    value={state.password.value}
                  />
                  <CSSTransition
                    in={state.password.hasErrors}
                    timeout={330}
                    classNames="liveValidateMessage"
                    unmountOnExit
                  >
                    <p>{state.password.message}</p>
                  </CSSTransition>
                </label>
                <label>
                  <span> ConfirmmPassword</span>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      dispatch({
                        type: "confirmPasswordChange",
                        value: e.target.value,
                      })
                    }
                    value={state.confirmPassword.value}
                  />
                  <CSSTransition
                    in={state.confirmPassword.hasErrors}
                    timeout={330}
                    classNames="liveValidateMessage"
                    unmountOnExit
                  >
                    <p className="error-msg">{state.confirmPassword.message}</p>
                  </CSSTransition>
                </label>
                <CSSTransition
                  in={state.success}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <p className="error-msg">{state.success}</p>
                </CSSTransition>
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

export default ResetPassword
