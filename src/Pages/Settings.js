import React, { useEffect } from "react"
import { Link } from "react-router-dom"
function Settings() {
  return (
    <>
      settings page header
      <Link to="/dashboard/changePassword"> change password here</Link>
    </>
  )
}

export default Settings
