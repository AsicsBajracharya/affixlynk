import React, { useEffect } from "react"

function Icons({ icons }) {
  return (
    <div className="icons-box">
      {icons.default.map((item, i) => {
        return (
          <div className="image-container">
            <img
              src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
              alt={item.name}
            />
          </div>
        )
      })}
      {icons.custom &&
        icons.custom.map((item, i) => {
          return (
            <div className="image-container">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`}
                alt={item.name}
              />
            </div>
          )
        })}
    </div>
  )
}

export default Icons
