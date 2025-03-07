
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Adding Framer Motion for animations

const BooksPage = () => {
  const { user, isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecommendationRequest = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a valid book title.");
      return;
    }
    if (!isSignedIn || !user) {
      setError("Please sign in to get recommendations.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/recommend", {
        params: { title }
      });
      setRecommendations(response.data);

      const categoryData = await axios.get(`http://localhost:5000/category/${user.id}/books`);
      console.log("Category data:", categoryData.data);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-start pt-12 pb-12 overflow-x-hidden">
      {/* Back Button with Animation */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/dash"
          className="flex items-center text-blue-400 hover:text-blue-300 font-semibold mb-6 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>
      </motion.div>

      {/* Header with Animation */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-10 text-center"
      >
        📚 Book Recommendations
      </motion.h1>

      {/* Recommendation Form with Enhanced Styling */}
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleRecommendationRequest}
        className="mb-12 w-full max-w-xl"
      >
        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a book title (e.g., 'The Great Gatsby')"
            className="w-full p-5 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-4 ring-blue-500/20 placeholder-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </span>
            ) : (
              "Get Recommendations"
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Error Message with Animation */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-red-400 text-lg mb-8 px-4 py-2 bg-red-900/50 rounded-lg shadow-md"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Recommendations Display */}
      {recommendations.length > 0 ? (
        <div className="w-full max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-semibold text-center mb-10 text-white bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text"
          >
            Recommended Books
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recommendations.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
              >
                <div className="relative group">
                  {book.img ? (
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-72 bg-gray-600 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-lg font-semibold bg-blue-600/80 px-4 py-2 rounded-full"
                    >
                      View Details
                    </motion.span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{book.desc.slice(0, 100)}...</p>
                  <div className="space-y-1">
                    <p className="text-yellow-400 text-sm">Rating: {book.rating} ({book.totalratings} reviews)</p>
                  </div>
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md"
                    >
                      More Info
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Enter a book title to get personalized recommendations.
        </motion.p>
      )}
    </div>
  );
};

export default BooksPage;