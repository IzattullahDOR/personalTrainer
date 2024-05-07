import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar } from "@mui/material";
import Addtraining from "./Addtraining";

export default function Training() {

    const [trainings, setTrainings] = useState([{
        activity: '', date: '', duration: '', customer: ''

    }]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");

    const [columnDefs, setColumnDefs] = useState([
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        {
            field: 'date', headerName: 'Date', sortable: true, filter: true,
            valueFormatter: params =>
                dayjs(params.value).format('DD/MM/YYYY HH:mm')
        },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        {
            headerName: "Customer",
            field: "customer",
            valueFormatter: (params) => {
              if (!params.value || typeof params.value !== 'object') {
                return null;
              }
              
              const { firstname, lastname } = params.value;
              return `${firstname || 'null'} ${lastname || 'null'}`;
            },
            sortable: true,
            filter: true,
          },
        {
            cellRenderer: (params) =>
                <DeleteIcon
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params.data)}
                />
        }
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

    // deleteTraining
    const deleteTraining = (training) => {
        console.log(training);

        const url = `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${training.id}`
        console.log(url);
        if (window.confirm("Are you sure?")) {
            fetch(url, {
                method: 'DELETE'
            })

                .then(response => {
                    if (response.ok) {

                        setOpenSnackbar(true);
                        setMsgSnackbar("The training was deleted successfully!")
                        getTrainings(); // haetaan tietokannasta tuore/päivitetty auto tilanne
                    }

                    else {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Something went wrong with deleting")
                    }


                })
                .catch(error => console.error(error));
        }
    }
    //Adding new training
    const saveTraining = (training) =>{
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setMsgSnackbar("The training was saved successfully!");
                getTrainings(); // haetaan tietokannasta tuore/päivitetty auto tilanne  Fetch the updated car list after successfully saving
            } else {
                setOpenSnackbar(true);
                setMsgSnackbar("Something went wrong with saving the training.");
            }
        })
        .catch(error => console.error(error));
    }
    return (
        <>
            <Addtraining saveTraining={saveTraining} />
            <div className="ag-theme-material" style={{ width: 1450, height: 500 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                />


            </div>
            <Snackbar
                open={openSnackbar}
                message={msgSnackbar}
                autoHideDuration={3000}
                onClose={() => {
                    setOpenSnackbar(false);
                    setMsgSnackbar("")
                }}>

            </Snackbar>

        </>
    );


}