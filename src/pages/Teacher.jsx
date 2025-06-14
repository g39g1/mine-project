import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router';

function Teacher() {
  const [students, setStudents] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    axios.get(`https://68219a05259dad2655afc16d.mockapi.io/post?teacherId=${id}`)
      .then((res) => setStudents(res.data));

    axios.get(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas?teacherId=${id}`)

      .then((res) => setIdeas(res.data.filter(idea => idea.status === 'Pending')));
  }, [id]);

  const handleApproveIdea = (id) => {
    Swal.fire({
      title: 'Are you sure you want to approve this idea?',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((res) => {
      if (res) {
        axios.put(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas/${id}`, { status: 'Approved' })
          .then(() => {
            setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, status: 'Approved' } : idea)));
            Swal.fire('Approved!', 'The idea has been approved successfully', 'success');
          });
      }
    });
  };

  const handleRejectIdea = (id) => {
    Swal.fire({
      title: 'Reason for Rejection',
      input: 'text',
      inputPlaceholder: 'Enter the reason for rejection',
      showCancelButton: true,
      confirmButtonText: 'Reject',
    }).then((res) => {
      if (res) {
        axios.put(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/ideas/${id}`, { status: 'Rejected', res })
          .then(() => {
            setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, status: 'Rejected', res } : idea)));
            Swal.fire('Rejected!', 'The idea has been rejected successfully with the reason provided', 'error');
          });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen p-4 bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="w-full border-b-4 border-[#2B39A0] mb-4">
            <h1 className="text-3xl font-semibold text-black pb-3 text-center">Teacher Dashboard</h1>
          </div>

          
          <div className="w-full mb-6">
            <h2 className="text-xl font-semibold mb-4">Students Under Your Management</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                  <th className="px-6 py-4 border text-center">Student Name</th>
                  <th className="px-6 py-4 border text-center">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition duration-300">
                    <td className="px-6 py-4 text-center">{item.name}</td>
                    <td className="px-6 py-4 text-center">{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full mb-6">
            <h2 className="text-xl font-semibold mb-4">Pending Ideas for Approval</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">
                  <th className="px-6 py-4 border text-center">Idea</th>
                  <th className="px-6 py-4 border text-center">Status</th>
                  <th className="px-6 py-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ideas.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition duration-300">
                    <td className="px-6 py-4 text-center">{item.idea}</td>
                    <td className="px-6 py-4 text-center">{item.status}</td>
                    <td className="px-6 py-4 text-center">
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
  );
}

export default Teacher;
