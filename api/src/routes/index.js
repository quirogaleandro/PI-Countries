const { Router } = require('express');
const {countriesDB,countryDetailDB,activities,postActivity,deleteActivity,putActivity} = require('../controllers')


const router = Router();

router.get('/countries',countriesDB)

router.get('/countries/:id',countryDetailDB)

router.get('/activities',activities)

router.post('/activities',postActivity)

router.delete('/activities/:id',deleteActivity)

router.put('/activities/:id',putActivity)


module.exports = router;

