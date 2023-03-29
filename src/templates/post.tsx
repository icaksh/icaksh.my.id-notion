import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Block from "./blocks";

interface PostProps{
    data?: any
    pageContext: any
}

const Post = ({data}:PostProps)=>{
    const {notion} = data
    const title = notion.title
    const content = notion.raw.children
    return(
        <Layout>
            <SEO title={title}></SEO>
            <section id="title" className='pt-6'>
            <div className="flex flex-wrap">
                <div className="w-full self-center">
                    <h1 className='text-primary font-bold my-2'>{title}</h1>
                </div>
            </div>
          </section>
            <article>
            <div className='prose dark:prose-dark max-w-full break-words text-xl text-justify'>
                {content.map((blocks: any, index: React.Key | null | undefined) => {
                    return (
                    <React.Fragment key={index}><Block block={blocks}></Block></React.Fragment>
                    )
                })}
                </div>
            </article>
        </Layout>
    )
}

export const blogPostQuery = graphql`
  query blogPostQuery($id: String!) {
      notion(id: {eq: $id}) {
        id
        title
        properties {
          Created {
            value {
              start(formatString: "DD MMMM YYYY", locale: "id-ID")
            }
          }
        }
        raw {
          children {
            image {
              external {
                url
              }
              type
            }
            code {
              text {
                text {
                  content
                }
              }
            }
            paragraph {
              text {
                annotations {
                  bold
                  code
                  color
                  italic
                  strikethrough
                  underline
                }
                text {
                  content
                  link {
                    url
                  }
                }
                href
              }
            }
            heading_2 {
              text {
                annotations {
                  bold
                  code
                  color
                  strikethrough
                  italic
                  underline
                }
                text {
                  content
                }
              }
            }
            numbered_list_item {
              text {
                annotations {
                  bold
                  code
                  italic
                  color
                  strikethrough
                  underline
                }
                text {
                  content
                }
              }
            }
            quote {
              text {
                annotations {
                  bold
                  code
                  color
                  italic
                  strikethrough
                  underline
                }
                text {
                  content
                }
              }
            }
            type
          }
        }
      }
  }  
`

export default Post