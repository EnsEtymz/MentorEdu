import { Button, Card, Grid } from '@mui/material';
import { Box, styled } from '@mui/material';



const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center'
    }
}));


const Choice = () => {

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                            <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
                        </JustifyBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>

                            <StyledButton variant="contained" color="primary" sx={{ width: '90%' }} href='/session/signup'>
                                Öğrenci Üyeliği
                            </StyledButton>
                            <StyledButton variant="contained" color="primary" sx={{ width: '90%' }} href='/session/signup-mentor' >
                                Mentör Üyeliği
                            </StyledButton>



                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default Choice;
