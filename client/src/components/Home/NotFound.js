import React from 'react'
import s from '../../styles/NotFound.module.css'
import notFound from '../../styles/imagenes/notFound.png'


function NotFound() {
  return (
    <div  className={s.error}>
      <h1>EL PAÍS NO EXISTE</h1>
      <img src={notFound}></img>
    </div>
  )
}

export default NotFound