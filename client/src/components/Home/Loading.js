import React from 'react'
import s from '../../styles/Home.module.css'

const Loading = () => {
  return (
    <div className={ s.loading}>
      <div className={s.loading_dots}></div>
      <div className={s.loading_dots}></div>
      <div className={s.loading_dots}></div>
      <div className={s.loading_dots}></div>
      <div className={s.loading_dots}></div>
    </div>
  )
}

export default Loading