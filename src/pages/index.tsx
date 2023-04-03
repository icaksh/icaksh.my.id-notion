import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import Posts from "../components/posts";

const IndexPage = () => (
  <Layout>
    <SEO title="Palguno Wicaksono"/>
    <div>
      <section id="hero" className='prose'>
        <div className="flex flex-wrap">
            <div className="w-full self-center">
                <h2 className='text-primary my-2'>Selamat datang di kebun digitalku 🌱</h2>
                <p className='text-primary my-2 mb-10'>Situs ini berisikan tentang diriku serta apa yang aku tulis saat belajar atau memberikan informasi yang menurutku berguna.</p>
                <p className='text-primary my-2 mb-10 font-bold italic line-through text-justify	'></p>
                <Link to='/blog' className='btn-link dark:btn-link-dark'>
                    Selengkapnya Tentangku
                </Link>
            </div>
        </div>
      </section>
      <h1 className='text-primary mt-10'>Tulisan Terbaru</h1>
      <div className="text-primary mb-6 font-semibold">
        <Posts showYears={false}/>
      </div>
    </div>
  </Layout>
)

export default IndexPage