import React, { useContext } from 'react'
import FeaturedProducts from './FeaturedProducts'
import Header from './Header'
import Categories from './Categories'
import { counterContext } from '../Context/CounterContext'
import { Helmet } from 'react-helmet'

export default function Home() {



  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title></title>
      </Helmet>
      <Header />
      <FeaturedProducts/>
    </div>
  )
}
