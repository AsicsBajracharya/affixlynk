import React, { useContext, useEffect } from "react"
import { useState } from "react"
import StateContext from "../StateContext"
function AccountStatus() {
  const appState = useContext(StateContext)
  const [remaningDays, setRemainingDays] = useState()
  const diffDays = (date, otherDate) =>
    Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24))
  useEffect(() => {
    const createdDate = new Date(appState.userRoles.data.created_at)

    setRemainingDays(diffDays(createdDate, new Date()))
    console.log(createdDate, "created date")
  }, [])
  return (
    <>
      <div className="card status-card">
        <div className="card-body">
          <div className="card-header card-number">
            <h2>ACOUNT STATUS</h2>
            <h1>{365 - remaningDays} days left</h1>
          </div>

          <div className="button-group d-flex justify-content-end">
            {365 - remaningDays == 0 && (
              <div className="button-container">
                <button className="btn btn-primary">Renew</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountStatus
