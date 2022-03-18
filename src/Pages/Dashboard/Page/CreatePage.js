import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../../../StateContext"
import DispatchContext from "../../../DispatchContext"
import { useContext } from "react"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import Select from "react-select"
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons"

const pageTypeOptions = [
  { value: "", label: "Select page type" },
  { value: "bio-link", label: "Bio Link" },
  { value: "profile", label: "Profile" },
  { value: "sub-page", label: "Sub Page" },
]
const pageStatusOptions = [
  { value: "", label: "Set Status" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

function CreatePage() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [userList, setUserList] = useState()
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
      // options: [
      //   { value: "", label: "Select page type" },
      //   { value: "biolink", label: "Bio Link" },
      //   { value: "profile", label: "Profile" },
      //   { value: "subpage", label: "Sub Page" },
      // ],
      options: [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ],
    },
    pageStatus: {
      value: "",
      hasErrors: false,
      message: "",
    },
    isPending: false,
    success: null,
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
      case "pending":
        draft.isPending = true
        return
      case "setError":
        draft.isPending = false
        draft.succes = null
        draft.error = action.value
        return
      case "setSuccess":
        draft.isPending = false
        draft.error = null
        draft.success = "Page created Successfully"
        draft.user.value = ""
        draft.pageType.value = ""
        draft.pageStatus.value = ""
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

  useEffect(() => {
    // console.log("email", state.email.value, "password", state.password.value)
    if (state.submitCount) {
      dispatch({ type: "pending" })
      const ourRequest = axios.CancelToken.source()
      const uid = appState.user.data.user_id
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function createPage() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/pages`,
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
            dispatch({ type: "setSuccess" })
          }
        } catch (e) {
          console.log(e, "there was an error")
          // if (e.response.data) {
          //   dispatch({ type: "setError", value: e.response.data.message })
          // }
        }
      }
      createPage()
      return () => ourRequest.cancel()
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "submitForm" })
  }
  return (
    <div className="dashboard-content-container">
      <Link className="btn-back" to="/admin/dashboard/page">
        &larr; back
      </Link>
      <div className="card card-primary">
        <div className="card-header">
          <h2>Create a new Page</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {appState.userRoles &&
              appState.userRoles.data.roles[0].name === "super_admin" && (
                <select
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) =>
                    dispatch({ type: "userChange", value: e.target.value })
                  }
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
              />
            </label>

            <label>
              Type
              <Select
                options={pageTypeOptions}
                onChange={(option) =>
                  dispatch({ type: "pageTypeChange", value: option.value })
                }
              />
            </label>
            <label>
              Active
              <Select
                options={pageStatusOptions}
                onChange={(option) =>
                  dispatch({ type: "pageStatusChange", value: option.value })
                }
              />
              {/* <select
                name=""
                id=""
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({ type: "pageStatusChange", value: e.target.value })
                }
              >
                <option value="">Set status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select> */}
            </label>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" disabled={state.isPending}>
              {" "}
              {state.isPending ? "Loading" : "Create"}
            </button>
          </div>
        </form>
        {state.error && (
          <p className="text-danger text-center">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sucess text-center">{state.success}</p>
        )}
      </div>
    </div>
  )
}

export default CreatePage
