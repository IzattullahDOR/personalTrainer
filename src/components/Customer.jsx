import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";

export default function Customer() {
    const [customers, setCustomers] = useState([{
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");

    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', headerName:'First Name', sortable: true, filter: true},
        { field: 'lastname', headerName:'Last Name', sortable: true, filter: true},
        {field: 'streetaddress' , headerName:'Address', sortable: true, filter: true},
        {field: 'postcode', headerName:'Postcode', sortable: true, filter: true},
        { field:'city' , headerName:'City', sortable: true, filter: true},
        { field:'email', headerName:'Email', sortable: true, filter: true},
        {field:'phone', headerName:'Phone', sortable: true, filter: true},
        {
            cellRenderer: (params) =>
            <Button
                size="small"
                color="error"
                onClick={() => deleteCustomer(params)}
                >
                    Delete
            </Button>
            ,width:120
            
        }
    ]);

    useEffect(() => {
        getCustomers()}, []); //fetch only after the first rendering

    // functions
    //getcustomers
    const getCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responseData => {
                console.log(responseData._embedded.customers)
                setCustomers(responseData._embedded.customers);
            })
            .catch(error => console.error(error))
    }

    // deleteCustomer
    const deleteCustomer= (params) =>{
        if(window.confirm("Are you sure?")){
            fetch(params.data._links.customer.href,{method:'DELETE'})
            .then(response => {
                if (response.ok) {

                    setOpenSnackbar(true);
                    setMsgSnackbar("The car was deleted successfully!")
                    getCustomers(); // haetaan tietokannasta tuore/päivitetty auto tilanne
                }

                else {
                    setOpenSnackbar(true);
                    setMsgSnackbar("Something goes with deleting")
                    // window.alert("Something goes with deleting")   Molemmat on mahdollista sekä alerti, snackbar
                }


            })
            .catch(error => console.error(error));
        }
    }
    

    

    return (
        <>
        <div className="ag-theme-material" style={{width: 1530, height: 500}}>
      <AgGridReact 
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
      />
      <Snackbar
      open={openSnackbar}
      message={msgSnackbar}
      autoHideDuration={3000}
      onClose={() => {
          setOpenSnackbar(false);
          setMsgSnackbar("")
      }}>

      </Snackbar>
    </div> 
            
        </>
    );
}
