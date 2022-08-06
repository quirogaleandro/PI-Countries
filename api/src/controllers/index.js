const {Op} =require ('sequelize')
const {Country,Activity} = require('../db.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 



const getCountries = async () => {
  let dbCountries = await Country.findAll({
      include: [Activity]
  })
  try {
      if(dbCountries.length === 0) {
          const { data } = await axios.get('https://restcountries.com/v3/all');
          
          const countries = data.map((country) => {
              return {
                  id: country.cca3,
                  name: country.name.common,
                  flags: country.flags[1],
                  continents: country.continents[0],
                  capital: country.capital ? country.capital[0] : 'Undefined capital city',
                  subregion: country.subregion ? country.subregion : 'Undefinded Subregion',
                  area: country.area,
                  population: country.population
              };
          })
      
          countries.forEach((country) => {
              Country.findOrCreate({
                  where: { id: country.id },
                  defaults: {
                      id: country.id,
                      name: country.name,
                      flags: country.flags,
                      continents: country.continents,
                      capital: country.capital,
                      subregion: country.subregion,
                      area: country.area,
                      population: country.population,
                      maps:e.maps.googleMaps
                  }
              })
          });
          dbCountries = await Country.findAll({
              include: [Activity]
          })
      }
      return dbCountries
  } catch(error){
      console.log('Error getCountries en controller ' + error)
  }
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
  
  const {name} = req.query                       
  
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
  CountryActivity,
  countriesDB,
  countryDetailDB,
  activities,
  postActivity,
  deleteActivity,
  putActivity,
}
