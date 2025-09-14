import React from 'react'
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="flex bg-[#eef0fc] flex-col items-center justify-center min-h-screen  text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Oops! Page not found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Page404