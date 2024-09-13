import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Getmodal from "./Getmodal";

export default function Datatablefilter({ data ,canEdit,canApprove}) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [selectedData, setSelectedData] = useState(null); // State to hold the selected row's data

    // Event handler for the Detail button click
    const handleDetailClick = (rowData) => {
        setSelectedData(rowData);
        setIsModalOpen(true); // Open the modal
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    // Template for rendering the Detail button
    const detailButtonTemplate = (rowData) => {
        return (
            <Button
                label="Detail"
                className="p-button-sm p-button-text"
                onClick={() => handleDetailClick(rowData)}
            />
        );
    };

    return (
        <div className="card">
            {data.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                    <DataTable
                        value={data}
                        scrollable
                        scrollHeight="500px"
                        style={{ minWidth: "50rem" }}
                        tableStyle={{ minWidth: "50rem" }}
                    >
                        <Column
                            field="estate"
                            header="Estate"
                            style={{ minWidth: "100px" }}
                        ></Column>
                        <Column
                            field="afdeling"
                            header="Afdeling"
                            sortable
                            style={{ width: "25%", minWidth: "150px" }}
                        ></Column>
                        <Column
                            field="masalah"
                            header="Masalah"
                            style={{ minWidth: "100px" }}
                        ></Column>
                        <Column
                            field="blok"
                            header="Jumlah Blok"
                            style={{ minWidth: "100px" }}
                        ></Column>
                         <Column
                            field="date"
                            header="Date"
                            style={{ minWidth: "100px" }}
                        ></Column>
                        <Column
                            body={detailButtonTemplate}
                            style={{ width: "10rem", minWidth: "100px" }}
                        ></Column>
                    </DataTable>
                </div>
            ) : (
                <p>No data available</p>
            )}

            {/* Render the modal and pass the selected data */}
            <Getmodal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                selectedData={selectedData} 
                canEdit = {canEdit}
                canApprove ={ canApprove}
            />
        </div>
    );
}
