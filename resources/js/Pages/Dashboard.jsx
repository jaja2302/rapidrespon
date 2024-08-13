import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import Selectoption from "@/Components/ui/Selectoption.jsx";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import Datatablefilter from "@/Components/ui/Datatablefilter.jsx";
const Dashboard = (props) => {
    useEffect(() => {
        // Access the data passed from the controller
        // console.log(props.data);
    }, []);
    const [selectedOption, setSelectedOption] = useState(null);
    const { data, setData, post } = useForm({
        id: "",
    });
    const [tableData, setTableData] = useState([]);

    const handleSelectChange = async (value) => {
        setData("id", value);

        try {
            const response = await axios.post(route("get-data"), { id: value });
            console.log("success", response.data);
            setTableData(response.data.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const startContent = (
        <React.Fragment>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img
                        src="images/srs/Logo-SSS.png"
                        width="200px"
                        height={"100px"}
                        alt="Company Logo"
                        className="w-24 h-24 mr-4"
                    />
                    <div>
                        <h4 className="font-semibold">
                            PT. SAWIT SUMBERMAS SARANA, TBK
                        </h4>
                        <p>SULUNG RESEARCH STATION</p>
                    </div>
                </div>
                <div className="text-right"></div>
            </div>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <Selectoption
                options={props.data}
                onSelectChange={handleSelectChange}
            />
            <Button
                label="Download Ba"
                icon="pi pi-download"
                className="p-button-success"
            />
        </React.Fragment>
    );

    return (
        <Layout>
            <div className="p-4">
                <div className="text-center mb-4">
                    <h2>REKAP HARIAN RAPID RESPON</h2>
                </div>

                <div className="bg-red-100 text-red-700 p-4 mb-4 rounded hidden">
                    <h5>Data Belum DiVerifikasi</h5>
                    <div className="flex justify-center gap-4 mt-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                            Accept
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded">
                            Reject
                        </button>
                    </div>
                </div>
                <div className="card">
                    <Toolbar start={startContent} end={endContent} />
                    <div>
                        Selected Option:{" "}
                        {setSelectedOption ? setSelectedOption.code : "None"}
                    </div>
                </div>

                <Datatablefilter data={tableData} />
            </div>
        </Layout>
    );
};

export default Dashboard;
