import React from 'react'
import EditorsPicks from '../components/EditorsPicks'
import Featured from '../components/Featured'
import Main from '../components/Main'

function Home() {
  return (
    <div>
       <Main/> 
       <Featured/>
       <EditorsPicks/>
    </div>
  )
}

export default Home