import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../Api/api';

const Register = () => {
  const [formData , setFormData] = useState({
     username :'',
     email : '',
     password : '',
     role : 'User'
  })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e)=>{
     const {name , value} = e.target;
     setFormData({
        ...formData ,
        [name] : value
     })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
     const {username , email, password , role} = formData;
    if(!username.trim() || !email.trim() || !role.trim()){
        setLoading(false) 
        return setError("All fields are required");
    }
    if(password.length <= 5){
        setLoading(false)
        return setError("password must be 6 character long.")
    }

    try {
      const req = await axios.post(`${api}/register`, formData);
    if(req.status === 201){
        console.log(req?.data?.message || "register success");
        navigate('/login')
     }
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
              if (status === 400) {
                setError(data.message  || "Invalid username or Password.");
              } else if (status === 500) {
                setError(data.message || "Internal Server Error. Please try again later.");
              }
            } else if (err.request) {
              setError("No response from server. Please try again later.");
            } else {
              setError(err.message || "An unexpected error occurred.");
            }
        }finally{
            setFormData({
                username :'',
                email : '',
                password : '',
                role : ''  
            });
            setLoading(false);
        }          
  };

  
  if(error && error.length > 1) {
  setTimeout(()=>{
     setError('')
  },3000)
}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              name='username'
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select
              id="role"
              name="role"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Register
          </button>
        </form>
        <p className='text-center mt-4'>Already have an account? <NavLink to={'/login'} className='text-blue-500 underline'>Login</NavLink></p> 
      </div>
    </div>
  );
};

export default Register;
