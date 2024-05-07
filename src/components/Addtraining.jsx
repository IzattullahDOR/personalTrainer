import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function Addtraining(props) {

    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        activity: '',
        date: null,
        duration: '',
        customer: ''
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []); //fetch only after the first rendering

    const fetchCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data._embedded.customers)
                setCustomers(data._embedded.customers);
            })
            .catch(error => console.error(error));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTraining({ ...training, [name]: value });
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    };

    return (
        <>
            <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Activity"
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        fullWidth
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            autoFocus
                            label="Date and Time"
                            margin="dense"
                            name="date"
                            value={training.date}
                            onChange={(value) => handleInputChange({ target: { name: 'date', value } })}
                            fullWidth
                        />
                    </LocalizationProvider>

                    <TextField
                        autoFocus
                        label="Duration"
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        label="Customer"
                        margin="dense"
                        name="customer"
                        value={training.customer}
                        onChange={handleInputChange}
                        fullWidth
                        select
                    >
                        {customers.map((customer, index) => (
                            <MenuItem key={index} value={customer._links.self.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
