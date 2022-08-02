
function Validate(input) {

  let error= {}
  let regExpSoloLetters = /[^a-zA-Z\s]/g;
  const repetidos = (array)=> new Set(array).size!==array.length // Si hay repetidos me devuelve true
  

  if(!input.name.trim()){
    error.name = 'Se requiere un nombre'
  }else if(regExpSoloLetters.test(input.name)){
    error.name = 'Ingresar solo letras'  
  }
  if(!input.difficult){
    error.difficult = 'Se requiere una dificultad'
  }
  if(!input.duration || input.duration>24 && input.duration > 1){
    error.duration = 'Se requiere una duración(24hs)'
  }

  if(!input.season){
    error.season = 'Se requiere una temporada'
  }
  if(!input.countryId[0]){
      error.countryId = 'Se requiere seleccionar un país'
  }
  if(repetidos(input.countryId)){
    error.countryId = 'No se permiten paises duplicados'
  }
  return error
}

export default Validate;