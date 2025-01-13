import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import AllCommunities from './Pages/AllCommunities';
import CommunityPosts from './Pages/CommunityPosts';
import Navbar from './Components/Navbar';


function App() {
  return (<>
    <Router>
    <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<AllCommunities/>}/>
      <Route path="/:communityId" element={<CommunityPosts/>}/>
   </Route>  
      <Route path="/login" element={<Login/>} />        
      <Route path="/register" element={<Register/>} />        
      <Route path="*" element={<div>Error Page Not Found</div>} />        
    </Routes>
  </Router>
  </>);
}

function Layout() {
 
  return (
    <>
      <Navbar/>
     <Outlet/>
    </>
  );
}

export default App;
