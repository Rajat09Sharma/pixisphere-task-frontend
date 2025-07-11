import { useRef, useState, useCallback, useEffect } from "react";
import { debounce } from 'lodash';
import { PhotographerCard } from "../PhotographerCard/PhotographerCard";
import { LoadingSpiner } from "../LoadingSpiner/LoadingSpiner";
import { usePhotographersHook } from "../../hook/usePhotographersHook";
import { ErrorContainer } from "../ErrorContainer/ErrorContainer";

import "./CategoryListing.scss";

export const CategoryListing = () => {

    const [page, setPage] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("none");

    const [showMbFilter, setMbFilter] = useState(false);

    const { data, isLoading, error, hasMore, locations } = usePhotographersHook(searchTerm, priceFilter, ratingFilter, locationFilter, sortOrder, page);


    const observerRef = useRef();
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

    const handleClearFilter = () => {
        setPriceFilter("all");
        setPriceFilter("all");
        setLocationFilter("all");
        setSortOrder("none");
        setMbFilter(false);
    }

    useEffect(() => {
        const handler = debounce(() => {
            setSearchTerm(searchInput);
        }, 300); // 300ms delay

        handler(); // trigger it

        return () => {
            handler.cancel(); // cancel on unmount or change
        };
    }, [searchInput]);

    return (
        <div className="category-list">

            <div className="filters">
                <p>Filters by:</p>

                <select onChange={(e) => setPriceFilter(e.target.value)}>
                    <option value="all">All Prices</option>
                    <option value="low">Below ₹10,000</option>
                    <option value="high">₹10,000 and above</option>
                </select>

                <select onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="all">All Ratings</option>
                    <option value="3">3★</option>
                    <option value="4">4★ and above</option>
                </select>

                <select onChange={(e) => setLocationFilter(e.target.value)}>
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="none">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            {/* mobile view */}
            <div className="mb-filter">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <button className="filter-btn" onClick={() => setMbFilter(true)}>Select Filters </button>

            </div>

            {showMbFilter &&
                <div className="op-list-container">
                    <div className="top">
                        <p>Select Filters</p>
                        <p className="close" onClick={() => setMbFilter(false)}>❌</p>
                    </div>
                    <div className="op-list">
                        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                            <option value="all">All Prices</option>
                            <option value="low">Below ₹10,000</option>
                            <option value="high">₹10,000 and above</option>
                        </select>

                        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                            <option value="all">All Ratings</option>
                            <option value="3">3★</option>
                            <option value="4">4★ and above</option>
                        </select>

                        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                            <option value="all">All Locations</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>

                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="none">Sort by Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>

                        <button className="filter-btn" onClick={handleClearFilter}>Clear Filter</button>

                    </div>
                </div>
            }

            <div className="list-container">
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
                {!isLoading && error && <ErrorContainer message={"Error in loading photographers"} />}
                {!hasMore && !isLoading && <p className="info-message">No more photographers to show.</p>}
                {!isLoading && data.length == 0 && <p className="info-message">No such photographer.</p>}
            </div>
        </div>

    );
};
