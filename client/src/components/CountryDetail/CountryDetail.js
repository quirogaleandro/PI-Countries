import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetail,clean } from '../../actions'
import { Link } from 'react-router-dom'
import CardActivity from './CardActivity.js'
import CardDetails from './CardDetails'
import s from '../../styles/CountryDetail.module.css'
import img1 from '../../styles/imagenes/img10.png'

export default function CountryDetail({match}) {
  const id = match.params.id
  
  const dispatch = useDispatch()
  const country = useSelector((state)=> state.countryDetail)

  useEffect(()=>{
    dispatch(getCountryDetail(id))
    return ()=> dispatch(clean())
  },[dispatch])

  return (
    <div className={s.contenedor}>
        <img className={s.contenedor_image} src={img1}/>
        <div className={s.subcontenedor}>

          <Link to='/home' className={s.subcontenedor_link}>
            Volver
          </Link>

            {
              country?.map(e=>{
                return(
                  <div key={e.id} className={s.countryDetail}>
                    <CardDetails 
                      e={e}
                    />
                    <div className={s.activity}>
                        <h1>Actividades</h1>

                        {
                          country[0]?.activities.map(e=> <CardActivity e={e} key={crypto.randomUUID()}/>)
                        }

                        <Link to='/activity' className={ s.activity_link}>
                          Crear Actividad
                        </Link>

                    </div>    
                  </div> 
                )
              })
            }       
        </div>
    </div>
  )
}

