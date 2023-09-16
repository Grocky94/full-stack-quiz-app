import React, { useState } from 'react'
import axios from "axios"

const Register = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "" });
  // console.log(userData)
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password && userData.role) {
      try {
        const response = await axios.post("http://localhost:5000/register", { userData })
        if (response?.data?.success) {
          alert(response.data.message)
          setUserData({ name: "", email: "", password: "", role: "" })
        } else {
          alert(response.data.message)

        }
      } catch (error) {
        alert(error.message)
      }
    } else {
      alert("all field are required")
    }

  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label >Name:</label><br />
          <input type='text' name='name' onChange={handleChange} value={userData.name} /><br />
          <label >Email:</label><br />
          <input type='email' name='email' onChange={handleChange} value={userData.email} /><br />
          <label >password:</label><br />
          <input type='password' name='password' onChange={handleChange} value={userData.password} /><br />
          <select onChange={handleChange} name='role'>
            <option></option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select><br />
          <input type='submit' value="Register" />
        </form>
      </div>
    </div>
  )

}
export default Register
