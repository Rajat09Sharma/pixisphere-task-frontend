import { useParams } from "react-router-dom";
import { PhotographerProfile } from "../Components/PhotographerProfile/PhotographerProfile";
import { useEffect, useRef, useState } from "react";
import { LoadingSpiner } from "../Components/LoadingSpiner/LoadingSpiner";

export const ProfilePage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const timerId = useRef();

    useEffect(() => {
        setLoading(true);
        const fetchPhotographerData = async () => {
            try {
                const response = await fetch("http://localhost:3001/photographers/" + id);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log("Photographer detail fetching error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        timerId.current = setTimeout(() => {
            fetchPhotographerData();
        }, 1500)

        return () => {
            clearTimeout(timerId.current);
        }

    }, [id]);

    return (
        <>
            {isLoading && <LoadingSpiner />}
            {error && <p>Error loading photographer details.</p>}
            {data && <PhotographerProfile data={data} />}
        </>
    );
};
