import React from 'react';

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="flex items-center justify-between max-w-7xl mx-auto -mt-10">
          <div>
            <img src="/images/comet-removebg-preview.png" alt="" />
          </div>
          <ul className="flex gap-6">
            <li>Menu</li>
            <li>Location</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <button className="bg-[#d01c28] text-white px-4 py-2 rounded">
            Login
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
