import React from 'react';
import TopNavbar from '../Components/Topnavbar';

const Home = () => {
    return (
        <>
            {/* Uncomment when the TopNavbar component is ready */}
            {/* <TopNavbar /> */}
            <div className='w-full h-screen bg-slate-500 flex items-center justify-center'>
                <p className="text-white text-2xl md:text-4xl font-bold">Home</p>
            </div>
        </>
    );
}

export default Home;
