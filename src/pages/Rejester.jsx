import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2'; 

function Rejester() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const [role] = useState('Student'); 

    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;

        if (!email) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Email is required',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Email is invalid',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else if (!email.includes("Tuwaiq")) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Email must contain "Tuwaiq"',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
        if (!password) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Password is required',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else if (password.length < 4) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Password should be at least 4 characters',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
        if (!username) {
            isValid = false;
            Swal.fire({
                title: 'Error!',
                text: 'Username is required',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else if (username.length < 4) {
         isValid = false;
          Swal.fire({
        title: 'Error!',
        text: 'Username must be at least 4 characters long.',
        icon: 'error',
        confirmButtonText: 'Okay'
    });
}

        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('https://68219a05259dad2655afc16d.mockapi.io/log-in', {
                email,
                password,
                username,
                role
            })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful!',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
                navigate('/login'); 
            })
          
           
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
                <div className="absolute w-96 h-96 bg-indigo-400 rounded-full opacity-30 top-[-100px] left-[-100px]"></div>
                <div className="absolute w-80 h-80 bg-purple-500 rounded-full opacity-20 top-[100px] right-[-80px]"></div>
                <div className="absolute w-72 h-72 bg-indigo-600 rounded-full opacity-25 bottom-[-150px] left-[-50px]"></div>
                <div className="absolute w-60 h-90 bg-purple-900 rounded-full opacity-25 bottom-[-100px] right-[-50px]"></div>

            <div className="text-center relative z-10 p-8 w-full max-w-md bg-[#fafafa] px-10 py-8 rounded-3xl mt-8 shadow-2xl">
                <h1 className="text-4xl font-semibold text-black mb-8">Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <label className="text-black text-lg font-medium mb-2 block">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="w-full p-4 bg-[#f3f3f3] text-black border border-gray-300 rounded-lg placeholder-gray-400"
                            required
                            placeholder="Email is @Tuwaiq.com"
                        />
                    </div>
                    <div className="mb-6 mt-5">
                        <label className="block text-lg font-medium mb-2 text-black">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className="w-full p-4 bg-[#f3f3f3] text-black border border-gray-300 rounded-lg placeholder-gray-400 "
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-2 text-black">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            className="w-full p-4 bg-[#f3f3f3] text-black border border-gray-300 rounded-lg placeholder-gray-400"
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 mt-4 rounded-lg bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Rejester;
