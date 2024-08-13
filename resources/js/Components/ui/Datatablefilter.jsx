import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Datatablefilter({ data }) {
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
                </DataTable>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}
