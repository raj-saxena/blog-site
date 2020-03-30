import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import './layout.css'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          // ...scale(1.5),
          fontSize: "38px !important",
          fontWeight: "600",
          textAlign: "center",
          margin: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h1
        style={{
          // ...scale(1.5),
          fontSize: "38px !important",
          fontWeight: "600",
          textAlign: "center",
          margin: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  }
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        position: "relative",
        minHeight: "100vh",
        // padding: `4.5rem`,
      }}
    >
      <header
        style={{
          padding: '2rem',
          background: '#24384f',
          color: "palegoldenrod",
        }}
      >
        {header}
      </header>
      <main style={{ width: "50%", margin: "0 auto", paddingBottom: "2.5rem" }}>
        {children}
      </main>
      <footer
        style={{
          textAlign: "center",
          background: '#333436',
          color: "#fff",
          padding: "20px",
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: "3.5rem",
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
