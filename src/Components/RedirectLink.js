import React, { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { useImmerReducer } from "use-immer"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import axios from "axios"
import FormLabel from "@mui/material/FormLabel"
function RedirectLink() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [value, setValue] = React.useState("female")
  const [pageData, setPageData] = useState()
  const token = appState.user.data.token
  const initialState = {
    sendCount: 0,
    value: "",
    pending: false,
    successMsg: "",
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "sendCount":
        draft.sendCount++
        return
      case "setValue":
        draft.value = action.value
        return
      case "sendReq":
        draft.sendCount++
        return
      case "pending":
        draft.successMsg = ""
        draft.pending = true
        return
      case "success":
        draft.pending = false
        draft.successMsg = action.value
        return
      default:
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

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
            setPageData(response.data)
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
  useEffect(() => {
    if (pageData) {
      pageData.data &&
        pageData.data.map((item, i) => {
          if (item.active === "yes") {
            dispatch({ type: "setValue", value: item.id })
          }
        })
    }
  }, [pageData])

  //send values on change here

  const uid = appState.user.data.user_id
  useEffect(() => {
    if (token && state.sendCount && uid) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      dispatch({ type: "pending" })
      async function fetchPages() {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/pages/updateActive`,
            {
              page_id: state.value,
              user_id: uid,
            },
            config,
            { cancelToken: ourRequest.token }
          )
          console.log(response.data)
          if (response.data) {
            // setUserList(response.data)
            // console.log(response.data, "response.data")
            dispatch({
              type: "success",
              value: "Congratulations! link changed successfully",
            })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token, state.sendCount, uid])

  function handleSubmit(e) {
    e.preventDefault()
  }

  const handleChange = (event) => {
    // setValue(event.target.value)
    dispatch({ type: "setValue", value: event.target.value })
    dispatch({ type: "sendReq" })
  }
  if (!pageData) {
    return <div>loading...</div>
  }

  return (
    <>
      <div className="card-container">
        <div className="card redirect-card">
          <div className="card-header">
            <h1>REDIRECT LINK</h1>
          </div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={state.value}
              onChange={handleChange}
            >
              <table>
                {appState.pages &&
                  appState.pages.data.map((item, i) => {
                    return (
                      <div className="content-container" key={i}>
                        <tr>
                          <td>
                            <label>
                              <div className="input-group">
                                <FormControlLabel
                                  value={item.id}
                                  control={<Radio />}
                                  label=""
                                />
                                <p>{item.name}</p>
                              </div>
                            </label>
                          </td>
                          <td>
                            <div className="link">{item.type}</div>
                          </td>
                          <td>
                            <Link path={`/`}>
                              <span className="link">Edit</span>
                            </Link>
                          </td>
                        </tr>
                      </div>
                    )
                  })}
              </table>
            </RadioGroup>
          </FormControl>
        </div>
        {state.pending && <h4>Link is changing.. please wait!!!</h4>}
        {state.successMsg && <h4>{state.successMsg}</h4>}
      </div>
    </>
  )
}

export default RedirectLink
