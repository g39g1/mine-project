
import { Link } from 'react-router';
const Wlecome = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
      
    
       <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full opacity-30 top-[-100px] left-[-100px]"></div>
        <div className="absolute w-80 h-80 bg-purple-500 rounded-full opacity-20 top-[100px] right-[-80px]"></div>
        <div className="absolute w-72 h-72 bg-indigo-600 rounded-full opacity-25 bottom-[-150px] left-[-50px]"></div>
        <div className="absolute w-60 h-90 bg-purple-900 rounded-full opacity-25 bottom-[-100px] right-[-50px]"></div>
      </div>


      <div className="text-center relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to  Project Management</h1>
        
        <p className="text-lg md:text-xl mb-8">
          Whether you're an admin or a student or a tracher, our platform helps you stay organized and focused on success.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/Login">
            <button className="bg-white text-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition duration-300 hover:bg-blue-100">
              Log In to Your Account
            </button>
          </Link>
          <Link to="/Rejester">
            <button className="bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition duration-300 hover:bg-blue-600">
              Create New Account
            </button>
          </Link>
        </div>
      </div>
   
    </div>

  );
};

export default Wlecome;


