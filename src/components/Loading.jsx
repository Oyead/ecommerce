import React from 'react'
import { Grid } from 'react-loader-spinner'

export default function Loading() {
  return (
   <div className='bg-white  absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
     <Grid
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper"
    />
   </div>
  )
}
