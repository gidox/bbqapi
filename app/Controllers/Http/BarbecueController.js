'use strict'
const Barbecue = use('App/Models/Barbecue')

class BarbecueController {
  async index ({response}) {


    const barbecues = await Barbecue.query()
  .where('age', '>', 18)
  .fetch()

    return response.json(barbecues)
  }

  async show ({params, response}) {
    const barbecue = await Barbecue.find(params.id)

    return response.json(barbecue)
  }

  async create ({request, auth, response}) {
    const bbqInfo = request.only(['title', 'lat', 'lon'])
    
    const bbq = new Barbecue()
    bbq.title = bbqInfo.title
    bbq.lat = bbqInfo.lat
    bbq.lon = bbqInfo.lon,
    bbq.user_id = auth.user.id

    await bbq.save()

    return response.status(201).json(bbq)
  }

  async update ({params, request, response}) {
    const bbqInfo = request.only(['title', 'lat', 'lon'])


    const bbq = await Barbecue.find(params.id)
    if (!bbq) {
      return response.status(404).json({data: 'Resource not found'})
    }
    bbq.title = bbqInfo.title
    bbq.lat = bbqInfo.lat
    bbq.lon = bbqInfo.lon


    await bbq.save()

    return response.status(200).json(bbq)
  }

  async delete ({params, response}) {
    const bbq = await Barbecue.find(params.id)
    if (!bbq) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await bbq.delete()

    return response.status(204).json(null)
  }
}

module.exports = BarbecueController
