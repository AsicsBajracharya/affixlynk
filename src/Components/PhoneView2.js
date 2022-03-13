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
            {props.linkList &&
              props.linkList.map((item, i) => {
                return (
                  <div className="social-media" key={i}>
                    <div className="icon-container">
                      <img src={phone} alt="" />
                    </div>
                    <div className="text-container">
                      <p>{item.title}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PhoneView
