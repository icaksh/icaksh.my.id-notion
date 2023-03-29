import React from "react";
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";

interface LayoutProps{
    children: React.ReactNode
}

const Layout = ({children}:LayoutProps)=>{
    const data: any = useStaticQuery(
        graphql`
            query MyQuery {
                site {
                    siteMetadata{
                        title
                    }
                }
            }
        `
    )
    const [theme, setTheme] = React.useState('dark')
    function updateTheme() {
        const root = window.document.documentElement
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        root.classList.remove(newTheme)
        root.classList.add(theme)
        window.localStorage.setItem('theme', newTheme)
        console.log(newTheme)
        setTheme(newTheme)
    }
    const siteTitle: string = data.site.siteMetadata?.title || `Title`
    return(
        <div className="bg-gray-200 dark:bg-[#202020]">
            <div className="mx-auto px-12 lg:px-0 lg:max-w-3xl py-2 min-h-screen flex flex-col">
                <div id="layout">
                    <Header siteTitle={siteTitle} onUpdateTheme={updateTheme}/>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout