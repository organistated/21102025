import React from 'react';

const photos = [
  { caption: 'Każdy wspólny dzień...' },
  { caption: '...jest nową przygodą.' },
  { caption: 'W Twoich ramionach...' },
  { caption: '...odnajduję spokój.' },
];

interface GalleryProps {
  step: number;
}

const Gallery: React.FC<GalleryProps> = ({ step }) => {
  return (
    <div className="content-fade p-8 text-center">
      <h4 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
        {photos[step].caption}
      </h4>
      <div className="w-20 h-1 bg-gradient-to-r from-apple-pink to-apple-purple mx-auto mt-12 rounded-full shadow-[0_0_20px_rgba(255,45,85,0.4)]"></div>
    </div>
  );
};

export default Gallery;