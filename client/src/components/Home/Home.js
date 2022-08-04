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

  const [pageNum,setPageNum] = useState(1)                       
  const [countriesPag,setCountriesPag] = useState(10)            
  const [render,setRender] = useState('')                        
  const dispatch = useDispatch()
  const countries = useSelector(state=> state.countries)

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])
  
  const lastCountry = pageNum * countriesPag                      
  const firstCountry = lastCountry - countriesPag                
  const currentCountry = countries.slice(firstCountry,lastCountry)
  
  

    
  const paginado = (pageNumber)=> setPageNum(pageNumber)

  const filtered=(e,action)=>{
    e.preventDefault()
    setPageNum(1)
    setRender(e.target.value)
    dispatch(action(e.target.value))
  }



  return(
    <div className={ s.contenedor}>
        <div className={s.contenedor_A}>
          <Filtros
            setPageNum={setPageNum}
            filtered={filtered}
          />
        </div> 

      {
        countries.length ? 
        <div className={s.contenedor_B}>
          <SearchBar setPageNum={setPageNum}/>
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