const sampleListings = [
  {
    title: "Beachside Villa in Goa",
    description:
      "Relax in a beautiful beachside villa with tropical surroundings and easy access to Goa beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Goa",
    country: "India",
    geometry: { coordinates: [74.124, 15.2993] },
  },

  {
    title: "Heritage Stay in Jaipur",
    description:
      "Experience Rajasthan's royal heritage from this charming stay near Jaipur's historic attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Jaipur",
    country: "India",
    geometry: { coordinates: [75.7873, 26.9124] },
  },

  {
    title: "Luxury Apartment in Mumbai",
    description:
      "Modern city apartment offering comfortable accommodation in the heart of Mumbai.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Mumbai",
    country: "India",
    geometry: { coordinates: [72.8777, 19.076] },
  },

  {
    title: "Backwater Villa in Alleppey",
    description:
      "Enjoy peaceful Kerala backwaters from this relaxing villa surrounded by tropical greenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Alleppey",
    country: "India",
    geometry: { coordinates: [76.3388, 9.4981] },
  },

  {
    title: "Mountain Retreat in Manali",
    description:
      "A cozy mountain retreat with spectacular Himalayan views and peaceful surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Manali",
    country: "India",
    geometry: { coordinates: [77.1887, 32.2396] },
  },

  {
    title: "Lake View Stay in Udaipur",
    description:
      "Stay near the beautiful lakes and historic palaces of the romantic city of Udaipur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Udaipur",
    country: "India",
    geometry: { coordinates: [73.6822, 24.5854] },
  },

  {
    title: "Riverside Cottage in Rishikesh",
    description:
      "Peaceful riverside accommodation perfect for adventure, yoga and nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Rishikesh",
    country: "India",
    geometry: { coordinates: [78.2676, 30.0869] },
  },

  {
    title: "Palace Heritage Stay in Jodhpur",
    description:
      "Discover the Blue City while staying in a traditional Rajasthani heritage property.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=60",
    },
    price: 3400,
    location: "Jodhpur",
    country: "India",
    geometry: { coordinates: [73.0243, 26.2389] },
  },

  {
    title: "Himalayan Cabin in Shimla",
    description:
      "Warm and comfortable wooden cabin surrounded by the beautiful mountains of Himachal Pradesh.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=800&q=60",
    },
    price: 2700,
    location: "Shimla",
    country: "India",
    geometry: { coordinates: [77.1734, 31.1048] },
  },

  {
    title: "Fort View Stay in Agra",
    description:
      "Comfortable accommodation close to the Taj Mahal and Agra Fort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Agra",
    country: "India",
    geometry: { coordinates: [78.0081, 27.1767] },
  },

  {
    title: "Ganga View Apartment in Varanasi",
    description:
      "Stay close to the famous ghats and experience the spiritual atmosphere of Varanasi.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Varanasi",
    country: "India",
    geometry: { coordinates: [83.0107, 25.3176] },
  },

  {
    title: "Forest Cottage in Coorg",
    description:
      "A peaceful cottage surrounded by coffee plantations and lush green forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Coorg",
    country: "India",
    geometry: { coordinates: [75.8069, 12.3375] },
  },

  {
    title: "Tea Estate Retreat in Munnar",
    description:
      "Relax among the famous tea plantations and misty mountains of Munnar.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Munnar",
    country: "India",
    geometry: { coordinates: [77.0595, 10.0889] },
  },

 {
  title: "Cliffside Retreat in Varkala",
  description: "A peaceful coastal retreat overlooking the Arabian Sea, perfect for travelers looking for beaches, sunsets and a relaxing getaway.",
  image: {
    filename: "varkala-cliff",
    url: "https://images.unsplash.com/photo-1602308392329-7f7c1c3c4a55?auto=format&fit=crop&w=1200&q=80"
  },
  price: 2800,
  location: "Varkala",
  country: "India",
  maxGuests: 4,
  geometry: {
    type: "Point",
    coordinates: [76.7162, 8.7379]
  }
},

  {
    title: "Royal Haveli in Jaisalmer",
    description:
      "Traditional haveli accommodation overlooking the golden architecture of Jaisalmer.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Jaisalmer",
    country: "India",
    geometry: { coordinates: [70.9083, 26.9157] },
  },

  {
    title: "Valley View Stay in Mussoorie",
    description:
      "Enjoy panoramic Himalayan valley views from this peaceful hill-station property.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Mussoorie",
    country: "India",
    geometry: { coordinates: [78.0747, 30.4598] },
  },

  {
    title: "Wildlife Lodge in Ranthambore",
    description:
      "Comfortable wildlife lodge perfect for travelers visiting Ranthambore National Park.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Ranthambore",
    country: "India",
    geometry: { coordinates: [76.5026, 26.0173] },
  },

  {
    title: "Hill Cottage in Darjeeling",
    description:
      "Cozy mountain cottage with access to Darjeeling's tea gardens and Himalayan viewpoints.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Darjeeling",
    country: "India",
    geometry: { coordinates: [88.2636, 27.041] },
  },

  {
    title: "Beach Resort in Andaman",
    description:
      "Tropical island accommodation surrounded by beautiful beaches and clear blue waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Port Blair",
    country: "India",
    geometry: { coordinates: [92.7265, 11.6234] },
  },

  {
    title: "Heritage Home in Kolkata",
    description:
      "Comfortable heritage-inspired stay close to Kolkata's historic landmarks and cultural attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Kolkata",
    country: "India",
    geometry: { coordinates: [88.3639, 22.5726] },
  },

  {
    title: "Luxury Stay in Hyderabad",
    description:
      "Modern accommodation offering easy access to Hyderabad's historic monuments and food districts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Hyderabad",
    country: "India",
    geometry: { coordinates: [78.4867, 17.385] },
  },

  {
    title: "Lakeside Retreat in Nainital",
    description:
      "Relaxing hill-station stay near Naini Lake with beautiful mountain surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Nainital",
    country: "India",
    geometry: { coordinates: [79.4636, 29.3919] },
  },
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { coordinates: [118.7798, 34.0259] },
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: { coordinates: [74.006, 40.7128] },
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: { coordinates: [106.8175, 39.1911] },
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: { coordinates: [11.2558, 43.7696] },
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: { coordinates: [122.6784, 45.5152] },
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: { coordinates: [86.8515, 21.1619] },
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: { coordinates: [120.0324, 39.0968] },
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    geometry: { coordinates: [118.2437, 34.0522] },
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    geometry: { coordinates: [7.2277, 46.0979] },
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: { coordinates: [34.6857, 2.154] },
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: { coordinates: [4.9041, 52.3676] },
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    geometry: { coordinates: [178.45, 18.124] },
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    geometry: { coordinates: [1.2466, 51.7612] },
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    geometry: { coordinates: [71.0589, 42.3601] },
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    geometry: { coordinates: [115.092, 8.3405] },
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    geometry: { coordinates: [115.5708, 51.1784] },
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    geometry: { coordinates: [80.1918, 25.7617] },
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    geometry: { coordinates: [98.3923, 7.8804] },
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    geometry: { coordinates: [-4.2026, 56.4907] },
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: { coordinates: [55.2962, 25.2769] },
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    geometry: { coordinates: [110.3626, 46.8797] },
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    geometry: { coordinates: [25.3289, 37.4467] },
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { coordinates: [82.7382, 9.7489] },
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    geometry: { coordinates: [79.9311, 32.7765] },
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    geometry: { coordinates: [139.6917, 35.6895] },
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    geometry: { coordinates: [71.5724, 43.1939] },
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    geometry: { coordinates: [72.5362, 1.9247] },
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    geometry: { coordinates: [106.8175, 39.1911] },
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: { coordinates: [82.9382, 8.638] },
  },
];

module.exports = { data: sampleListings };
