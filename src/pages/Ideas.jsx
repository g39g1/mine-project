import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import Nav from '../compunt/Nav';

function Ideas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios.get('https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas')
      .then((res) => {
        setIdeas(res.data);
      });
  });

  const handleRejectIdea = (id) => {
    axios.delete(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas/${id}`)
      .then(() => {
        setIdeas(ideas.filter((idea) => idea.id !== id)); 
        Swal.fire('Rejected', 'The idea has been rejected and removed', 'success');
      })
     
  };

  const handleApproveIdea = (id) => {
    Swal.fire('Approved!', 'The idea has been approved.', 'success');
    axios.put(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas/${id}`, { status: 'Approved' })
      .then(() => {
        setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, status: 'Approved' } : idea)));
      })
     
  };

  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="w-full border-b-4 border-[#2B39A0] mb-4">
              <h1 className="text-3xl font-bold text-black pb-2 text-left">Ideas</h1>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                    <th className="p-4 text-center">Name Idea</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ideas.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4 text-center">{item.idea}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleApproveIdea(item.id)}
                          className="text-green-600 hover:text-green-700 mr-4"
                        >
                          <FaCheck className="inline-block mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectIdea(item.id)} 
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTimes className="inline-block mr-2" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ideas;
