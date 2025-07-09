

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Testimonial.scss';

const Testimonial = ({ title, testimonials }) => {
    return (<section className="testimonials" > <div className="container" >
        <h2 className="testimonials__title" data-aos="zoom-in" > {title}</h2>
        <div className="testimonials__slider" >
            <Swiper modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={false}
                navigation={true}
                loop={true}
                autoplay={
                    {
                        delay: 8000,
                        disableOnInteraction: false,
                    }
                }

            > {testimonials.map((testimonial) => (<SwiperSlide key={testimonial.id}>
                <div className="testimonial-item" data-aos="zoom-in-down" >
                    <div className="testimonial-item__quote" >

                    </div>
                    <p className="testimonial-item__content" > {testimonial.comment}</p>
                    <div className="testimonial-item__author" >
                        <div className="testimonial-item__author-info" >
                            <p className="testimonial-item__author-name" > {testimonial.name}</p>
                            <p className="testimonial-item__author-position" > {testimonial.rating}</p>
                            <p className="testimonial-item__author-position" > {testimonial.date}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>))
                }

            </Swiper>
        </div>
    </div>
    </section >
    );
};

export default Testimonial;