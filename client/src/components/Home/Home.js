import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getAllCountries,filteredActivity} from "../../actions";

import s from '../../styles/Home.module.css'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Filtros from "./Filtros";
import Cards from "./Cards";
import Loading from "./Loading";


function Home (){

  const [pageNum,setPageNum] = useState(1)                        //numero de pagina por la que va
  const [countriesPag,setCountriesPag] = useState(10)             //cantidad de paises que quiero tener en una pagina
  const [render,setRender] = useState('')                         // sirve para renderizar la pagina y ordenar los paises
  const dispatch = useDispatch()
  const countries = useSelector(state=> state.countries)

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])
  
  
  const lastCountry = pageNum * countriesPag                      //saco el indice del ultimo pais
  const firstCountry = lastCountry - countriesPag                 //saco el indice del primer pais que quiero en mi pagina
  const currentCountry = countries.slice(firstCountry,lastCountry)// devuelve un array desde el primer pais hasta el ultimo pais(tendria 10 paises)
  
  
  const filterActivity=(e)=> dispatch(filteredActivity(e.target.value))
  const paginado = (pageNumber)=> setPageNum(pageNumber)

  const filtered=(e,action)=>{
    e.preventDefault()
    setPageNum(1)
    setRender(e.target.value)
    dispatch(action(e.target.value))
  }

  const handleClick=(e)=>{
    e.preventDefault()
    dispatch(getAllCountries())
  }

  return(
    <div className={ s.contenedor}>
        <div className={s.contenedor_A}>
          <Filtros
            handleClick={handleClick} 
            filterActivity={filterActivity}
            filtered={filtered}
          />
        </div> 

      {
        countries.length ? 
        <div className={s.contenedor_B}>
          <SearchBar/>
          <Paginado 
            countries={countries.length} 
            countriesPag={countriesPag} 
            paginado={paginado}
          />
          <Cards
            currentCountry={currentCountry}
          />  
        </div>
      : 
        <Loading/>
      }  
</div>
  )
}


export default Home;





//CORRECCIONES
//FILTROS
  // const  filterContinents=(e)=>{
  //   e.preventDefault()
  //   setPageNum(1)
  //   dispatch(filteredByContinents(e.target.value))
  // }

  // const filterAZ=(e)=>{
  //   e.preventDefault()
  //   setRender(e.target.value)
  //   setPageNum(1)
  //   dispatch(filteredByAbc(e.target.value))
  // }

  // const filterPopulation=(e)=>{
  //   e.preventDefault()
  //   setPageNum(1)
  //   setRender(e.target.value)
  //   dispatch(filteredByPopulation(e.target.value))
  // }
// import { getAllCountries,filteredActivity,filteredByContinents,filteredByAbc,filteredByPopulation} from "../../actions";
{/* <Filtros */}
// handleClick={handleClick} 
// filterContinents={filterContinents}
// filterAZ={filterAZ} 
// filterPopulation={filterPopulation}
// filterActivity={filterActivity}
// />