import React from "react";
import Button from '@mui/material/Button';

export default function Addtraining(props){

    const [open, setOpen] = React.useState(false);

    const [training, setTraining] =React.useState({

    });
    

    return(
        <>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" >
                Add Training
            </Button>
        </>
    )
}