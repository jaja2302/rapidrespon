import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "axios";

export default function Getmodal({ isOpen, onRequestClose, selectedId }) {
    const [detailData, setDetailData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        if (selectedId && isOpen) {
            setLoading(true);
            setError(null);
            axios
                .post(route("detailData"), { id: selectedId })
                .then((response) => {
                    setDetailData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Failed to load details");
                    setLoading(false);
                    console.error(error);
                });
        }
    }, [selectedId, isOpen]); // Only run when selectedId or isOpen changes

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">
                Detail for ID: {selectedId}
            </span>
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
        <div className="card flex justify-content-center">
            <Dialog
                visible={isOpen}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={onRequestClose}
            >
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p className="m-0">
                        {detailData
                            ? JSON.stringify(detailData)
                            : "No data available"}
                    </p>
                )}
            </Dialog>
        </div>
    );
}
