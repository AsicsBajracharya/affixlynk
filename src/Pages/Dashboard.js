import React, { useEffect } from "react"
import { Link, Route, Switch, useHistory } from "react-router-dom"
import axios from "axios"
//components
import Sidebar from "../Components/Sidebar"
import AppHeader from "./Dashboard/AppHeader"
//assets

import Settings from "./Settings"
import ChangePasswordAdmin from "./ChangePasswordAdmin"
import Page from "./Page"
import DashboardProfile from "./DashbaordProfile"
import DashboardMain from "./Dashboard/DashboardMain."
import CreatePage from "./Dashboard/Page/CreatePage"
import EditPage from "./Dashboard/Page/EditPage"
import Loader from "../Components/Loader"
//CONTEXTS
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useContext } from "react"
import { useState } from "react"
import ManagePage from "./Dashboard/Page/ManagePage"

function Dashboard() {
  const history = useHistory()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [userData, setUserData] = useState()
  //fetch users role
  const token = appState.user.data.token
  const uid = appState.user.data.user_id
  function signOut() {
    console.log("clicked")
    appDispatch({ type: "signOut" })
    history.push("/login")
  }

  //redirect if there is no token and userid
  useEffect(() => {
    console.log(
      "this effect ran from the dashboard component to redirec ththe suer"
    )
    if (!token || !uid) {
      history.push("/login")
    }
  }, [])

  useEffect(() => {
    if (token && uid) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/users/${uid}`,
            config
          )
          console.log(response.data)
          if (response.data) {
            setUserData(response.data)
            appDispatch({ type: "setUserRoles", value: response.data })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token, uid])
  useEffect(() => {
    console.log("this effect ran")
    if (token && uid) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/users`,
            config
          )
          console.log(response.data)
          if (response.data) {
            appDispatch({ type: "setUsersList", value: response.data })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token, uid])

  if (!appState.userRoles) {
    return <Loader />
  }
  return (
    <div className="dashboard-outer-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-inner-container">
        <AppHeader />
        <Switch>
          <Route path="/admin/dashboard" exact>
            <DashboardMain />
          </Route>
          <Route path="/admin/dashboard/settings" exact>
            <Settings />
          </Route>
          <Route path="/admin/dashboard/changePassword" exact>
            <ChangePasswordAdmin />
          </Route>
          <Route path="/admin/dashboard/profile" exact>
            <DashboardProfile />
          </Route>
          <Route path="/admin/dashboard/page" exact>
            <Page />
          </Route>
          <Route path="/admin/dashboard/page/create" exact>
            <CreatePage />
          </Route>
          <Route path="/admin/dashboard/page/edit/:id" exact>
            <EditPage />
          </Route>
          <Route path="/admin/dashboard/page/manage/:id" exact>
            <ManagePage />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
