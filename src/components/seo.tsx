import React from "react";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Meta {
    name: string,
    content: string
}

interface SEOProps {
    description?: string,
    lang?: string,
    meta?: Array<Meta>,
    title: string
}

function SEO({description=' ', lang='en', meta=[], title}: SEOProps){
    const {site} = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }

        `
    )
    const metaDescription: string = site.siteMetadata.description;
    const defaultTitle: string = site.siteMetadata.title;
    return (
        <Helmet>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={defaultTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={defaultTitle} />
            <meta name="twitter:description" content={metaDescription} />
        </Helmet>
    )
}

export default SEO;