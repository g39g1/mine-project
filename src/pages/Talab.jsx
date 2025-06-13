import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CiSearch } from 'react-icons/ci';

function Talab() {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
   

    axios.get('https://6846ae5e7dbda7ee7aafef00.mockapi.io/teachers')
      .then((res) => setTeachers(res.data))

    axios.get('https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas')
      .then((res) => setIdeas(res.data.filter(idea => idea.status === 'Approved')))
  }, []);

  const handleAddIdea = (e) => {
    e.preventDefault();
    const newIdeaData = { idea: newIdea, status: 'Pending' };
    axios.post('https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas', 
      
      newIdeaData)

      .then(() => {
        Swal.fire('Success!', 'Your idea has been added successfully!', 'success');
        setNewIdea('');
      });
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="flex-grow min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-8 flex flex-col items-center">
          <div className="w-full border-b-4 border-[#2B39A0] mb-6">
            <h1 className="text-3xl font-semibold text-black pb-3 text-center">Student Dashboard</h1>
          </div>

          <div className="flex w-full mb-4 justify-between items-center">
            <div className="flex max-sm:w-1/2 justify-start items-center mx-auto">
              <div className="relative w-80">
                <div className="absolute inset-y-0 flex items-center pl-3">
                  <CiSearch className="text-gray-500" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-6 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search for an idea"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
               
              </div>
            </div>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-semibold mb-4">Approved Ideas</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                  <th className="px-6 py-4 border text-center">Idea</th>
                  <th className="px-6 py-4 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                  {ideas.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition duration-300">
                      <td className="px-6 py-4 text-center">{item.idea}</td>
                      <td className="px-6 py-4 text-center">{item.status}</td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Idea</h2>
            <form onSubmit={handleAddIdea} className="space-y-4">
              <textarea
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="Enter your idea here..."
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white py-3 rounded-md hover:bg-[#3c4e7c] transition duration-300"
              >
                Add Idea
              </button>
            </form>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-semibold mb-4">information Teachers</h2>
            {teachers.map((item) => (
              <ul key={item.id} className="space-y-4">
                <li className="bg-gray-100 p-4 rounded-md shadow-md">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Talab;
