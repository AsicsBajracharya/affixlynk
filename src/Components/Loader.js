import React, { useEffect } from "react"

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-box">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
