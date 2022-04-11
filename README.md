## Quiz Backend

This folder contains the Mock Backend created for Quiz App. It contains different API end-points and database configuration for building Quiz; so that you can focus on building Frontend.


# Documentation for Quiz App
This template is especially created with keeping in mind that people who are making a quiz app can have a temporary running API without thinking about backend development.

### Note for fellow neog students
(if not then skip this, not relevant for you)
This backend is made identical to how we use mockbackend for development, so the limitation as well as the shortcomings of that project is by default inherited by this template, but i tried to include 1-2 new API's which i believe will help everyone.
Most of the Documentation for this is copied from the official mockbee docs. Find out more [here](https://mockbee.netlify.app/)


## Getting started first fork this and then clone it on your github and local environment.

## Setting up JWT Secret for Authentication#
For Authentication, mockBee provides JWT authentication strategy out of the box. The JWT requires a JWT_SECRET Key, which is essentially a secret stored on your hosted backend setup as an environment variable. Read more about JWT here. Since, we are working with mock backend servers; we need to give our mock backend access to the JWT secret key. So, for that go ahead and create a .env file in your root directory of the app and add the below code in it:

 > REACT_APP_JWT_SECRET= write_any_gibberish_you_want_to_here
  
Note that REACT_APP_ prefix is important for our frontend to identify the variables in our development setup. Read more about adding custom environment variables here.

  
## Authentication
It works the same as it does on the mockbee templates, you can read about it more [here](https://mockbee.netlify.app/docs/api/general/auth)
Apart from it i added one additional API which i beilive is going to be useful for everyone and is ging to solve a major security concern.

### Check Token ('/api/auth/checktoken')
You just  make a post request with the token in the header and it will return wether or not that token is accurate or not, in cases like refresh pages or 'Remeber Me' i belive it can be useful as you can check the authentication of your token.
  
```
axios.post('/api/auth/checktoken', {
  headers : {
    authorization : "token"
  }
})
```
  
## Catrergories
It has catergories API which works identical to any catergory API you can find to mockbee, check [here](https://mockbee.netlify.app/docs/api/apps/e-commerce#1-get-apicategories) for reference.

## Quizzes

### Data Structure Of Quiz in the backend
this structure needed to be followed in the exact way only to get all the APIs working perfectly.<br>
`(Note- you can use your custom data structure if want to there is no problem with that but keep in mind that the API for getting a question by if using the route '/api/quizzes/:quizId/:questionId' will not work)`
```
{
  _id: "3fe39675-140b-4075-82f3-949a4dc95d18",
  title: "You Can WIN",
  totalScore: 20,
  mcqs: [
    { "this below is the how a question should look like in every quiz"
      _id: "dddcd7a2-a479-482e-ae82-d55e2468534d",
      question: "Which season Harvey is the Most Badass One",
      options: ["Season 1", "Season 2", "Season 6", "Every Season"],
      answer: "Every Season",
    }, etc.
  ],
  catergoryName: "TV Show",
}
```


### Get All quizes
* API Route : '/api/quizzes'
* Type : 'GET'
* Request Headers : 'Default'
* Functionality: 'Get All Quizzes from the backend'
* Response : 
  ```
  {
    data : {
      quizes
    }
  }
  ```
  
## Get Quiz By Id
* API Route : '/api/quizzes/:quizId'
* Type : 'GET'
* Request Headers : 'Default'
* Functionality: 'Get Quiz by id from the backend'
* Response : 
  ```
  {
    data : {
      quiz
    }
  }
  ```
  
## Get question by id 
* API Route : '/api/quizzes/:quizId/:questionId'
* Type : 'GET'
* Request Headers : 'Default'
* Functionality: 'Get question by id of a particular question by id from the backend'
* Response : 
  ```
  {
    data : {
      question
    }
  }
  ```
  
## Create a quiz
* API Route : '/api/quizzes'
* Type : 'POST'
* Request Headers : 'authorization: encodedToken'
* Functionality: 'Create A Quiz'
* Request Body : 
  ```
  {
    quiz
  }
  ```
* Response : 
  ```
  {
    createdQuiz
  }
  ```
* Structure for quiz in request body :<br>
```
{"here you dont need to add _id as it would be added from the backend"\
  title: "You Can WIN",
  totalScore: 20,
  mcqs: [
    { "this below is the how a question should look like in every quiz"
      _id: uuid,
      question: "Which season Harvey is the Most Badass One",
      options: ["Season 1", "Season 2", "Season 6", "Every Season"],
      answer: "Every Season",
    }, etc.
  ],
  catergoryName: "TV Show",
}
```
  
## Post result of quiz on the backend
* API Route : '/api/quizzes/result'
* Type : 'POST'
* Request Headers : 'authorization: encodedToken'
* Functionality: 'Create A Qui'
* Request Body : 
  ```
  {
    score : "The points awarded"
    quizTaken : quiz (quiz which is taken by the user)
  }
  ```
* Response : 
  ```
  {
    user (with new score, and knwoledge level)
  }
  ```
