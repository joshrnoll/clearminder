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

export function userLogin(username, password){
  return fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password })
  })
  .then((res) => {
    if(res.status === 200){
      return res.json()
    }
    else if(res.status === 401){
      alert('Login failed')
    }
    else if(!res.ok){
      console.error(`Error while contacting the API server. Received status code of ${res.status}:\n${res}`)
    }
    else{
      console.error(`Something went wrong:\n${res}`)
    }
  })
}

export function userLogout(){
  return fetch(`${apiUrl}/auth/logout`)
  .then(res => {
    if (res.ok){
      localStorage.removeItem("loggedInUser")
      return res.json()
    }
  })
  .then(data => data)
  .catch(err => console.error(err))
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

export function getNextActions(){
  return fetch(`${apiUrl}/next-actions`, { credentials: "include" })
  .then(res => authCheck(res))
  .then(data => data)
  .catch(err => console.error(err))
}

export function getProjects(){
  return fetch(`${apiUrl}/projects`, { credentials: "include" })
  .then(res => authCheck(res))
  .then(data => data)
  .catch(err => console.error(err))
}

export function getSomedayMaybe(){
  return fetch(`${apiUrl}/someday-maybe`, { credentials: "include" })
  .then(res => authCheck(res))
  .then(data => data)
  .catch(err => console.error(err))
}

export function addToInbox(content){

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

  const newItem = {
    content: content,
    user_id: loggedInUser.user_id
  }

  return fetch(`${apiUrl}/inbox/add`, {
    credentials: "include",
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  .then(res => authCheck(res))
  .then(data => data)
  .catch(err => console.error(err))
}