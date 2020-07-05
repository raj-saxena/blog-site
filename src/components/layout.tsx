import React from "react"
import { Link } from "gatsby"
import Bio from "./bio"
import { rhythm, scale } from "../utils/typography"
import "./layout.css"
import Navigation from "./navigation"

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout = ({ location, title, children }: Props) => {
  const isBrowser = typeof window !== "undefined"
  // eslint-disable-next-line no-use-before-define
  const [darkTheme, setDarkTheme] = React.useState(getDefaultTheme())

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if (isBrowser) {
      window.localStorage.setItem("dark", JSON.stringify(darkTheme))
    }
  }, [darkTheme, isBrowser])

  function getDefaultTheme() {
    if (isBrowser) {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem("dark"))
    }
    return false
  }

  let header

  header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        listStyle: "none",
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
          fontSize: "22px",
          margin: "10px",
          borderBottom: "1px solid goldenrod",
        }}
        to={`/`}
      >
        <span style={{ width: "80px", margin: "10px 60px" }}>Suspend Fun</span>
      </Link>
    </div>
  )

  const toggleDarkMode = () => {
    setDarkTheme((prevTheme: any) => !prevTheme)
  }

  return (
    <div className={darkTheme ? "dark-theme" : "light-theme"}>
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <aside
          className="sidenav"
          style={{
            background: "#1f1b24",
            color: "#f8f8f8",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
              fontSize: "22px",
              marginTop: "10px",
              borderBottom: "1px solid goldenrod",
            }}
            to={`/`}
          >
            <span style={{ margin: "10px 60px" }}>Suspend Fun</span>
          </Link>
          <Bio />
        </aside>
        <Navigation darkTheme={darkTheme} clicked={toggleDarkMode} />
        <main
          style={{
            width: "75%",
            float: "right",
            height: "100vh",
            paddingBottom: "2.5rem",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
