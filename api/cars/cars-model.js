const db = require('../../data/db-config')

const getAll = async () => {
  const result = await db('cars')
  return result;
}

const getById = async (id) => {
  const result = await db('cars').where({ id }).first()
  return result
}

const getByVin = async (vin) => {
  const result = await db('cars').where({ vin }).first()
  return result
}

const create = async (car) => {
  const ids = await db('cars').insert(car)
  const result = await db('cars').where({ id: ids[0] }).first()
  return result
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create
}
