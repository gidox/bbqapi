'use strict'
const Barbecue = use('App/Models/Barbecue');
const Database = use('Database');
const GoogleMapsAPI = use('googlemaps');
const Env = use('Env');
const mapCfg = {
  key: Env.get('GOOGLE_MAPS_API'),
  secure: true, // use https

};
const gmAPI = new GoogleMapsAPI(mapCfg);

class BarbecueController {

  async index({ params, response, auth }) {


    const geoCoordinates = await this.getLatLng({ "address": auth.user.zipCode, });
    const { lat, lng,  } = geoCoordinates.response.results[0].geometry.location;
    const { formatted_address  } = geoCoordinates.response.results[0];
    
    const barbecues = await this.getBarbecues(lat, lng, params.distance ? params.distance : 10);

    const data = { 
      formatted_address,
      barbecues: barbecues[0]

    }
    // return result;
    return response.status(200).json(data);



  }

  async getBarbecues(lat, lng, distance) {
    try {
      const sql = 'SELECT '+
      '*, '+
      '111.045 * DEGREES(ACOS(COS(RADIANS(?)) '+
      '* COS(RADIANS(lat)) '+
      '* COS(RADIANS(lon) - RADIANS(?)) '+
      '+ SIN(RADIANS(?)) '+
      '* SIN(RADIANS(lat))))'+
      'AS distance '+
      'FROM barbecues '+
      'HAVING distance < ? '+
      'ORDER BY distance ';
      const barbecues = await Database
      .raw(sql , [lat, lng, lat, distance]);
      return barbecues;
    } catch (error) {
      throw error;
    }

  }
  getLatLng(params) {

    return new Promise((resolve, reject) => {
      gmAPI.geocode(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            response
          });
        }
      });
    });
  };

  async show({ params, response }) {
    const barbecue = await Barbecue.find(params.id)

    return response.json(barbecue)
  }

  async create({ request, auth, response }) {
    const bbqInfo = request.only(['title', 'lat', 'lon', 'description'])

    const bbq = new Barbecue()
    bbq.title = bbqInfo.title
    bbq.lat = bbqInfo.lat
    bbq.lon = bbqInfo.lon,
    bbq.description = bbqInfo.description,
    
    bbq.user_id = auth.user.id

    await bbq.save()

    return response.status(201).json(bbq)
  }

  async update({ params, request, response }) {
    const bbqInfo = request.only(['title', 'lat', 'lon', 'description'])

    const bbq = await Barbecue.find(params.id)
    if (!bbq) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    bbq.title = bbqInfo.title
    bbq.lat = bbqInfo.lat
    bbq.description = bbqInfo.description
    bbq.lon = bbqInfo.lon

    await bbq.save()

    return response.status(200).json(bbq)
  }

  async delete({ params, response }) {
    const bbq = await Barbecue.find(params.id)
    if (!bbq) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    await bbq.delete()

    return response.status(204).json(null)
  }
}

module.exports = BarbecueController
