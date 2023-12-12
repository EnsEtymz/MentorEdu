
import React from "react";
import RCard from "./RCard";
import { Fragment } from "react";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const Recommended = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/student/top6videos')
            const jsonResponse = await response.json()
            setData(jsonResponse);
            console.log('data', data)
        };

        fetchData();
    }, []);




    return (
        <Fragment>


            <Grid container spacing={1}>

                <Grid item xs={1} sm={1} md={1} lg={1} >
                </Grid>




                <Grid item xs={10} sm={10} md={10} lg={10} >
                    <div style={{ width: '100%', fontSize: 20, marginBottom: 20, marginTop: 10 }}><b>Enes, Sizin İçin Önerilenler</b></div>
                    <Grid container spacing={3} >
                        {data.map((edu) =>
                            <Grid item xs={12} sm={6} md={4} lg={4}  >
                                <RCard id_edu={edu.id_edu} username={edu.username} title={edu.title} content={edu.content} category={edu.category} />
                            </Grid>

                        )}


                    </Grid>




                </Grid>


                <Grid item xs={1} sm={1} md={1} lg={1} >
                </Grid>


            </Grid>
        </Fragment>
    )
}
export default Recommended;