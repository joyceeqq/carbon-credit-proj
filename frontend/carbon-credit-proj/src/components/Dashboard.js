import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CompanyRegistration from './CompanyRegistration';
import ProjectSubmission from './ProjectSubmission';
import TradeCreation from './TradeCreation';
import TradeCompletion from './TradeCompletion';


function Dashboard() {

    const [userType, setUserType] = useState("");


    useEffect(() => {
        setUserType(localStorage.getItem("userType"))
    });

    console.log(`This is the ${userType}`)

    return (
      <div class="h-screen">
        {/* <!--Nav--> */}
        <nav>
            <div class="w-full container mx-auto">
            <div class="w-full flex items-center justify-between">
                <Link class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#" to={"/"}>
                Brock<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">chain</span>
                </Link>
                
                {(userType==="company") ? 
                <div class="flex w-1/2 justify-end content-center">
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/create-trade"}
                >
                    Create Trade
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/complete-trade"}
                >
                    Complete Trade                
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/register-company"}
                >
                    Register Company 
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/submit-project"}
                >
                    Submit Project          
                </Link>
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/view-projects"}
                >
                    View Projects          
                </Link>
                </div>
                :
                <div class="flex w-1/2 justify-end content-center">
                <Link class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center font-bold h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#"
                to={"/dashboard/validate-project"}
                >
                    Validate Project          
                </Link>
                </div>
                }
            </div>
            </div>
        </nav>
        <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col items-center">
          {/* <!--Left Col--> */}
          <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
              To&nbsp;Be
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                gin,
              </span>
            </h1>
            

            <div class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-blue-300 py-1 font-bold mb-2 text-4xl text-center">
                  Please select the feature you would like from the navbar           
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
