
export const ValidateButton = (input,setActivo) => {
  let repetidos = (array)=> new Set(array).size!==array.length
  let regExpSoloLetters = /[^a-zA-Z\s]/g;

  if( 
        input.difficult !== ''
    && input.duration !== '' 
    && input.duration < 25 
    && input.season !== '' 
    && input.countryId.length>0 
    && input.name !== '' 
    && !regExpSoloLetters.test(input.name) 
    && !repetidos(input.countryId )
    
   ){
    setActivo(true)  
  }else{
    setActivo(false)
  }
}
