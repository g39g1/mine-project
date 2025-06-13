import { Link } from 'react-router'; 
import { useNavigate } from 'react-router';
function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); 
  };

  return (
    <nav className="bg-[#2c3394] text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-3xl font-bold tracking-wide hover:scale-105 transform transition duration-300">
          <img src="https://i.pinimg.com/736x/8e/90/80/8e9080b568929a595e9396ba8b23b04a.jpg" className="w-20"/>
        </div>

  
        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link to="/admin" className="hover:text-gray-300 transition duration-300">Students</Link>
          <Link to="/ideas" className="hover:text-gray-300 transition duration-300">Ideas</Link>
          <Link to="/addstudent" className="hover:text-gray-300 transition duration-300">Add Student</Link>
        </div>

        <div className="hidden md:block">
          <button className="group bg-transparent hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300" 
          onClick={handleLogout}>
            <svg height="20px" viewBox="0 -960 960 960" width="24px" className="fill-red-500 group-hover:fill-white transition duration-300">
              <path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z" />
            </svg>
          </button>
        </div>

     
      </div>

    
      
    </nav>
  );
}

export default Nav;
