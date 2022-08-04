const { Router } = require('express');
const {Country,Activity} = require('../db.js')
const {getAllCountriesApiDB,CountryActivity,countriesDB,countryDetailDB,activities,postActivity,deleteActivity,putActivity} = require('../controllers')


const router = Router();
//Router sirve para modularizar mis rutas

router.get('/countries',countriesDB)

router.get('/countries/:id',countryDetailDB)

router.get('/activities',activities)

router.post('/activities',postActivity)

router.delete('/activities/:id',deleteActivity)

router.put('/activities/:id',putActivity)

// router.delete('countries/:id',countryDelete)

module.exports = router;

