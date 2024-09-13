import React, { useState, useEffect, useContext } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import Selectoption from "@/Components/ui/Selectoption.jsx";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import Datatablefilter from "@/Components/ui/Datatablefilter.jsx";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";

import { Fieldset } from "primereact/fieldset";

const Dashboard = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [tableData, setTableData] = useState([]);
    
    const [date, setDate] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const { setData } = useForm({
        id: "",
        date: "",
    });

    const handleSelectChange = async (option, dateValue) => {
        setSelectedOption(option);
        setDate(dateValue);
    
        // Manually format the date to 'YYYY-MM-DD' in local time
        const year = dateValue.getFullYear();
        const month = (dateValue.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JS
        const day = dateValue.getDate().toString().padStart(2, '0'); // Get the day of the month
    
        const formattedDate = `${year}-${month}-${day}`;
        // console.log(formattedDate);
    
        setData("id", option, "date", formattedDate);
    
        try {
            const response = await axios.get(route("get-data"), {
                params: {
                    id: option["code"],
                    tanggal: formattedDate,
                },
            });
            setTableData(response.data.data);
        } catch (errors) {
            console.error(errors);
        }
    };
    
    

    const startContent = (
        <div className="flex flex-col md:flex-row items-center md:items-start md:border-red-50">
            <img
                src="images/srs/Logo-SSS.png"
                width="120px"  // Reduced size for better mobile fit
                height="140px" // Reduced size for better mobile fit
                alt="Company Logo"
                className="mb-2 md:mb-0 md:mr-4"
            />
            <div className="text-center md:text-left">
                <p className="text-sm md:text-lg font-semibold">
                    PT. SAWIT SUMBERMAS SARANA, TBK
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                    SULUNG RESEARCH STATION
                </p>
            </div>
        </div>
    );
    
    const endContent = (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <Selectoption
                style={{ width: "100%", maxWidth: "150px" }} // Adjust width for mobile
                options={props.data}
                onSelectChange={(value) => handleSelectChange(value, date)}
            />
            <FloatLabel>
                <Calendar
                    value={date}
                    style={{ width: "100%", maxWidth: "150px" }} // Adjust width for mobile
                    className="mt-2 md:mt-0 md:mr-2"
                    onChange={(e) => handleSelectChange(selectedOption, e.value)}
                    view="month"
                    dateFormat="mm/yy"
                />
            </FloatLabel>
        </div>
    );
    
    return (
        <Layout>
            <div className="grid">
                <div className="col-12">
                    <h2 className="text-lg md:text-xl lg:text-2xl text-center">
                        REKAP HARIAN RAPID RESPON
                    </h2>
                </div>
                <div className="col-12">
                    <Toolbar start={startContent} end={endContent} />
                </div>
            </div>
            <Datatablefilter
             data={tableData}
             canEdit={props.canEdit}
             canApprove={props.canApprove}
               />
        </Layout>
    );
    
};

export default Dashboard;
