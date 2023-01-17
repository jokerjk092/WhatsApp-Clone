import React from 'react'
import './contactcard.css'
import Smile from '../images/smile.jpg'

const ContactCard = ({name}) => {
  return (
    <div className='conatct-card'>
      <div className='conatct-card-logo'><img src={Smile} /></div>
      <div className='conatct-card-name'><p>{name}</p></div>
    </div>
  )
}

export default ContactCard
