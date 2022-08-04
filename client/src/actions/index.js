import axios from 'axios'
import * as constantes from './constantes'

export function getAllCountries(){
  return async function(dispatch){
    var json= await axios.get('/countries')
    return dispatch({
      type: constantes.GET_ALL_COUNTRIES,
      payload:json.data
    })
  }
}

export function filteredByContinents(payload){
  return{
    type:constantes.FILTERED_CONTINENTS,
    payload
  }
}

export function filteredByAbc (payload){
  return{
    type:constantes.FILTERED_BY_ABC,
    payload
  }
}
export function filteredByPopulation (payload){
  return{
    type:constantes.FILTERED_BY_POPULATION,
    payload
  }
}

export function filteredActivity(payload){
  return{
    type: constantes.FILTERED_ACTIVITY,
    payload
  }
}

export function getActivities (){
  return async function(dispatch){
    const json = await axios.get('/activities')
    return dispatch({
      type:constantes.GET_ACTIVITIES,
      payload:json.data
    })
  }

}
export function getCountry(id){
  return async function(dispatch){
    var json= await axios.get('/countries?name=' + id)
    return dispatch({
      type:constantes.GET_COUNTRY,
      payload:json.data
    })
  }
}

export function getCountryDetail(id){
  return async function(dispatch){
    var json= await axios.get('/countries/' + id)
    return dispatch({
      type: constantes.GET_COUNTRY_DETAIL,
      payload:json.data
    })
  }
}

export function postActivity(payload){
    const response = axios.post('/activities',payload)
    return response
}

export function clean(){
  return{
    type:constantes.CLEAN
  }
}

