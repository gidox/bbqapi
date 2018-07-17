'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');



Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() => {
  
  Route
  .post('users/create', 'UserController.create')
  Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')
  Route
  .get('users/logout', 'UserController.logout')
  .middleware('auth')
  Route.post('users/login', 'UserController.login')
  
  Route.post('barbecues', 'BarbecueController.create').middleware('auth')
  Route.get('barbecues', 'BarbecueController.index')
  Route.get('barbecues/:id', 'BarbecueController.show')
  Route.put('barbecues/:id', 'BarbecueController.update')
  Route.delete('barbecues/:id', 'BarbecueController.delete')


  Route.post('bookings/create', 'BookingController.create').middleware('auth')


}).prefix('api/v1')