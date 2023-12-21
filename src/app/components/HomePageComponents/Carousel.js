import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Slider from "react-slick";

const Carousel = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <React.Fragment>

            <Container maxWidth="lg" style={{ marginBottom: 15, marginTop: 10 }}>

                <Slider {...settings}   >
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                    <div>
                        <img src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" width={'100%'} height={390} />
                    </div>
                </Slider>
            </Container>

        </React.Fragment>

    );
};
export default Carousel;