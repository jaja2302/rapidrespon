import React, { useEffect, useState ,useRef} from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
export default function Getmodal({ isOpen, onRequestClose, selectedData }) {
    const [detailData, setDetailData] = useState([]); // State to store API response
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [datedata, setDatedata] = useState([]); // State for dropdown options
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  
    const [jenisTanahOptions, setJenisTanahOptions] = useState([]);
    const [topografiOptions, setTopografiOptions] = useState([]);
    const [solumOptions, setSolumOptions] = useState([]);
    const [masalahOptions, setMasalahOptions] = useState([]);
    const [rekomendasiOptions, setRekomendasiOptions] = useState([]);
    const [rekomedatorOptions, setRekomedatorOptions] = useState([]);
    const [pendampingOptions, setPendampingOptions] = useState([]);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                getDatainduk();
        }
    }, [selectedData, isOpen]);

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

            // Update detail data
            const detail = response.data.data;
            setDetailData(detail);
        } catch (errors) {
            console.error(errors);
        }
    };

    const onRowEditComplete = (e) => {
        let updatedData = [...detailData];
        let { newData, index } = e;

        updatedData[index] = newData;

        setDetailData(updatedData);
        
        console.log(updatedData);
        
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
  
    const afdelingEditor = (options) => {
        const afdelingOptions = [
            { label: 'OA', value: 'OA' },
            { label: 'OB', value: 'OB' },
            { label: 'OC', value: 'OC' },
            { label: 'OD', value: 'OD' },
        ];
        return (
            <Dropdown
                value={options.value}
                options={afdelingOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Afdeling"
            />
        );
    };

    const getDatainduk = async () => {
        try {
            const response = await axios.get(route("getDatainduk"));
            const detail = response.data.data;
            
            // console.log(detail);
            
            // Assuming the API returns jenis tanah data in the correct format
            const jenisTanahOptions = detail.jenistanah
            const topografi = detail.topografi
            const solum = detail.solum
            const masalah = detail.masalah
            const rekomendasi = detail.rekomendasi
            const rekomendator = detail.rekomendator
            const pendamping = detail.pendamping
             // Assuming the API returns jenis tanah data in the correct format
            const options = jenisTanahOptions.map(item => ({
                value: item.id,
                label: item.nama_jenis_tanah
            }));

            const topografiOptions = topografi.map(item => ({
                value: item.id,
                label: item.nama_topografi
            }));

            const solumOptions = solum.map(item => ({
                value: item.id,
                label: item.nama_solum
            }));

            const masalahOptions = masalah.map(item => ({
                value: item.id,
                label: item.nama_masalah
            }));

            const rekomendasiOptions = rekomendasi.map(item => ({
                value: item.id,
                label: item.nama_rekomendasi
            }));

            const rekomendatorOptions = rekomendator.map(item => ({
                value: item.id,
                label: item.nama_rekomendator
            }));
            const pendampingOptions = pendamping.map(item => ({
                value: item.id,
                label: item.nama_jabatan
            }));

            setJenisTanahOptions(options);
            setTopografiOptions(topografiOptions);
            setSolumOptions(solumOptions);
            setMasalahOptions(masalahOptions);
            setRekomendasiOptions(rekomendasiOptions);
            setRekomedatorOptions(rekomendatorOptions);
            setPendampingOptions(pendampingOptions);
            
            
            

        } catch (errors) {
            console.error(errors);
        }
    };
    
    const jenitanah = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={jenisTanahOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Jenis Tanah"
            />
        );
    };

    const topografi = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={topografiOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Topografi"
            />
        );
    };

    const solum = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={solumOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Solum"
            />
        );
    };
    
    const masalah = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={masalahOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Masalah"
            />
        );
    };

    const rekomendasi = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={rekomendasiOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Rekomendasi"
            />
        );
    };

    const rekomendator = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={rekomedatorOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Rekomendator"
            />
        );
    };
    const pendamping = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={pendampingOptions}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select Pendamping"
                multiple
            />
        );
    };
    
    
    const statusBodyTemplate = (rowData) => {
        return (
            <Tag
                value={rowData.approval_status === "1$1" ? "Verif" : "Unverif"}
                severity={rowData.approval_status === "1$1" ? "success" : "danger"}
            ></Tag>
        );
    };

    const pendampingtabel = (rowData) => {
        const pendamping = rowData.pendamping.split('$');
    
        // Map pendamping values to their corresponding labels
        const pendampingLabels = pendamping.map((pendampingValue) => {
            const option = pendampingOptions.find(option => option.value.toString() === pendampingValue);
            return option ? option.label : pendampingValue; // If no match is found, fallback to the value itself
        });
    
        return (
            <div className="flex flex-wrap gap-2">
                {pendampingLabels.map((label, index) => (
                    <span key={index} className="p-tag p-tag-rounded p-tag-success">{label}</span>
                ))}
            </div>
        );
    };
    
    const blokexplode = (rowData) => {
        const bloks = rowData.blok.split('$'); // Split the string by comma and store the result in an array
        // return bloks; // Return the array of blocks
        return (
          <div className="flex flex-wrap gap-2">
                {bloks.map((blok, index) => (
                    <span key={index} className="p-tag p-tag-rounded p-tag-success">{blok}</span>
                ))}
            </div>
        );
    };
    
    const imageBodyTemplate = (rowData) => {
        const foto = rowData.foto.split('$');
    
        return (
            <div className="flex flex-wrap gap-2">
                {foto.map((foto, index) => (
                    <img 
                        key={index} 
                        src={`https://rapidresponse.srs-ssms.com/public/images/document/rapidresponse/${foto}`} 
                        alt={foto} 
                        width="64px" 
                        className="shadow-4 cursor-pointer" 
                        onClick={() => {
                            setSelectedImage(`https://rapidresponse.srs-ssms.com/public/images/document/rapidresponse/${foto}`);
                            setImageModalVisible(true);
                        }}
                    />
                ))}
            </div>
        );
    };
    const toast = useRef(null);
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Permintaan Verification di kirim', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Aksi di batalkan', life: 3000 });
    };

    const confirm1 = (event) => {
        confirmPopup({
            group: 'headless',
            target: event.currentTarget,
            message: 'Apakah anda ingin mengirimkan ulang verification?', 
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };



    const resendverification = (rowData, options) => {
        const isApproved = rowData.approval_status === "1$1";
        const icon = isApproved ? 'pi pi-check-square' : 'pi pi-envelope';
        const isDisabled = isApproved;
         return (
            <Button 
            onClick={confirm1} 
            icon={icon}
            className="p-button-sm p-button-text" 
            disabled={isDisabled}
            label="Resend Verif">
            </Button>
         );
    
    };


    return (
        <div className="flex justify-content-center">
            <Dialog
                visible={isOpen}
                modal
                header={`Detail Estate: ${selectedData ? selectedData.estate : "N/A"}`}
                footer={<Button label="Ok" icon="pi pi-check" onClick={onRequestClose} autoFocus />}
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
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                >
                    <Column
                        field="approval_status"
                        header="Status"
                        body={statusBodyTemplate}
                        style={{ minWidth: "100px" }}
                    />
                    <Column
                        field="estate"
                        header="Estate"
                        style={{ minWidth: "100px" }}
                    />
                    <Column
                        field="afdeling"
                        header="Afdeling"
                        style={{ width: "25%", minWidth: "150px" }}
                    />
                    <Column
                        field="blok"
                        header="Blok"
                        // editor={(options) => textEditor(options)}
                        body={blokexplode}
                        style={{ minWidth: "100px" }}
                    />
                    <Column
                        field="datetime"
                        header="Datetime"
                        style={{ minWidth: "150px" }}
                    />
                    <Column
                        field="jenistanah.id"
                        header="Jenis tanah"
                        body={(rowdata) => rowdata.jenistanah.nama_jenis_tanah}
                        editor={(options) => jenitanah(options)}
                        style={{ minWidth: "200px" }}
                    />

                     <Column
                        field="topografi.id"
                        header="Topografi"
                        body={(rowdata) => rowdata.topografi.nama_topografi}
                        editor={(options) => topografi(options)}
                        style={{ minWidth: "200px" }}
                    />
                     <Column
                        field="solum.id"
                        header="Solum"
                        body={(rowdata) => rowdata.solum.nama_solum}
                        editor={(options) => solum(options)}
                        style={{ minWidth: "100px" }}
                    />
                      <Column
                        field="baris"
                        header="Baris"
                        editor={(options) => textEditor(options)}
                        style={{ minWidth: "100px" }}
                    />
                      <Column
                        field="no_pkk"
                        header="No Pokok"
                        editor={(options) => textEditor(options)}
                        style={{ minWidth: "100px" }}
                    />
                      <Column
                        field="pendamping"
                        header="Pendamping"
                        body={pendampingtabel}
                        // editor={(options) => pendamping(options)}
                        style={{ minWidth: "100px" }}
                    />
                        <Column
                        field="rekomendator"
                        header="Rekomendator"
                        sortable
                        body={(rowdata) => rowdata.nama_rekomendator.nama_lengkap}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="verifikator1"
                        header="Verifikator 1"
                        sortable
                        body={(rowdata) => rowdata.nama_verifikator1.nama_lengkap}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="verifikator2"
                        header="Verifikator 2"
                        sortable
                        body={(rowdata) => rowdata.nama_verifikator2.nama_lengkap}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="foto"
                         header="Foto"
                        body={imageBodyTemplate} 
                        style={{ minWidth: "300px" }}
                    />
                    <Column
                        rowEditor
                        headerStyle={{ width: '10%', minWidth: '8rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    />
                    <Column style={{ flex: '0 0 4rem' }} body={resendverification}></Column>
                </DataTable>
            </Dialog>

            <Dialog
                visible={imageModalVisible}
                onHide={() => setImageModalVisible(false)}
                header="Detail Foto"
                modal
                style={{ width: '70vw' }}
            >
                {selectedImage && (
                    <img 
                        src={selectedImage} 
                        alt="Full size" 
                        style={{ width: '100%', height: 'auto' }} 
                    />
                )}
            </Dialog>
            <Toast ref={toast} />
            <ConfirmPopup
                group="headless"
                content={({message, acceptBtnRef, rejectBtnRef, hide}) => 
                    <div className="bg-gray-900 text-white border-round p-3">
                        <span>{message}</span>
                        <div className="flex align-items-center gap-2 mt-3">
                            <Button ref={acceptBtnRef} label="Save" onClick={() => {accept(); hide();}} className="p-button-sm p-button-outlined"></Button>
                            <Button ref={rejectBtnRef} label="Cancel" outlined onClick={() => {reject(); hide();}}className="p-button-sm p-button-text"></Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
