import React from 'react'
import s from '../../styles/CountryDetail.module.css'

export default function CardDetails({e}) {
  return (
    <div className={s.card}>
      <img src={e.img}/>
      <h1>{e.name}</h1>
      <h2>{e.id}</h2>
      <p>Capital: {e.capital}</p>
      <p>Continente: {e.continents}</p>
      <p>Subregión: {e.subregion}</p>
      <p>Área: {new Intl.NumberFormat('de-DE').format(e.area)} Km2</p>
      <p>Población: {new Intl.NumberFormat('de-DE').format(e.population)}</p> 
  </div> 
  )
}