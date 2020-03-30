import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./layout.css"

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  header = (
    <h1
      style={{
        fontSize: "38px !important",
        fontWeight: 600,
        textAlign: "center",
        margin: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h1>
  )

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          padding: "2rem",
          background: "#24384f",
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
          background: "#333436",
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
