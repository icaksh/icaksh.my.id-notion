export interface INotion{
    id?: string,
    title?: string,
    datePublished?: string,
    dateUpdated?: string,
    author?: string,
    slug?: string | null
}

export default function notion(posts: any) {
    let notionPosts = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        datePublished: post.properties.Created.value.start,
        dateUpdated: post.updatedAt,
        author: post.properties.Author.value.name,
        slug: post.properties.URL?.value
    }))
    return notionPosts
}