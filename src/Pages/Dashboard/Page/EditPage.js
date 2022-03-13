import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import StateContext from "../../../StateContext"
import DispatchContext from "../../../DispatchContext"
import { useContext } from "react"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import Loader from "../../../Components/Loader"
function EditPage() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const { id } = useParams()
  const history = useHistory()
  const [userList, setUserList] = useState()
  const [pageData, setPageData] = useState()

  const initialState = {
    user: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
    },
    pageName: {
      value: "",
      hasErrors: false,
      message: "",
    },
    pageType: {
      value: "",
      hasErrors: false,
      message: "",
    },
    pageStatus: {
      value: "",
      hasErrors: false,
      message: "",
    },
    error: null,
    submitCount: 0,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "userChange":
        draft.user.hasErrors = false
        draft.user.value = action.value
        draft.error = null
        return
      // case "emailAfterDelay":
      //   if (!/^\S+@\S+$/.test(draft.email.value)) {
      //     draft.email.hasErrors = true
      //     draft.email.message = "You must provide a valid email address"
      //   }
      //   return
      case "pageNameChange":
        draft.pageName.hasErrors = false
        draft.pageName.value = action.value
        if (!draft.pageName.value.length) {
          draft.pageName.hasErrors = true
          draft.pageName.message = "Please provide a password"
        }
        return
      case "pageTypeChange":
        draft.pageType.hasErrors = false
        draft.pageType.value = action.value
        return
      case "pageStatusChange":
        draft.pageStatus.hasErrors = false
        draft.pageStatus.value = action.value
        return
      case "submitForm":
        draft.submitCount++
        return
      case "setError":
        draft.error = action.value
        return
      case "submitForm":
        draft.submitCount++
        return
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  //fetch users List
  const token = appState.user.data.token
  useEffect(() => {
    if (token) {
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
            setUserList(response.data)
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token])

  //fetch individial page data
  useEffect(() => {
    if (token) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/pages/${id}`,
            config
          )
          console.log(response.data)
          if (response.data) {
            setPageData(response.data)
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token])
  //set values to fields
  useEffect(() => {
    if (pageData) {
      dispatch({ type: "pageNameChange", value: pageData.data.name })
      dispatch({ type: "pageTypeChange", value: pageData.data.type })
      dispatch({ type: "pageStatusChange", value: pageData.data.active })
    }
  }, [pageData])
  //submit form
  useEffect(() => {
    // console.log("email", state.email.value, "password", state.password.value)
    if (state.submitCount) {
      const ourRequest = axios.CancelToken.source()
      const uid = appState.user.data.user_id
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function login() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/pages/${id}`,
            {
              name: state.pageName.value,
              type: state.pageType.value,
              active: state.pageStatus.value,
              user_id: uid,
            },
            config,
            { cancelToken: ourRequest.token }
          )

          console.log("response.data.login", response)
          if (response.data) {
            history.push("/dashboard/page")
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

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "submitForm" })
  }

  if (!state.pageData) {
    return <Loader />
  }
  return (
    <div className="dashboard-content-container">
      <Link to="/dashboard/page">&larr; back</Link>
      <div className="card">
        <div className="card-header">
          <h2>Edit</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {appState.userRoles &&
              appState.userRoles.data.roles[0].name == "super_admin" && (
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    dispatch({ type: "userChange", value: e.target.value })
                  }
                  value={state.user.value}
                >
                  {appState.userList &&
                    appState.userList.data.map((item, i) => {
                      return <option value={item.email}>{item.name}</option>
                    })}
                </select>
              )}
            <label>
              Name
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({ type: "pageNameChange", value: e.target.value })
                }
                value={state.pageName.value}
              />
            </label>
            <label>
              Type
              <select
                name=""
                id=""
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({ type: "pageTypeChange", value: e.target.value })
                }
                value={state.pageType.value}
              >
                <option value="">Select page Type</option>
                <option value="bioLink">BioLink</option>
                <option value="links">Links</option>
                <option value="profile">Profile</option>
                <option value="subpage">Sub Page</option>
              </select>
            </label>
            <label>
              Active
              <select
                name=""
                id=""
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({ type: "pageStatusChange", value: e.target.value })
                }
                value={state.pageStatus.value}
              >
                <option value="">Set status</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Edit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPage
