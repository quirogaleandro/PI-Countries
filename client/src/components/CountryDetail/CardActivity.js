import React from 'react'
import s from '../../styles/CountryDetail.module.css'

export default function CardActivityCreate({e}){
  return(
    <details className={s.details} key={crypto.randomUUID()}>
      <summary> {e.name}</summary>
        <ul className={s.details_info}>
          <li>Duracion: {e.duration}</li>
          <li>Dificultad: {e.difficult}</li>
          <li>Temporada: {e.season}</li>
        </ul>
    </details>
      )
}
