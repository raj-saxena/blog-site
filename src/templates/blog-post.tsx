import React from "react"
import { Link, graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

interface Props {
  data: {
    markdownRemark: any
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }
  }
  pageContext: any
}

const BlogPostTemplate = ({ data, pageContext }: Props) => {
  const post = data.markdownRemark
  const { title, siteUrl } = data.site.siteMetadata
  const { previous, next, slug } = pageContext
  const blogTitle = post.frontmatter.title

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null

  const location: any = typeof window !== `undefined` && window.location

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME || "",
    config: {
      url: `${siteUrl}${location.pathname || ""}`,
      identifier: slug,
      blogTitle,
    },
  }

  return (
    <Layout location={location} title={title}>
      <SEO
        title={blogTitle}
        description={post.frontmatter.description || post.excerpt}
        image={image}
        pathname={location.pathname}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              fontWeight: 300,
            }}
          >
            {blogTitle}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section
          style={{ marginRight: "2rem", textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer />
        <div style={{ paddingRight: "20px" }}>
          <DiscussionEmbed {...disqusConfig} />
        </div>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`
