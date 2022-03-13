import React, { useEffect, useState } from "react"
import { useRef } from "react"
import avatar from "../images/avatar.png"
function DashboardProfile() {
  const inputRef = useRef()
  const triggerPopup = () => inputRef.current.click()
  const [displayPicture, setDisplayPicture] = useState(null)
  function setPicture(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener("load", () => {
        setDisplayPicture(reader.result)
      })
    }
  }
  return (
    <div className="signup-form">
      <div className="card">
        <div className="card-header">profile</div>
        <div className="card-body">
          <div className="profile-image">
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
            <div className="change-overlay" onClick={triggerPopup}>
              change
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>
            Full Name: <span>somem tamang</span>
          </p>
          <p>
            Emaile: <span>hanhan@gmail.com</span>
          </p>
          <p>
            phone Number: <span>9890874892</span>
          </p>
          <p>
            Bio:{" "}
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repudiandae fugit nulla quibusdam necessitatibus rem aliquid unde
              amet neque magni fugiat.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfile
