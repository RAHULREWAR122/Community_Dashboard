import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import AddCommunity from './AddCommunity';
import Model from '../Components/Model';
import { api } from '../Api/api';

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm ,setShowForm] = useState(false);
  const navigate = useNavigate();  


  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`${api}/communities`);
        setCommunities(response.data);
      } catch (err) {
        setError('Failed to fetch communities');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [navigate ,setShowForm, loading]);
   

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
   
  return (<>
    {showForm && <AddCommunity showForm={showForm} setShowForm={setShowForm}/>}
    <div className="container mx-auto px-4 py-10">
      <div className='w-full flex justify-end items-center'>
      <button
            onClick={()=>setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Add New Community
          </button>
 
      </div>
      <h1 className="text-3xl font-semibold text-center mb-10">All Communities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((community) => (
          <div
            key={community._id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{community.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{community.desc}</p>
              <div className="mt-4">
                <NavLink to={`/${community._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  View Posts
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
};

export default AllCommunities;
