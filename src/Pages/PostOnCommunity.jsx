import axios from "axios";
import React, { useState } from "react";
import Loading from "../Components/Loading";
import Model from "../Components/Model";
import { api } from "../Api/api";


function PostOnCommunity({ setShowForm, showForm , communityId }) {
  const [data, setData] = useState({
    title : "",
    desc: "",
  });
   
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setShowModel(true);
      return
    }

    setLoading(true);

    if (!data.title.trim() || !data.desc.trim()) {
      setLoading(false);
      return alert("Both fields are required");
    }

    const newData = {
        username : user?.username,
        userId : user?._id,
        title : data?.title,
        desc : data?.desc
    };
    
    try {
      const req = await axios.post(`${api}/addPost/${communityId}`, newData,{
        headers: {
          Authorization: `${token}`,
        },
      });

      if (req.status === 201) {
        alert("post create successfully");
        setShowForm(false);
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          alert(data.message || "both fields are required.");
        } else if (status === 401) {
          alert(data.message || "Unauthorized");
        }
        if (status === 403) {
          alert(data.message || "Unauthorized, Invalid User.");
        } else if (status === 500) {
          alert(
            data.message || "Internal Server Error. Please try again later."
          );
        }
      } else if (err.request) {
        alert("No response from server. Please try again later.");
      } else {
        alert(err.message || "An unexpected error occurred.");
      }
    } finally {
      setData({
        title: "",
        desc: "",
      });
      setLoading(false);
    }
  };

  return (<>
     {loading && <Loading/>}
     {showModel && <Model setShowModel={setShowModel} msg={"Please login to add new Post."}/>}
    <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-[3px]">
      <div className="relative w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="absolute rounded-l-md bg-red-500 hover:bg-red-600 text-white font-semibold text-lg top-0 right-0 px-4 py-2"
        >
          X
        </button>
        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">
              Add New Post
            </h2>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="desc"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              Post Description
            </label>
            <textarea
              name="desc"
              value={data.desc}
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add new Post
            </button>
          </div>
        </form>
      </div>
    </div>
    </>);
}

export default PostOnCommunity;
