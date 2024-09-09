// src/NotFound.js
import React from 'react';
import { motion } from 'framer-motion';
import './NotFound.css'; // For custom styles

const Index = () => {
    return (
        <div className="not-found-container">
            <motion.div
                className="not-found-image"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
                     alt="404 Not Found" />
            </motion.div>
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                404 - Page Not Found
            </motion.h1>
            <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                Oops! The page you’re looking for doesn’t exist.
            </motion.p>
        </div>
    );
};

export default Index;
