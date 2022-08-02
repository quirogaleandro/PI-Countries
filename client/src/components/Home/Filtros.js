import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import s from '../../styles/Filtros.module.css'
import { filteredByContinents,filteredByAbc,filteredByPopulation,getActivities } from "../../actions";




function Nav({filtered,filterActivity,handleClick}) {
  
  const dispatch = useDispatch()
  const activities = useSelector(state => state.activities)

  useEffect(()=>{
    dispatch(getActivities())
  },[dispatch])

  
  const filterContinentes = (e) => filtered(e,filteredByContinents)
  const filterAZ = (e) => filtered(e,filteredByAbc)
  const filterPopulation = (e) => filtered(e,filteredByPopulation)
  

  return (
    <div className={s.div}>
      <div  className={s.seccion1}>
        <h2 className={s.filtrarpor}>FILTRAR</h2>

        <div className={s.seccionA}>
          <select defaultValue={'DEFAULT'} onChange={filterContinentes} className={s.filterContinentes}>
            <option value={'DEFAULT'} disabled >Continentes</option>
            <option value={'All'}>Todos</option>
            <option value={'Africa'}>Africa</option>
            <option value={'Antarctica'}>Antarctica</option>
            <option value={'North America'}>North America</option>
            <option value={'South America'}>South America</option>
            <option value={'Asia'}>Asia</option>
            <option value={'Europe'}>Europe</option>
            <option value={'Oceania'}>Oceania</option>
          </select>
          <select defaultValue={'DEFAULT'} onChange={filterAZ}  className={s.filterAZ} >
            <option value={'DEFAULT'} disabled >Alfabeticamente</option>
            <option value={'Asc'}>A-Z</option>
            <option value={'Des'}>Z-A</option>
          </select>
        </div>

        <div className={s.seccionA}>
          <select defaultValue={'DEFAULT'} onChange={filterPopulation} className={s.filterPopulation}>
            <option value={'DEFAULT'} disabled >Población</option>
            <option value={'Asc'}>Mayor población</option>
            <option value={'Des'}>Menor población</option>
          </select>
        </div> 

        <button onClick={handleClick} className={ s.countriesDark}>Cargar paises</button>

        <div className={s.contenedorAct}>
          <h2 className={s.actividades}>ACTIVIDADES</h2>
          <Link to='/activity' className={ s.crearActivityDark}>
            Crear Actividad
          </Link>
          <select  defaultValue={'DEFAULT'} onChange={filterActivity} className={s.filterAct}>
            <option  value={'DEFAULT'} disabled>Seleccionar</option>
              {
                activities?.map((e)=>{
                return  <option key={e.id} value={e.name}>{e.name}</option>
                })
              }
          </select>
        </div>
      </div>




      <div className={s.movil}>
        <ul>
          <li>
            <select defaultValue={'DEFAULT'} onChange={filterContinentes}className={s.filterAct}>
              <option value={'DEFAULT'} disabled >Continentes</option>
              <option value={'All'}>Todos</option>
              <option value={'Africa'}>Africa</option>
              <option value={'Antarctica'}>Antarctica</option>
              <option value={'North America'}>North America</option>
              <option value={'South America'}>South America</option>
              <option value={'Asia'}>Asia</option>
              <option value={'Europe'}>Europe</option>
              <option value={'Oceania'}>Oceania</option>
            </select>
          </li>
          <li>
            <select defaultValue={'DEFAULT'} onChange={filterAZ}  className={s.filterAct} >
              <option value={'DEFAULT'} disabled >Alfabeticamente</option>
              <option value={'Asc'}>A-Z</option>
              <option value={'Des'}>Z-A</option>
            </select>
          </li>
          <li>
            <select defaultValue={'DEFAULT'} onChange={filterPopulation} className={s.filterAct}>
              <option value={'DEFAULT'} disabled >Población</option>
              <option value={'Asc'}>Mayor población</option>
              <option value={'Des'}>Menor población</option>
            </select>
          </li>
          <li>
          <select  defaultValue={'DEFAULT'} onChange={filterActivity} className={s.filterAct}>
            <option  value={'DEFAULT'} disabled>Seleccionar</option>
              {
                activities?.map((e)=>{
                return  <option key={e.id} value={e.name}>{e.name}</option>
                })
              }
          </select>
          </li>
          <li>
          <Link to='/activity' className={ s.crearActivityDark}>
            Crear Actividad
          </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}


export default Nav;



//CORRECCIONES

//function Nav({handleClick,filterContinents,filterAZ,filterPopulation,filterActivity}) 