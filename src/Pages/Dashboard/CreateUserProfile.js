import React, { useState, useEffect, useRef } from "react"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import axios from "axios"
import avatar from "../../images/avatar.png"
import StateContext from "../../StateContext"
import { useContext } from "react"

function CreateUserProfile() {
  const appState = useContext(StateContext)
  const inputRef = useRef()
  const triggerPopup = () => inputRef.current.click()
  const [displayPicture, setDisplayPicture] = useState(
    `${process.env.REACT_APP_BASE_URL}/images/${appState.userRoles.data.personal_information[0].image}`
  )

  const initialState = {
    fullName: {
      value: `${appState.userRoles.data.name}`,
      hasErrors: false,
      message: "",
      required: true,
    },
    intro: {
      value: `${appState.userRoles.data.personal_information[0].intro}`,
      hasErrors: false,
      message: "",
    },
    image: {
      value: "",
      hasErrors: false,
      message: "",
      file: null,
    },
    touched: false,
    checkCount: 0,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fullNameChange":
        draft.fullName.hasErrors = false
        draft.fullName.value = action.value
        draft.touched = true
        if (draft.fullName.value.length > 50) {
          draft.fullName.hasErrors = true
          draft.fullName.message =
            "Full Name must be less than 50 characters long"
        }
        return
      case "fullNameAfterDelay":
        if (draft.fullName.value.length < 3) {
          draft.fullName.hasErrors = true
          draft.fullName.message = "Full Name must be atleast 3 characters long"
        }
        return
      case "introChange":
        draft.intro.hasErrors = false
        draft.intro.value = action.value
        draft.touched = true
        if (draft.intro.value.length > 250) {
          draft.intro.hasErrors = true
          draft.intro.message =
            "intro mustn't contatin more than 250 characters"
        }
        return
      case "introAfterDelay":
        if (draft.intro.value.length < 3) {
          draft.intro.hasErrors = true
          draft.intro.message = "intro must be at lest 3 characters"
        }

        return
      case "imageChange":
        draft.image.hasErrors = false
        draft.image.value = action.value
        draft.touched = true
        return
      case "imageAsFile":
        draft.image.file = action.value
        return
      case "imageAfterDelay":
        if (!draft.image.value) {
          draft.image.hasErrors = true
          draft.image.message = "You must provide an image"
        }
        return
      case "submitForm":
        // if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors) {
        //   draft.submitCount++
        // }
        if (
          !draft.fullName.hasErrors &&
          !draft.intro.hasErrors &&
          !draft.image.hasErrors
        ) {
          draft.checkCount++
        }
        return
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function setPicture(e) {
    if (e.target.files && e.target.files.length > 0) {
      dispatch({ type: "imageAsFile", value: e.target.files[0] })
      console.log(e.target, "setpicture function ran")
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener("load", () => {
        setDisplayPicture(reader.result)
        dispatch({ type: "imageChange", value: reader.result })
      })
    }
  }

  useEffect(() => {
    async function fetchPicture() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/images/${appState.userRoles.data.personal_information[0].image}`
        )
        console.log(response)
      } catch (e) {
        console.log("there was an error fetching picture")
      }
    }
    fetchPicture()
  }, [])

  useEffect(() => {
    if (state.fullName.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "fullNameAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.fullName.value])
  useEffect(() => {
    if (state.intro.value) {
      const delay = setTimeout(() => {
        dispatch({ type: "introAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.intro.value])

  useEffect(() => {
    const token = appState.user.data.token
    const uid = appState.user.data.user_id
    console.log("uid", uid)
    if (state.checkCount && token) {
      const ourRequest = axios.CancelToken.source()
      let formData = new FormData()
      formData.append("full_name", state.fullName.value)
      formData.append("user_id", uid)
      formData.append("intro", state.intro.value)
      formData.append("image", state.image.file)
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
  }, [state.checkCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "fullNameChange", value: state.fullName.value })
    dispatch({ type: "fullNameAfterDelay", value: state.fullName.value })
    dispatch({ type: "introChange", value: state.intro.value })
    dispatch({ type: "introAfterDelay", value: state.intro.value })
    dispatch({ type: "imageChange", value: state.image.value })
    dispatch({ type: "imageAfterDelay", value: state.image.value })
    dispatch({ type: "submitForm" })
  }
  return (
    <div className="card profile-card">
      <form onSubmit={handleSubmit}>
        <div className="card-body">
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
          <CSSTransition
            in={state.image.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <p className="error-msg">{state.image.message}</p>
          </CSSTransition>
          <label>
            <span>Full Name</span>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                dispatch({
                  type: "fullNameChange",
                  value: e.target.value,
                })
              }
              value={state.fullName.value}
            />
            <CSSTransition
              in={state.fullName.hasErrors}
              timeout={330}
              classNames="liveValidateMessage"
              unmountOnExit
            >
              <p className="error-msg">{state.fullName.message}</p>
            </CSSTransition>
          </label>
          <label>
            <span>Your Intro</span>
            <textarea
              type="text"
              className="form-control"
              rows="10"
              onChange={(e) =>
                dispatch({
                  type: "introChange",
                  value: e.target.value,
                })
              }
              value={state.intro.value}
            ></textarea>
            <CSSTransition
              in={state.intro.hasErrors}
              timeout={330}
              classNames="liveValidateMessage"
              unmountOnExit
            >
              <p className="error-msg">{state.intro.message}</p>
            </CSSTransition>
          </label>
        </div>
        <div className="card-footer">
          <div className="button-container d-flex justify-content-start">
            <button className="btn btn-primary" disabled={!state.touched}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateUserProfile
