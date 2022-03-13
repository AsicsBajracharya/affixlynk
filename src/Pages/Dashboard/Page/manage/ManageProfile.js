import React, { useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import { useImmerReducer } from "use-immer"
import axios from "axios"
import StateContext from "../../../../StateContext"
import avatar from "../../../../images/avatar.png"
import { CSSTransition } from "react-transition-group"
function ManageProfile() {
  const appState = useContext(StateContext)
  const inputRef = useRef()
  const triggerPopup = () => inputRef.current.click()
  const [displayPicture, setDisplayPicture] = useState(
    `${process.env.REACT_APP_BASE_URL}/images/${appState.userRoles.data.personal_information[0].image}`
  )
  const { id } = useParams()
  const initialState = {
    logo: {
      value: "",
      hasErrors: false,
      message: "",
      required: true,
      file: avatar,
    },
    type: {
      value: "profile",
      hasErrors: false,
      message: "",
      required: true,
    },
    companyAddress: {
      value: "",
      hasErrors: false,
      message: "",
    },
    designation: {
      value: "",
      hasErrors: false,
      message: "",
      file: null,
    },
    pageData: {},
    touched: false,
    submitCount: 0,
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setPageData":
        draft.pageData = action.value
        return
      case "setCompanyAddress":
        draft.companyAddress.value = action.value
        return
      case "setDesignation":
        draft.designation.value = action.value
        return
      case "logoChange":
        draft.touched = true
        draft.logo.file = action.value
        return
      case "imageAsFile":
        draft.logo.file = action.value
        return
      case "typeChange":
        draft.type.hasErrors = false
        draft.type.value = action.value
        return
      case "companyAddressChange":
        draft.touched = true
        draft.companyAddress.hasErrors = false
        draft.companyAddress.value = action.value
        if (draft.companyAddress.value.length > 250) {
          draft.companyAddress.hasErrors = true
          draft.companyAddress.message =
            "companyAddress mustn't contatin more than 250 characters"
        }
        return
      case "companyAddressAfterDelay":
        if (draft.companyAddress.value.length < 3) {
          draft.companyAddress.hasErrors = true
          draft.companyAddress.message =
            "companyAddress must be at lest 3 characters"
        }
        return
      case "designationChange":
        draft.touched = true
        draft.designation.hasErrors = false
        draft.designation.value = action.value
        if (draft.designation.value.length > 250) {
          draft.designation.hasErrors = true
          draft.designation.message =
            "designation mustn't contatin more than 250 characters"
        }
        return
      case "designationAfterDelay":
        if (draft.designation.value.length < 3) {
          draft.designation.hasErrors = true
          draft.designation.message =
            "companyAddress must be at lest 3 characters"
        }
        return
      case "fetchImage":
        return
      case "submitForm":
        if (
          !draft.logo.hasErrors &&
          !draft.companyAddress.hasErrors &&
          !draft.designation.hasErrors
        ) {
          draft.submitCount++
        }

        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  //fetch individial page data
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
            `${process.env.REACT_APP_BASE_URL}/api/pages/${id}`,
            config
          )
          console.log(response.data)
          if (response.data) {
            dispatch({ type: "setPageData", value: response.data })
            dispatch({
              type: "setCompanyAddress",
              value: response.data.data.page.map.content.company_address,
            })
            dispatch({
              type: "setDesignation",
              value: response.data.data.page.map.content.designation,
            })
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
            dispatch({ type: "setPageData", value: response.data })
            dispatch({
              type: "setValue",
              value: response.data.data.page.map.content.url,
            })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token])

  //submit from
  useEffect(() => {
    if (state.submitCount) {
      const token = appState.user.data.token
      if (state.checkCount && token) {
        const ourRequest = axios.CancelToken.source()
        let formData = new FormData()
        formData.append("type", state.type.value)
        formData.append("company_address", state.companyAddress)
        formData.append("designation", state.designation.value)
        formData.append("page_id", state.pageData.data.page.id)
        formData.append("logo", state.logo.file)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
        async function signUp() {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/users/info`,
              formData,
              config,
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
    }
  }, [state.submitCount])

  function setPicture(e) {
    if (e.target.files && e.target.files.length > 0) {
      dispatch({ type: "imageAsFile", value: e.target.files[0] })
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener("load", () => {
        setDisplayPicture(reader.result)
        dispatch({ type: "logoChange", value: reader.result })
      })
    }
  }
  function submitForm(e) {
    e.preventDefault()
    dispatch({ type: "submitForm" })
  }

  return (
    <div className="dashboard-content-container">
      <Link to="/dashboard/page">&larr; back</Link>
      <div className="card">
        <div className="card-header">
          <h2>Manage</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submitForm}>
            <div className="profile-image d-flex">
              <div className="left">
                <div className="image-container">
                  <img src={displayPicture ? displayPicture : avatar} alt="" />
                </div>
                <input
                  type="file"
                  name=""
                  id=""
                  className="form-control"
                  onChange={setPicture}
                  ref={inputRef}
                />
                {/* <div className="change-overlay" onClick={triggerPopup}>
                change
              </div> */}
              </div>
              <div className="right">
                <h4>Profile Image</h4>
                <span>image name here</span>
                <div className="button-container">
                  <span className="btn btn-primary" onClick={triggerPopup}>
                    Change Profile Image
                  </span>
                </div>
              </div>
            </div>
            <label>
              Company Address
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({
                    type: "companyAddressChange",
                    value: e.target.value,
                  })
                }
                value={state.companyAddress.value}
              />
            </label>
            <label>
              Designation
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) =>
                  dispatch({
                    type: "designationChange",
                    value: e.target.value,
                  })
                }
                value={state.designation.value}
              />
            </label>
            <button className="btn btn-primary" disabled={!state.touched}>
              Update
            </button>
          </form>

          {/* <label>
            Type
            <select
              name=""
              id=""
              className="form-control"
              required
              onChange={(e) =>
                dispatch({ type: "typeChange", value: e.target.value })
              }
              value={state.type.value}
            >
              <option value="">Select page Type</option>
              <option value="bioLink">BioLink</option>
              <option value="links">Links</option>
              <option value="profile">Profile</option>
              <option value="subpage">Sub Page</option>
            </select>
          </label> */}
        </div>
      </div>
    </div>
  )
}

export default ManageProfile
