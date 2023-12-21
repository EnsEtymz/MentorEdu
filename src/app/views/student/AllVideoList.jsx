import React from "react";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import RCard from "app/components/HomePageComponents/RCard";


const AllVideoList = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/student/videolistall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const jsonResponse = await response.json()
            setData(jsonResponse);
            console.log('data', data)
        };

        fetchData();
    });




    return (
        <Grid container spacing={9}>
            {data.map((veri) => {
                return (
                    <Grid item key={veri.url} xs={12} sm={6} md={3}>
                        <RCard id_edu={veri.id_edu} username={veri.username} title={veri.title} content={veri.content} category={veri.category} click={veri.click} image_url={veri.image_url} />
                    </Grid>
                )
            }

            )}
        </Grid >
    )
}

export default AllVideoList;