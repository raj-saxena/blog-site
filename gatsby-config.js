module.exports = {
    siteMetadata: {
        title: 'Suspend Fun: Tech Learnings for Future Self',
        customHeaderTitle: {
            title: `Suspend Fun`,
            extra: `Tech Learnings for Future Self`
        },
        author: {
            name: `Raj Saxena`,
            summary: `who lives and works in Berlin building useful things.`,
        },
        description: `Solving roblems in the cloud.`,
        siteUrl: `https://suspendfun.com`,
        social: {
            twitter: `therajsaxena`,
        },
    },
    plugins: [{
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-twitter-cards`,
                        options: {
                          title: 'anti/pattern',
                          separator: '|', 
                          background: require.resolve('./content/assets/favicon.png'),
                          fontColor: '#228B22', 
                          titleFontSize: 96, 
                          subtitleFontSize: 60, 
                          fontStyle: 'monospace', 
                        },
                      },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-150913353-1`,
            },
        },
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Technical Blog by Raj Saxena`,
                short_name: `Suspend Fun`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `content/assets/favicon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        `gatsby-plugin-typescript`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
