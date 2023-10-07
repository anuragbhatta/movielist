"use client";
import { useState, useEffect, useRef } from "react";
import MoviePoster from "./moviePoster";
import { URL } from "./constants";
import { useOnScreen, useInfiniteScroll } from "./hooks/useInfiniteScroll";

// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     QueryClient,
//     QueryClientProvider,
//   } from '@tanstack/react-query';

const MovieGrid = ({ movies }) => {
    // loadMore
    const [movies1, setMovies1] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    useEffect(() => {
        setMovies1(movies);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // debugger;
            try {
                // Replace with your API endpoint and data fetching logic
                const response = await fetch(`${URL}page${pageNo}.json`);
                const data = await response.json();
                // debugger;
                console.log(`${pageNo} data : `, data?.page['content-items']?.content.length);
                console.log(`${pageNo} data : `, data?.page['content-items']?.content);
                // debugger;
                // data?.page['content-items']?.content
                setMovies1((prevMovies) => [...prevMovies, ...data?.page['content-items']?.content]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // debugger;
        fetchData();
    }, [pageNo]);

    const loadMore = () => {
        // debugger;
        setPageNo(pageNo + 1);
        console.log('sayHo');
    }


    // const lastMovieRef = useInfiniteScroll(loadMore);
    const secondLastRow = useRef();
    const secondLastRowValue = useInfiniteScroll(secondLastRow);
    const [issecondLastRow, setIssecondLastRow] = useState(false);
    console.log('pageNo : ', pageNo);
    console.log('secondLastRowValue : ', secondLastRowValue);
    console.log('issecondLastRow : ', issecondLastRow);
    useEffect(() => {
        console.log('second last row');
        loadMore();
        if (!issecondLastRow)
            setIssecondLastRow(secondLastRowValue);
    }, [secondLastRowValue]);

    // {/* <div ref={lastMovieRef}> </div> */ }

    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {
                (pageNo === 1 ? movies : movies1).map((movie, index) => (
                    <div key={index} >

                        {
                            index === movies1.length - 6
                                ?
                                <div ref={secondLastRow}>
                                    {
                                        secondLastRowValue && <MoviePoster key={index} movie={movie} index={index+1}/>
                                    }
                                </div>
                                :
                                <MoviePoster key={index} movie={movie} index={index+1}/>
                        }
                    </div>
                ))
            }
        </div >
    );
};

export default MovieGrid;
