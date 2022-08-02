const axios = require ('axios');
const {Op} =require ('sequelize')
const {Country,Activity} = require('../db.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 
//             function que importa node-fetch, al resultado de eso destructura fetch y lo utiliza




const getAllCountriesApiDB = async ()=>{
  // const apiUrl = await axios.get('https://restcountries.com/v3.1/all')
  // const allCountriesInit = await apiUrl.data.map(e=>{
  //   return{
  //     name: e.name.common,
  //     img:e.flags.png,
  //     capital:e.capital ? e.capital[0] : 'No tiene capital',
  //     continents: e.continents[0],
  //     subregion:e.subregion,
  //     area:e.area,
  //     population:e.population,
  //     id:e.cca3,
  //     maps:e.maps.googleMaps
  //   }
  // })

  // return allCountriesInit 

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
          attributes:[]                         //si no lo agrego me llega mi tabla intermedia (CountryId,ActivityId,CreatedAt,UpdateAt)
        }
      }})
    if(getCountries.length){
      res.status(200).json(getCountries)
    }else{
      res.send('No existe')
    }
}


module.exports={
  getAllCountriesApiDB,
  CountryActivity
}



  // axios.get('https://restcountries.com/v3.1/all')
  // .then(data => {
  //    console.log(data.data) 
  //    return  data.map((e)=>{
  //   return{
  //     name: e.name.common,
  //     img:e.flags.png,
  //     capital:e.capital ? e.capital[0] : 'No tiene capital',
  //     continents: e.continents[0],
  //     subregion:e.subregion,
  //     area:e.area,
  //     population:e.population,
  //     id:e.cca3,
  //     maps:e.maps.googleMaps
  //   }
  // })})

  //  fetch('https://restcountries.com/v3.1/all')
  // .then(response => response.json())
  // .then(data => data.map((e)=>{
  //   return {
  //     name: e.name.common,
  //         img:e.flags.png,
  //         capital:e.capital ? e.capital[0] : 'No tiene capital',
  //         continents: e.continents[0],
  //         subregion:e.subregion,
  //         area:e.area,
  //         population:e.population,
  //         id:e.cca3,
  //         maps:e.maps.googleMaps
  //   }
  // }))