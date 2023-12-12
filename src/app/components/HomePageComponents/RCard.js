import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating } from '@mui/material';

const RCard = (props) => {

    const username = props.username ? props.username : 'Emre Akyüz';
    const title = props.title ? props.title : 'Sıfırdan İleri Seviye Vue.JS Eğitimi ve Uygulama Geliştirme';
    //  const content = props.content ? props.content : '';
    const category = props.category ? props.category : ''

    const handleCardClick = async (id_edu) => {
        // Sunucuya tıklama bilgisini ileten API endpoint'i
        await fetch('http://localhost:4000/student/increaseClick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_edu,

            }),

        });
        console.log('idedu: ', id_edu)
        // İlgili kartın tıklama sayısını artırdık, istediğiniz başka bir işlemi yapabilirsiniz.
        // Örneğin, ilgili videoyu gösteren bir sayfaya yönlendirebilirsiniz.

    };




    return (
        <Card sx={{ maxWidth: 345, marginBottom: 6, marginLeft: 'auto', marginRight: 'auto' }}>
            <CardActionArea onClick={() => { handleCardClick(props.id_edu) }} >
                <CardMedia
                    component="img"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>

                    <Typography variant="body1" color="text.first">
                        {username} -  {category}
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />

                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default RCard;