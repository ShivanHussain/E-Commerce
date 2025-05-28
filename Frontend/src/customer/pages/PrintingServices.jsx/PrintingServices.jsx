import React from 'react';

const printServices = [
  {
    title: "A4 SIZE PRINTING (BW)",
    img: "/bla.jpg",
    desc: "Prints Black and White A4 Size Pages",
  },
  {
    title: "A4 SIZE PRINTING (COLOR)",
    img: "/color.jpg",
    desc: "Prints Color A4 Size pages",
  },
  {
    title: "FLEX PRINTING",
    img: "/flex.jpg",
    desc: "Prints High Quality Flex (Color & BW)",
  },
  {
    title: "PHOTOGRAPH PRINTING",
    img: "/photo.jpg",
    desc: "Prints Photograph For Desired Size",
  },
  {
    title: "MUG PRINTING",
    img: "/mug.jpg",
    desc: "Prints 3D Designs & Photos On Mug",
  },
  {
    title: "T-SHIRT PRINTING",
    img: "/tshirt.jpg",
    desc: "Prints Designs & Photos On T-shirts",
  },
  {
    title: "MOBILE CASE PRINTING",
    img: "/phone.jpg",
    desc: "Prints Photos & 3D Designs On Mobile Cases",
  },
  {
    title: "ID CARD MAKING",
    img: "/ID.jpg",
    desc: "Make College ID's",
  },
  {
    title: "CERTIFICATE PRINTING",
    img: "/certificate.jpg",
    desc: "Certificate With Different Design Will Be Printed",
  },
];



const PrintingServices = () => {
  return (
    <>
    <div className="bg-white min-h-screen mb-8">

      {/* Hero Image */}
      <div className="w-full">
        <img src="/Printing Services.jpg" alt="Printing Services" className="w-full h-auto object-cover" />
      </div>

      {/* Cards Section */}
      <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {printServices.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-6 hover:bg-green-200 text-center p-4"
          >
            <img src={service.img} alt={service.title} className="w-full h-52 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-3">{service.title}</h3>
            <p className="text-pink-700 mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PrintingServices;
