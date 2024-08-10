import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext";
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <Layout>
            <div className="p-4">
                {/* Title Section */}
                <div className="text-center mb-4">
                    <h2>REKAP HARIAN RAPID RESPON</h2>
                </div>

                {/* Verification Status */}
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

                {/* Company Information and Action Buttons */}
                <div className="bg-white shadow-md rounded p-4 mb-4">
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
                        <div className="text-right">
                            <div>
                                <select
                                    id="options"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                >
                                    <option value="">
                                        --Please choose an option--
                                    </option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                Show
                            </button>
                        </div>
                    </div>
                    <div className="text-left">
                        <p>
                            Estate/Afdeling: <strong>NBE - OA</strong>
                        </p>
                        <p>
                            Tanggal: <strong>28-05-2024</strong>
                        </p>
                    </div>
                    <div className="text-right mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Download BA PDF
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white shadow-md rounded p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estate</th>
                                <th>Afdeling</th>
                                <th>Blok</th>
                                <th>Subjek</th>
                                <th>Masalah</th>
                                <th>Rekomendasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>NBE</td>
                                <td>OA</td>
                                <td>A18, B19</td>
                                <td>Kesehatan tanaman</td>
                                <td>Dominan pokok tersera...</td>
                                <td>Melakukan sensus rutin...</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>OB</td>
                                <td>D33, D34</td>
                                <td>Kesehatan tanaman</td>
                                <td>Dominan pokok tersera...</td>
                                <td>Melakukan sensus rutin...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
