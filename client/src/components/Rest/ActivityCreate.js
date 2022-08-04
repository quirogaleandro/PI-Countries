import React, { useEffect,useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllCountries,postActivity } from '../../actions'
import Validate from './Validate'
import { ValidateButton } from './ValidateButton'
import Rocket from './Rocket'
import s from '../../styles/CreateActivity.module.css'
import img from '../../styles/imagenes/img17.png'

export default function CountryCreate() {
  

  const [activo,setActivo] = useState(false)
  const [err,setErr] = useState({})
  const [input,setInput] = useState({
    name:'',
    difficult:'',
    duration:'',
    season:'',
    countryId:[]
  })
  //REDUX
  const dispatch= useDispatch()
  const countries = useSelector(state => state.countries)
  const history = useHistory()

  //Accion que trae todos los paises
  useEffect(()=>{
    dispatch(getAllCountries())
  },[])

  //VALIDACION SUBMIT
  useEffect(()=>{
    ValidateButton(input,setActivo)
  },[input])


  //Capturo y valido lo que el usuario escribe
  const handleChange=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
    setErr(Validate({...input,[e.target.name]:e.target.value}))
  }

  //Manejo el estado de country
  const handleSelect= (e) => {
    console.log(e.target.value)
  
    let rep = input.countryId.filter((elem)=> elem === e.target.value)
      if(rep.length){
       alert('No se permiten repetidos')
       e.target.value='DEFAULT'
       return
      }
      setInput({...input,
      countryId:[...input.countryId,e.target.value]
    })
    setErr(Validate({...input,
      countryId:[...input.countryId,e.target.value]
      }))
      // setTimeout(()=>{
      //   e.target.value='DEFAULT'
      // },2000)
  }

  const handleClick = (e)=>{
    e.preventDefault()
    // dispatch(postActivity(input))
    postActivity(input)
    alert('Actividad creada exitosamente')
    history.push('./Home')
  }

  //Elimina los paises seleccionados
  const handleDelete =(e)=>{
    setInput({...input,
      countryId: input.countryId.filter((country)=> country !== e)
    })
    setErr(Validate({...input,
        countryId: input.countryId.filter((country)=> country !== e)
      }))

    const select = document.getElementById('#mySelect');
    const option = document.getElementById('#myId');
    select.value = option.value;
  }


  return (
    <div className={s.conteiner}>
      <Link to='/home' className={s.conteiner_link}>Volver</Link>
      <form className={s.subconteiner}>

        <div className={s.divglobo}>
          <img className={s.globo} src={img}></img>
          <img className={s.globo} src={img}></img>
          <img className={s.globo} src={img}></img>
        </div>

        <h1>Crear Actividad</h1>
        <div className={s.subconteiner_caja}>
          <label>Nombre</label>
          <input
            onChange={handleChange} 
            type={'text'} 
            value={input.name} 
            name='name'
           />
          {err.name && <p className={s.error}>{err.name}</p>} {/*ERROR NOMBRE*/}
        </div>

        <div className={s.subconteiner_caja}>
          <label>Elegir país/es</label>
          <select id={'#mySelect'} className={s.select_country} defaultValue={'DEFAULT'} onChange={handleSelect}>
            <option id={'#myId'} name='countryId' value={'DEFAULT'} disabled >Elegir país</option>
            {
              countries?.map((e)=> <option className={s.option} value={e.id} key={e.id}>{e.name}</option>)
            }
          </select>
          {err.countryId && <p className={s.error}>{err.countryId}</p>}
        </div> 
     
        <div className={s.subconteiner_caja}>
          <label>Duración</label>
          <input 
            placeholder='  en horas..' 
            onChange={handleChange} 
            type={'number'} 
            value={input.duration} 
            name='duration'
          />
          {err.duration && <p className={s.error}>{err.duration}</p>} 
        </div>

        <div className={s.subconteiner_caja}>
          <label>Dificultad</label>
          <select defaultValue={'DEFAULT'} name='difficult' onChange={handleChange}>
            <option value={'DEFAULT'} disabled  >Dificultad</option>     
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
            <option value={'4'}>4</option>
            <option value={'5'}>5</option>
          </select>
          {err.difficult && <p className={s.error} >{err.difficult}</p>} {/*ERROR DIFICULTAD*/}
        </div>
        
        <div className={s.subconteiner_caja}>
          <label>Temporada</label>
          <select defaultValue={'DEFAULT'} name='season'onChange={handleChange}>
            <option value={'DEFAULT'} disabled >Temporada</option>          {/* ME TIRA ERROR EL SELECTED*/}
            <option value={'Verano'}>Verano</option>
            <option value={'Otoño'}>Otoño</option>
            <option value={'Invierno'}>Invierno</option>
            <option value={'Primavera'}>Primavera</option>
          </select>
          {err.season && <p className={s.error}>{err.season}</p>}  {/*ERROR TEMPORADA*/}
        </div>

        <button disabled={!activo} type='submit' className={(activo  ? s.false:s.true)} onClick={(e)=>handleClick(e)} >Crear</button>

      </form>
      {
        input.countryId.length ?
      <div className={s.selectCountry}>
        <label>PAISES SELECCIONADOS</label>
      {input.countryId?.map((e)=>{ 
          return (
            <div key={crypto.randomUUID()} className={s.selectCountry_option}>
                <p >{e}</p>
                <button type='submit' onClick={()=>handleDelete(e)}>x</button>
            </div>
          )
          })}
      </div>
      :
      <p className={s.selectCountry}>NO HAY PAISES SELECCIONADOS</p>
      }
       <Rocket/>
    </div>
  )
}

