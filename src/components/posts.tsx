import React, { useMemo } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import notion, { INotion } from "../utils/notion";


interface PostsProps{
    slice?: number
    showYears?: boolean
}
interface PostProps {
    node: any
}

const Posts = ({ slice=5, showYears=true }: PostsProps) => {
    const data:any = useStaticQuery(
        graphql`
            query Post {
                allNotion(
                    filter: {
                        properties: {
                            Published: {
                                value:{eq: true}
                            }
                        }
                    }
                ){
                    nodes {
                        properties {
                            Created {
                                value {
                                    start(
                                        locale: "id-ID",
                                        formatString: "DD-MM-YYYY"
                                    )
                                }
                            }
                            Author {
                                value {
                                    name
                                }
                            }
                            URL {
                                value
                            }
                        }
                        updatedAt(
                            formatString: "DD-MM-YYYY",
                            locale: "id-ID"
                        )
                        id
                        title
                    }
                }
            }
        `
    )
    const articles = useMemo(()=> notion(data.allNotion.nodes),[data.allNotion.nodes]).slice(0,slice)
    const postsByYear: Record<string, any> = {}
    if(showYears){
        articles.forEach((post: INotion)=>{
            const year = post.datePublished!.split('-').pop() || 'No Date'
            postsByYear[year] = [...(postsByYear[year]|| []), post]
        })
        const years = Object.keys(postsByYear).reverse()
        return(
            <div>
                {
                    years.map((year) => (
                        <section key={year} className='my-14'>
                            <h2 className="text-3xl mb5">{year}</h2>
                            <div className='divide-y'>
                            {
                                postsByYear[year].map((node: any) => (
                                    <Post key={node.id} node={node} />
                                ))
                            }
                            </div>
                        </section>
                    ))
                        }
            </div>
        )
    }else{
        return(
            <div>
                {
                    articles.map((node:any)=>(
                        <Post key={node.id} node={node} />
                    ))
                }
            </div>
        )
    }
}

const Post = ({ node }: PostProps) => {
    return(
        <div>
             <Link to={node.slug} key={node.id}>
            <div className='transition duration-200 ease-in-out hover:bg-[#cccccc] hover:text-slate-800 rounded-sm px-2 py-4 flex'>
                        <div className='mr-4'>
                        📝
                        </div>
                        <h2 className='post-href'>
                            {node.title}
                        </h2>
            </div>
        </Link>
        </div>
    )
}

export default Posts
