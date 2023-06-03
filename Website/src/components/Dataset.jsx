import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Dataset() {
  return (
    <div>
      <div className='dark:bg-customGray flex flex-col min-h-screen lg:overflow-x-clip '>
       <Navbar/>
       <Sidebar/>
      </div>
    </div>
  )
}

export default Dataset
