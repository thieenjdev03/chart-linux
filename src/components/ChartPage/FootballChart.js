import React, { useEffect, useState } from "react";
import Select from 'react-select';

const FootballChart = () => {
    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        const data = [
            { value: 1, label: "Label 1" },
            { value: 2, label: "Label 2" },
            { value: 3, label: "Label 3" }
        ];

        setValues(data);
        setSelectedValues([data[0]]);
    }, []);

    const onOptionChange = (options) => {
        // Selected options...
        console.log("options...", options);
        setSelectedValues(options);
    };
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <>
            <Select
                closeMenuOnSelect={false}
                value={selectedValues}
                isMulti
                options={values}
                onChange={onOptionChange}
            />
        </>
    );
};

export default FootballChart;
