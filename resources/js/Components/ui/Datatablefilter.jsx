import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Getmodal from "./Getmodal";

export default function Datatablefilter({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [selectedId, setSelectedId] = useState(null); // State to hold the selected row's ID

    // Event handler for the Detail button click
    const handleDetailClick = (rowData) => {
        setSelectedId(rowData.id); // Set the selected row's ID
        setIsModalOpen(true); // Open the modal
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedId(null); // Reset the selected ID when the modal is closed
    };

    // Template for rendering the Detail button
    const detailButtonTemplate = (rowData) => {
        return (
            <Button
                label="Detail"
                className="p-button-sm p-button-text"
                onClick={() => handleDetailClick(rowData)} // Open modal with the row ID
            />
        );
    };

    return (
        <div className="card">
            {data.length > 0 ? (
                <DataTable
                    value={data}
                    scrollable
                    className="z-0"
                    scrollHeight="400px"
                    style={{ minWidth: "50rem" }}
                    paginator
                    rows={25}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="estate" header="Estate"></Column>
                    <Column
                        field="afdeling"
                        header="Afdeling"
                        sortable
                        style={{ width: "25%" }}
                    ></Column>
                    <Column field="blok" header="Blok"></Column>
                    <Column field="petugas" header="Petugas"></Column>
                    <Column field="datetime" header="Datetime"></Column>
                    <Column field="tph_baris" header="TPH Baris"></Column>
                    <Column field="status_panen" header="Status Panen"></Column>
                    <Column field="luas_blok" header="Luas Blok"></Column>
                    <Column
                        body={detailButtonTemplate}
                        style={{ width: "10rem" }}
                    ></Column>
                </DataTable>
            ) : (
                <p>No data available</p>
            )}

            {/* Render the modal and pass the selected ID */}
            <Getmodal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                selectedId={selectedId}
            />
        </div>
    );
}
