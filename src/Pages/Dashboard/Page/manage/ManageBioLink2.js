import React, { useEffect, useRef, useState } from "react"
import { useImmerReducer } from "use-immer"
import { useParams } from "react-router-dom"
import StateContext from "../../../../StateContext"
import PhoneView from "../../../../Components/PhoneView2"
import axios from "axios"
import { useContext } from "react"
import avatar from "../../../../images/SVG/avatar.svg"
import Checkbox from "@mui/material/Checkbox"
import AddIcon from "../../../../images/1x/addIcon.png"
import EditIcon from "../../../../images/1x/editIcon.png"
import DeleteIcon from "../../../../images/1x/deleteIcon.png"
function ManageBioLink() {
  const appState = useContext(StateContext)
  const { id } = useParams()
  const inputRef = useRef()
  const [displayPicture, setDisplayPicture] = useState(
    `${process.env.REACT_APP_BASE_URL}/images/${appState.userRoles.data.personal_information[0].image}`
  )

  const initialState = {
    image: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
      file: null,
    },
    name: {
      value: appState.userRoles.data.personal_information[0].full_name,
      isChecked: true,
      hasErrors: false,
      message: "",
    },
    intro: {
      value: appState.userRoles.data.personal_information[0].intro,
      isChecked: true,
      hasErrors: false,
      message: "",
    },
    order: [],
    submitCount: 0,
    success: "",
    linkList: [],
    currentLinkId: 0,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "imageAsFile":
        console.log("this reducer was hit on sending image as a")
        draft.image.file = action.value
        return
      case "imageAsData":
        draft.image.value = action.value
        return

      case "nameChange":
        console.log("this reducer was hit at name change")
        draft.name.value = action.value
        return
      case "introChange":
        draft.intro.value = action.value
        return
      case "addItem":
        if (!draft.order.includes(action.value)) {
          draft.order.push(action.value)
        }
        return
      case "removeItem":
        const index = draft.order.indexOf(action.value)
        if (index > -1) {
          draft.order.splice(index, 1)
        }
        return
      case "titleChange":
        draft.linkList.map((item, i) => {
          if (item.id === action.id) {
            item.title = action.value
            item.touched = true
          }
        })
        return
      case "linkChange":
        draft.linkList.map((item, i) => {
          if (item.id === action.id) {
            item.link = action.value
            item.touched = true
          }
        })
        return
      case "deleteLink":
        draft.linkList.map((item, i) => {
          if (item.id === action.id) {
            draft.linkList.splice(i, 1)
          }
        })
        return
      case "submitForm":
        draft.submitCount++
        return
      case "setSuccess":
        draft.setSuccess = "updates saved successfully"
        return
      case "addLink":
        draft.linkList.push({
          id: draft.currentLinkId,
          title: "Link title Here",
          link: "Link here",
          touched: false,
        })
        draft.currentLinkId++
        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  function handleCheckBox(e) {
    e.preventDefault()
    console.log(e.target.checked)
    const dataFor = e.target.attributes.getNamedItem("data-for").value
    if (e.target.checked) {
      dispatch({
        type: "addItem",
        value: e.target.attributes.getNamedItem("data-for").value,
      })
    } else {
      dispatch({
        type: "removeItem",
        value: e.target.attributes.getNamedItem("data-for").value,
      })
    }
  }
  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = axios.CancelToken.source()
      const uid = appState.user.data.user_id
      const token = appState.user.data.token
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function login() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/pages/manage`,
            {
              page_id: uid,
              phone: state.phone.value,
              viber: state.viber.value,
              whatsapp: state.whatsapp.value,
              messenger: state.messenger.value,
              facebook: state.facebook.value,
              youtube: state.youtube.value,
              instagram: state.instagram.value,
              tiktok: state.tiktok.value,
              website: state.website.value,
              email: state.email.value,
              linkedin: state.phone.value,
              twitter: state.twitter.value,
              contact: state.contact.value,
              type: "bio-link",
              name: state.name.value,
              intro: state.intro.value,
            },
            config,
            { cancelToken: ourRequest.token }
          )

          console.log("response.data.managebio link", response)
          if (response.data) {
            dispatch({ type: "setSuccess" })
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
  //trigger popup
  const triggerPopup = () => inputRef.current.click()
  //set picture both as data and  file
  function setPicture(e) {
    if (e.target.files && e.target.files.length > 0) {
      console.log("before set picture")
      dispatch({ type: "imageAsFile", value: e.target.files[0] })
      console.log("afttter seimage")
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener("load", () => {
        setDisplayPicture(reader.result)
        dispatch({ type: "imageAsData", value: reader.result })
      })
    }
  }
  function handleAddLink() {
    dispatch({ type: "addLink" })
  }
  function handleDelete(id) {
    dispatch({ type: "deleteLink", id: id })
  }
  function handleSubmit(e) {
    e.preventDefault()
    //validations here

    dispatch({ type: "submitForm" })
  }

  return (
    <>
      <div className="dashboard-inner-container manage-biolink">
        <h2>Manage biolink</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="card-container">
                <div className="card card-primary card-manage-biolink">
                  <div className="card-header">
                    <h2>Manage Biolink</h2>
                  </div>
                  <div className="content-container">
                    <form onSubmit={handleSubmit}>
                      <div className="profile-image d-flex">
                        <div className="left">
                          <div className="image-container">
                            <img
                              src={displayPicture ? displayPicture : avatar}
                              alt=""
                            />
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
                            <span
                              className="btn btn-primary"
                              onClick={triggerPopup}
                            >
                              Change Profile Image
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>name</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              dispatch({
                                type: "nameChange",
                                value: e.target.value,
                              })
                            }
                            value={state.name.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>intro</label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            className="form-control"
                            onChange={(e) =>
                              dispatch({
                                type: "introChange",
                                value: e.target.value,
                              })
                            }
                            value={state.intro.value}
                          ></textarea>
                        </div>
                      </div>
                      <div className="button-container">
                        <span
                          className="btn btn-primary"
                          onClick={handleAddLink}
                        >
                          Add Link
                        </span>
                      </div>
                      <div className="links-container-biolink">
                        {state.linkList &&
                          state.linkList.map((item, i) => {
                            return (
                              <div key={i} className="item" data-id={item.id}>
                                <div className="left">
                                  <div className="icon-container">
                                    <img src={AddIcon} alt="" />
                                  </div>
                                </div>
                                <div className="right">
                                  <div className="text-box">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.title}
                                      onChange={(e) =>
                                        dispatch({
                                          type: "titleChange",
                                          value: e.target.value,
                                          id: item.id,
                                        })
                                      }
                                      data-id={item.id}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={item.link}
                                      onChange={(e) =>
                                        dispatch({
                                          type: "linkChange",
                                          value: e.target.value,
                                          id: item.id,
                                        })
                                      }
                                    />
                                    {state.linkList &&
                                      state.linkList.map((link, i) => {
                                        if (
                                          link.id === item.id &&
                                          link.touched === true
                                        ) {
                                          return (
                                            <div className="edit-icon-container">
                                              <img src={DeleteIcon} alt="" />
                                            </div>
                                          )
                                        }
                                        return <></>
                                      })}

                                    <div
                                      className="delete-icon-container"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <img src={EditIcon} alt="" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                      <div className="button-container my-3">
                        <button className=" btn btn-primary">Submit</button>
                      </div>
                    </form>
                    {state.setSuccess && <p>{state.setSuccess}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 offset-md-2">
              <PhoneView
                image={displayPicture}
                name={state.name.value}
                intro={state.intro.value}
                linkList={state.linkList}
                showItems={state.order}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageBioLink
