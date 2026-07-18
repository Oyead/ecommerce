import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Header from './Header'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Home</title>
      </Helmet>
      <Header />
      <FeaturedProducts />
    </div>
  )
}
