import { useNavigate } from "react-router-dom"

export  const userls = ()=>(
  
localStorage.getItem("user") !== undefined
  ? JSON.parse(localStorage.getItem("user"))
  : localStorage.clear())