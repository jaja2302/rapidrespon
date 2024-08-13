import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Selectoption({ options, onSelectChange }) {
    const [selectedRegion, setSelectedRegion] = useState(null);

    // console.log(options);

    const formattedOptions = options.map((option) => ({
        name: option.nama,
        code: option.id,
    }));
    // console.log(formattedOptions);

    const handleChange = (e) => {
        setSelectedRegion(e.value);
        onSelectChange(e.value);
    };

    return (
        <div className="flex justify-content-center ml-2 mr-2">
            <Dropdown
                value={selectedRegion}
                onChange={handleChange}
                options={formattedOptions}
                optionLabel="name"
                placeholder="Select a Region"
                className="w-full md:w-14rem"
            />
        </div>
    );
}
