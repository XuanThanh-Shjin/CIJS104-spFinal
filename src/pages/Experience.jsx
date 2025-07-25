import React, { useState } from 'react';
import camnangImg from '../assets/camnang.jpg';
import LasVegasImg from '../assets/LasVegas.jpeg';
import SanFransiscoImg from '../assets/San-Francisco.webp';
import FukuokaImg from '../assets/Fukuoka.jpg';
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api';

const featuredGuides = [
  {
    title: 'Best Time to visit Las Vegas',
    desc: 'Most people think of Las Vegas when it comes to an iconic place to visit in America. There’s no denying it, as everyone wants to catch a glimpse of this skyscraper’s...',
    image: LasVegasImg,
    link: '#'
  },
  {
    title: 'Family-Friendly Attractions in Ehime | 7 Fun Things to Do with Kids',
    desc: 'Ehime is a prefecture of California located along the northwest coast of the road of monkey. It is known for its warm climate and beautiful natural environment, and has',
    image: SanFransiscoImg,
    link: '#'
  },
  {
    title: 'Day Trips from Fukuoka | 5 Itinerary Ideas for DIY Day Tours in Kyushu',
    desc: "Fukuoka may be the capital of Kyushu, but it is certainly not the only city worth visiting on Japan's southernmost island. The city is a great base from which to explore",
    image: FukuokaImg,
    link: '#'
  },
];

