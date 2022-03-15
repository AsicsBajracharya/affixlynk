import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import logo from "../images/1x/logo-dashboard.png"
function Sidebar() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const location = useLocation()
  const initialState = {
    menuItems: [
      {
        id: 1,
        name: "dashboard",
        to: "/admin/dashboard",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.58 19.53">
            <defs></defs>
            <title>Asset 24</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="cls-1"
                  d="M20.53,18.18l-1-3.09a1,1,0,0,0-1-.7h-1V7.2h1a1,1,0,0,0,1-1V4.11a1,1,0,0,0-.66-1L10.65.07a1,1,0,0,0-.72,0L1.7,3.15a1,1,0,0,0-.67,1V6.17a1,1,0,0,0,1,1h1v7.19h-1a1,1,0,0,0-1,.7l-1,3.09a1,1,0,0,0,.14.92,1,1,0,0,0,.84.43H19.55a1,1,0,0,0,.84-.43A1,1,0,0,0,20.53,18.18Zm-5.09-3.79H13.38V7.2h2.06ZM11.32,7.2v7.19H9.26V7.2ZM3.09,4.83l7.2-2.7,7.21,2.7v.31H3.09ZM5.15,7.2H7.2v7.19h-2ZM2.46,17.48l.34-1h15l.35,1Z"
                />
                <rect
                  class="cls-1"
                  x="6.9"
                  y="10.79"
                  width="2.06"
                  height="3.63"
                />
                <rect
                  class="cls-1"
                  x="12.1"
                  y="10.79"
                  width="2.06"
                  height="3.63"
                />
                <rect
                  class="cls-1"
                  x="9.5"
                  y="6.79"
                  width="2.06"
                  height="7.26"
                  transform="translate(20.95 -0.11) rotate(90)"
                />
              </g>
            </g>
          </svg>
        ),
      },
      {
        id: 2,
        name: "page",
        to: "/admin/dashboard/page",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.62 21.12">
            <defs></defs>
            <title>Asset 18</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="cls-1"
                  d="M13.58,0H7.05A1.76,1.76,0,0,0,5.29,1.76V14.08a1.76,1.76,0,0,0,1.76,1.76h8.81a1.76,1.76,0,0,0,1.76-1.76V4Zm2.28,14.08H7.05V1.76h5.28V5.28h3.53Z"
                />
                <path
                  class="cls-1"
                  d="M4.41,2.64H2.64V16.72a1.76,1.76,0,0,0,1.77,1.76H15V16.72H4.41Z"
                />
                <path
                  class="cls-1"
                  d="M1.76,5.28H0V19.36a1.76,1.76,0,0,0,1.76,1.76H12.33V19.36H1.76Z"
                />
              </g>
            </g>
          </svg>
        ),
      },
      {
        id: 3,
        name: "settings",
        to: "",

        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.05 15.33">
            <defs></defs>
            <title>Asset 17</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="cls-1"
                  d="M14.49,5.11a2.56,2.56,0,1,0-2.4-3.41H0V3.41H12.09A2.56,2.56,0,0,0,14.49,5.11Zm0-3.41a.86.86,0,1,1-.85.85A.85.85,0,0,1,14.49,1.7Z"
                />
                <path
                  class="cls-1"
                  d="M6,5.11a2.55,2.55,0,0,0-2.4,1.7H0V8.52H3.57a2.54,2.54,0,0,0,4.8,0h8.68V6.81H8.37A2.55,2.55,0,0,0,6,5.11ZM6,8.52a.86.86,0,0,1-.85-.86.85.85,0,1,1,1.7,0A.86.86,0,0,1,6,8.52Z"
                />
                <path
                  class="cls-1"
                  d="M14.49,10.22a2.56,2.56,0,0,0-2.4,1.7H0v1.71H12.09a2.55,2.55,0,1,0,2.4-3.41Zm0,3.41a.86.86,0,0,1-.85-.86.85.85,0,0,1,.85-.85.86.86,0,1,1,0,1.71Z"
                />
              </g>
            </g>
          </svg>
        ),
      },
      {
        id: 4,
        name: "announncement",
        to: "",

        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.46 16.52">
            <path
              class="cls-1"
              d="M17.51,0V1.16L2,4.62V3.89H0v7.77H2v-.73l1,.21v3.43a1,1,0,0,0,.73.95l3.9,1a.85.85,0,0,0,.23,0,1,1,0,0,0,.78-.39l2.4-3.2,6.55,1.45v1.17h1.95V0ZM7.39,14.45l-2.53-.63V11.58l4,.89ZM2,8.94V6.61L17.51,3.15v9.24Z"
            />
          </svg>
        ),
      },
    ],
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "pathChange":
        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    // console.log(location.pathname, "location pathname")

    dispatch({ type: "pathChange", value: location.pathname })
  }, [location])

  function handleMenuClick(e) {
    console.log(
      "menu lcick handle here",
      e.target.attributes.getNamedItem("item-for").value
    )
    appDispatch({
      type: "activeMenu",
      value: e.target.attributes.getNamedItem("item-for").value,
    })
  }
  return (
    <>
      <div className="logo-container">
        <div className="image-container">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="sidebar-menu-container">
        <div className="header-box">
          <h2>DASHBOARD</h2>
        </div>
        <ul className="sidebar-menu-list">
          {state.menuItems.map((item, i) => {
            return (
              <Link to={item.to} item-for={item.name} onClick={handleMenuClick}>
                <li
                  key={i}
                  className={`sidebar-menu-item ${
                    appState.activeMenu === item.name ? "active" : ""
                  } `}
                >
                  <div className="icon-container">{item.icon}</div>
                  <Link>{item.name} </Link>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
