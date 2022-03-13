import React, { useEffect, useState } from "react"
import { useContext } from "react"
import StateContext from "../StateContext"
import QRCode from "react-qr-code"
import { CSSTransition } from "react-transition-group"
function MasterLink() {
  const appState = useContext(StateContext)
  const [showQr, setShowQr] = useState(false)
  const [copy, setCopy] = useState("Copy")
  function showQrBox() {
    setShowQr(true)
  }
  function hideQr() {
    setShowQr(false)
  }
  function copyText() {
    navigator.clipboard.writeText(
      `https://affixlynk.com/${appState.userRoles.data.master_link}`
    )
    setCopy("Copied")
  }
  return (
    <>
      <div className="card master-card">
        <div className="card-body">
          <h2>MASTER LINK</h2>

          <div className="text-box">
            <p>Affix Card No: {appState.userRoles.data.master_link}</p>
          </div>
          <div className="button-group d-flex">
            <div className="button-container">
              <button className="btn btn-primary" onClick={showQrBox}>
                Create QR
              </button>
            </div>
            <div className="button-container">
              <button className="btn btn-primary" onClick={copyText}>
                {copy}
              </button>
            </div>
            <div className="button-container">
              <button className="btn btn-primary">Analytics</button>
            </div>
          </div>
        </div>
        <CSSTransition
          timeout={330}
          in={showQr}
          classNames="qr-code-container"
          unmountOnExit
        >
          <div className="qr-code-container">
            <div className="overlay"></div>
            <div className="qr-code-inner-container">
              <div className="card-header">
                Please Scan
                <span className="close-icon" onClick={hideQr}>
                  &times;
                </span>
              </div>
              <QRCode
                value={`https://affixlynk.com/${appState.userRoles.data.master_link}`}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  )
}

export default MasterLink
