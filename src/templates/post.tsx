import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
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
    const author = notion.properties.Author.value[0].name
    const date = notion.properties.Created.value.start
    const tags = notion.properties.Tags.value
    console.log(author)
    const content = notion.raw.children
    return(
        <Layout>
            <SEO title={title}></SEO>
            <section id="title" className='prose pt-12'>
            <div className="flex flex-wrap">
                <div className="w-full self-center">
                    <h1 className='text-primary font-bold my-2 text-3xl'>{title}</h1>
                    <div className='text-primary my-2 mb-4 font-light text-xs'>
                      <span>{author} / {date}</span>
                    </div>
                    <div className="flex flex-wrap">
                    {tags.map((tag:any, index: React.Key|null|undefined)=>{
                      return (
                        <React.Fragment key={index}>
                          <div className="pr-1">
                          <Link to="/" className='bg-zinc-800 text-[rgb(195,200,205)] px-2 py-1 rounded-sm mb-1 font-light text-xs text-center'>{tag.name}</Link>
                          </div>
                        </React.Fragment>
                      )
                    })}
                    </div>
                </div>
            </div>
          </section>
            <article className='pt-10'>
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
      Author {
        value {
          name
        }
      }
      Tags {
        value {
          name
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