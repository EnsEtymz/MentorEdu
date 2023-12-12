import React from "react";

import { CardMedia, Grid } from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect } from "react";
import { useState } from "react";
import RCard from "app/components/HomePageComponents/RCard";


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
        <Grid container spacing={9}>
            {data.map((veri) => {
                return (
                    <Grid item key={veri.url} xs={12} sm={6} md={3}>
                        <RCard username={veri.username} title={veri.title} content={veri.content} category={veri.category} />
                    </Grid>
                )
            }

            )}
        </Grid >
    )
}

export default VideoListId;