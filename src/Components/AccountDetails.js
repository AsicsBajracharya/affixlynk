import React, { useEffect } from "react"

function AccountDetails() {
  return (
    <div className="card account-details-card">
      <div className="card-body">
        <div className="item">
          <p>Total Members</p>
          <p>1600</p>
        </div>
        <div className="item">
          <p>Total Visits</p>
          <p>45345</p>
        </div>
        <div className="item">
          <p>Today's visits</p>
          <p>1029</p>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails
