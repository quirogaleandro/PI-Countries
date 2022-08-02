import React from 'react'
import github from '../../styles/imagenes/github.png'
import gmail from '../../styles/imagenes/gmail.png'
import linkedin from '../../styles/imagenes/linkedin.png'
import s from '../../styles/SocialMedia.module.css'

const SocialMedia = () => {
  return (
    <div className={s.social}>
      <ul >
        <li>
          <a href='https://github.com/lbenjaminq/' target="blank">
            <img src={github}/>
          </a>
        </li>
        <li>
          <a href='https://mail.google.com/mail/u/1/#inbox?compose=GTvVlcRzCpSgHJGgdcPknpLQsDRWdpDqsRfKkNVvBKdrKxMzSvhJnWbtRNKpRNvtXrZpGGXSWqvKk' target="blank">
            <img src={gmail}/>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/leandro-quiroga-4613a1236/' target="blank">
            <img src={linkedin}/>
          </a>
        </li>
      </ul>
      {/* Hola */}
    </div>
  )
}

export default SocialMedia