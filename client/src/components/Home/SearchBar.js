import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountry } from '../../actions'
import s from '../../styles/SearchBar.module.css'

function SearchBar() {

  const [input,setInput] = useState('')
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  
  const handleClick = (e)=>{
    e.preventDefault()
    dispatch(getCountry(input))
    setInput('')
  }



  return (
      <form className={s.search} onSubmit={handleClick}>
        <input className={s.search_input} type={'search'} onChange={handleChange} placeholder='Buscar país...' value={input}/>
        <button type='submit' className={s.search_button}>Buscar</button>
      </form>
  )
}


export default SearchBar;
