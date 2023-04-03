import { Link } from "gatsby";
import React from "react";

interface TextProps {
    heading?: boolean
    code?: boolean
    text: any
}

interface BlockProps {
    block: any
}

interface Annotations {
    bold?: boolean,
    code?: boolean,
    color?: string,
    italic?: boolean,
    strikethrough?: boolean,
    underline?: boolean
}
const Text = ({text, heading=false, code=false}:TextProps)=>{
    if(!text) return null
    return text.map((value:any, index: number)=>{
        //console.log(value)
        const anno: Annotations = value?.annotations
        let className = "text-primary "
        var styleName: any
        if(!code){
            className += !heading ? 'text-base ':''
            className += anno.bold ? 'font-bold ': ''
            className += anno.italic ? 'italic ' : ''
            className += anno.strikethrough? 'line-through ' : ''
            className += anno.underline? 'underline ' : ''
            styleName += anno.color === 'default'? anno.color :''
            className += code? 'code': ''
        }
        return(
            <span className={className}>
                {text.link ? <Link to={value.text.link.url}>{value.text.content}</Link>:value.text.content}
            </span>
        )
    }
    )
}


const Block = ({block}:BlockProps) =>{
    //console.log(block)
    const type = block.type
    const value = block[type]

    switch(type){
        case 'code':
            return (
                <div className="typography bg-indigo-200 dark:bg-indigo-900 dark:bg-opacity-50 text-indigo-500 dark:text-indigo-200 px-2 rounded-sm inline-block w-full">
                    <p className="m-auto">
                    <Text text={value.text} code={true}></Text>
                </p>
                </div>
            )
        case 'paragraph':
            return (
                <p className="my-4 text-justify">
                    <Text text={value.text}></Text>
                </p>
            )
        case 'heading_1':
            return (
                <h1>
                    <Text text={value.text} heading={true}></Text>
                </h1>
            )
        case 'heading_2':
            return (
                <h2 className="mb-2">
                    <Text text={value.text} heading={true}></Text>
                    <hr></hr>
                </h2>
            )
        default:
            return (
                <>
                </>
            )
    }
}

export default Block