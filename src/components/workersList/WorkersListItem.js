import React from 'react'

const WorkersListItem = ({photo, name, position, email, phone}) => {
  return (
    <div  className="worker__item">
        <img src={photo} alt="worker" className="worker__item-img" />
        <h4 className="worker__item-name">{name}</h4>
        <p className="worker__item-position">{position}</p>
        <p className="worker__item-email">{email}</p>
        <p className="worker__item-phone">{phone}</p>
    </div>  
  )
}

export default WorkersListItem