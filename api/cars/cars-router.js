const express = require('express')
const {
	checkCarId,
	checkCarPayload,
	checkVinNumberUnique,
	checkVinNumberValid } = require('./cars-middleware')
const cars = require(`./cars-model`)

const router = express.Router()

router.get('/', (req, res, next) => {
	cars.getAll().then(
		result => {
			res.status(200).json(result || [])
		}, error => next(error)
	)
})

router.get('/:id', checkCarId, (req, res) => {
	res.status(200).json(req.car)
})

router.post('/',
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
	(req, res, next) => {
		cars.create(req.car).then(
			result => {
				res.status(200).json(result)
			},
			error => next(error)
		)
	}
)

router.use('/', (err, req, res, next) => {
	console.log(err)
	res.status(500).json({ message: "some error" })
})

module.exports = router;
