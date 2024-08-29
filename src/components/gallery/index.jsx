import React, {useEffect} from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Sample image data
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    }
];

const Index = () => {
    useEffect(() => {
        // Initialize Fancybox when component mounts
        Fancybox.bind('[data-fancybox="gallery"]', {
            // Optional Fancybox settings can be placed here
        });

        return () => {
            // Clean up Fancybox on component unmount
            Fancybox.destroy();
        };
    }, []);

    return (
        <div className="gallery">
            {itemData.map((item, index) => (
                <a
                    key={index}
                    href={item.img}
                    data-fancybox="gallery"
                    data-caption={item.title}
                >
                    <img src={item.img} alt={item.title} width="150" height="100"/>
                </a>
            ))}
        </div>
    );
};

export default Index;
