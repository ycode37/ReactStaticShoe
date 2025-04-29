// import React from 'react';

// const Hero = () => {
//   return (
//     <>
//       <main className="flex mx-auto items-center h-screen">
//         <div>
//           <h1 className="font-bold text-4xl md:text-5xl">
//             YOUR FEET DESERVE THE BEST
//           </h1>
//           <p className="flex max-w-3xl justify-center items-center">
//             YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
//             SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
//             SHOES.
//           </p>
//           <div className=" flex gap-7">
//             <button className="bg-[#d01c28] text-white px-4 py-2 rounded">
//               Shop Now
//             </button>
//             <button className="bg-[#000] text-white px-4 py-2 rounded">
//               Category
//             </button>
//           </div>
//         </div>
//         <div className="">
//           <img src="/images/resShoe.png" alt="" />
//         </div>
//       </main>
//     </>
//   );
// };

// export default Hero;

import React from 'react';

const Hero = () => {
  return (
    <>
      <main
        className="flex mx-auto items-center px-4 md:px-8"
        style={{ height: 'calc(100vh - 72px)', overflow: 'hidden' }}
      >
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="font-bold text-4xl md:text-5xl mb-4">
            YOUR FEET DESERVE THE BEST
          </h1>
          <p className="max-w-xl mx-auto mb-6 text-lg">
            YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
            SHOES. YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH
            OUR SHOES.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
            <button className="bg-[#d01c28] text-white px-6 py-3 rounded-md">
              Shop Now
            </button>
            <button className="bg-[#000] text-white px-6 py-3 rounded-md">
              Category
            </button>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src="/images/resShoe.png" alt="Shoe" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
};

export default Hero;
