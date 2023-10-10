'use client';
import React from 'react';
import Image from 'next/image';
import back from '../public/Back.png';
import search from '../public/search.png';

const Header = () => {
    return (
        // <header className="sticky top-0 shadow-lg bg-[url('../public/nav_bar.png')]">
        //     <Image src={back} alt={"back arrow"} className="w-1/5 h-2 object-cover" />
        //     <h1 className="text-3xl font-semibold mb-4">Romantic Comedy</h1>
        //     <Image src={search} alt={"search"} className="w-1/5 h-2 object-cover" />
        // </header>

        // <header className="sticky top-0 bg-[url('../public/bg.jpg')] shadow-lg flex items-center justify-between p-4">
        //     <div className="flex items-center">
        //         <Image src={back} alt="back arrow" width={24} height={24} objectFit="contain" />
        //         <h1 className="text-3xl font-semibold ml-4 text-white">Romantic Comedy</h1>
        //     </div>
        //     <Image src={search} alt="search" width={24} height={24} objectFit="contain" />
        // </header>

        <header className="sticky top-0 mx-auto bg-[url('../public/nav_bar.png')] shadow-lg p-4">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Image src={back} alt="back arrow" width={24} height={24} objectFit="contain" />
                    <h1 className="text-3xl font-semibold ml-4 text-white">Romantic Comedy</h1>
                </div>
                <Image src={search} alt="search" width={24} height={24} objectFit="contain" />
            </div>
        </header>
    );
};

export default Header;

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { back } from '../public/Back.png';

// const Header = () => {
//     const [isSticky, setIsSticky] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 100) {
//                 setIsSticky(true);
//             } else {
//                 setIsSticky(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     return (
//         <header className={`bg-white shadow-lg ${isSticky ? 'sticky top-0' : ''}`}>
//             <Image src={back} alt={"back arrow"} className="w-full h-10 object-cover" />
//             <h1 className="text-3xl font-semibold mb-4">Romantic Comedy</h1>
//         </header>
//     );
// };

// export default Header;
