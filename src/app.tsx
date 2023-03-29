import path from "path"
import { GatsbyNode } from "gatsby"

interface NodeProps{
  node: any
  actions: {
    createNode: any
    createNodeField: any
  }
  createNodeId: any
  getCache: any
}

const createPages: GatsbyNode['createPages']  = async({graphql,actions})=>{
    const createPage = actions.createPage
    const data: any = await graphql(`
        query CreatePage {
          allNotion(
            filter: {
              properties: {
                  Published: {
                      value:{eq: true}
                  }
              }
          }
            limit: 1000
          ) {
            nodes {
              id
              properties {
                URL {
                  value
                }
              }
            }
          }
        }
            `)
    console.log(data.data.allNotion)
    const articles = data.data.allNotion.nodes
    
    const template = path.resolve(`./src/templates/post.tsx`)
    if (articles.length > 0) {
      articles.forEach((article:any) => {
        console.log(article.properties.URL.value)
        createPage({
          path: article.properties.URL.value,
          component: template,
          context: {
            id: article.id
          }
        })
      })
    }
}

// const onCreateNode = async ({node, actions: {createNode, createNodeField}, createNodeId}:NodeProps)=>{
//   const item = node.raw.children
//   if (node.raw.properties.status.select.name == 'Posted') {
//     for (let i = 0; i < item.length; i++) {
//       if (item[i].type === 'image') {
//         if (item[i].image.type === 'file') {
//           const img = item[i].image.file.url
//           const fileNode = await createRemoteFileNode({
//             url: img,
//             parentNodeId: node.id,
//             createNode,
//             createNodeId,
//             getCache,
//           })

//           if (fileNode) {
//               item[i].image.remoteImage___NODE = fileNode.id
//           }
//         }
//       }
//     }
//   }
// }

export { createPages }