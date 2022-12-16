import React from 'react'

import './Card.scss'
function Card(props) {
  const {cards} =props;
  return (
    <li>
    {cards.cover && <img 
    src={cards.cover} 
    className="card-cover"
    alt='Nguyễn Đức Kiên' 
    onMouseDown={e=>e.preventDefault()}
    />}
    {cards.title}
    </li>
  )
}

export default Card