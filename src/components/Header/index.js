import React from 'react';

const Header = (props) => {
    return (
        <>
            <div className='header flex items-center bg-black w-full text-white p-4 gap-10 justify-center'>
                <a href='/'>Home</a>
                <a href='/ChartPerTeamPage'>Thống kê theo đội bóng</a>
                <a href='/ChartPerStage'>Thống kê theo vòng</a>
                <a href='/ChartPerGroup'>Thống kê theo bảng</a>
            </div>
        </>
    );
};

export default Header;