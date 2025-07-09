import { useEffect, useRef, useState, useCallback } from "react";
import { PhotographerCard } from "../PhotographerCard/PhotographerCard";
import "./CategoryListing.scss";
import { LoadingSpiner } from "../LoadingSpiner/LoadingSpiner";

 const CategoryListing = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef();
    const timeoutRef = useRef();

    const fetchPhotographers = useCallback(async () => {
        // setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/photographers?_page=${page}`);
            const result = await response.json();

            if (page <= 3) {
                setData(prev => [...prev, ...result.data]);
            } else {
                setHasMore(false);

            }
        } catch (error) {
            console.log("fetch photographer error:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [page]);

    // 🕒 Delayed fetch using setTimeout
    useEffect(() => {
        setLoading(true);
        timeoutRef.current = setTimeout(() => {
            fetchPhotographers();
        }, 2000); // 1.5 seconds delay

        return () => clearTimeout(timeoutRef.current);
    }, [fetchPhotographers]);

    // 🧲 Observer setup
    const lastCardRef = useCallback(
        (node) => {
            if (isLoading) return;

            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prev => prev + 1);
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <>
            <div className="photographer-list">
                {data.map((item, index) => {
                    if (index === data.length - 1) {
                        return (
                            <div ref={lastCardRef} key={item.id}>
                                <PhotographerCard cardData={item} />
                            </div>
                        );
                    }
                    return <PhotographerCard key={item.id} cardData={item} />;
                })}
            </div>

            {isLoading && <LoadingSpiner />}
            {error && <p>Error loading photographers</p>}
            {!hasMore && !isLoading && <p>No more photographers to show.</p>}
        </>
    );
};
