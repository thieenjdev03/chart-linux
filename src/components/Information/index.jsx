import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from '@mui/material/Button';

function Information(props) {
    const data = [
        {
            name: 'Nguyễn Văn Thiện',
            mssv: '2174802010394',
            class: '233_71ITNW30203_0101',
        },
        {
            name: 'Văn Khả Trân',
            mssv: '2174802010331',
            class: '233_71ITNW30203_0101',
        },
        {
            name: 'Nguyễn Quang Hải',
            mssv: '2174802010039',
            class: '233_71ITNW30203_0101',
        },
        {
            name: 'Võ Vĩnh Thịnh',
            mssv: '2174802010853',
            class: '233_71ITNW30203_0101',
        },
        {
            name: 'Võ Chí Đức',
            mssv: '2174802010512',
            class: '233_71ITNW30203_0101',
        }
    ];

    return (
        <div>
            <Header />
            <div className="wrapper p-8 gap-6">
                <h1 className="text-3xl text-red-700 font-bold">Đồ án cuối kỳ</h1>
                <h2>Chủ Đề : Visualize Data</h2>
                <h1 className="text-2xl font-bold mb-6">Thông tin chi tiết của nhóm</h1>
                <table className="w-1/3 bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 border-b border-r">Tên</th>
                            <th className="py-2 px-4 bg-gray-200 border-b border-r">MSSV</th>
                            <th className="py-2 px-4 bg-gray-200 border-b border-r">Lớp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-r text-center">{item.name}</td>
                                <td className="py-2 px-4 border-b border-r text-center">{item.mssv}</td>
                                <td className="py-2 px-4 border-b border-r text-center">{item.class}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="teacherLead">
                    <h1 className="text-2xl font-bold mt-8">Giáo viên hướng dẫn</h1>
                    <h1 className='text-red-900 font-bold'>ThS.Nguyễn Thái Anh</h1>
                    <h1 className='text-red-900 font-bold'>ThS.Trần Nguyễn Thanh Lân
                    </h1>
                </div>
                <Button href='https://docs.google.com/document/d/1OCS_4b6jRKK94OrOW9DFsTasbjEyEl84/edit?usp=sharing&ouid=114584565172830765396&rtpof=true&sd=true' variant="contained">Bài Báo Cáo</Button>
            </div>
            <Footer />
        </div>
    );
}

export default Information;
