import { apiUrl } from './constants.js'

function authCheck(res){
  try{
    if (!res.ok){
      if (res.status === 401 || res.status === 403){
        localStorage.removeItem("loggedInUser")
        return Promise.reject(new Error('Authentication required'))
      }
      else{
        return Promise.reject(new Error('Error contacting API server'))
      }
    }
    else{
      return res.json()
    }
  }
  catch{
    console.error('Invalid result object passed to helper function "authCheck"')
  }
}

export function getTutorialStatus(){
  return fetch(`${apiUrl}/user/tutorial-complete`, { credentials: "include" })
  .then(res => authCheck(res))
  .then(data => data[0].tutorial_complete)
  .catch(err => console.error(err))
}

export function setTutorialStatus(status){
  return fetch(`${apiUrl}/user/tutorial-complete/${status}`, {
    method: "PATCH",
    credentials: "include",
  })
  .then(res => authCheck(res))
  .then(data => data[0].tutorial_complete)
  .catch(err => console.error(err))
}

export function getInbox(){
  return fetch(`${apiUrl}/inbox`, { credentials: "include" })
  .then(res => authCheck(res))
  .then(data => data)
  .catch(err => console.error(err))
}