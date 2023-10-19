"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import MoviePoster from "./MoviePoster";
import { URL } from "./constants";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useDispatch, useSelector } from "react-redux";

const MovieGrid = ({ movies, total, pageSize }) => {
    // const [movies1, setMovies1] = useState(movies);
    const [pageNo, setPageNo] = useState(1);

    // handled infinite scroll using Intersection observer
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef(null);
    const moviesList = useSelector((state) => state.movies);
    // console.log('moviesList mg : ', moviesList);
    const dispatch = useDispatch();
    const getMovies = useCallback((payload) => dispatch({ type: 'getMovies', payload: payload }), [dispatch]);
    const pageCounter = useCallback(() => dispatch({ type: 'pageCounter' }), [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (pageNo !== 1 && ((total - (pageSize * pageNo) + 20) > 0)) {
                    const response = await fetch(`${URL}page${pageNo}.json`);
                    const data = await response.json();
                    // setMovies1((prevMovies) => [...prevMovies, ...data?.page['content-items']?.content]);
                    getMovies(data?.page['content-items']?.content);
                }
                if (pageNo === 1) {
                    getMovies(movies);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [pageNo]);

    const loadMore = () => {
        setPageNo(pageNo + 1);
        pageCounter();
    }


    // const lastMovieRef = useInfiniteScroll(loadMore);
    const secondLastRow = useRef();
    const secondLastRowValue = useInfiniteScroll(secondLastRow);
    // const [issecondLastRow, setIssecondLastRow] = useState(false);

    useEffect(() => {
        // debugger;
        if (isIntersecting) {
            loadMore();
        }
        // if (!issecondLastRow)
        //     setIssecondLastRow(secondLastRowValue);
    }, [isIntersecting]);

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-2 md:gap-1 lg:gap-1 justify-center">
                {/* handled fallback component for empty data */}
                {
                    moviesList.movies.length === 0
                        ?
                        <div className="flex items-center h-24 justify-center">
                            <p className="text-center">No movie found</p>
                        </div>
                        :
                        moviesList.movies.map((movie, index) => (
                            <div key={index} >
                                {/* handled infinte scroll */}
                                {
                                    index === moviesList.movies.length - 6
                                        ?
                                        <div ref={secondLastRow}>
                                            {
                                                secondLastRowValue && <MoviePoster key={index} movie={movie} index={index + 1} />
                                            }
                                        </div>
                                        :
                                        <MoviePoster key={index} movie={movie} index={index + 1} />
                                }
                            </div>
                        ))
                }
            </div>
            <div ref={ref} className="view-for-is" style={{
                height: "1px",
                display: "block"
            }}>
            </div>
        </div>
    );
};

export default MovieGrid;
