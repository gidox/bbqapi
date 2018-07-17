'use strict'
const Booking = use('App/Models/Booking')
class BookingController {

  async create ({request, auth, response}) {
    try {
      const bookingInfo = request.only(['date', 'barbecues_id', 'hours'])
      
      const bookingsave = { };
      bookingsave.date = bookingInfo.date;
      bookingsave.barbecues_id = bookingInfo.barbecues_id;
      bookingsave.user_id = auth.user.id;
  
      const a = await Booking.create(bookingsave);

      console.log(a.toJSON());
  
      const bookings = await Booking.find(a.toJSON().id)
      const hours = await bookings
      .hours()
      .createMany(bookingInfo.hours)
      console.log(hours);


  
   
  
      return response.status(201).json(hours);
      
    } catch (error) {
      return response.status(400).json(error);
      
    }
  }

}

module.exports = BookingController
