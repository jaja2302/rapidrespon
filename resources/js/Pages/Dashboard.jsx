import React, { useState, useEffect, useContext } from "react";
import Layout from "@/Layouts/layout/layout.jsx";
import Selectoption from "@/Components/ui/Selectoption.jsx";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import Datatablefilter from "@/Components/ui/Datatablefilter.jsx";
import Modaldrag from "@/Components/ui/Modaldrag";
import { LayoutContext } from "../Layouts/layout/context/layoutcontext";
import { PrimeReactContext } from "primereact/api";
const Dashboard = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const { data, setData, post } = useForm({
        id: "",
    });

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

    const openModal = () => {
        setIsModalOpen(true);
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: false,
        }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    <div>{selectedOption ? selectedOption.code : "None"}</div>
                </div>
                <button onClick={openModal}>Open Draggable Modal</button>
                <Modaldrag isOpen={isModalOpen} onRequestClose={closeModal} />
                <Datatablefilter data={tableData} />
            </div>
        </Layout>
    );
};

export default Dashboard;
