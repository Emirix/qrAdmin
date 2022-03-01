import React, { useEffect } from 'react'
import {Redirect} from "react-router-dom"
function Page(props) {
    
   
    return (
        <div className='page bg-2 flex-fill'>
            {props.children}
        </div>
    )
      
}

export default Page
