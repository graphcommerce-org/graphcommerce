import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
// import { useGetBlogPostsQuery } from '../generated/graphql'

const Home = () => {
  return <div>bla</div>

  // const { data: blogData, loading } = useGetBlogPostsQuery({
  //   variables: { limit: 3, after: '2015-10-20', parentId: 'cj1qff4oqgvvu01246ppy8w8x' },
  // })

  // return (
  //   <div>
  //     <Head>
  //       <title>Home</title>
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>

  //     <Nav />

  //     <div className='hero'>
  //       <h1 className='title'>Welcome to Next.js!</h1>
  //       <p className='description'>
  //         To get started, edit <code>pages/index.js</code> and save to reload.
  //       </p>

  //       <div className='row'>
  //         {!loading &&
  //           blogData.blogPosts.map(blogPost => (
  //             <a href={blogPost.page.urlkeynew} className='card' key={blogPost.id}>
  //               <h3>{blogPost.title}</h3>
  //               <p>{blogPost.page.metaTitle}</p>
  //             </a>
  //           ))}
  //       </div>
  //     </div>

  //     <style jsx>
  //       {`
  //         .hero {
  //           width: 100%;
  //           color: #333;
  //         }
  //         .title {
  //           margin: 0;
  //           width: 100%;
  //           padding-top: 80px;
  //           line-height: 1.15;
  //           font-size: 48px;
  //         }
  //         .title,
  //         .description {
  //           text-align: center;
  //         }
  //         .row {
  //           max-width: 880px;
  //           margin: 80px auto 40px;
  //           display: flex;
  //           flex-direction: row;
  //           justify-content: space-around;
  //         }
  //         .card {
  //           padding: 18px 18px 24px;
  //           width: 220px;
  //           text-align: left;
  //           text-decoration: none;
  //           color: #434343;
  //           border: 1px solid #9b9b9b;
  //         }
  //         .card:hover {
  //           border-color: #067df7;
  //         }
  //         .card h3 {
  //           margin: 0;
  //           color: #067df7;
  //           font-size: 18px;
  //         }
  //         .card p {
  //           margin: 0;
  //           padding: 12px 0 0;
  //           font-size: 13px;
  //           color: #333;
  //         }
  //       `}
  //     </style>
  //   </div>
  // )
}

export default Home
