import React from 'react';
import styles from './Home.module.css';

import ECAMBAT from "./Ecam_Batiment.jpg";

export interface IHomePageProps{}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div>
            <div className={styles['image-container']}>
                <img src={String(ECAMBAT)} alt="ECAMBAT" />
            </div>
        </div>
    )
}

export default HomePage;