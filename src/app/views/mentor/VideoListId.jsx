import React from "react";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import RCard from "app/components/HomePageComponents/RCard";
import { Link } from "react-router-dom";


const VideoListId = () => {
    const storedUser = localStorage.getItem('user');
    const username = JSON.parse(storedUser).username

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/mentor/listid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,

                }),
            });
            const jsonResponse = await response.json()
            setData(jsonResponse);
            console.log('data', data)
        };

        fetchData();
    }, []);




    return (
        <>
            <Grid container spacing={9}>
                {data.map((veri) => {
                    return (
                        <Grid item key={veri.url} xs={12} sm={6} md={3}>
                            <Link to={`/mentor/videoHome/${veri.id_edu}`} >
                                <RCard username={veri.username} title={veri.title} content={veri.content} category={veri.category} click={veri.click} image_url={veri.image_url} /></Link>
                        </Grid>
                    )
                }

                )}
            </Grid >

        </>
    )
}

export default VideoListId;