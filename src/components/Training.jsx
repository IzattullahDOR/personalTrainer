import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

export default function Training() {

    const [trainings, setTrainings] = useState([{
        activity: '', date: '', duration: '', customer: ''

    }]);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        {
            field: 'date', headerName: 'Date', sortable: true, filter: true,
            valueFormatter: params =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm')
        },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        {
            field: 'customer', headerName: 'Customer', sortable: true, filter: true,
            valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}`
        },
    ]);

    useEffect(() => {
        getTrainings()
    }, []); //fetch only after the first rendering


    // functions
    //gettrainings
    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings", { method: 'GET' })
            .then(response => {

                return response.json();
            })
            .then(responseData => {

                setTrainings(responseData);
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <div className="ag-theme-material" style={{ width: 1450, height: 500 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                />
            </div>

        </>
    );


}