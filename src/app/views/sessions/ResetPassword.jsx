import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
    padding: 32,
    background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        margin: '1rem',
        borderRadius: 12,
    },
}));

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // Örneğin, fetch veya axios kullanarak POST isteği
            const response = await fetch('http://localhost:4000/user/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password

                }),
            });
            const jsonResponse = await response.json()
            console.log(jsonResponse.message)
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
                navigate('/session/signin')



            }
            else {
                toast.error(jsonResponse.message, {
                    position: "top-right",
                    autoClose: 4999,
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
        <ForgotPasswordRoot>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12}>
                        <JustifyBox p={4}>
                            <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
                        </JustifyBox>

                        <ContentBox>
                            <form onSubmit={handleFormSubmit}>
                                <TextField
                                    type="email"
                                    name="email"
                                    id='email'
                                    size="small"
                                    label="Email"
                                    value={email}
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ mb: 3, width: '100%' }}
                                />


                                <TextField
                                    type="password"
                                    name="password"
                                    id='password'
                                    size="small"
                                    label="Yeni Şifre"
                                    value={password}
                                    variant="outlined"
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mb: 3, width: '100%' }}
                                />

                                <Button fullWidth variant="contained" color="primary" type="submit">
                                    Reset Password
                                </Button>


                            </form>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </ForgotPasswordRoot>
    );
};

export default ResetPassword;
