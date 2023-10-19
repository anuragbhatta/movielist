'use client';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import back from '../public/Back.png';
import search from '../public/search.png';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';


const Header = () => {
    const dispatch = useDispatch();
    const setSearchText = useCallback((payload) => dispatch({ type: 'searchMovies', payload: payload }), [dispatch]);
    const cancelSetSearch = useCallback(() => dispatch({ type: 'cancelSearchMovies' }), [dispatch]);
    const minSearchLength = 2;
    const maxSearchLength = 20; // Maximum character length

    const [openSearch, setOpenSearch] = useState(false);
    // added debounce in search
    const handleSearch = debounce((e) => {
        e.preventDefault();
        console.log('e.target.value.length : ', e.target.value.length)
        if(e.target.value.length < maxSearchLength && e.target.value.length > minSearchLength){
            console.log('inside search');
            setSearchText(e.target.value);
        }
        else{
            console.log('e.target.value : ', e.target.value);
        }
    }, 1000);

    const handleOpenSearch = (e) => {
        e.preventDefault();
        setOpenSearch(!openSearch);
    }

    const handleBack = () => {
        setOpenSearch(false);
        cancelSetSearch();
    }

    return (
        <header className="sticky top-0 mx-auto bg-[url('../public/nav_bar.png')] shadow-2xl p-4">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Image src={back} alt="back arrow" width={24} height={24} onClick={handleBack}/>
                    <h1 className="text-3xl font-semibold ml-4 text-white">Romantic Comedy</h1>
                </div>
                <Image src={search} alt="search" width={24} height={24} onClick={(e) => handleOpenSearch(e)} />
            </div>
            {
                openSearch &&
                <input className="text-black w-4/5 rounded" type='text' id="search" name="search" onChange={(e) => handleSearch(e)} />
            }
        </header>
    );
};

export default Header;
