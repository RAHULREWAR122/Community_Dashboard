import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { api } from '../Api/api';

const Login = () => {
  const [formData , setFormData] = useState({
     email : '',
     password :''
  })
  const [error, setErr] = useState('');
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setFormData({
     ...formData,
     [name] : value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!formData.email.trim() || !formData.password.trim()){
        setLoading(false); 
        return setErr("both fields are required.") 
    }
    if(formData.password.length <=5 ){
        setLoading(false); 
        return setErr("Password must be 6 character long.") 
    }
    

    try {
      const req = await axios.post(`${api}/login`, formData);
      alert('Login Successful!');
      if(req.status === 200){
          console.log(req.data)
          localStorage.setItem("token" , JSON.stringify(req.data?.token))
          localStorage.setItem("user" , JSON.stringify(req.data?.user))
          setTimeout(()=>{
            navigate('/')
          },2000)
      }
    } catch (err) {
        if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          setErr(data.message  || "Unauthorized Invalid username or Password.");
        } else if (status === 500) {
          setErr(data.message || "Internal Server Error. Please try again later.");
        }
      } else if (err.request) {
        setErr("No response from server. Please try again later.");
      } else {
        setErr(err.message || "An unexpected error occurred.");
      }        
    }finally{
     setFormData({
        email : '',
        password :''   
     }) 
     setLoading(false); 
    }
  };

  if(error && error.length > 1) {
    setTimeout(()=>{
       setErr('')
    },3000)
  }

  return (<>
     {loading && <Loading/>}
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
    <p className='text-center mt-4'>Don't have an account yet? <NavLink to={'/register'} className='text-blue-500 underline'>Register</NavLink></p>
      </div>
    </div>
    </>);
};

export default Login;
