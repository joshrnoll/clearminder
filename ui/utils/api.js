import { apiUrl } from './constants.js'

export function getTutorialStatus(){
  return fetch(`${apiUrl}/user/tutorial-complete`, { credentials: "include" })
  .then(res => {
    if (!res.ok){
      if (res.status >= 400 && res.status < 500){
        localStorage.removeItem("loggedInUser")
      }
    }
    else{
      return res.json()
    }
  })
  .then(data => {
    return data[0].tutorial_complete
  })
  .catch(err => {
    alert('There was an error. Please check the console.')
    console.error(err)
  })
}

export function setTutorialStatus(status){
  let newStatus = fetch(`${apiUrl}/user/tutorial-complete/${status}`, {
    method: "PATCH",
    credentials: "include",
  })
  .then(res => {
    if (!res.ok){
      if (res.status >= 400 && res.status < 500){
        localStorage.removeItem("loggedInUser")
      }
    }
    else{
      return res.json()
    }
  })
  .then(data => {
    return data[0].tutorial_complete
  })
  .catch(err => {
    alert('There was an error. Please check the console.')
    console.error(err)
  })
  return newStatus
}