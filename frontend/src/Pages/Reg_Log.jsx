import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
// import { useAuth } from '../../Context/Context'
import axios from 'axios'
import { FaCamera } from 'react-icons/fa';
import GoogleLogin from '../components/GoogleLogin';

// import { useError } from '../../Context/ErrorContext';

function Reg_Log() {
  const { toggleAuthPage, setUserDetails } = useState();
  const [formData, setFormData] = useState({})
  // const { triggerError } = useError();
  const navigate = useNavigate()


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function postLogin() {
    axios.post("api/v1/users/login", formData)
      .then(res => {
        setUserDetails(res.data.data.user)
        navigate("/Dashboard")
      })
      .catch(err => {
        triggerError(err)
      })
  }

  return (
    <div className="bg-gray-8 w-screen h-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 rounded-xl p-6 py-10 bg-gray-6 flex flex-col text-white gap-6 items-center">
        <div className="aspect-square w-16 bg-gray-200 rounded-full grid place-items-center"><FaCamera className='text-gray-9 text-4xl'/></div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center">WatchGuard Login</h1>
        <h2 className="text-sm text-center px-2">Hey, Enter your details to sign in to your account.</h2>
        <input
          onChange={handleInputChange}
          name="email"
          className="outline-0 p-2 border  w-full rounded-md"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={handleInputChange}
          name="password"
          className="outline-0 p-2 border border-neutral-200 w-full rounded-md"
          type="password"
          placeholder="Passcode"
        />
        <button
          onClick={postLogin}
          className="w-full rounded-lg bg-blue-800 p-2 font-semibold hover:bg-blue-600 transition-all"
        >
          Sign In!
        </button>
        <GoogleLogin/>
        <p className="text-sm text-center">
          Don't have an account? <b
            className="font-bold text-sm cursor-pointer hover:text-orange-600 transition-all"
            onClick={toggleAuthPage}
          >
            Register Now!
          </b>
        </p>
      </div>
    </div>

  )
}

export default Reg_Log