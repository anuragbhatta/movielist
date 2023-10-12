'use client';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import back from '../public/Back.png';
import search from '../public/search.png';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const setSearchText = useCallback((payload) => dispatch({ type: 'searchMovies', payload: payload }), [dispatch])
    const [openSearch, setOpenSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        // console.log('e', e.target.value);
        setSearchText(e.target.value);
    }
    const handleOpenSearch = (e) => {
        e.preventDefault();
        setOpenSearch(!openSearch);
        // console.log('e', e.target.value)
    }
    return (
        <header className="sticky top-0 mx-auto bg-[url('../public/nav_bar.png')] shadow-lg p-4">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Image src={back} alt="back arrow" width={24} height={24} />
                    <h1 className="text-3xl font-semibold ml-4 text-white">Romantic Comedy</h1>
                </div>
                <Image src={search} alt="search" width={24} height={24} onClick={(e)=>handleOpenSearch(e)}/>
            </div>
            {
                    openSearch &&
                    <input className="text-black" type='text' id="search" name="search" onChange={(e)=>handleSearch(e)}/>
                }
        </header>
    );
};

export default Header;
