import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description?: string
  lang?: string
  title: string
  image?: {
    src: string
    height: number
    width: number
  }
  homePageImage?: string
  pathname?: string
}

function SEO({
  description,
  lang,
  image: metaImage,
  title,
  pathname,
  homePageImage,
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

  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  let origin = ""
  if (typeof window !== "undefined") {
    origin = window.location.origin
  }
  const rootImgSrc = origin + homePageImage

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
  ]

  function getImageMetaTags() {
    if (metaImage)
      return [
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

    return [
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: `twitter:image`,
        content: image ? image : rootImgSrc,
      },
    ]
  }

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
      meta={[...defaultMetaTags, ...getImageMetaTags()]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

export default SEO
