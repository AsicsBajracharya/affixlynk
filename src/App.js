import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"
//components
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import { green, purple } from "@mui/material/colors"
import ForgotPassword from "./Pages/ForgPassword"
import ResetPassword from "./Pages/ResetPassword"

const theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
})
function App() {
  const history = useHistory()
  const initialState = {
    userLoggedIn: Boolean(localStorage.getItem("nfcToken")),
    user: {
      data: {
        token: localStorage.getItem("nfcToken"),
        user_id: localStorage.getItem("nfcUid"),
      },
    },
    userRoles: "",
    userList: null,
    pages: null,
    activeMenu: "",
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.user = action.value
        draft.userLoggedIn = true
        return
      case "signOut":
        draft.userLoggedIn = false
        return
      case "setUserRoles":
        draft.userRoles = action.value
        return
      case "setUsersList":
        draft.userList = action.value
        return
      case "loadPages":
        draft.pages = action.value
        return
      case "activeMenu":
        draft.activeMenu = action.value
        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.userLoggedIn) {
      console.log("userlogged in ")
      localStorage.setItem("nfcToken", state.user.data.token)
      localStorage.setItem("nfcUid", state.user.data.user_id)
    } else {
      console.log("user logged out")
      localStorage.removeItem("nfcToken")
      localStorage.removeItem("nfcUid")
    }
  }, [state.userLoggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <Signup />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/forgotPassword" exact>
                <ForgotPassword />
              </Route>
              <Route path="/password/reset" exact>
                <ResetPassword />
              </Route>
              <Route path="/admin/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
