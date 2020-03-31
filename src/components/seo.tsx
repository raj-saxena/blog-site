import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description?: string
  lang?: string
  meta?: any
  title: string
  image: {
    src: string
    height?: number
    width?: number
  }
  pathname?: string
}

function SEO({
  description,
  lang,
  meta,
  image: metaImage,
  title,
  pathname,
}: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  // const rootImg =
  //   "https://avatars2.githubusercontent.com/u/6253803?s=400&u=a33586773ed56f06750e0324a2e4b16be8321eb2&v=4"
  // let origin = ""
  // if (typeof window !== "undefined") {
  //   origin = window.location.origin
  // }
  // const rootImgSrc = origin + rootImg

  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  const defaultMetaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author.name,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: "twitter:card",
      content: "summary",
    },
  ]

  const imageMetaTags = metaImage && [
    {
      property: "og:image",
      content: image,
    },
    {
      property: "og:image:width",
      content: metaImage.width,
    },
    {
      property: "og:image:height",
      content: metaImage.height,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[...defaultMetaTags, ...imageMetaTags, ...meta]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