const hotDestinations = [
  { name: 'Thailand', image: 'https://file3.qdnd.vn/data/images/0/2022/02/17/minhanh/aaaa.jpg' },
  { name: 'Indonesia', image: 'https://cdn.audleytravel.com/2478/1770/79/16027396-pura-ulun-danu-bratan-bali.jpg' },
  { name: 'Paris', image: 'https://www.visa.com.vn/dam/VCOM/regional/ap/images/travel-with-visa/paris/marquee-travel-paris-800x450.jpg' },
  { name: 'Saudi Arabia ', image: 'https://media.cnn.com/api/v1/images/stellar/prod/231006160350-01-saudi-arabia-tourism-basics-intro.jpg?c=original' },
  { name: 'Egypt ', image: 'https://www.insightvacations.com/media/hl4fhw1t/large-full-sphynx-profile-pyramid-giza-egypt-178375366.jpg' },
  { name: 'India ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RLcYQ_qWBR7s6dVYPCRJrEzRwo_A_00QqA&s' },
  { name: 'Shirt ', image: 'https://duhocinec.com/wp-content/uploads/2024/10/gioi-thieu-so-luoc-ve-nuoc-ao.jpg' },
  { name: 'Arghentina ', image: 'https://ddk.1cdn.vn/2023/02/07/image.daidoanket.vn-images-upload-nghipm-02062023-_anh-bai-chinh.jpg' },
  { name: 'Canada ', image: 'https://brighttax.com/wp-content/uploads/2025/06/life-in-canada.jpg' },
  { name: 'Czech Republic ', image: 'https://www.obonparis.com/uploads/PRAGUE%20ITINERERY/PRAGUE%20sz-29.jpg' },
  { name: 'Croatia ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsi1oRVyhEQwysuAEkC_jqrbuq4GUPenYcg&s' },
  { name: 'Taiwan ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGNN9_5TyRD8bL0kaL5uGuLVvnTKl66tpa2A&s' },
  { name: 'Vietnam', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f7/12/caption.jpg?w=1400&h=1400&s=1' },
  { name: 'Spain', image: 'https://9b079307a2.clvaw-cdnwnd.com/4df175bf0b039593af0dba0fcbd2d32f/200008278-1d04a1d04c/Spain-s%20History%20and%20Heritage.png?ph=9b079307a2' },
  { name: 'Australia', image: 'https://www.shutterstock.com/image-photo/sydney-australia-october-20-2023-600nw-2465212583.jpg' },
  { name: 'Switzerland', image: 'https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg' },
  { name: 'Singapore', image: 'https://moit.gov.vn/upload/2005517/fck/files/Singapore-rut-ngan-thoi-gian-cach-ly-con-14-ngay-doi-voi-cac-du-khach-den-tu-quoc-gia-co-nguy-co-cao-0-1625137745-311-width800height480_d84b9.jpeg' },
  { name: 'Qatar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pxXAVZnwbafxMAZl8j9NWaIm9pWDH5YwVg&s' },
  { name: 'Korea', image: 'https://shinkyosei.edu.vn/uploads/images/images/thanh-pho-seoul-han-quoc-1.jpg' },
  { name: 'China', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzEDeCGhZjXeZeK09I5ukVVtAm4ieWjIN3w&s' },
];
const featuredDestinations = [
    { name: 'Bangkok, Thailand', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4x2bhwTZzxck0pwQwYnX8_BouEe04L-0uaA&s' },
    { name: 'Bali, Indonesia', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEoqNDgdLiRMAeBUdbsF_iyNIpWhK-u6uGGQ&s' },
    { name: 'Cebu, Philippines', image: 'https://madmonkey-wp.sgp1.cdn.digitaloceanspaces.com/wp-content/uploads/2018/10/Mad-Monkey-Hostels-The-Top-10-Reasons-to-Visit-Cebu-Philippines.jpg' },
    { name: 'Dubai, United Arab Emirates (UAE) ', image: 'https://www.spotblue.com/app/uploads/2023/08/why-is-Dubai-famous-for-tourism-1.jpg' },
    { name: 'Jakarta, Indonesia ', image: 'https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2024/11/1/jakarta-191124-1.jpg' },
    { name: 'Kuala Lumpur, Malaysia ', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Kuala_Lumpur_at_dawn_%2818794580599%29.jpg' },
    { name: 'Malacca, Malaysia ', image: 'https://tnktravel.com.vn/wp-content/uploads/2023/04/Du-l%E1%BB%8Bch-Melaka.jpg' },
    { name: 'Manila, Philippines ', image: 'https://etrip4utravel.s3-ap-southeast-1.amazonaws.com/images/tinymce/2021/09/b302d735-1897-475e-b300-c78d0f15cead.jpg' },
    { name: 'Pattaya, Thailand ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_gYMm7jpldmF3OwAdC-ApQQYth2bncp44zw&s' },
    { name: 'Tokyo, Japan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNPyod1P-wJDwlErOyxNlS81h1HJb0G7ZgYw&s' },
];
const mustSeePlaces = [
  {
    title: "Best Day Trips from Tokyo | 8 Places for a Quick Break by Bullet Train",
    desc: "Tokyo's bullet train network makes it easy to escape the city for a day and explore its many fascinating destinations. Whether...",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Series-N700S-J2.jpg"
  },
  {
    title: "Getting Around Kyoto | A Guide to Bullet Trains, Local Buses, and More",
    desc: "Japan's former capital, Kyoto, is a city steeped in tradition and filled with fascinating quirks. In addition to iconic...",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pedestrian_road_with_pavements%2C_paper_umbrellas_and_people_in_yukata%2C_Higashiyama-ku%2C_Kyoto%2C_Japan.jpg/1200px-Pedestrian_road_with_pavements%2C_paper_umbrellas_and_people_in_yukata%2C_Higashiyama-ku%2C_Kyoto%2C_Japan.jpg"
  },
  {
    title: "Guide to Maruyama Park | Cherry Blossom Viewing and Exploring Gion in Kyoto",
    desc: "Nestled in the hills of Kyoto’s Higashiyama district , Maruyama Park is a stunning natural oasis of beauty and charm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpgkTHeLK4uena9Ae1XJ_jVyXLCxyvAtjgg&s"
  },
  {
    title: "Chatuchak Market: Visit Bangkok's Largest Market",
    desc: "Chatuchak Market is a large market located in the Chatuchak district of Bangkok. It is often referred to as the “Chatuchak Weekend Market” ",
    image: "https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/attractions/chatuchak-w1800h1360.jpg"
  },
  {
    title: "Nishiki Market | Top Shops to Visit and What to Eat in Kyoto's Pantry",
    desc: "Whether you’re looking for exciting delicacies to tantalize your taste buds, a rich, centuries-old history to explore ",
    image: "https://images.squarespace-cdn.com/content/v1/549d41a3e4b003c6ce131926/1419631332229-WSI2SUDH0UPNMDO219DN/image-asset.jpeg?format=1500w"
  },
  {
    title: "Kyoto Imperial Palace – Guided Tour, Hours and Nearby Attractions in Japan",
    desc: "The Kyoto Imperial Palace is a window into Japan’s rich imperial history, offering visitors a glimpse of elegant architecture and serene gardens",
    image: "https://nippontravel.vn/wp-content/uploads/2024/05/cung-dien-hoang-gia-kyoto-2.webp"
  },
  {
    title: "Rooftop Bars in Bangkok | Nightlife Spot with Great Views & Cocktails",
    desc: "Whether you’re sipping a signature cocktail or enjoying a glass of fine wine, panoramic views from high above the bustling streets create a magical atmosphere that’s hard to beat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqxjfKj7NcliqfrZvHJcDo_GZqLJ7MW7YPg&s"
  },
  {
    title: "5 Day Bali Itinerary | A First Timer's Guide to the Perfect Vacation in Indonesia",
    desc: "Bali is a true traveler’s paradise, where you’ll never run out of things to see and do. The only challenge is figuring out which attractions and activities to make time for! ",
    image: "https://www.agoda.com/wp-content/uploads/2020/01/Bali-itinerary-Tegalalang-rice-terrace.jpg"
  },
  {
    title: "Bangkok Nightlife | Most Popular Bars, Clubs and Nightlife Areas",
    desc: "Bangkok is renowned for its vibrant and eclectic nightlife, offering something for everyone, from casual bar-goers to those looking to dance the night away ",
    image: "https://thecoachbangkok.com/wp-content/uploads/2023/10/Oddviser-Soi-Cow-boy-1024x683.jpg"
  },
  {
    title: "6 Osaka Day Trips and Magical Getaways – Travel Japan",
    desc: "Osaka is a vibrant city known for its bustling streets, delicious street food and exciting nightlife.",
    image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/477000/477571-Osaka.jpg"
  },
];
const Experience = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '24px'
  };

  const center = {
    lat: 21.0285,
    lng: 105.8542
  };
  const [streetViewPosition, setStreetViewPosition] = useState(null);

  const search = searchValue.trim().toLowerCase();
  const filteredHot = search
    ? hotDestinations.filter(dest => dest.name.toLowerCase().includes(search))
    : hotDestinations;
  const filteredFeatured = search
    ? featuredDestinations.filter(dest => dest.name.toLowerCase().includes(search))
    : featuredDestinations;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r py-16 px-4 text-center overflow-hidden min-h-[350px] md:min-h-[700px] flex items-center justify-center">
        <img
          src={camnangImg}
          alt="Travel Hero"
          className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />
        {/* Overlay khi focus search */}
        {isSearchFocused && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-20 transition-all"></div>
        )}
        <div className="relative z-30 w-full flex flex-col items-center justify-center">
          <h1 className="text-9xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide text-white bg-gradient-to-r from-black/60 via-black/30 to-black/60 rounded px-6 py-2 inline-block">
            Travel Guide
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium text-white drop-shadow-md bg-gradient-to-r from-black/40 via-black/20 to-black/40 rounded px-4 py-2 mt-2">
            See highlights, learn about history, and work with friends around the world!
          </p>
          <form className="w-full max-w-xl mx-auto mt-16 flex items-center justify-center"
            onSubmit={e => {
              e.preventDefault();
              if (searchValue.trim()) setIsSearchActive(true);
            }}
          >
            <input
              type="text"
              placeholder="Explore Country, City Guide"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
                if (!e.target.value.trim()) setIsSearchActive(false);
              }}
              className={` w-full rounded-l-full px-6 py-3 text-lg bg-white bg-opacity-90 focus:outline-none border-none shadow-md placeholder-gray-500 transition-all duration-300 ${isSearchFocused ? 'ring-4 ring-blue-400 ring-opacity-80' : ''}`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-r-full shadow-md transition-all flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Featured booking hotel guide */}
      <div className="relative z-10 max-w-6xl mx-auto py-14 px-4 -mt-60">
        <h2 className="text-2xl font-semibold mb-6 drop-shadow-lg tracking-wide text-white bg-gradient-to-r from-black/60 via-black/30 to-black/60 rounded px-6 py-2 inline-block">Featured booking hotel guide</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredGuides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
              style={{ minHeight: 430 }}
            >
              <div className="relative h-56">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                  <a href=""className="text-2xl font-bold text-white p-6 w-full truncate">
                  {guide.title}</a>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <p className="text-gray-700 mb-2 line-clamp-3">{guide.desc}</p>
                <a
                  href={guide.link}
                  className="mt-auto inline-block px-8 py-3 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
                >
                  READ MORE
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSearchActive ? (
        <>
          {filteredHot.length > 0 && (
            <div className="bg-white py-12 relative z-30">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-semibold mb-6">Famous destination </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredHot.map((dest, idx) => (
                    <div key={idx} className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-4 left-0 w-full px-4">
                        <span className="text-white text-xl font-semibold drop-shadow-lg">{dest.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {filteredFeatured.length > 0 && (
            <div className="bg-white py-12 relative z-30">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-semibold mb-6">Featured Destinations </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredFeatured.map((dest, idx) => (
                    <div key={idx} className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-4 left-0 w-full px-4">
                        <span className="text-white text-xl font-semibold drop-shadow-lg">{dest.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
      {/* Hot Destinations */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-semibold mb-6">Famous destination </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hotDestinations.map((dest, idx) => (
                  <div key={idx} className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden">
                    <a href="">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-0 w-full px-4">
                      <span className="text-white text-xl font-semibold drop-shadow-lg">{dest.name}</span>
                    </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Featured Destinations */}
          <div className="bg-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-semibold mb-6">Featured Destinations </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredDestinations.map((dest, idx) => (
                  <div key={idx} className="relative w-full h-48 rounded-2xl shadow-lg overflow-hidden">
                    <a href="">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-0 w-full px-4">
                      <span className="text-white text-xl font-semibold drop-shadow-lg">{dest.name}</span>
                    </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

        {/* Map   */}
      <div className="max-w-6xl mx-auto px-2 mb-12">
        <h2 className="text-4xl font-semibold mb-6">Trending Hotspots</h2>
        <LoadScript googleMapsApiKey="AIzaSyANlt-S9wnH_Uc7TqHC5mzaxpMkn2ZWj88">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={4}
            onClick={e => setStreetViewPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
          >
            {streetViewPosition && (
              <StreetViewPanorama
                position={streetViewPosition}
                visible={true}
                options={{ pov: { heading: 100, pitch: 0 } }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      {/* Must-See Places */}
<div className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-semibold mb-10">Must-See Places: 10 Latest Travel Guides</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {mustSeePlaces.map((place, idx) => (
        <div key={idx} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
          <div className="relative h-40">
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          </div>
          <div className="flex-1 flex flex-col p-6">
            <a href="" className="text-lg font-semibold mb-2 line-clamp-2">{place.title}</a>
            <p className="text-gray-700 mb-2 line-clamp-2">{place.desc}</p>
          </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience; 