import React from "react";
import s from "../../styles/Card.module.css";

function Card({ name, continents, img, id, maps }) {
  return (
    <div className={s.card}>
      <div className={s.card_front}>
        <div className={s.imgconteiner}>
          <img src={img} alt='country' className={s.card_front_img} />
        </div>
        <h1>{name}</h1>
        <p>{continents}</p>
      </div>

      <div className={s.card_back}>
        <h1 className={s.name}>{name}</h1>
        <a className={s.card_details} href={"/detail/" + id}>
          Ver detallee
        </a>
        <a className={s.card_maps} href={maps} target='_blank'>
          Ver mapa
        </a>
      </div>
    </div>
  );
}

export default Card;
