import React from 'react';

export interface IHomePageProps{}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div>
            <p>Welcome To ECAM!</p>
        </div>
    )
}

export default HomePage;