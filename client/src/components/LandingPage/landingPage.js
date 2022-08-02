import s from '../../styles/landingPage.module.css'
import img from '../../styles/imagenes/img20.png'
import SocialMedia from './SocialMedia';


export default function landingPage() {
  return (
    <div className={s.conteiner}>
      <div className={s.conteiner_A}>
        <h1 className={s.conteiner_A_title}>¡Bienvenidos a <br></br>Countries App!</h1>
        <a href='/home' className={s.conteiner_A_button}><span>enter the app</span></a>
      </div>

      <div className={s.conteiner_B}>
        <img className={s.conteiner_B_img} src={img}/>
      </div>
      <SocialMedia></SocialMedia>

      <div className={s.style}>
        {/* <div className={s.style2}></div> */}
      </div> 
      <div className={s.style3}></div>
    </div>
   
  );
}
