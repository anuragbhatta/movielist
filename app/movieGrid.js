"use client";
import { useState, useEffect, useRef } from "react";
import MoviePoster from "./moviePoster";
import { URL } from "./constants";
import { useOnScreen, useInfiniteScroll } from "./hooks/useInfiniteScroll";

const MovieGrid = ({ movies, total, pageSize }) => {
    // loadMore
    const [movies1, setMovies1] = useState(movies);
    const [pageNo, setPageNo] = useState(1);

    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setMovies1(movies);
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // debugger;
            try {
                // Replace with your API endpoint and data fetching logic
                // data?.page['page-size-returned'] 20
                // data?.page['total-content-items'] 54
                // console.log('total ', total)
                // console.log('pageSize ', pageSize)
                // console.log('total - pageSize * pageNo ', total - (pageSize * pageNo) + 20)
                // console.log('(total - pageSize * pageNo) > 0)', (total - (pageSize * pageNo) + 20) > 0);
                if (pageNo !== 1 && ((total - (pageSize * pageNo) + 20) > 0)) {
                    const response = await fetch(`${URL}page${pageNo}.json`);
                    const data = await response.json();
                    // debugger;
                    // console.log(`${pageNo} data : `, data?.page['content-items']?.content.length);
                    // console.log(`${pageNo} data : `, data?.page['content-items']?.content);
                    setMovies1((prevMovies) => [...prevMovies, ...data?.page['content-items']?.content]);
                }
                // debugger;
                // data?.page['content-items']?.content
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
    // console.log('pageNo : ', pageNo);
    // console.log('secondLastRowValue : ', secondLastRowValue);
    // console.log('issecondLastRow : ', issecondLastRow);

    useEffect(() => {
        // debugger;
        if (isIntersecting) {
            loadMore();
        }
        // if (!issecondLastRow)
        //     setIssecondLastRow(secondLastRowValue);
    }, [isIntersecting]);

    // {/* <div ref={lastMovieRef}> </div> */ }

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                {
                    (pageNo === 1 ? movies : movies1).map((movie, index) => (
                        <div key={index} >

                            {
                                index === movies1.length - 6
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
            </div >
            <div ref={ref} className="view-for-is" style={{
                height: "1px",
                display: "block"
            }}>
            </div>
        </div>
    );
};

export default MovieGrid;
