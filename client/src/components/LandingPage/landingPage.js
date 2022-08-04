import s from '../../styles/landingPage.module.css'
import img from '../../styles/imagenes/img20.png'
import SocialMedia from './SocialMedia';


export default function landingPage() {
  return (
    <div className={s.conteiner}>
      <div className={s.conteiner_A}>
        <h1 className={s.conteiner_A_title}>¡Bienvenidos a <br></br>Countries App!</h1>
        <a href='/home' className={s.conteiner_A_button}><span>Entra a la app!</span></a>
      </div>

      <div className={s.conteiner_B}>
        <img className={s.conteiner_B_img} src={img}/>
      </div>

      <SocialMedia/>

      <div className={s.conteiner_C}></div>
    </div>
   
  );
}
