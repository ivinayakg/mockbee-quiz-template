## Quiz Backend

This folder contains the Mock Backend created for Quiz App. It contains different API end-points and database configuration for building Quiz; so that you can focus on building Frontend.


#Documentation for Quiz App
This template is especially created with keeping in mind that people who are q=making a quiz app can ahve a temproroy running API without thinking about backend development.

###Note for fellow neog students
(if not then skip this, not relevant for you)
This backend is made identical to how we use mockbackend for development, so the limitation as well as the shortcomings of that project is by default inherited by this template, but i tried to include 1-2 new API's which i believe will help everyone.
Most of the Documentation for this is copied from the official mockbee docs. Find out more [here](https://mockbee.netlify.app/)


##Getting started first fork this and then clone it on your github and local environment.

##Setting up JWT Secret for Authentication#
For Authentication, mockBee provides JWT authentication strategy out of the box. The JWT requires a JWT_SECRET Key, which is essentially a secret stored on your hosted backend setup as an environment variable. Read more about JWT here. Since, we are working with mock backend servers; we need to give our mock backend access to the JWT secret key. So, for that go ahead and create a .env file in your root directory of the app and add the below code in it:

###REACT_APP_JWT_SECRET=<your-jwt-secret>
Note that REACT_APP_ prefix is important for our frontend to identify the variables in our development setup. Read more about adding custom environment variables here.

  
##Authentication
It works the same as it does on the mockbee templates, you can read about it more [here](https://mockbee.netlify.app/docs/api/general/auth)
Apart from it i added one additional API which i beilive is going to be useful for everyone and is ging to solve a major security concern.

###Check Token ('/api/auth/checktoken')
You just  make a post request with the token in the header and it will return wether or not that token is accurate or not, in cases like refresh pages or 'Remeber Me' i belive it can be useful as you can check the authentication of your token.
  
`
axios.post('/api/auth/checktoken', {
  headers : {
    authorization : "token"
  }
})
`
