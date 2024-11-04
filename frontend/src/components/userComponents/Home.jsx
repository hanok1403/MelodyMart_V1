import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Searchbar from './UserSearchbar'; 
import { Alert, CircularProgress, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const slides = [
    {
      src: 'https://rare-gallery.com/uploads/posts/857426-Musical-Instruments-Guitar.jpg',
      alt: 'Slide 1',
      caption: 'Discover the best musical instruments at MelodyMart!',
    },
    {
      src: 'https://media.istockphoto.com/id/1214897889/photo/close-up-of-electric-guitars-in-a-row-in-huge-instrument-shop-music-instrumental-concept.jpg?s=612x612&w=0&k=20&c=LC9Gi_nxul94nxgBRdVNZZ1cEpLTW_2QYJT1yuEvUT0=',
      alt: 'Slide 2',
      caption: 'Enhance your music journey with top quality gear!',
    },
    {
      src: 'https://png.pngtree.com/background/20230611/original/pngtree-an-arrangement-of-brass-percussion-instruments-and-brass-tuba-picture-image_3168354.jpg',
      alt: 'Slide 3',
      caption: 'Join our community and share your passion for music!',
    },
  ];

  const categories = [
    'All',
    'Indian Instruments',
    'Keyboards/Pianos',
    'Guitars',
    'Amplifiers',
    'Band Instruments',
    'Drums',
    'Percussion Instruments',
    'String Instruments'
  ];

  useEffect(() => {
    fetch('/api/home')
      .then((response) => response.json())
      .then((data) => {
        const validProducts = data.filter(prod => prod.quantity > 0);
        setItems(validProducts);
        setFilteredItems(validProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleAddToCart = (id, quantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity: item.quantity - quantity } : item
      )
    );
    setFilteredItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity: item.quantity - quantity } : item
      )
    );
    toast.success('Item added to cart successfully!');
    
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-300 via-yellow-350 to-gray-400 min-h-screen py-8">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        limit={3}
        closeOnClick
        pauseOnHover
      />
      <div className="container mx-auto px-4">
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
            <CircularProgress />
            <Typography variant="h6" className="ml-2">Loading products...</Typography>
          </Box>
        ) : (
          <>
            <div className="relative w-full mx-auto overflow-hidden rounded-lg mb-6">
              <div className="flex transition-transform ease-in-out duration-700" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img src={slide.src} alt={slide.alt} className="w-full h-64 object-cover" />
                    <p className="absolute bottom-0 w-full text-white text-center bg-black bg-opacity-50 p-2">{slide.caption}</p>
                  </div>
                ))}
              </div>
              <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">&#9664;</button>
              <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">&#9654;</button>
            </div>
            <Searchbar products={items} setFilteredItems={setFilteredItems} /> 
            {/* <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {filteredItems.map((item, i) => (
                <div key={i} className="mb-4">
                  <ProductItem product={item} handleAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
