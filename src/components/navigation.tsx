import React from "react"
import { Link } from "gatsby"

const Navigation = props => {
  return (
    <header
      className="header-nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "0 40px",
        paddingTop: "20px",
      }}
    >
      <nav
        id="navigation"
        className={`${
          props.darkTheme ? "header__nav" : "header__nav header__nav__light"
        }`}
      >
        <ul className="menu" style={{ display: "flex", listStyle: "none" }}>
          <li>
            <Link
              style={{
                color: "goldenrod",
                fontSize: "20px",
                border: "none",
                fontWeight: 800,
              }}
              to={`/`}
            >
              Suspend Fun
            </Link>
          </li>
        </ul>
      </nav>

      {/* <button
        style={{
          border: `2px solid ${props.darkTheme ? "white" : "#c3c3c3"}`,
          float: "right",
          cursor: "pointer",
          height: "35px",
          outline: "none",
          borderRadius: "50px",
        }}
        onClick={props.clicked}
      >
        <img
          alt="theme-image"
          style={{ width: "30px", marginBottom: 0, paddingBottom: 0 }}
          src={
            props.darkTheme
              ? "https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/moon_dark_mode_night-2-512.png"
              : "https://cdn2.iconfinder.com/data/icons/bubble-set-general/48/Sun-512.png"
          }
        />
      </button> */}
    </header>
  )
}

export default Navigation
