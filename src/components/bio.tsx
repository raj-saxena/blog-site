/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import logo from "../images/twitter.png"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      className="bio"
      style={{
        margin: "0 auto",
        width: "80%",
        padding: "70px 0",
      }}
    >
      <div className="mobileBio">
        <Image
          className="avatar"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author.name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <p className="author-description">
          Hi, I am <strong>{author.name}</strong> and {author.summary}
        </p>
      </div>
      <ul
        className="socials"
        style={{
          listStyle: "none",
          display: "flex",
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <li style={{ marginRight: "5px" }}>
          <a
            href={`https://twitter.com/${social.twitter}`}
            className="kc_fab_main_btn"
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              borderRadius: "50px",
            }}
          >
            <img
              width="30"
              style={{ margin: "10px" }}
              src="https://webstockreview.net/images/twitter-icon-png-1.png"
            />
          </a>
        </li>
        <li style={{ marginRight: "5px" }}>
          <a
            href={`https://github.com/raj-saxena`}
            className="kc_fab_main_btn"
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              borderRadius: "50px",
            }}
          >
            <img
              width="30"
              style={{ margin: "10px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png"
            />
          </a>
        </li>
        <li>
          <a
            href={`https://www.linkedin.com/in/therajsaxena/`}
            className="kc_fab_main_btn"
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              borderRadius: "50px",
            }}
          >
            <img
              width="30"
              style={{ margin: "10px" }}
              src="https://lh3.googleusercontent.com/proxy/ri1-h0b2aNqr-33PjoVP_HUCnB7UnlUfCiBSaPVh5j8StdoT5cA8u4rgqDLHd3Pj4RxExLtdBJjp0gaH2i1Gtt4LKOTvS__P7P-j7zDApxQpDzX__4KI4aBU215jLyDRAr73"
            />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Bio
