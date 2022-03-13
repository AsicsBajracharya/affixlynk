import React, { useEffect } from "react"
import { Button, Typography, Grid, CardActionArea } from "@mui/material"
import { useImmerReducer } from "use-immer"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import axios from "axios"
import DispatchContext from "../DispatchContext"
import logo from "../images/1x/logo.png"
import mobile from "../images/1x/mobile-homepage.png"
import cardTop from "../images/1x/card-top.png"
import iconFacebook from "../images/1x/icon-facebook.png"
import iconGooglePlus from "../images/1x/icon-googleplus.png"
import iconTwitter from "../images/1x/icon-twitter.png"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCofee } from "@fortawesome/free-solid-svg-icons"
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@mui/material"
import { useContext } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
function Login() {
  const appDispatch = useContext(DispatchContext)
  const history = useHistory()
  const initialState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
    },
    password: {
      value: "",
      hasErrors: false,
      message: "",
      type: "password",
    },
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
      // case "emailAfterDelay":
      //   if (!/^\S+@\S+$/.test(draft.email.value)) {
      //     draft.email.hasErrors = true
      //     draft.email.message = "You must provide a valid email address"
      //   }
      //   return
      case "passwordChange":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (!draft.password.value.length) {
          draft.password.hasErrors = true
          draft.password.message = "Please provide a password"
        }
        return
      case "submitForm":
        if (!draft.email.hasErrors && !draft.password.hasErrors) {
          draft.submitCount++
        }
        return
      case "setError":
        draft.error = action.value
        return
      case "togglePassword":
        if (draft.password.type === "password") {
          draft.password.type = "text"
        } else {
          draft.password.type = "password"
        }
        return
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // useEffect(() => {
  //   if (state.email.value) {
  //     const delay = setTimeout(() => {
  //       dispatch({ type: "emailAfterDelay" })
  //     }, 800)
  //     return () => clearTimeout(delay)
  //   }
  // }, [state.email.value])

  useEffect(() => {
    if (state.submitCount) {
      console.log("email", state.email.value, "password", state.password.value)
      const ourRequest = axios.CancelToken.source()
      async function login() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/login`,
            {
              email: state.email.value,
              password: state.password.value,
            },
            { cancelToken: ourRequest.token }
          )

          console.log("response.data.login", response)
          if (response.data) {
            appDispatch({ type: "login", value: response.data })
            history.push("/admin/dashboard")
          }
        } catch (e) {
          console.log(e.response.data, "there was an error")
          if (e.response.data) {
            dispatch({ type: "setError", value: e.response.data.message })
          }
        }
      }
      login()
      return () => ourRequest.cancel()
    }
  }, [state.submitCount])

  function togglePassword() {
    dispatch({ type: "togglePassword" })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("form submitted", state.email.value)
    // dispatch({ type: "emailChange", valule: state.email.value })
    // dispatch({ type: "emailAfterDelay", value: state.email.value })
    // dispatch({ type: "passwordChange", value: state.password.value })
    dispatch({ type: "submitForm" })
  }
  return (
    <div className="login-form before-login">
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <img src={logo} alt="" />
          </div>
        </div>
      </header>
      <div className="main-body">
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-2">
              <div className="image-outer-container">
                <div className="image-container">
                  <img src={mobile} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <div className="card-container">
                <div className="card">
                  <div className="card-header">
                    <div className="image-container">
                      <img src={cardTop} alt="" />
                    </div>
                    <div className="header-box">
                      <h2>Login </h2>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <label>
                        <span>Email</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 11.04 12.74"
                            >
                              <defs>
                                <style></style>
                              </defs>
                              <title>Asset 3</title>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <path
                                    class="cls-1"
                                    d="M9.24,3.83H8.87A3.08,3.08,0,1,1,5.79.75,3.09,3.09,0,0,1,8.87,3.83h.75A3.83,3.83,0,1,0,5.79,7.66,3.82,3.82,0,0,0,9.62,3.83Z"
                                  />
                                  <path
                                    class="cls-1"
                                    d="M.75,12.74A4.78,4.78,0,0,1,5.52,8a4.78,4.78,0,0,1,4.77,4.77H11a5.52,5.52,0,1,0-11,0Z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          onChange={(e) =>
                            dispatch({
                              type: "emailChange",
                              value: e.target.value,
                            })
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
                      <label>
                        <span>Password</span>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="icon-container">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 12.6 13.59"
                              >
                                <defs>
                                  <style></style>
                                </defs>
                                <title>Asset 4</title>
                                <g id="Layer_2" data-name="Layer 2">
                                  <g id="Layer_1-2" data-name="Layer 1">
                                    <path
                                      class="cls-1"
                                      d="M4.31,3.09A2.34,2.34,0,0,1,9,3.09h.75a3.09,3.09,0,0,0-6.18,0Z"
                                    />
                                    <path
                                      class="cls-1"
                                      d="M10.27,13.22v-.38H2.33A1.58,1.58,0,0,1,.75,11.26V5.53A1.58,1.58,0,0,1,2.33,4h7.94a1.58,1.58,0,0,1,1.58,1.58v5.73a1.58,1.58,0,0,1-1.58,1.58v.75a2.33,2.33,0,0,0,2.33-2.33V5.53A2.33,2.33,0,0,0,10.27,3.2H2.33A2.33,2.33,0,0,0,0,5.53v5.73a2.33,2.33,0,0,0,2.33,2.33h7.94Z"
                                    />
                                    <polyline
                                      class="cls-1"
                                      points="5.93 7.17 5.93 10.78 6.68 10.78 6.68 7.17"
                                    />
                                    <path
                                      class="cls-1"
                                      d="M7.05,7.92H6.68a.38.38,0,1,1-.75,0,.38.38,0,0,1,.75,0h.75A1.13,1.13,0,1,0,6.3,9.05,1.13,1.13,0,0,0,7.43,7.92Z"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <input
                            type={state.password.type}
                            className="form-control"
                            onChange={(e) =>
                              dispatch({
                                type: "passwordChange",
                                value: e.target.value,
                              })
                            }
                            value={state.password.value}
                          />
                          <div className="input-group-append">
                            <div className="icon-container">
                              <svg
                                onClick={togglePassword}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {state.password.hasErrors && (
                          <p className="error-msg">{state.password.message}</p>
                        )}
                      </label>
                      <div className="input-group align-items-center">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) =>
                            dispatch({
                              type: "rememberMeChange",
                              value: e.target.value,
                            })
                          }
                        />
                        <span>remember me</span>
                      </div>
                      <div className="text-box d-flex justify-content-end my-3">
                        <Link to="/forgotPassword"> Forgot Password? </Link>
                      </div>
                      <CSSTransition
                        in={state.error}
                        timeout={330}
                        classNames="liveValidateMessage"
                        unmountOnExit
                      >
                        <p className="error-msg">{state.error}</p>
                      </CSSTransition>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary btn-large">
                        Login
                      </button>
                      <div className="text-box my-3">
                        <p>or Login With</p>
                      </div>
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
        </div>
      </div>

      {/* <Container maxWidth={1220} sx={{ display: "flex" }}>
        <Grid container>
          <Grid
            item
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Card sx={{ minWidth: 275, width: 275 }}>
              <CardHeader
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
                titleStyle={{ textAlign: "center" }}
              />
              <CardContent>
                <TextField
                  id="outlined"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  mb={3}
                />
                <TextField
                  id="outlined"
                  label="password"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
              </CardContent>
              <CardActionArea>
                <Button variant="outlined">Sign up</Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container> */}
    </div>
  )
}

export default Login
