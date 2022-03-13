import React, { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import StateContext from "../../StateContext"
import CreateUserProfile from "./CreateUserProfile"
import avatar from "../../images/SVG/avatar.svg"
import RedirectLink from "../../Components/RedirectLink"
import MasterLink from "../../Components/MasterLink"
import AccountStatus from "../../Components/AccountStatus"
const linksData = [
  {
    id: 1,
    label: "BioLink",
    link: "http://biolink.com",
  },
  {
    id: 2,
    label: "Social Page",
    link: "http://biolink.com",
  },
  {
    id: 3,
    label: "Downloads",
    link: "http://biolink.com",
  },
  {
    id: 4,
    label: "Leaflet",
    link: "http://biolink.com",
  },
]

function DashboardMain() {
  const appState = useContext(StateContext)
  const [links, setLinks] = useState([...linksData])
  const [showCreatePage, setShowCreatePage] = useState(false)
  // const personalInfo = appState.userRoles.data.personal_information
  useEffect(() => {
    if (
      appState.userRoles &&
      !appState.userRoles.data.personal_information.length
    ) {
      setShowCreatePage(true)
    }
  }, [appState.userRoles])
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-md-5">
          {/* {showCreatePage && <CreateUserProfile />} */}
          <CreateUserProfile />
          <RedirectLink />
          {/* <div className="card affix-card">
            <div className="card-header">
              <h4>Affix Card No. #</h4>
              <h4>Card Holder Name</h4>
            </div>
            <div className="card-body">
              <label>
                Master Link
                <input type="text" className="form-control" />
              </label>
              <div className="button-container d-flex justify-content-end">
                <button className="btn btn-primary mr-3"> Create QR</button>
                <button className="btn btn-success mr-3"> Copy</button>
                <button className="btn btn-info mr-3"> Statistics</button>
              </div>
              <div className="links-container">
                <h5>Links</h5>
                {links &&
                  links.map((item, i) => {
                    return (
                      <label key={item.id}>
                        {item.label}
                        <div className="input-group">
                          <div className="left">
                            <input
                              type="text"
                              className="form-control"
                              value={item.link}
                            />
                          </div>
                          <div className="right">
                            <div className="input-group">
                              <input type="radio" name="masterLink" id="" />
                              <button className="btn btn-warning">Edit</button>
                            </div>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                <div className="button-container">
                  <button className="btn btn-primary">Add Link</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-md-4">
          <div className="card details-card">
            <div className="card-body">
              <h2 className=" card-number">0001 000017</h2>
              <div className="text-box">
                <p>Affix Card No: 28364920</p>
              </div>
              <div className="text-box">
                <p>Card holder: Khumbu Pasanghamu RM</p>
              </div>
            </div>
          </div>
          <MasterLink />
          <AccountStatus />
        </div>
        <div className="col-md-3">
          <div className="card card-links">
            <div className="card-header">
              <div className="header-box">
                <h1>ACTIVE LINKS 55</h1>
              </div>
              <div className="card-body">
                <ul className="link-list">
                  <li>
                    <div className="content-container">
                      <div className="image-container">
                        <img src={avatar.svg} alt="" />
                      </div>
                      <div className="text-container">
                        <h4>KHUMBU </h4>
                        <p>2342342 members</p>
                        <p>234234234234 views</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="content-container">
                      <div className="image-container">
                        <img src={avatar.svg} alt="" />
                      </div>
                      <div className="text-container">
                        <h4>KHUMBU </h4>
                        <p>2342342 members</p>
                        <p>234234234234 views</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="content-container">
                      <div className="image-container">
                        <img src={avatar.svg} alt="" />
                      </div>
                      <div className="text-container">
                        <h4>KHUMBU </h4>
                        <p>2342342 members</p>
                        <p>234234234234 views</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="content-container">
                      <div className="image-container">
                        <img src={avatar.svg} alt="" />
                      </div>
                      <div className="text-container">
                        <h4>KHUMBU </h4>
                        <p>2342342 members</p>
                        <p>234234234234 views</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="content-container">
                      <div className="image-container">
                        <img src={avatar.svg} alt="" />
                      </div>
                      <div className="text-container">
                        <h4>KHUMBU </h4>
                        <p>2342342 members</p>
                        <p>234234234234 views</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain
