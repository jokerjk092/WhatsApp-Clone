import {React,useContext} from 'react'
import './FooterIcons.css'
import {Link} from 'react-router-dom'

import Smile from '../images/smile.jpg'

const FooterIcons = ({name}) => {
   
  return (
    <div>
       
       <div className='fotter-logo'><img  src={Smile} /></div>
      <div ><p>{name}</p></div>
      
    </div>
  )
}

export default FooterIcons
