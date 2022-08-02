const { Router } = require('express');
const {Country,Activity} = require('../db.js')
const {getAllCountriesApiDB,CountryActivity} = require('../controllers')


const router = Router();


router.get('/countries',async(req,res)=>{
  const countries = await getAllCountriesApiDB() //arreglo con un monton de objetos con las propiedades que me pide el readme
  const {name} = req.query                       //destructuring del query si es que me llega por la url
  
  const allcountries = await Country.findAll()  //Llama a todos mis paises en mi base de datos
  
  if(!allcountries.length) await Country.bulkCreate(countries) // bulkcreate recibe un array de countries y crea una fila en la tabla de la DB
  
  if(name) await CountryActivity(name,res)
  else{
      const getCountry = await Country.findAll({include:{
      model:Activity,
      attributes:['name','difficult','duration','season'],
      through:{
        attributes:[] 
      }
    }})
    res.status(200).json(getCountry)
  }

})

router.get('/countries/:id',async(req,res)=>{
  const {id} = req.params

  if(id) CountryActivity(id,res)
  else res.send('El pais no existe')

})

router.get('/activities',async(req,res)=>{
  const activity = await Activity.findAll()

  res.json(activity)
})

router.post('/activities',async(req,res)=>{
  const { name, difficult, duration, season, countryId} = req.body

  const newActivity= await Activity.create({name,difficult,duration,season})

  if (countryId) await newActivity.addCountry(countryId);
  res.send('creado')
})

router.delete('/activities/:id',async(req,res)=>{
  const{id} = req.params
  if(id){
    await Activity.destroy({where:{id}})
    res.status(204).send('Eliminado correctamente')
  }  
  else res.status(500).send('ID no encontrado')
})

router.put('/activities/:id',async(req,res)=>{
  const {id} = req.params
  // const {name,difficult,duration,season} = req.body
  
  if(id){
    const activity = await Activity.findByPk(id)
    activity.set(req.body)
    await activity.save()
    res.status(200).send('Actualizado correctamente')
  }else{
    res.status(500).send('No se encontro la actividad')
  }

})

module.exports = router;


//  id     
// const getCountry= await Country.findAll({where:{id:{
    //   [Op.iLike]:id}},include:{
    //     model:Activity,
    //     attributes:['name','difficult','duration','season'],
    //     through:{
    //       attributes:[]
    //     }
    //   }})
    // console.log(getCountry);
    // res.json(getCountry)