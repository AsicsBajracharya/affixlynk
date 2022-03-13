import React, { useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import { useImmerReducer } from "use-immer"
import axios from "axios"
import StateContext from "../../../../StateContext"
import avatar from "../../../../images/avatar.png"
import { CSSTransition } from "react-transition-group"
function ManageLink() {
  const appState = useContext(StateContext)
  const inputRef = useRef()
  const triggerPopup = () => inputRef.current.click()
  const [displayPicture, setDisplayPicture] = useState(null)
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
      value: "",
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

    checkCount: 0,
    sendCount: 0,
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setPageData":
        draft.pageData = action.value
        return
      case "logoChange":
        draft.logo.file = action.value
        return
      case "typeChange":
        draft.type.hasErrors = false
        draft.type.value = action.value
        return
      case "companyAddressChange":
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
      case "setValue":
        draft.companyAddress.value = action.value
        return
      case "submitForm":
        // if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors) {
        //   draft.submitCount++
        // }
        draft.sendCount++

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

  useEffect(() => {
    if (token && state.sendCount) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/pages/manage`,
            {
              page_id: id,
              url: state.companyAddress.value,
              type: "links",
            },
            config
          )
          console.log(response.data)
          if (response.data) {
            dispatch({ type: "setPageData", value: response.data })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token, state.sendCount])

  //set values to fields
  useEffect(() => {
    if (state.pageData) {
      // dispatch({
      //   type: "fetchimage",
      //   value: state.pageData.data.page.map.content.logo_image,
      // })
      // dispatch({ type: "typeChange", value: state.pageData.data.page.type })
      // dispatch({
      //   type: "companyAddressChange",
      //   value: state.pageData.data.page.map.content.company_address,
      // })
      // dispatch({
      //   type: "designationChange",
      //   value: state.pageData.data.page.map.content.designation,
      // })
    }
    // console.log(state.pageData.data.page.map.content.logo_image)
  }, [state.pageData])

  //set values to fields
  //  useEffect(() => {
  //   if (pageData) {
  //     dispatch({ type: "pageNameChange", value: pageData.data.name })
  //     dispatch({ type: "pageTypeChange", value: pageData.data.type })
  //     dispatch({ type: "pageStatusChange", value: pageData.data.active })
  //   }
  // }, [pageData])

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
  function handleSubmit(e) {
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
          <form onSubmit={handleSubmit}>
            <div className="profile-image">
              <div className="image-container">
                <img src={displayPicture ? displayPicture : avatar} alt="" />
              </div>
              <input
                type="file"
                className="form-control"
                onChange={setPicture}
                ref={inputRef}
              />
              <div className="change-overlay" onClick={triggerPopup}>
                change
              </div>
            </div>

            <label>
              Url
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
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManageLink
