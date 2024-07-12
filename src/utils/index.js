import React, { useState, useEffect } from 'react';

function CsvToJsonConverter(props) {
    const [jsonData, setJsonData] = useState(null);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const csvData = e.target.result;
            const lines = csvData.split('\n');
            const headers = lines[0].split(',');
            const data = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                if (values.length === headers.length) {
                    const obj = {};
                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = values[j];
                    }
                    data.push(obj);
                }
            }

            setJsonData(data);
        };

        reader.readAsText(file);
    };
    useEffect(() => {
        const fetchCsvData = async () => {
            try {
                const response = await fetch('/data.csv'); // Đảm bảo tên file chính xác
                const csvData = await response.text();
                handleFileUpload({ target: { files: [new File([csvData], 'data.csv')] } });
            } catch (error) {
                console.error('Error fetching CSV:', error);
            }
        };

        fetchCsvData();
    }, []); // useEffect chỉ chạy một lần khi component được mount\
    useEffect(() => {
        if (jsonData && props.onDataLoaded) {
            props.onDataLoaded(jsonData); // Gọi hàm callback với dữ liệu JSON
        }
    }, [jsonData, props.onDataLoaded]);

    return (
        <div>
            {jsonData && (
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            )}
        </div>
    );
}

export default CsvToJsonConverter;
