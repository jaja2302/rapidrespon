import React from "react";
import ReactModal from "react-modal-resizable-draggable";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export default function Modaldrag({ isOpen, onRequestClose, children }) {
    return (
        <ReactModal
            initWidth={800}
            initHeight={400}
            onFocus={() => console.log("Modal is clicked")}
            // className="z-50 p-4 bg-white rounded-lg shadow-lg"
            onRequestClose={onRequestClose}
            isOpen={isOpen}
        >
            <div className="card flex flex-col md:flex-row gap-3 mt-5">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Username" />
                </div>

                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">$</span>
                    <InputNumber placeholder="Price" />
                    <span className="p-inputgroup-addon">.00</span>
                </div>

                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">www</span>
                    <InputText placeholder="Website" />
                </div>
            </div>
            <button
                onClick={onRequestClose}
                className="mt-4 p-button p-button-secondary"
            >
                Close modal
            </button>
        </ReactModal>
    );
}
