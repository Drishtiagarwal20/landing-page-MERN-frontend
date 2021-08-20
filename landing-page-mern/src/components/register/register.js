import React, { useState } from "react"
import "./register.css"
import axios from "axios" // for extracting the API
import { useHistory } from "react-router-dom"

const Register=()=>{

    const history=useHistory()

// reactjs will automatically update the values
    const [ user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

    /* onChange=changes made will be triggered */
    const handleChange = e => {
        const {name,value}=e.target;
        setUser({
            // values entered should be displayed as it is
            ...user, //spread operator
            [name]:value
        })
    }


    const register=()=>{
        const {name,email,password,reEnterPassword}= user
        //to check that some value is entered in the fields and both the passwords are same or not
        if(name && email && password && (password===reEnterPassword)){
            // alert("posted")
            axios.post("http://localhost:9002/register", user) //user is passed in order to grt the values in the backend
            .then( res=>{
                alert(res.data.message)
                history.push("/login")
             }) //only after the post request
        }else{
            alert("invalid input")
        }
    }


    return (
        <div className="register">
            <h1>Register</h1>
           
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email}  placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password}  placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword}  placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={ ()=>history.push("/login")}>Login</div>
        </div>
    )
}
export default Register