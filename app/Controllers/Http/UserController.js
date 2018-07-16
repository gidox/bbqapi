'use strict'
const User = use('App/Models/User');
class UserController {
  
  async login({request, auth, response}) {

    const {email, password} = request.all();
    let token = await auth.attempt(email, password);
    token.user = await User.find(email);

    return response.status(200).json({data: token, message: 'Login successfull', status: true});

  }

  async create ({request, response}){
    try {
      const userInfo = request.only(['email', 'password', 'zipCode'])

      const user = new User()
      user.email = userInfo.email
      user.password = userInfo.password
      user.zipCode = userInfo.zipCode
  
      await user.save()


      return response.status(201).json(user)
    } catch (err) {
      return response.status(404).json({data: err})
    }

  }

  async logout({auth, response}) {

    await auth.logout()
    return response.status(200).json({ message: 'Logged out', status: true});

  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }
    return auth.user
  }
}

module.exports = UserController
