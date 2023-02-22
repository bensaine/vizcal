import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { ExperimentSlide } from './ExperimentSlide'
import { ArrowLeft, ArrowRight } from 'react-feather'
import styles from './Carousel.module.scss'

export const Carousel = ({ slides }) => {
	const ref = React.useRef(null)
	const [numberOfSlides, setNumberOfSlides] = React.useState(1)

	React.useLayoutEffect(() => {
		const handleResize = () => {
			const windowWidth = ref.current.offsetWidth
			const visibleSlides = Math.floor(windowWidth / 300) || 1
			const visibleSlidesCount = slides.length < visibleSlides ? slides.length : visibleSlides
			setNumberOfSlides(visibleSlidesCount)
		}

		window.addEventListener('resize', handleResize)
		handleResize()
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div ref={ref} className={styles.carouselContainer}>
			<CarouselProvider
				isIntrinsicHeight={true}
				totalSlides={slides.length}
				visibleSlides={numberOfSlides}
				className={styles.carousel}
			>
				<ButtonBack className={styles.carouselButton}>
					<ArrowLeft />
				</ButtonBack>
				<Slider className={styles.carouselSlider}>
					{slides.map((slide, index) => {
						return (
							<Slide index={index} key={slide.id} innerClassName={styles.slideInner}>
								<ExperimentSlide {...slide} />
							</Slide>
						)
					})}
				</Slider>
				<ButtonNext className={styles.carouselButton}>
					<ArrowRight />
				</ButtonNext>
			</CarouselProvider>
		</div>
	)
}
