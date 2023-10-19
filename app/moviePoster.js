"use client";

import Image from 'next/image';
import missing_poster from '../public/missing_poster.png';
import { IMAGE_URL } from './constants';
import { useState } from 'react';

// Single Movie Poster and Title component which is to be reused

const MoviePoster = ({ movie, index }) => {

  const [imageSrc, setImageSrc] = useState(`${IMAGE_URL}${movie['poster-image']}`);

  const handleImageError = () => {
    setImageSrc(missing_poster);
  };

  // const imageSrc = movie['poster-image'] === "posterthatismissing.jpg" ? missing_poster : `${IMAGE_URL}${movie['poster-image']}`;
  // console.log('imageSrc : ', imageSrc);
  return (
    <div className="w-full p-2">
      {/* handled image loading error in a fallback image below and landscape above*/}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={movie.name}
          width={100}
          height={150}
          className="w-full h-30 object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="p-4">
        {/* handled long text and landscape*/}
        <h6 className="text-md mb-2 truncate lg:text-lg">{movie.name}</h6>
      </div>
    </div>
  );
};

export default MoviePoster;