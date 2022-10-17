import React from 'react'
import Dashnav from '../components/Dashnav'
import Dashview from '../components/Dashview'
import Dashcreate from '../components/Dashcreate'
function Dashboard() {
  return (
    <>
        <Dashnav/>
        {/* <Dashview/> */}
        <Dashcreate/>
        {/* <Dashedit/>
        <Dashdelete/> */}
    </>
  )
}

export default Dashboard