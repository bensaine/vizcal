import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Experiment } from './Experiment'
import { ArrowLeft, ArrowRight } from 'react-feather'
import styles from './Carousel.module.scss'

export const Carousel = ({ slides }) => {
	return (
		<CarouselProvider
			isIntrinsicHeight={true}
			totalSlides={slides.length}
			visibleSlides={slides.length < 4 ? slides.length : 4}
			className={styles.carousel}
		>
			<ButtonBack className={styles.carouselButton}>
				<ArrowLeft />
			</ButtonBack>
			<Slider className={styles.carouselSlider}>
				{slides.map((slide, index) => {
					return (
						<Slide index={index} key={slide.id} innerClassName={styles.slideInner}>
							<Experiment {...slide} />
						</Slide>
					)
				})}
			</Slider>
			<ButtonNext className={styles.carouselButton}>
				<ArrowRight />
			</ButtonNext>
		</CarouselProvider>
	)
}
