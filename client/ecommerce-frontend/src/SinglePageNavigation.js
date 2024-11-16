import React from 'react'
import appliancesImage from './images/appliancesImage.webp';
import electronicsImage from './images/electronicsImage.webp';
import fashionImage from './images/fashionImage.webp';
import groceryImage from './images/groceryImage.webp';
import { useScroll } from './ScrollContext';
import styles from './cssFiles/SinglePageNavigation.module.css'
import {Card} from 'react-bootstrap';

const SinglePageNavigation = () => {
    const { scrollToSection } = useScroll();
  return (
    <div className={styles.singlePageNavigation}>
        <Card className={styles.imageContainer} onClick={() => scrollToSection('section1')}>
            <img src={electronicsImage} alt="Section 1"  />
            <p className={styles.imageCaption}>Electronics</p>
        </Card>
        <Card className={styles.imageContainer} onClick={() => scrollToSection('section2')}>
            <img src={fashionImage} alt="Section 2"  />
            <p className={styles.imageCaption}>Fashion</p>
        </Card>
        <Card className={styles.imageContainer} onClick={() => scrollToSection('section3')}>
            <img src={appliancesImage} alt="Section 3"  />
            <p className={styles.imageCaption}>Appliances</p>
        </Card>
        <Card className={styles.imageContainer} onClick={() => scrollToSection('section4')}>
            <img src={groceryImage} alt="Section 4"  />
            <p className={styles.imageCaption}>Grocery</p>
        </Card>
    </div>
  )
}

export default SinglePageNavigation