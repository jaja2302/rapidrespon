import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

export default function Getmodal({ isOpen, onRequestClose, selectedData }) {
    const [detailData, setDetailData] = useState([]); // State to store API response
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [datedata, setDatedata] = useState([]); // State for dropdown options
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date

    // Reset datedata and selectedDate when selectedData changes
    useEffect(() => {
        if (selectedData && isOpen) {
            setDatedata([]); // Clear the dropdown options
            setSelectedDate(null); // Clear the selected date
            setDetailData([]); // Clear the detail data
            setLoading(true);
            setError(null);
            
            // Fetch new dates based on selectedData
            axios
                .get(route("filterrData"), {
                    params: {
                        estate: selectedData.estate,
                        afdeling: selectedData.afdeling,
                        date: selectedData.date,
                    },
                })
                .then((response) => {
                    const data = response.data.data;
                    setDatedata(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Failed to load dates");
                    setLoading(false);
                    console.error(error);
                });
        }
    }, [selectedData, isOpen]); // Trigger effect when selectedData or isOpen changes

    const handleSelectChange = async (e) => {
        const selectedValue = e.value;
        setSelectedDate(selectedValue);

        try {
            const response = await axios.get(route("detailData"), {
                params: {
                    estate: selectedData.estate,
                    afdeling: selectedData.afdeling,
                    date: selectedValue,
                },
            });
            setDetailData(response.data.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">
                Detail Estate: {selectedData ? selectedData.estate : "N/A"}
            </span>
            <Tag value="Verif"></Tag>
        </div>
    );

    const footerContent = (
        <div>
            <Button
                label="Ok"
                icon="pi pi-check"
                onClick={onRequestClose}
                autoFocus
            />
        </div>
    );

    return (
        <div className="flex justify-content-center">
            <Dialog
                visible={isOpen}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "80rem" }}
                breakpoints={{ "960px": "65vw", "641px": "90vw" }}
                onHide={onRequestClose}
            >
                {error && <p className="error">{error}</p>}
                <Dropdown
                    value={selectedDate}
                    onChange={handleSelectChange}
                    options={datedata}
                    optionLabel="name"
                    placeholder="Pilih Tanggal"
                    className="w-full md:w-14rem mb-4"
                    disabled={loading || !datedata.length}
                />

                <DataTable
                value={detailData}
                scrollable
                scrollHeight="500px"
                style={{ minWidth: "50rem" }}
                rows={25}
                tableStyle={{ minWidth: "50rem" }}
                >
                <Column
                    field="estate"
                    header="Estate"
                    style={{ minWidth: "100px" }}
                />
                <Column
                    field="afdeling"
                    header="Afdeling"
                    sortable
                    style={{ width: "25%", minWidth: "150px" }}
                />
                <Column
                    field="blok"
                    header="Blok"
                    style={{ minWidth: "100px" }}
                />
                <Column
                    field="datetime"
                    header="Datetime"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="jenistanah.nama_jenis_tanah"
                    header="Jenis Tanah"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="topografi.nama_topografi"
                    header="Topografi"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="solum.nama_solum"
                    header="Solum"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="baris"
                    header="Baris"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="no_pkk"
                    header="No Pokok"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="verifikator1"
                    header="Verifikator 1"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="verifikator2"
                    header="Verifikator 2"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="Pedamping"
                    header="Pedamping"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="subjek"
                    header="Subjek"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="masalah.nama_masalah"
                    header="Masalah"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="rekomendasi.nama_rekomendasi"
                    header="Rekomendasi"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="catatan"
                    header="Catatan"
                    style={{ minWidth: "150px" }}
                />
                </DataTable>
            </Dialog>
        </div>
    );
}
