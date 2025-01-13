import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../Api/api";

function Navbar() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [errorMeg, setErrorMeg] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUserList([]);
        setErrorMeg("");
        return;
      }

      try {
        const req = await axios.get(
          `${api}/search/${search}`
        );
        if (req.status === 200) {
          if (req.data.length === 0) {
            setUserList([]);
            setErrorMeg("No users found.");
          } else {
            setUserList(req.data);
            setErrorMeg("");
          }
        }
      } catch (error) {
        setUserList([]);
        setErrorMeg("No user found.");
      }
    };

    const timeout = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut =()=>{
     localStorage.removeItem('user')
     localStorage.removeItem('token');
     window.location.href = '/'
  }

  return (
    <>
      <div className="relative bg-blue-600 text-white p-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">
            <NavLink to={"/"} className="text-yellow-400">
              Open Community
            </NavLink>{" "}
            Hub
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>


          <div className="lg:flex items-center space-x-6 hidden">

          <div className="">
             {!user ? <div>
                  <NavLink to={'/login'} className="px-2 py-2 rounded bg-green-500 hover:bg-green-600 text-white">Login</NavLink>
             </div> : <div>
                  <button onClick={handleLogOut} className="px-2 py-2 rounded bg-red-500 hover:bg-red-600 text-white">LogOut</button>
                 </div>}
           </div> 
            <form className="flex items-center space-x-2">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search Users..."
                className="px-4 py-2 rounded-md bg-white text-black focus:outline-none"
              />
            </form>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 text-center">
            <form className="flex justify-center items-center space-x-2">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search Users..."
                className="px-4 py-2 w-full rounded-md bg-white text-black focus:outline-none"
              />
            </form>
          </div>
        )}
      </div>
        {search.length > 0 && 
      <div className="absolute z-[20] lg:w-[30%] w-full right-0 border-2 lg:top-14 top-24 bg-white shadow-xl mt-4">
        {errorMeg && <p className="text-red-500 text-center">{errorMeg}</p>}
        {userList.length > 0 && (
          <ul className="space-y-2">
            {userList.map((user, index) => (
              <li key={index} className="border-b p-2">
                <span className="text-blue-500 hover:underline">
                  {user.username}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>}
    </>
  );
}

export default Navbar;
