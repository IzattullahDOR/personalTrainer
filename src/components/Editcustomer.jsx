
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


export default function Editcustomer(props) {

    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({firstname: props.customer.firstname,
                    lastname: props.customer.lastname,
                    streetaddress: props.customer.streetaddress,
                    postcode: props.customer.postcode,
                    city: props.customer.city,
                    email: props.customer.email,
                    phone: props.customer.phone,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) =>{
        setCustomer({...customer,[event.target.name]: event.target.value})

    };

    const updateCustomer = () =>{
        props.updateCustomer(customer, props.customer._links.customer.href);
        handleClose();
    }


    return (

        <>
            <EditIcon style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen} />
                
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="First Name"
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="Address"
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="Postcode"
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="City"
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )


}