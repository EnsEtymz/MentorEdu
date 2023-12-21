import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VideoHome = () => {
    const navigate = useNavigate();
    const [deleteString, setDeleteString] = useState()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        if (deleteString === data.title) {
            const removeData = async () => {
                const response = await fetch(`http://localhost:4000/mentor/removeById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const jsonResponse = await response.json();
                if (jsonResponse.success === true) {
                    toast.success(jsonResponse.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    navigate('/mentor/videolist-id')
                } else {
                    toast.error(jsonResponse.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            };
            removeData();


        } else {
            toast.error('Hatalı değer Girildi', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }



    const { id } = useParams();
    const [data, setData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/mentor/getById/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const jsonResponse = await response.json();
            setData(jsonResponse[0]);
        };

        fetchData();

    }, []);

    return (
        <>
            <Grid container spacing={1} >
                <Grid xs={9} sm={9} md={9} lg={9} >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>

                            <Typography variant="h5" component="div">
                                {data.title}
                            </Typography>
                            <br></br>
                            <Typography variant="body2">
                                {data.content}
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>

                        <Button sx={{ float: 'right' }} variant="outlined" color="error" onClick={handleClickOpen}>Eğitimi Sil</Button>
                        <Button sx={{ float: 'right', marginRight: 1 }} variant="outlined">Bilgileri Güncelle</Button>
                        <Button sx={{ float: 'right', marginRight: 1 }} variant="outlined">Video Ekle</Button>

                    </Card>

                </Grid>

                <Grid xs={3} sm={3} md={3} lg={3} >
                    <div style={{ height: '100vh' }}>
                        <Card sx={{ maxWidth: 345, height: '100%' }}>
                            <CardMedia
                                sx={{ height: 240 }}
                                image={data.image_url}
                                title="green iguana"
                            />

                            <Button variant="outlined" sx={{ width: '100%', height: 60 }}>Outlined</Button>
                            <Button variant="outlined" sx={{ width: '100%', height: 60 }}>Outlined</Button>
                            <Button variant="outlined" sx={{ width: '100%', height: 60 }}>Outlined</Button>
                            <Button variant="outlined" sx={{ width: '100%', height: 60 }}>Outlined</Button>
                            <Button variant="outlined" sx={{ width: '100%', height: 60 }}>Outlined</Button>
                        </Card>


                    </div>
                </Grid>
            </Grid>





            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Eğitimi Sil</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Eğitimi silmek için eğitim setinin tam adını <b>({data.title})</b> yazınız.
                    </DialogContentText>

                    <TextField
                        fullWidth
                        autoFocus
                        id="name"
                        type="text"
                        margin="dense"
                        label="Eğitim Adı"
                        value={deleteString}
                        onChange={(e) => { setDeleteString(e.target.value) }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        İptal
                    </Button>

                    <Button onClick={handleDelete} color="primary">
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default VideoHome;