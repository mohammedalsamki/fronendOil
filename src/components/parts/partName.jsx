import * as React from 'react';
import axios from "axios"
import { useEffect } from 'react';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    AppBar,
    TextField,
  } from "@material-ui/core";
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height:"50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  



export default function FileSystemNavigator(catID) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [name0,setName]= React.useState(String);
    let [nameEN0,setnameEN]= React.useState(String);
    let [catName,setcatName]= React.useState(localStorage.getItem('catName'));

    let [parent0,setparent]= React.useState(localStorage.getItem('catID'));
    let [ItemImage,setItemImage]= React.useState(String);
    let [partData,setpartData]= React.useState(String);

    const getOptionsPro=async(catID)=>{
        async function fetchData() {
            try {
                const res = await axios.post('http://localhost:5002/api/partName/product/cat/',{category:catID}); 
                setpartData(res.data);
                console.log(partData)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();

         }
    useEffect(async () => { 
        setcatName(localStorage.getItem('catName'));
        await setparent(localStorage.getItem('catID'));

        // getOptionsPro(catID);
        // console.log(partData)

        setparent(localStorage.getItem('catID'));
        setcatName(localStorage.getItem('catName'));


    

    }, []);
  
    const sendDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));

  
      let parent=parent0
      let nameEN =name0
      let ItemImage =ItemImage
      let nameAr =nameEN0
    
        axios.post('http://localhost:5002/api/partName/PartName',{
            category:parent,
            nameEN:nameEN,
            ItemImage: ItemImage, 
            nameAr: nameAr, 
    
        }).then( () => {
            window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    }
  return (
      <>
      <button onClick={handleOpen}>+</button>
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Category:{catName } </h1>
          <h2>Add Part Name</h2>
        </toolbar>
      </AppBar>
<br></br>
      <Typography variant="h5">BASIC WITH MATERIAL UI</Typography>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

      <form>
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Name En"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Name Ar"
          variant="outlined"
          onChange={(e) => setnameEN(e.target.value)}

        />
        <br />

        <br />

        <br />
        <Button variant="contained" color="primary" onClick={sendDataToAPI}>
        Add Part Name for {parent0}  
        </Button>
      </form>
    </div>
        </Box>
      </Modal>
    </>
  );
}
