import React, { useEffect } from "react"
import { Button, Typography, Grid, CardActionArea } from "@mui/material"
import { useImmerReducer } from "use-immer"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import axios from "axios"
import logo from "../images/1x/logo.png"
import mobile from "../images/1x/mobile-homepage.png"
import cardTop from "../images/1x/card-top.png"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCofee } from "@fortawesome/free-solid-svg-icons"
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@mui/material"
function Signup() {
  const initialState = {
    email: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
    },
    phone: {
      value: "",
      hasErrors: false,
      message: "",
    },
    username: {
      value: "",
      hasErrors: false,
      message: "",
    },
    password: {
      value: "",
      hasErrors: false,
      message: "",
    },
    confirmPassword: {
      value: "",
      hasErrors: false,
      message: "",
    },
    rememberMe: {
      value: "",
      hasErrors: false,
      message: "",
    },
    checkCount: 0,
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailChange":
        draft.email.hasErrors = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "You must provide a valid email address"
        }
        return
      case "usernameChange":
        draft.username.hasErrors = false
        draft.username.value = action.value
        if (draft.username.value.length > 25) {
          draft.username.hasErrors = true
          draft.username.message =
            "Username mustn't contatin more than 50 characters"
        }
        return
      case "usernameAfterDelay":
        if (draft.username.value && draft.username.value.length < 3) {
          draft.username.hasErrors = true
          draft.username.message = "username must be at lest 3 characters"
        }

        return
      case "phoneChange":
        draft.phone.hasErrors = false
        draft.phone.value = action.value
        if (draft.phone.value.length > 10) {
          draft.phone.hasErrors = true
          draft.phone.message = "phone number must not exceed 10 characters"
        }
        return
      case "phoneAfterDelay":
        if (draft.phone.value.length < 10) {
          draft.phone.hasErrors = true
          draft.phone.message = "phone number must be 10 characters"
        }
        return
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
      case "rememberMeChange":
        draft.rememberMe.hasErrors = false
        draft.rememberMe.valule = action.value
      case "submitForm":
        // if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors) {
        //   draft.submitCount++
        // }
        if (
          !draft.username.hasErrors &&
          !draft.email.hasErrors &&
          !draft.phone.hasErrors &&
          !draft.password.hasErrors &&
          !draft.confirmPassword.hasErrors
        ) {
          draft.checkCount++
        }
        return
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "usernameAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.username.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "emailAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])
  useEffect(() => {
    if (state.phone.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "phoneAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.phone.value])

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
    if (state.checkCount) {
      const ourRequest = axios.CancelToken.source()
      async function signUp() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/register`,
            {
              name: state.username.value,
              email: state.email.value,
              active: "yes",
              password: state.password.value,
              c_password: state.confirmPassword.value,
              phone: state.phone.value,
              roles: "super_admin",
            },
            { cancelToken: ourRequest.token }
          )
          console.log("response.data", response.data)
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      signUp()
      return () => ourRequest.cancel()
    }
  }, [state.checkCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "usernameChange", value: state.username.value })
    dispatch({ type: "usernameAfterDelay", value: state.username.value })
    dispatch({ type: "emailChange", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value })
    dispatch({ type: "phoneChange", value: state.phone.value })
    dispatch({ type: "phoneAfterDelay", value: state.phone.value })
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
    <div className="signup-form before-login">
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
                      <h2>Signup</h2>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <label>
                        <span>username</span>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              dispatch({
                                type: "usernameChange",
                                value: e.target.value,
                              })
                            }
                            value={state.username.value}
                          />
                        </div>

                        <CSSTransition
                          in={state.username.hasErrors}
                          timeout={330}
                          classNames="liveValidateMessage"
                          unmountOnExit
                        >
                          <p class="error-msg">{state.username.message}</p>
                        </CSSTransition>
                      </label>

                      <label>
                        <span>Email</span>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            {/* <FontAwesomeIcon icon={faCoffee} /> */}
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
                          <p class="error-msg">{state.email.message}</p>
                        </CSSTransition>
                      </label>
                      <label>
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) =>
                          dispatch({
                            type: "phoneChange",
                            value: e.target.value,
                          })
                        }
                        value={state.phone.value}
                      />
                      <CSSTransition
                        in={state.phone.hasErrors}
                        timeout={330}
                        classNames="liveValidateMessage"
                        unmountOnExit
                      >
                        <p class="error-msg">{state.phone.message}</p>
                      </CSSTransition>

                      <label>
                        <span>Password</span>
                      </label>
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
                        <p class="error-msg">{state.password.message}</p>
                      </CSSTransition>
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
                          <p class="error-msg">
                            {state.confirmPassword.message}
                          </p>
                        </CSSTransition>
                      </label>
                      <label>
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
                          <span>Remember me</span>
                        </div>
                      </label>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary btn-large">
                        Sign up
                      </button>
                      <div className="text-box my-2">
                        <p>Already have an account?</p>
                        <Link to="/login">LOGIN</Link>
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

export default Signup
