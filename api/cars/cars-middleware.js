const { validate: isVinValid } = require(`vin-validator`)
const cars = require('./cars-model')

/** @type {import('express').RequestHandler} */
const checkCarId = (req, res, next) => {
  const id = req.params.id
  cars.getById(id).then(
    result => {
      if (result) {
        req.car = result
        next()
      }
      else {
        res.status(404).json({ message: `car with id ${id} is not found` })
      }
    }, error => next(error))
}

const carRequired = ['vin', 'make', 'model', 'mileage'];
/** @type {import('express').RequestHandler} */
const checkCarPayload = (req, res, next) => {

  for (const field of carRequired) {
    if (!Object.hasOwnProperty.call(req.body, field)) {
      res.status(400).json({ message: `${field} is missing` })
      return
    }
  }

  req.car = {
    vin: req.body.vin,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    title: req.body.title,
    transmission: req.body.transmission
  }

  next();
}

/** @type {import('express').RequestHandler} */
const checkVinNumberValid = (req, res, next) => {
  const vin = req.car.vin

  if (isVinValid(vin))
    next()
  else
    res.status(400).json({ message: `vin ${vin} is invalid` })
}

/** @type {import('express').RequestHandler} */
const checkVinNumberUnique = (req, res, next) => {
  const vin = req.car.vin

  cars.getByVin(vin).then(
    result => {
      if (result)
        res.status(400).json({ message: `vin ${vin} already exists` })
      else
        next()
    }, error => next(error))
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
