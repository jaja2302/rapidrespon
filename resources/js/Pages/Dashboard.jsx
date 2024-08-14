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
        // console.log("clicked");

        setSelectedOption(option);
        // console.log(option["code"]);

        setDate(dateValue);

        setData("id", option, "date", dateValue);

        try {
            const response = await axios.get(route("get-data"), {
                params: {
                    id: option["code"],
                    tanggal: dateValue,
                },
            });
            setTableData(response.data.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const startContent = (
        <React.Fragment>
            <div className="grid">
                <div className="col-6">
                    <img
                        src="images/srs/Logo-SSS.png"
                        width="150px"
                        height={"100px"}
                        alt="Company Logo"
                        className="w-24 h-24 mr-4"
                    />
                </div>
                <div className="col-6">
                    <p> PT. SAWIT SUMBERMAS SARANA, TBK</p>
                    <p>SULUNG RESEARCH STATION</p>
                </div>
            </div>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <Selectoption
                        style={{ width: "80px" }}
                        options={props.data}
                        onSelectChange={(value) =>
                            handleSelectChange(value, date)
                        }
                    />
                </div>
                <div className="col-span-1">
                    <FloatLabel>
                        <Calendar
                            value={date}
                            style={{ width: "150px" }}
                            className="mr-2"
                            onChange={(e) =>
                                handleSelectChange(selectedOption, e.value)
                            }
                            view="month"
                            dateFormat="mm/yy"
                        />
                        <label htmlFor="tanggal">Bulan</label>
                    </FloatLabel>
                </div>
                <div className="col-span-1">
                    <Button
                        label="Download Ba"
                        icon="pi pi-download"
                        className="p-button-success"
                    />
                </div>
            </div>
        </React.Fragment>
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
            <Datatablefilter data={tableData} />
        </Layout>
    );
};

export default Dashboard;
