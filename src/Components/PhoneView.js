import React, { useEffect } from "react"
import iphone from "../images/SVG/phone.svg"
import avatar from "../images/avatar.png"
import { Link } from "react-router-dom"
import phone from "../images/call.png"
import facebook from "../images/facebook.png"
function PhoneView(props) {
  return (
    <>
      <div className="phone-container">
        <div className="image-container">
          <img src={iphone} alt="" />
        </div>
        <div className="content-container">
          <div className="profile">
            <div className="image-container">
              <img src={props.image} alt="" />
            </div>
            <div className="text-box">
              <h2>{props.name}</h2>
              <div className="intro">
                <p>{props.intro}</p>
              </div>
            </div>
          </div>
          <div className="social-media-container">
            {props.showItems &&
              props.showItems.map((item, i) => {
                switch (item) {
                  case "phone":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={phone} alt="" />
                        </div>
                        <div className="text-containe">
                          <p>Call Me</p>
                        </div>
                      </div>
                    )
                  case "facebook":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>Call Me</p>
                        </div>
                      </div>
                    )
                  case "viber":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>viber</p>
                        </div>
                      </div>
                    )
                  case "whatsapp":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>whatsapp</p>
                        </div>
                      </div>
                    )
                  case "messenger":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>messenger</p>
                        </div>
                      </div>
                    )
                  case "youtube":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>youtube</p>
                        </div>
                      </div>
                    )
                  case "instagram":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>instagram</p>
                        </div>
                      </div>
                    )
                  case "tiktok":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>tiktok</p>
                        </div>
                      </div>
                    )
                  case "website":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>website</p>
                        </div>
                      </div>
                    )
                  case "email":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>email</p>
                        </div>
                      </div>
                    )
                  case "linkedin":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>linkedin</p>
                        </div>
                      </div>
                    )
                  case "twitter":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>twitter</p>
                        </div>
                      </div>
                    )
                  case "contact":
                    return (
                      <div className="social-media">
                        <div className="icon-container">
                          <img src={facebook} alt="" />
                        </div>
                        <div className="text-container">
                          <p>contact</p>
                        </div>
                      </div>
                    )
                  default:
                    return
                }
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PhoneView
