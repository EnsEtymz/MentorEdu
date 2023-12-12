import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { toast } from "react-toastify";




const CreateEdu = () => {


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const categories = ["Frontend", "Backend", "Veri Tabanı", "Oyun Geliştirme", "Mobil Geliştirme"];

    const storedUser = localStorage.getItem('user');
    const username = JSON.parse(storedUser).username




    const Create = async () => {
        try {
            // Örneğin, fetch veya axios kullanarak POST isteği
            const response = await fetch('http://localhost:4000/mentor/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    title,
                    content,
                    category
                }),
            });
            const jsonResponse = await response.json()

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


            }
            else {
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

        } catch (error) {

            console.error('Error:', error);
        }
    };


    return (
        <>
            <React.Fragment>
                <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
                    <Box sx={{ padding: 5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}

                                >
                                    Title
                                </InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    required
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    defaultValue={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}

                                >
                                    Content
                                </InputLabel>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Content"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={content}
                                    onChange={(e) => { setContent(e.target.value) }}
                                />
                            </Grid>





                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}
                                >
                                    Category
                                </InputLabel>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        defaultValue={category}
                                        onChange={(e) => { setCategory(e.target.value) }}
                                    >
                                        {categories.map((item) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={2}>
                                <InputLabel
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                    }}
                                >
                                    Img Upload
                                </InputLabel>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Button>
                                    <UploadFileIcon />
                                </Button>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <Button variant="contained" sx={{ color: "#fff" }} onClick={Create}  >
                                    Oluştur
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </React.Fragment>
        </>
    )
}
export default CreateEdu;