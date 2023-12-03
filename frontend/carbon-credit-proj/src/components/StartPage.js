import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';

function StartPage() {
    function userhandler() {
        localStorage.setItem("userType","user")
    }
    function companyhandler() {
        localStorage.setItem("userType","company")
    }
    
  return (
      <div class="h-screen">
        {/* <!--Nav--> */}
        <nav>
          <div class="w-full container mx-auto">
            <div class="w-full flex items-center justify-between">
              <a class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl p-2" href="#">
                Brock<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">chain</span>
              </a>
            </div>
          </div>
        </nav>
        {/* <!--Main--> */}
        <div class="container pt-24 md:pt-28 mx-auto flex flex-wrap flex-col items-center">
          {/* <!--Left Col--> */}
          <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
              Wel
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                come&nbsp;
              </span>
              to
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                 &nbsp; Broc
              </span>
              kchain
            </h1>
            <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Our Blockchain-based Carbon Credits System aims to revolutionise the way companies manage and offset their carbon footprint
            </p>

            <div class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-blue-300 py-2 font-bold mb-2 text-5xl text-center">
                  To begin,           
                </label>
                <label class="block text-blue-250 py-2 font-bold mb-2 text-4xl text-center">
                  Who are you?           
                </label>
              </div>

              <div class="flex items-center justify-between pt-4">
                <Link 
                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out w-4/12 h-1/2 text-center" 
                to="/dashboard"
                onClick={userhandler}
                > User
                </Link>

                <Link 
                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out w-4/12 h-1/2 text-center" 
                to="/dashboard"
                onClick={companyhandler}
                > Company
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default StartPage;
