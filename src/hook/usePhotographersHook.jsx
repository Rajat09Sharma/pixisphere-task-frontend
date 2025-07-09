import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const usePhotographersHook = (searchTerm, priceFilter, ratingFilter, locationFilter, sortOrder, page) => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [locations, setLoaction] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const timer = useRef();


    // Fetch photographers
    useEffect(() => {
        if (page === 0) return;

        setLoading(true);
        const fetchPhotographers = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/photographers?_page=${page}`);
                const result = response.data.data || response.data;

                const allData = await axios.get(`http://localhost:3001/photographers`);
                const alldata = allData.data.data || allData.data;
                const locations = [...new Set(alldata.map(data => data.location))].sort();
                setLoaction(locations);


                if (page <= 3) {
                    setData(prev => [...prev, ...result]);
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.error("fetch photographer error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        timer.current = setTimeout(() => {
            fetchPhotographers();
        }, 1000);

        return () => clearTimeout(timer.current);
    }, [page]);

    // Filter logic
    useEffect(() => {
        let filtered = [...data];

        // Filter by search
        if (searchTerm) {
            filtered = [...filtered].filter(d => {
                const name = d.name;
                const location = d.location;
                const styles = d.styles.reduce((accumulator, current) => {
                    return accumulator + " , " + current;
                });
                const tags = d.tags.reduce((accumulator, current) => {
                    return accumulator + " , " + current;
                });

                const searchValue = `${name} ${location} ${styles} ${tags}`;

                return searchValue.toLowerCase().trim().includes(searchTerm.toLowerCase());
            })
        }

        // Filter by price
        if (priceFilter !== "all") {
            filtered = filtered.filter(d =>
                priceFilter == "low" ? d.price < 10000 : d.price >= 10000
            );
        }

        // Filter by rating
        if (ratingFilter !== "all") {
            filtered = filtered.filter(d => Math.round(d.rating) == Number(ratingFilter));
        }

        // Filter by location
        if (locationFilter !== "all") {
            filtered = filtered.filter(
                d => d.location.toLowerCase() === locationFilter.toLowerCase()
            );
        }

        // Sort
        if (sortOrder !== "none") {
            filtered = [...filtered].sort((a, b) => {
                if (sortOrder === "asc") return a.price - b.price;
                if (sortOrder === "desc") return b.price - a.price;
                return 0;
            });
        }

        setFilterData(filtered);
    }, [data, searchTerm, priceFilter, ratingFilter, locationFilter, sortOrder]);

    return {
        data: filterData,
        isLoading,
        error,
        hasMore,
        locations
    };
};
