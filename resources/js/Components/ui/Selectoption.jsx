import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Selectoption({ options, onSelectChange }) {
    // Find the default selected region ID
    const defaultRegionId = 1;

    // Initialize the state with the default ID
    const [selectedRegion, setSelectedRegion] = useState(defaultRegionId);

    useEffect(() => {
        // Update the selectedRegion if options change and include defaultRegionId
        const defaultOption = options.find(
            (option) => option.id === defaultRegionId
        );
        if (defaultOption) {
            setSelectedRegion(defaultOption);
        }
    }, [options]);

    const formattedOptions = options.map((option) => ({
        name: option.nama,
        code: option.id,
    }));

    const handleChange = (e) => {
        setSelectedRegion(e.value);
        onSelectChange(e.value);
    };

    return (
        <div className="flex justify-content-center mr-2">
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
