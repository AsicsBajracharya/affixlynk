import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import axios from "axios"
import ManageProfile from "./manage/ManageProfile"
import ManageBioLink from "./manage/ManageBioLink2"
import ManageLink from "./manage/ManageLink"
import StateContext from "../../../StateContext"
import DispatchContext from "../../../DispatchContext"
import Loader from "../../../Components/Loader"
function ManagePage() {
  const appState = useContext(StateContext)
  const { id } = useParams()
  const initialState = {
    pageData: "",
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setPageData":
        draft.pageData = action.value
        return
      default:
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  //fetch page data
  const token = appState.user.data.token
  useEffect(() => {
    if (token) {
      const ourRequest = axios.CancelToken.source()
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      async function fetchPages() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/pages/${id}`,
            config
          )
          console.log(response.data)
          if (response.data) {
            dispatch({ type: "setPageData", value: response.data })
          }
        } catch (e) {
          console.log(e, "there was an error")
        }
      }
      fetchPages()
      return () => ourRequest.cancel()
    }
  }, [token, id])
  if (!state.pageData) {
    return <Loader />
  }
  if (state.pageData && state.pageData.data.page.type == "bio-link") {
    return <ManageBioLink pageData={state.pageData} />
  }
  if (state.pageData && state.pageData.data.page.type == "links") {
    return <ManageLink pageData={state.pageData} />
  }
  return (
    <>
      <ManageProfile />
    </>
  )
}

export default ManagePage
