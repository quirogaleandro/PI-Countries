const {Op} =require ('sequelize')
const {Country,Activity} = require('../db.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 




const getAllCountriesApiDB = async ()=>{

  fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => data.map((e)=>{
    return {
      name: e.name.common,
          img:e.flags.png,
          capital:e.capital ? e.capital[0] : 'No tiene capital',
          continents: e.continents[0],
          subregion:e.subregion,
          area:e.area,
          population:e.population,
          id:e.cca3,
          maps:e.maps.googleMaps
    }
  }))
}

 const CountryActivity = async(search,res)=>{
  const getCountries =  await Country.findAll({where:{
    [search.length>3 ? 'name' : 'id']:{
      [Op.iLike]: '%' + search + '%'}},
      include:{
        model:Activity,
        attributes:['name','difficult','duration','season'],
        through:{                 
          attributes:[]                       
        }
      }})

    if(getCountries.length){
      res.status(200).json(getCountries)
    }else{
      res.send('No existe')
    }
}


const countriesDB = async(req,res)=>{
  const countries = await getAllCountriesApiDB() 
  
  const {name} = req.query                       
  
  const allcountries = await Country.findAll()
  
  if(allcountries.length<1) await Country.bulkCreate(countries) 
  
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
}


const countryDetailDB = async(req,res)=>{
  const {id} = req.params

  if(id) CountryActivity(id,res)
  else res.send('El pais no existe')
}


const activities = async(req,res)=>{
  const activity = await Activity.findAll()

  res.json(activity)
}


const postActivity =async(req,res)=>{
  const { name, difficult, duration, season, countryId} = req.body

  const newActivity= await Activity.create({name,difficult,duration,season})

  if (countryId) await newActivity.addCountry(countryId);
  res.send('creado')
}


const deleteActivity =async(req,res)=>{
  const{id} = req.params

  if(id){
    await Activity.destroy({where:{id}})
    res.status(204).send('Eliminado correctamente')
  }  
  else res.status(500).send('ID no encontrado')
}


const putActivity =async(req,res)=>{
  const {id} = req.params
  console.log('body',req.body)
  if(id){
    const activity = await Activity.findByPk(id)
    activity.set(req.body)
    await activity.save()
    res.status(200).send('Actualizado correctamente')
  }else{
    res.status(500).send('No se encontro la actividad')
  }
}



module.exports={
  getAllCountriesApiDB,
  CountryActivity,
  countriesDB,
  countryDetailDB,
  activities,
  postActivity,
  deleteActivity,
  putActivity,
}
