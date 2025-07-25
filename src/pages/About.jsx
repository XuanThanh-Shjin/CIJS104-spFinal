import React from 'react';
import aboutBg from '../assets/bg vid.mp4';

const aboutStats = [
  { label: 'Markets with Agoda offices', value: '26' },
  { label: 'Hotels and homes around the world', value: '4 Million' },
  { label: 'Staff', value: '6.900' },
  { label: 'Country/territory with accommodation facility', value: 'Over 200' },
  { label: 'Customer Support Department is active', value: '24/7' },
  { label: 'Year acquired by Booking Holdings [NASDAQ: BKNG]', value: '2005' },
];

const About = () => (
  <div className="relative bg-white  min-h-screen py-12 overflow-hidden">
    {/* Video Background */}
    <video
      className="absolute top-0 left-0 w-full  h-vh object-cover z-0"
      src={aboutBg}
      autoPlay
      loop
      muted
      playsInline
    />
    {/* Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
    <div className="relative z-20 max-w-5xl mx-auto px-4">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mt-96 text-white ">About StayykHome</h1>
      <div>
      <h2 className=" text-lg md:text-5xl text-white mt-32 mb-10">
         Traveling around the world, the price is still "love"
      </h2>
      <p className="text-lg md:text-2xl text-white mb-10" >StayykHome, the digital travel platform, helps people see the world for less with great deals. Our global network includes over 6 million hotels and vacation rentals worldwide, plus flights, activities and more. StayykHome and the StayykHome mobile app are available in 39 languages and offer 24/7 customer support. Headquartered in Singapore, StayykHome is part of Booking Holdings (Nasdaq: BKNG) and has over 7,000 employees across 27 markets, committed to using industry-leading technology to make travel easier.
      </p>
      <h2 className=" text-lg md:text-5xl text-white mt-20 mb-10">
      Number of visitors
      </h2>
      <p className="text-lg md:text-2xl text-white mb-10" >Consistent with StayykHome.com 's obligations under the EU Digital Services Act ("DSA"), we estimate that the average monthly recipients* of StayykHome.com services in the European Union from February 1, 2024 through July 31, 2024 will be under 45 million.
      </p>
      <p className="text-lg md:text-2xl text-white mb-10" >This is an estimate only and is based on StayykHome.com data at this time and the limited guidance in the DSA. This estimate must be disclosed in accordance with the DSA and may not be used for any other purpose. The methodologies used to estimate the average monthly recipients as defined in the DSA design and key judgment input requirements are subject to data and other limitations, and are inherently subject to statistical uncertainty and variance. This estimate may be subject to upward or downward adjustment as StayykHome.com adjusts its approach and responds to the publication of the European Commission's methodology. Please refer to the website for metrics we consider relevant to StayykHome.com
      </p>
      <p className="text-lg md:text-2xl text-white mb-10" >'s business . * "service recipients" are defined under the DSA to mean "natural and legal persons who use intermediary services, in particular for the purpose of searching for and accessing information easily". This requires counting users to whom StayykHome.com services have displayed information, even if the user has not conducted a transaction.
      </p>
      <h2 className=" text-lg md:text-5xl text-white mt-20 mb-5">
      StayykHome Platform-to-Business (P2B) 
      </h2>
      <h2 className=" text-lg md:text-5xl text-white mb-10">
      Complaint Handling Annual Report (EEA)      
      </h2>
      <p className="text-lg md:text-2xl text-white mb-10" >During the period: 1/1/2023 to 31/12/2023.
      </p>
      <p className="text-lg md:text-2xl text-white mb-10" >Complaints received in the EEA: 14,539 from 3,231,276 partners.
      </p>
      <p className="text-lg md:text-2xl text-white mb-10" >The complaints received related to the following areas:
      </p>
      <ul className="text-lg md:text-2xl text-white">
        <li>59% on receiving/calculating payments.</li>
        <li>21% on how the payment system works.</li>
        <li>17% related to accommodation facility inquiries/update requests.</li>
        <li>2% related to system issues/errors.</li>
        <li>1% related to accommodation facilities.</li>
      </ul>
      <p className="text-lg md:text-2xl text-white mb-10">We resolved 100% of complaints in 2023 including:</p>
      <ul className="text-lg md:text-2xl text-white">
        <li>50% of cases resolved within 3 days.        </li>
        <li>25% of cases resolve within 4 to 7 days.        </li>
        <li>25% of cases require more than 7 days to resolve.</li>
      </ul>
      <p className="text-lg md:text-2xl text-white mt-10 mb-10">Since January 2023 no EEA counterparty has filed any conciliation cases.</p>
      <h2 className=" text-lg md:text-5xl text-white mb-10 mt-32">
      StayykHome in numbers     
      </h2>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {aboutStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-700 text-center text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Contact & Info */}
      <div className="mb-8">
        <h2 className=" text-lg md:text-5xl text-white mb-10 mt-10">Contact & Support</h2>
        <ul className=" text-lg md:text-xl text-white mb-10">
          <li>Customer Support: 24/7</li>
          <li>Email: support@StayykHome.com</li>
          <li>Headquartered: Singapore, operating in 26 global markets</li>
        </ul>
      </div>
      <div className="text-center text-white text-sm mt-8">
        © 2005-2025 StayykHome Company Pte. Ltd. All Rights Reserved
      </div>
    </div>
  </div>
);

export default About; 