
const ProtectApp = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"))
         
  if (!user || !token){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = "/" 
    }else{    
    return children;
  }
};

export default ProtectApp;
