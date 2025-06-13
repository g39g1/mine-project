import React, { useState, useEffect } from 'react'; 
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa"; 
import { CiSearch } from "react-icons/ci"; 
import { AiOutlineClose } from "react-icons/ai"; 
import axios from 'axios'; 
import { useNavigate } from 'react-router'; 
import Swal from 'sweetalert2';  
import Nav from '../compunt/Nav'; 

function Admin() {     
    const [students, setStudents] = useState([]);     
    const [teachers, setTeachers] = useState([]);  
    const [searchTerm, setSearchTerm] = useState('');        
    const [currentStudentPage, setCurrentStudentPage] = useState(0);     
    const [currentTeacherPage, setCurrentTeacherPage] = useState(0);     
    const rowsPerPage = 3;     
    const navigate = useNavigate();      

    useEffect(() => {         
        axios.get('https://68219a05259dad2655afc16d.mockapi.io/post')             
            .then(res => {                 
                setStudents(res.data);             
            });


        axios.get('https://6846ae5e7dbda7ee7aafef00.mockapi.io/teachers')  
            .then(res => {                 
                setTeachers(res.data);             
            });
    }, []);      

    const startStudent = currentStudentPage * rowsPerPage;     
    const currentStudentRows = students.slice(startStudent, startStudent + rowsPerPage);     
    const totalStudentPages = Math.ceil(students.length / rowsPerPage);      

    const startTeacher = currentTeacherPage * rowsPerPage;     
    const currentTeacherRows = teachers.slice(startTeacher, startTeacher + rowsPerPage);     
    const totalTeacherPages = Math.ceil(teachers.length / rowsPerPage);      

    const deleteStudent = (id) => {         
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data once deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((res) => {
            if (res) {
                axios.delete(`https://68219a05259dad2655afc16d.mockapi.io/post/${id}`)
                    .then(() => {
                        setStudents(students.filter(student => student.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'The student has been deleted successfully.',
                            'success'
                        );
                    });
            }
        });
    };      

    const deleteTeacher = (id) => {         
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this teacher’s data once deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((res) => {
            if (res) {
                axios.delete(`https://6846ae5e7dbda7ee7aafef00.mockapi.io/teachers/${id}`)
                    .then(() => {
                        setTeachers(teachers.filter(teacher => teacher.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'The teacher has been deleted successfully.',
                            'success'
                        );
                    });
            }
        });
    };      

    const clearSearch = () => setSearchTerm('');      

    return (         
        <>             
            <Nav />              
            <div className="flex flex-col min-h-screen">                 
                <div className='flex-grow min-h-screen flex flex-col items-center justify-center p-4'>                     
                    <div className='w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center'>                         
                        <div className="w-full border-b-4 border-[#2B39A0] mb-4">                             
                            <h1 className='text-3xl font-bold text-black pb-2 text-center'>                                 
                                Students                             
                            </h1>                         
                        </div>                          
                        <div className='flex w-full mb-4 justify-between items-center'>                             
                            <div className='flex md:w-[90%] max-sm:w-1/2 justify-start items-center mx-auto'>                                 
                                <div className='relative w-80'>                                     
                                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>                                         
                                        <CiSearch className="text-gray-500" />                                     
                                    </div>                                      
                                    <input                                         
                                        type='search'                                         
                                        className='block w-full pl-10 pr-6 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'                                         
                                        placeholder="Search for a student"                                         
                                        value={searchTerm}                                         
                                        onChange={(e) => {                                             
                                            setSearchTerm(e.target.value)                                         
                                        }}                                     
                                    />                                      
                                    {searchTerm && (                                         
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">                                             
                                            <AiOutlineClose                                                 
                                                className="text-gray-500 cursor-pointer"                                                 
                                                onClick={clearSearch}                                             
                                            />                                         
                                        </div>                                      
                                    )}                                 
                                </div>                             
                            </div>                              
                            <button                                 
                                className="hidden md:flex items-center bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white px-1 py-1 rounded-md shadow hover:shadow-md transition duration-300 transform hover:-translate-y-1 focus:outline-none"                                 
                                onClick={() => navigate('/addstudent')}                             
                            >                                 
                                <FaPlus className="mr-2 w-4 h-4" /> Add Student                             
                            </button>                         
                        </div>                          
                        <div className="overflow-hidden w-full rounded-lg shadow-lg">                             
                            <table className="min-w-full bg-white rounded-lg">                                 
                                <thead>                                     
                                    <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">                                         
                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold hidden md:table-cell">Name</th>                                         
                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold">Email</th>                                         
                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold">Actions</th>                                     
                                    </tr>                                 
                                </thead>                                 
                                <tbody>                                     
                                    {currentStudentRows                                         
                                        .filter(student =>                                             
                                            (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))                                         
                                        )                                         
                                        .map((item) => (                                             
                                            <tr key={item}                                              
                                                className="hover:bg-blue-50 transition duration-300">                                             
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800 hidden md:table-cell">                                                    
                                                    {item.name}                                                 
                                                </td>                                                 
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800 text-sm md:text-base">                                                    
                                                    {item.email}                                                 
                                                </td>                                                 
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800">                                                 
                                                    <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4">                                                         
                                                        <button                                                            
                                                            className="flex items-center text-[#3a46a1] hover:text-blue-500 mb-2 md:mb-0"                                                         
                                                        >                                                            
                                                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#3a46a1">                                                            
                                                                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />                                                            
                                                            </svg>                                                         
                                                        </button>                                                         
                                                        <button                                                            
                                                            onClick={() => deleteStudent(item.id)}                                                            
                                                            className="flex items-center text-red-600 hover:text-red-400"                                                         
                                                        >                                                            
                                                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000">                                                            
                                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />                                                            
                                                            </svg>                                                         
                                                        </button>                                                    
                                                    </div>                                                 
                                                </td>                                             
                                            </tr>                                         
                                        ))}                                     
                                </tbody>                                 
                            </table>                             
                        </div>                         
                         <div className="flex items-center justify-center w-full mt-4">
                            <button
                                onClick={() => setCurrentStudentPage(prev => Math.max(prev - 1, 0))}
                                className={`flex items-center p-2 rounded-full ${currentStudentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2B39A0] text-white hover:bg-[#444c8a]'}`}
                                disabled={currentStudentPage === 0}
                            >
                                <FaChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="mx-4 text-lg">
                                Page {currentStudentPage + 1} of {totalStudentPages}
                            </span>
                            <button
                                onClick={() => setCurrentStudentPage(prev => (prev + 1) < totalStudentPages ? prev + 1 : prev)}
                                className={`flex items-center p-2 rounded-full ${currentStudentPage + 1 >= totalStudentPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2B39A0] text-white hover:bg-[#444c8a]'}`}
                                disabled={currentStudentPage + 1 >= totalStudentPages}
                            >
                                <FaChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-8 w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <div className="w-full border-b-4 border-[#2B39A0] mb-4">                             
                                <h1 className='text-3xl font-bold text-black pb-2 text-center'>                                 
                                    Teachers                             
                                </h1>                         
                            </div>
                            <table className="min-w-full bg-white rounded-lg">                                 
                                <thead>                                     
                                    <tr className="bg-gradient-to-r from-[#676ea1] to-[#2B39A0] text-white">                                         

                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold hidden md:table-cell">Name</th>                                         
                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold">Email</th>                                         
                                        <th className="p-4 text-center border-b-2 border-gray-300 text-lg font-semibold">Actions</th>                                     
                                    </tr>                                 
                                </thead>                                 
                                <tbody>                                     
                                    {currentTeacherRows                                         
                                        .filter(teacher =>                                             
                                            (teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase()))                                         
                                        )                                         
                                        .map((item) => (                                             
                                            <tr key={item}                                              
                                                className="hover:bg-blue-50 transition duration-300">                                             
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800 hidden md:table-cell">                                                    
                                                    {item.name}                                                 
                                                </td>                                                 
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800 text-sm md:text-base">                                                    
                                                    {item.email}                                                 
                                                </td>                                             
                                                <td className="p-4 text-center border-b border-gray-200 text-gray-800">                                                 
                                                    <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4">                                                         
                                                        <button                                                            
                                                            className="flex items-center text-[#3a46a1] hover:text-blue-500 mb-2 md:mb-0"                                                         
                                                        >                                                            
                                                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#3a46a1">                                                            
                                                                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />                                                            
                                                            </svg>                                                         
                                                        </button>                                                         
                                                        <button                                                            
                                                            onClick={() => deleteTeacher(item.id)}                                                            
                                                            className="flex items-center text-red-600 hover:text-red-400"                                                         
                                                        >                                                            
                                                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000">                                                            
                                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />                                                            
                                                            </svg>                                                         
                                                        </button>                                                    
                                                    </div>                                                 
                                                </td>                                             
                                            </tr>                                         
                                        ))}                                     
                                </tbody>                                 
                            </table>                         
                        </div>                       
                        <div className="flex items-center justify-center w-full mt-4">
                            <button
                                onClick={() => setCurrentTeacherPage(prev => Math.max(prev  -1, 0))}
                                className={`flex items-center p-2 rounded-full ${currentTeacherPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2B39A0] text-white hover:bg-[#444c8a]'}`}
                                disabled={currentTeacherPage === 0}
                            >
                                <FaChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="mx-4 text-lg">
                                Page {currentTeacherPage + 1} of {totalTeacherPages}
                            </span>
                            <button
                                onClick={() => setCurrentTeacherPage(prev => (prev + 1) < totalTeacherPages ? prev + 1 : prev)}
                                className={`flex items-center p-2 rounded-full ${currentTeacherPage + 1 >= totalTeacherPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2B39A0] text-white hover:bg-[#444c8a]'}`}
                                disabled={currentTeacherPage + 1 >= totalTeacherPages}
                            >
                                <FaChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>             
                </div>         
            </div>         
        </>     
    ); 
}  

export default Admin;
