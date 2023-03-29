import { Link } from "gatsby";
import React from "react";

interface TextProps {
    text: any
}

interface BlockProps {
    block: any
}

const Text = ({text}:TextProps)=>{
    if(!text) return null
    return text.map((value:any, index: number)=>{
        //console.log(value)
        const{
            annotations:{
                bold,
                code,
                color,
                italic,
                strikethrough,
                underline
            }, text
        } = value
        const boldClass = bold ? 'font-bold': null
        const italicClass = italic ? 'italic' : null
        const lineClass = strikethrough? 'line-through' : null
        const underlineClass = underline? 'underline' : null
        const className = [boldClass, italicClass, lineClass, underlineClass].join(' ')
        console.log(className)
        return(
            <span className={className} style={color !== 'default' ? color : null}>
                {text.link ? <Link to={text.link.url}>{text.content}</Link>:text.content}
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
        case 'paragraph':
            return (
                <p className="mb-6 text-justify">
                    <Text text={value.text}></Text>
                </p>
            )
        case 'heading_1':
            return (
                <h1>
                    <Text text={value.text}></Text>
                </h1>
            )
        case 'heading_2':
            return (
                <h2 className="font-semibold">
                    <Text text={value.text}></Text>
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