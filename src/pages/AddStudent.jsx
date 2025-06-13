import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Nav from '../compunt/Nav';

function AddStudent() {
  const [isStudent, setIsStudent] = useState("");
  const [studentData, setStudentData] = useState({ name: '', email: '', teacher: '' });
  const [teacherData, setTeacherData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    axios.post('https://68219a05259dad2655afc16d.mockapi.io/post', studentData)
      .then(() => {
        Swal.fire('Success!', `The student ${studentData.name} has been added!`, 'success');
        setStudentData({ name: '', email: '', teacher: '' });
        navigate('/Admin');
      });
  };

  const handleSubmitTeacher = (e) => {
    e.preventDefault();
    axios.post('https://6846ae5e7dbda7ee7aafef00.mockapi.io/teachers', teacherData)
      .then(() => {
        Swal.fire('Success!', `The teacher ${teacherData.name} has been added!`, 'success');
        setTeacherData({ name: '', email: '' });
        navigate('/Admin');
      });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">Add Student or Teacher</h1>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsStudent(true)}
              className={`px-6 py-2 mr-2 rounded-md ${isStudent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Add Student
            </button>
            <button
              onClick={() => setIsStudent(false)}
              className={`px-6 py-2 rounded-md ${!isStudent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Add Teacher
            </button>
          </div>

          {isStudent ? (
            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Assigned Teacher</label>
                <input
                  type="text"
                  name="teacher"
                  value={studentData.teacher}
                  onChange={(e) => setStudentData({ ...studentData, teacher: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md">Add Student</button>
            </form>
          ) : (
            <form onSubmit={handleSubmitTeacher} className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={teacherData.name}
                  onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={teacherData.email}
                  onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md">Add Teacher</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default AddStudent;
