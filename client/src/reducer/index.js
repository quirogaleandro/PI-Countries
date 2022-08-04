import * as constantes from '../actions/constantes'

const initialState = {
  countries:[],
  allCountries:[],
  countryDetail:[],
  activities:[],
}

export default function reducer(state,action){

  switch (action.type) {
    
    case constantes.GET_ALL_COUNTRIES :

    return {
      ...state,
      countries: action.payload,
      allCountries: action.payload
    }

    case constantes.FILTERED_CONTINENTS :


    const allContinents = state.allCountries 
    const filterContinents = action.payload==='All' ? allContinents : allContinents.filter(e=> e.continents ===action.payload)

    return{
      ...state,
      countries: filterContinents
      }

    case constantes.FILTERED_BY_ABC:


      const sortCountries = action.payload==='Asc' ?
        state.countries.sort((a,b)=>{
          if(a.name>b.name){
            return 1
          }
          if(b.name >a.name){
            return -1
          }
          return 0
        }):
        state.countries.sort((a,b)=>{
          if(a.name>b.name){
            return -1
          }
          if(b.name >a.name){
            return 1
          }
          return 0
        })

      return{
        ...state,
        countries: sortCountries
      }

    case constantes.FILTERED_BY_POPULATION:


        const sortPopulation = action.payload==='Asc' ?
        state.countries.sort((a,b)=>{
          if(a.population>b.population){
            return -1
          }
          if(b.population >a.name){
            return 1
          }
          return 0
        })
        :state.countries.sort((a,b)=>{
          if(a.population>b.population){
            return 1
          }
          if(b.population >a.population){
            return -1
          }
          return 0
        })

      return{
        ...state,
        countries: sortPopulation
      }

    case constantes.FILTERED_ACTIVITY:

      let filter=[]
      state.allCountries.map((country)=>{
        country.activities.map((activity)=>{
          if(activity.name ===action.payload){
            return filter.push(country)
          }
        })
      })

      return{
        ...state,
        countries: filter
      }

    case constantes.GET_COUNTRY:
      
      return{
        ...state,
        countries: Array.isArray(action.payload) ? action.payload : 'No existe' 
      }

    case constantes.GET_COUNTRY_DETAIL:


      return{
        ...state,
        countryDetail: action.payload
      }


    case constantes.CLEAN : 


      return{
        ...state,
        countryDetail:null
      }


    case constantes.GET_ACTIVITIES:

        return{
          ...state,
          activities: action.payload
        }
    default: return initialState
  }
}   








//Si el resultado es negativo, a se ordena antes que b.
// Si el resultado es positivo, b se ordena antes de a.
// Si el resultado es 0, nada cambia.
