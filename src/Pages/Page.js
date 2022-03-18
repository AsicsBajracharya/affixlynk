import React, { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useContext } from "react"
import { useState } from "react"
import AccountDetails from "../Components/AccountDetails"
import Loader from "../Components/Loader"
import ActiveLinks from "../Components/ActiveLinks"
function Page() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const token = appState.user.data.token
  const [pageList, setPageList] = useState(null)
  useEffect(() => {
    if (token) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/pages`,
            config
          )
          if (response.data) {
            setPageList(response.data)
            appDispatch({ type: "loadPages", value: response.data })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token])
  if (!pageList) {
    return <Loader />
  }
  return (
    <>
      <h1>create page here</h1>
      <div className="button-container">
        <Link to="/admin/dashboard/page/create" className="btn btn-primary">
          Create page
        </Link>
      </div>
      <div className="row">
        <div className="col-md-9">
          <table className="table">
            <thead className="thead-dark">
              <th scope="col">sn</th>
              <th scope="col">name</th>
              <th scope="col">type</th>
              <th scope="col">active</th>
              <th scope="col">created at</th>
              <th scope="col">updated at</th>
            </thead>
            <tbody>
              {pageList.data &&
                pageList.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.active}</td>
                      <td>{item.created_at}</td>
                      <td>{item.updated_at}</td>
                      <td>
                        <Link to={`/admin/dashboard/page/manage/${item.id}`}>
                          manage
                        </Link>
                      </td>
                      <td>delete</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
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
          <AccountDetails />
          <ActiveLinks />
        </div>
      </div>
    </>
  )
}

export default Page
