import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    axios.get('https://68219a05259dad2655afc16d.mockapi.io/log-in')
      .then(res => {
        const users = res.data;
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
          Swal.fire({
            title: 'Welcome!',
            text: `Welcome ${user.role}`,
            icon: 'success',
            confirmButtonText: 'Okay'
          });

          localStorage.setItem('loggedInUser', JSON.stringify(user));

          if (user.role === 'admin') {
            navigate('/Admin');  
          } else if (user.role === 'Teacher') {
            navigate('/Teacher'); 
          } else if (user.role === 'Student') {
            navigate('/Talab'); 
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Invalid email or password!',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      })
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
   
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full opacity-30 top-[-100px] left-[-100px]"></div>
        <div className="absolute w-80 h-80 bg-purple-500 rounded-full opacity-20 top-[100px] right-[-80px]"></div>
        <div className="absolute w-72 h-72 bg-indigo-600 rounded-full opacity-25 bottom-[-150px] left-[-50px]"></div>
        <div className="absolute w-60 h-90 bg-purple-900 rounded-full opacity-25 bottom-[-100px] right-[-50px]"></div>
      

      <div className="text-center p-8 w-full max-w-md bg-[#fafafa] px-10 py-8 rounded-3xl mt-8 shadow-2xl text-black">
        <h1 className="text-4xl font-semibold text-black mb-8">Login</h1>
        
        <form onSubmit={handleLogin}>

          <div className="mt-6">
            <label className=" text-lg font-medium mb-2 block text-black">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => 
                setEmail(e.target.value)}
              required
              placeholder="Enter your email"
             className="w-full p-4  text-black border-1 border-gray-600 rounded-lg placeholder-gray-400"

            />
          </div>

          <div className="flex flex-col justify-center mt-6 text-center">
            <label className=" text-lg font-medium mb-2  text-black">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4  text-black border-1 border-gray-600 rounded-lg placeholder-gray-400"
              required
              placeholder="Enter your Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-9 rounded-lg bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
