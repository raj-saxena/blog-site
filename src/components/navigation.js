import React from "react"
import { Link } from "gatsby"

const Navigation = props => {
  return (
    <header>
      <div className="header__logo">
        <Link to={`/`} className={"header__logoText"}>
          <span>Suspend Fun</span>
        </Link>
      </div>

      <nav
        id="navigation"
        className={`${
          props.darkTheme ? "header__nav" : "header__nav header__nav__light"
        }`}
      >
        <ul id="menu">
          <li>
            <Link to={`/about`}>About</Link>
          </li>
        </ul>
      </nav>

      <button
        className="button__primary--theme"
        style={{
          border: `2px solid ${props.darkTheme ? "white" : "#c3c3c3"}`,
        }}
        onClick={props.clicked}
      >
        <img
          alt="theme-image"
          style={{ height: "30px" }}
          src={
            props.darkTheme
              ? "https://cdn0.iconfinder.com/data/icons/weather-3/512/moon-512.png"
              : "https://i.ya-webdesign.com/images/summer-png-flat-6.png"
          }
        />
      </button>
    </header>
  )
}

export default Navigation
