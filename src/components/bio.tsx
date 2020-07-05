/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Twitter, Github, LinkedIn } from "../images"
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
            <img width="30" style={{ margin: "10px" }} src={Twitter} />
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
            <img width="30" style={{ margin: "10px" }} src={Github} />
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
            <img width="30" style={{ margin: "10px" }} src={LinkedIn} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Bio
