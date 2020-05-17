import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styles from "./articles.module.css"
import Bio from "../components/bio"

interface Props {
  data: {
    allMarkdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  location: any
}

const ROOT_URL_IMAGE =
  "https://avatars2.githubusercontent.com/u/6253803?s=400&u=a33586773ed56f06750e0324a2e4b16be8321eb2&v=4"

const BlogIndex = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Suspend Fun" homePageImage={ROOT_URL_IMAGE} />
      <div className={styles.bio}>
        <Bio />
      </div>

      <h3
        className={styles.headingMain}
        style={{
          color: "darkslategrey",
          fontWeight: 400,
          fontSize: "18px",
        }}
      >
        Tech Learnings for Future Self
      </h3>

      {posts.map(({ node }: any) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div className={styles.all}>
            <div className={styles.cards}>
              <article
                className={`${styles.card} ${styles.shadow1}`}
                key={node.fields.slug}
              >
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: `none`, color: "teal" }}
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </article>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
