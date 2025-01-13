import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostOnCommunity from './PostOnCommunity';
import { api } from '../Api/api';

const CommunityPosts = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm , setShowForm] = useState(false);
  
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get(`${api}/communities/${communityId}`);
        setCommunity(response.data);
      } catch (err) {
        setError('Failed to fetch community data');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [ setShowForm, loading , communityId, showForm ]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (<>
     {showForm && <PostOnCommunity communityId = {communityId} showForm={showForm} setShowForm={setShowForm}/>}
    <div className="container mx-auto px-4 py-10">
       <div className='w-full flex justify-end items-center'>
           <button className='bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-lg' onClick={()=>setShowForm(!showForm)}>Add New Post</button>
        </div> 
      <h2 className='text-center text-2xl font-semibold'>Our Community Posts</h2>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">{community?.title}</h1>
        <p className="mt-2 text-lg text-gray-600">{community?.desc}</p>
      </div>
      
      <div className="space-y-10">
        {community && community?.length > 0 ? (
          community?.map((post) => (
            <div
              key={post?._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{post?.title}</h3>
                <p className="text-gray-600 mt-2">{post?.desc}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Posted by {post?.username}</span>
                <span>{new Date(post?.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No posts available for this community.</div>
        )}
      </div>
    </div>
    </>);
};

export default CommunityPosts;
