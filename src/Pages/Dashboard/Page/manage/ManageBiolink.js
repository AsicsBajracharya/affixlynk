import React, { useEffect, useRef, useState } from "react"
import { useImmerReducer } from "use-immer"
import { useParams } from "react-router-dom"
import StateContext from "../../../../StateContext"
import PhoneView from "../../../../Components/PhoneView"
import axios from "axios"
import { useContext } from "react"
import { propTypes } from "react-bootstrap/esm/Image"
import avatar from "../../../../images/SVG/avatar.svg"
import Checkbox from "@mui/material/Checkbox"
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
    phone: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    viber: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    whatsapp: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    messenger: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    facebook: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    youtube: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    instagram: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    tiktok: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    website: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    email: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    linkedin: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    twitter: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
    },
    contact: {
      value: "",
      isChecked: false,
      hasErrors: false,
      message: "",
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
      case "phoneChecked":
        draft.phone.isChecked = action.value
        return
      case "phoneCheckedWithButton":
        console.log("this dispatch was hit when clicked the button")
        return
      case "phoneChange":
        draft.phone.value = action.value
        return
      case "viberChecked":
        draft.viber.isChecked = action.value
        return
      case "viberChange":
        draft.viber.value = action.value
        return
      case "whatsappChecked":
        draft.whatsapp.isChecked = action.value
        return
      case "whatsappChange":
        draft.whatsapp.value = action.value
        return
      case "messengerChecked":
        draft.messenger.isChecked = action.value
        return
      case "messengerChange":
        draft.messenger.value = action.value
        return
      case "facebookChecked":
        draft.facebook.isChecked = action.value
        return
      case "facebookChange":
        draft.facebook.value = action.value
        return
      case "youtubeChecked":
        draft.youtube.isChecked = action.value
        return
      case "youtubeChange":
        draft.youtube.value = action.value
        return
      case "instagramChecked":
        draft.instagram.isChecked = action.value
        return
      case "instagramChange":
        draft.instagram.value = action.value
        return
      case "tiktokChecked":
        draft.tiktok.isChecked = action.value
        return
      case "tiktokChange":
        draft.tiktok.value = action.value
        return
      case "websiteChecked":
        draft.website.isChecked = action.value
        return
      case "websiteChange":
        draft.website.value = action.value
        return
      case "emailChecked":
        draft.email.isChecked = action.value
        return
      case "emailChange":
        draft.email.value = action.value
        return
      case "linkedinChecked":
        draft.linkedin.isChecked = action.value
        return
      case "linkedinChange":
        draft.linkedin.value = action.value
        return
      case "twitterChecked":
        draft.twitter.isChecked = action.value
        return
      case "twitterChange":
        draft.twitter.value = action.value
        return
      case "contactChecked":
        draft.contact.isChecked = action.value
        return
      case "contactChange":
        draft.contact.value = action.value
        return
      case "personNameChecked":
        draft.name.isChecked = action.value
        return
      case "nameChange":
        console.log("this reducer was hit at name change")
        draft.name.value = action.value
        return
      case "introChecked":
        draft.intro.value = action.value
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
      case "submitForm":
        draft.submitCount++
        return
      case "setSuccess":
        draft.setSuccess = "updates saved successfully"
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

    switch (dataFor) {
      case "phone":
        dispatch({ type: "phoneChecked", value: e.target.checked })
        return
      case "viber":
        dispatch({ type: "viberChecked", value: e.target.checked })
        return
      case "whatsapp":
        dispatch({ type: "whatsappChecked", value: e.target.checked })
        return
      case "messenger":
        dispatch({ type: "messengerChecked", value: e.target.checked })
        return
      case "facebook":
        dispatch({ type: "facebookChecked", value: e.target.checked })
        return
      case "youtube":
        dispatch({ type: "youtubeChecked", value: e.target.checked })
        return
      case "instagram":
        dispatch({ type: "instagramChecked", value: e.target.checked })
        return
      case "tiktok":
        dispatch({ type: "tiktokChecked", value: e.target.checked })
        return
      case "website":
        dispatch({ type: "websiteChecked", value: e.target.checked })
        return
      case "email":
        dispatch({ type: "emailChecked", value: e.target.checked })
        return
      case "linkedin":
        dispatch({ type: "linkedinChecked", value: e.target.checked })
        return
      case "twitter":
        dispatch({ type: "twitterChecked", value: e.target.checked })
        return
      case "contact":
        dispatch({ type: "contactChecked", value: e.target.checked })
        return
      default:
        return
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
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "phone" }}
                              checked={state.phone.isChecked}
                            />
                            Phone
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={!state.phone.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "phoneChange",
                                value: e.target.value,
                              })
                            }
                            value={state.phone.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "viber" }}
                              checked={state.viber.isChecked}
                            />
                            viber
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={!state.viber.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "viberChange",
                                value: e.target.value,
                              })
                            }
                            value={state.viber.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "whatsapp" }}
                              checked={state.whatsapp.isChecked}
                            />
                            whatsapp
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.whatsapp.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "whatsappChange",
                                value: e.target.value,
                              })
                            }
                            value={state.whatsapp.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "messenger" }}
                              checked={state.messenger.isChecked}
                            />
                            messenger
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.messenger.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "messengerChange",
                                value: e.target.value,
                              })
                            }
                            value={state.messenger.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "facebook" }}
                              checked={state.facebook.isChecked}
                            />
                            facebook
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.facebook.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "facebookChange",
                                value: e.target.value,
                              })
                            }
                            value={state.facebook.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "youtube" }}
                              checked={state.youtube.isChecked}
                            />
                            youtube
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.youtube.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "youtubeChange",
                                value: e.target.value,
                              })
                            }
                            value={state.youtube.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "instagram" }}
                              checked={state.instagram.isChecked}
                            />
                            instagram
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.instagram.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "instagramChange",
                                value: e.target.value,
                              })
                            }
                            value={state.instagram.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "tiktok" }}
                              checked={state.tiktok.isChecked}
                            />
                            tiktok
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.tiktok.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "tiktokChange",
                                value: e.target.value,
                              })
                            }
                            value={state.tiktok.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "website" }}
                              checked={state.website.isChecked}
                            />
                            website
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.website.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "websiteChange",
                                value: e.target.value,
                              })
                            }
                            value={state.website.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "email" }}
                              checked={state.email.isChecked}
                            />
                            email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.email.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "emailChange",
                                value: e.target.value,
                              })
                            }
                            value={state.email.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "linkedin" }}
                              checked={state.linkedin.isChecked}
                            />
                            linkedin
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.linkedin.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "linkedinChange",
                                value: e.target.value,
                              })
                            }
                            value={state.linkedin.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "twitter" }}
                              checked={state.twitter.isChecked}
                            />
                            twitter
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.twitter.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "twitterChange",
                                value: e.target.value,
                              })
                            }
                            value={state.twitter.value}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="input-group">
                          <label>
                            <Checkbox
                              onChange={handleCheckBox}
                              inputProps={{ "data-for": "contact" }}
                              checked={state.contact.isChecked}
                            />
                            contact
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled={!state.contact.isChecked}
                            onChange={(e) =>
                              dispatch({
                                type: "contactChange",
                                value: e.target.value,
                              })
                            }
                            value={state.contact.value}
                          />
                        </div>
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
                showPhone={state.phone.isChecked}
                showViber={state.viber.isChecked}
                showWhatsapp={state.whatsapp.isChecked}
                showMessenger={state.messenger.isChecked}
                showFacebook={state.facebook.isChecked}
                showYoutube={state.youtube.isChecked}
                showInstagram={state.instagram.isChecked}
                showtiktok={state.tiktok.isChecked}
                showWebsite={state.website.isChecked}
                showEmail={state.email.isChecked}
                showLinkedin={state.linkedin.isChecked}
                showTwitter={state.twitter.isChecked}
                showContact={state.contact.isChecked}
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
