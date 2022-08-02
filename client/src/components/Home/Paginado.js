import React from 'react'
import s from '../../styles/paginado.module.css'

function Paginado({countries,countriesPag,paginado}) {
  const pageNumbers = []

  for(let i=1; i<= Math.ceil(countries /countriesPag);i++){ 
    pageNumbers.push(i)
  }

  return (
      <ul className={s.paginado}>
        {
          pageNumbers &&
          pageNumbers.map((e)=>(
            <li key={e}>
              <a onClick={()=>paginado(e)}>{e}</a>
            </li>
          ))
        }
      </ul>
  )
}

export default Paginado;