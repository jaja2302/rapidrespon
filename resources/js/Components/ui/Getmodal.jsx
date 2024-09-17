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
import { MultiSelect } from 'primereact/multiselect';


export default function Getmodal({ isOpen, onRequestClose, selectedData ,canEdit,canApprove }) {
    const [detailData, setDetailData] = useState([]); // State to store API response
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [datedata, setDatedata] = useState([]); // State for dropdown options
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const toast = useRef(null);
    const [jenisTanahOptions, setJenisTanahOptions] = useState([]);
    const [topografiOptions, setTopografiOptions] = useState([]);
    const [solumOptions, setSolumOptions] = useState([]);
    const [masalahOptions, setMasalahOptions] = useState([]);
    const [rekomendasiOptions, setRekomendasiOptions] = useState([]);
    const [rekomedatorOptions, setRekomedatorOptions] = useState([]);
    const [pendampingOptions, setPendampingOptions] = useState([]);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPdfLoading, setIsPdfLoading] = useState(false);
    const [pdfLoadingStates, setPdfLoadingStates] = useState({});
    const [selectedId, setSelectedId] = useState(null);

    // console.log(canEdit);

    useEffect(() => {
        // Ensure selectedData is valid before making any requests
        if (selectedData && selectedData.estate && isOpen) {
            // Clear previous data
            setDatedata([]); // Clear the dropdown options
            setSelectedDate(null); // Clear the selected date
            setDetailData([]); // Clear the detail data
            setLoading(true); // Start loading state
            setError(null); // Clear any previous errors
    
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
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch((error) => {
                    setError("Failed to load dates");
                    setLoading(false); // Stop loading on error
                    console.error(error); // Log error for debugging
                });
    
            // Optionally wrap getDatainduk() inside another effect or condition
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
        if (!canEdit) return;

        let updatedData = [...detailData];
        let { newData, index } = e;
    
        // Update the data in the state immediately
        updatedData[index] = {
            ...updatedData[index],
            ...newData,
            nama_rekomendator: rekomedatorOptions.find(option => option.value === newData.rekomendator)?.label,
            nama_verifikator1: rekomedatorOptions.find(option => option.value === newData.verifikator1)?.label,
            nama_verifikator2: rekomedatorOptions.find(option => option.value === newData.verifikator2)?.label
        };
    
        setDetailData(updatedData);

        // console.log(updatedData);
        
        
        axios.post(route("updateData"), {
            data: updatedData,
        })
        .then((response) => {
            toast.current.show({ severity: 'info', summary: 'Saved', detail: 'Data berhasil di edit', life: 3000 });
        })
        .catch((error) => {
            toast.current.show({ severity: 'danger', summary: 'error', detail: 'Kesalahan mengupdate data', life: 3000 });
            // console.error(error);
        });
    };
    

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
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
                label: item.nama_rekomendasi,
                masalah_id : item.masalah_id
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
    

    // console.log(rekomendasiOptions);
    const rekomendasiEditor = (options, rowData) => {
        // Split and convert masalah values to numbers
        const masalah = rowData.masalah.split('$').map(Number);
        // console.log(masalah);
        
        // Filter rekomendasiOptions to get only those where masalah_id is in masalah array
        const filteredOptions = rekomendasiOptions.filter(option => masalah.includes(option.masalah_id));
    
        return (
            <MultiSelect
                value={Array.isArray(options.value) ? options.value : []}
                options={filteredOptions}
                onChange={(e) => {
                    options.editorCallback(e.value);
                }}
                optionLabel="label"
                optionValue="value"
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
    
    
    const statusBodyTemplate = (rowData) => {
        let statusLabel = "Unverif"; // Default status
        let severity = "danger";     // Default severity
    
        switch (rowData.approval_status) {
            case "1$1":
                statusLabel = "Telah Terverifikasi";
                severity = "success";
                break;
            case "1$0":
                statusLabel = "Terverifikasi verifikator satu";
                severity = "info";
                break;
            case "0$1":
                statusLabel = "Terverifikasi verifikator dua";
                severity = "info";
                break;
            default:
                statusLabel = "Belum Terverifikasi";
                severity = "danger";
                break;
        }
    
        return (
            <Tag value={statusLabel} severity={severity}></Tag>
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
                    <span key={index} className="p-tag p-tag-success">{label}</span>
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
                    <span key={index} className="p-tag p-tag-success">{blok}</span>
                ))}
            </div>
        );
    };
    
    const masalahBodyTemplate = (rowData) => {
        const masalah = rowData.masalah.split('$');
        const masalah_labels = masalah.map((masalahValue) => {
            const option = masalahOptions.find(option => option.value.toString() === masalahValue);
            return option ? option.label : masalahValue; 
        });
        return (
            <div>
                 {masalah_labels.map((label, index) => (
                    <span key={index} className="p-tag p-tag-danger">{label}</span>
                ))}
            </div>
        );
    };
    const rekomendasiTemplate = (rowData) => {
        // Ensure rekomendasi is a string
        let rekomendasiArray = [];
        if (typeof rowData.rekomendasi === 'string') {
            rekomendasiArray = rowData.rekomendasi.split('$');
        } else if (Array.isArray(rowData.rekomendasi)) {
            rekomendasiArray = rowData.rekomendasi.map(String); // Convert array items to strings
        }
    
        // Map through rekomendasiArray to get labels
        const rekomendasi_labels = rekomendasiArray.map((rekomendasiValue) => {
            const option = rekomendasiOptions.find(option => option.value.toString() === rekomendasiValue);
            return option ? option.label : rekomendasiValue; 
        });
    
        return (
            <div>
                {rekomendasi_labels.map((label, index) => (
                    <span key={index} className="p-tag p-tag-success">{label}</span>
                ))}
            </div>
        );
    };
    

    const getLabel = (rowData) => {
        const data = rowData.rekomendator;

        // Convert data to a number if it's not already
        const value = Number(data);
    
        const option = rekomedatorOptions.find(option => option.value === value);
        // console.log(option);
    
        return option ? option.label : "Label not found"; // Return a default message if no match is found
    };
    
    const downloadPDF = (rowData) => {
        return (
            <Button 
            onClick={async () => {
                setPdfLoadingStates(prev => ({ ...prev, [rowData.id]: true }));
                try {
                    const response = await axios.get(
                        'https://management.srs-ssms.com/api/generate_pdf_rapidresponse',
                        // 'http://127.0.0.1:8000/api/generate_pdf_rapidresponse',
                        {params: {
                            id: rowData.id,
                            pass: 'j',
                            email: 'j'
                        },
                        responseType: 'json'
                    });
                    
                    // console.log(rowData.id);
                    
                    const base64String = response.data.pdf;
                    const fileName = response.data.filename;
    
                    const byteCharacters = atob(base64String);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
    
                    const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(pdfBlob);
                    link.download = fileName;
                    link.click();
    
                } catch (error) {
                    console.error("Error generating or downloading PDF:", error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to download PDF', life: 3000 });
                } finally {
                    setPdfLoadingStates(prev => ({ ...prev, [rowData.id]: false }));
                }
            }}
            icon={pdfLoadingStates[rowData.id] ? "pi pi-spinner pi-spin" : "pi pi-file-pdf"}
            className="p-button-sm p-button-text" 
            label={pdfLoadingStates[rowData.id] ? "Loading..." : "PDF"}
            disabled={pdfLoadingStates[rowData.id]}>
            </Button>
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
    const fetchTableData = () => {
        axios.get('your-api-endpoint') // Replace with your actual API endpoint
            .then((response) => {
                setDetailData(response.data); // Update table data
            })
            .catch((error) => {
                console.error("Error fetching table data:", error);
            });
    };
    
    const accept = () => {
        // console.log(`Accepting ID: ${selectedId}`); // Use the state variable
    
        axios.post(route("resend_notif"), {
            id: selectedId, // Pass the id from state
        })
        .then((response) => {
            const message = response.data.success || 'Notifikasi berhasil di kirim';
            
            // Show success message
            toast.current.show({
                severity: 'info',
                summary: 'Saved',
                detail: message,
                life: 3000
            });
    
            // Option 2: Update the specific row data locally (if applicable)
            const updatedData = detailData.map(item => 
                item.id === selectedId ? { ...item, approval_status: response.data.status_approve } : item
            );
            setDetailData(updatedData);
    
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.error || 'Kesalahan mengirim notifkasi';
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            });
            console.error(error);
        });
    };
    
    
    
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Aksi di batalkan', life: 3000 });
    };
    
    const confirm1 = (event, rowData) => {
        const id = rowData.id; // Capture the ID here
        setSelectedId(id); // Store the ID in state
        // console.log(`id confirm1: ${id}`);
        
        confirmPopup({
            group: 'headless',
            target: event.currentTarget,
            message: 'Apakah anda ingin melakukan verification?', 
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject,
        });
    };
    
    


    const resendverification = (rowData, options) => {
        const isApproved = rowData.approval_status === "1$1";
        const icon = isApproved ? 'pi pi-check-square' : 'pi pi-envelope';
        const isDisabled = isApproved;
         return (
            <Button 
            onClick={(event) => confirm1(event, rowData)} 
            icon={icon}
            className="p-button-sm p-button-text" 
            disabled={isDisabled}
            label="Verif">
            </Button>
         );
    };

    
    const [mapsmodalVisible, setMapsmodalVisible] = useState(false);
    const [mapDetails, setMapDetails] = useState({ lat: null, lon: null });
    
    const checkMaps = (rowData, options) => {
        const lat = rowData.lat;
        const lon = rowData.lon;
        return (
            <Button 
                onClick={() => {
                    // Set the latitude and longitude details before rendering the map
                    setMapDetails({ lat, lon });
                    setMapsmodalVisible(true); // Show the modal
                }}
                icon='pi pi-map'
                className="p-button-sm p-button-text" 
                label="Maps">
            </Button>
        );
    };
    
    const renderMap = () => {
        const { lat, lon } = mapDetails; // Destructure the latitude and longitude from state
        if (!lat || !lon) {
            return <p>No map data available.</p>;
        }
    
        return (
            <iframe
                src={`https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        );
    };
 
    
    return (
        <div className="flex justify-content-center">
            <Dialog
                visible={isOpen}
                modal
                header={`Detail Estate: ${selectedData ? selectedData.estate : "N/A"}`}
                footer={<Button label="Ok" icon="pi pi-check" onClick={onRequestClose} autoFocus />}
                onHide={onRequestClose}
                maximizable style={{ width: '80vw' }}
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
                        style={{ minWidth: "150px" }}
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
                        field="subjek"
                        header="Subjek"
                        editor={(options) => textEditor(options)}
                        style={{ minWidth: "150px" }}
                    />
                    <Column
                        field="masalah"
                        header="Masalah"
                        body={masalahBodyTemplate}
                        style={{ minWidth: "200px" }}

                    />
                        <Column
                        field="rekomendasi"
                        header="Rekomendasi"
                        body={rekomendasiTemplate}
                        editor={(options) => rekomendasiEditor(options, options.rowData)} // Pass options.rowData
                        style={{ minWidth: '200px' }}
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
                        body={(rowData) => {
                            const value = Number(rowData.rekomendator);
                            const option = rekomedatorOptions.find(option => option.value === value);
                            return option ? option.label : "Label not found";
                        }}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="verifikator1"
                        header="Verifikator 1"
                        sortable
                        body={(rowData) => {
                            const value = Number(rowData.verifikator1);
                            const option = rekomedatorOptions.find(option => option.value === value);
                            return option ? option.label : "Label not found";
                        }}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="verifikator2"
                        header="Verifikator 2"
                        sortable
                        body={(rowData) => {
                            const value = Number(rowData.verifikator2);
                            const option = rekomedatorOptions.find(option => option.value === value);
                            return option ? option.label : "Label not found";
                        }}
                        editor={(options) => rekomendator(options)}
                        style={{ minWidth: "300px" }}
                    />
                        <Column
                        field="foto"
                         header="Foto"
                        body={imageBodyTemplate} 
                        style={{ minWidth: "300px" }}
                    />
                    <Column style={{ flex: '0 0 4rem' }} body={checkMaps}></Column>
                    {canEdit && (
                        <Column
                            rowEditor
                            headerStyle={{ width: '10%', minWidth: '8rem' }}
                            bodyStyle={{ textAlign: 'center' }}
                        />
                    )}
                    <Column style={{ flex: '0 0 4rem' }} body={resendverification}></Column>
                    <Column style={{ flex: '0 0 4rem' }} body={downloadPDF}></Column>
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
            <Dialog
                visible={mapsmodalVisible} // Control modal visibility with state
                onHide={() => setMapsmodalVisible(false)} // Hide the modal when closing
                header="Detail Maps"
                modal
                style={{ width: '70vw' }}
                >
                {renderMap()}  {/* Render the map when modal is opened */}
            </Dialog>
            <Toast ref={toast} />
            <ConfirmPopup
                group="headless"
                content={({message, acceptBtnRef, rejectBtnRef, hide}) => 
                    <div className="bg-gray-900 text-white border-round p-3">
                        <span>{message}</span>
                        <div className="flex align-items-center gap-2 mt-3">
                            <Button ref={acceptBtnRef} label="Ya" onClick={() => {accept(); hide();}} className="p-button-sm p-button-outlined"></Button>
                            <Button ref={rejectBtnRef} label="Tidak" outlined onClick={() => {reject(); hide();}}className="p-button-sm p-button-text"></Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
