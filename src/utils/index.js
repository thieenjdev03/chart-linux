// import React, { useEffect } from 'react';
// import Papa from 'papaparse';

// const CsvToJson = ({ onDataLoaded }) => {
//     useEffect(() => {
//         const fetchCsv = async () => {
//             const response = await fetch('/data.csv');
//             const reader = response.body.getReader();
//             const result = await reader.read();
//             const decoder = new TextDecoder('utf-8');
//             const csv = decoder.decode(result.value);

//             Papa.parse(csv, {
//                 complete: (result) => {
//                     onDataLoaded(result.data); // Gọi callback với dữ liệu
//                 },
//                 header: true,
//                 skipEmptyLines: true
//             });
//         };

//         fetchCsv();
//     }, [onDataLoaded]);

//     return null; // Không render gì cả
// };

// export default CsvToJson;
