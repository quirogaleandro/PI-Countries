import React from 'react'
import Card from './Card'
import s from '../../styles/Home.module.css'
import NotFound from './NotFound'

const Cards = ({currentCountry}) => {
  return (
    <div>
      <section className={s.cards}>
              { Array.isArray(currentCountry) ?
                currentCountry.map((e)=>{
                  return (
                    <Card 
                      key={e.id} 
                      name={e.name} 
                      continents={e.continents} 
                      img={e.img} 
                      id={e.id}
                      maps={e.maps}
                    />
                    )
                })
                :
                <NotFound/>
              }
            </section>
    </div>
  )
}

export default Cards