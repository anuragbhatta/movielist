import { useState, useEffect, useRef } from 'react';

// handled inbfinite scroll using Intersection observer
export const useInfiniteScroll = (loadMore) => {
    const lastElementRef = useRef(null);

    const handleIntersection = (entries) => {
        if (entries[0].isIntersecting) {
            // User has scrolled to the second last row, load more data
            loadMore();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        if (lastElementRef.current) {
            observer.observe(lastElementRef.current);
        }

        return () => {
            if (lastElementRef.current) {
                observer.unobserve(lastElementRef.current);
            }
        };
    }, [loadMore]);

    return lastElementRef;
};

// not working
export const useOnScreen = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );
       if (ref.current) {
           observer.observe(ref.current);
        }
    }, [])
    return isIntersecting;
}
