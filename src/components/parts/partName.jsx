import * as React from 'react';
import axios from "axios"
import { useEffect } from 'react';
import Image from "material-ui-image";
import Select from 'react-select'
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
import { Grid } from '@material-ui/core';
import { name } from 'lodash.assignwith';
import { async } from 'q';
import { random } from 'lodash';
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
  
  const ulStyle = {  padding: "12px 10px",  width:'40%', listStyleType:'none'}
  const selectStyle = {padding: "12px 10px", listStyleType:'none',width:"300px",height :'100px'}



export default function FileSystemNavigator(props) {
    const [open, setOpen] = React.useState(false);
    const [openEdit, setopenEdit] = React.useState(false);
    const [openItem, setopenItem] = React.useState(false);
    const [openItemBrand, setopenItemBrand] = React.useState(false);

    const [partName, setopartName] = React.useState(false);
    const [partId, setpartId] = React.useState(false);
    const [idEdit, setidEdit] = React.useState(false);
    const [Cat, setCat] = React.useState(false);
    const [Note, setNote] = React.useState(false);
    const [OEMNUMB, setOEMNUMB] = React.useState(false);
    const [BrandNum, setBrandNum] = React.useState(false);
    // const [idEdit, setidEdit] = React.useState(false);



    let test = [{}]
    
    // --------------edit part name module------------------
    const handleOpenEditBrand = (id,cat) => {
      setidEdit(id)
      setCat(cat)
      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenItemBrand(true)};
    const handleCloseEditBrand = () => setopenItemBrand(false);
  // --------------edit part name module------------------
    const handleOpenEdit = (id) => {
      setidEdit(id)
      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenEdit(true)};
    const handleCloseEdit = () => setopenEdit(false);

  // --------------Add part name module------------------

    const handleOpen = () => {
      console.log("its me",props.partData)
      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setOpen(true)};
    const handleClose = () => setOpen(false);
  // --------------Add item info module------------------
  const handleOpenItem = (partNamedrom,partID) => {
    console.log("its me",props.partData)
    test=props.partData
    console.log("test",test)
    setpartId(partID)
    setopartName(partNamedrom)
    setparent(localStorage.getItem('catID'));
    setcatName(localStorage.getItem('catName'));
    setopenItem(true)};
  const handleCloseItem = () => setopenItem(false);
  // --------------Add item info module------------------

    let [name0,setName]= React.useState(String);
    let [nameEN0,setnameEN]= React.useState(String);
    let [catName,setcatName]= React.useState(localStorage.getItem('catName'));

    let [parent0,setparent]= React.useState(props.catID);
    let [ItemImage,setItemImage]= React.useState(String);
    let [part,setpart]= React.useState([]);
    let [itemData,setitemData]= React.useState(part);
    let [branditemData,setbranditemData]= React.useState(part);
    let [BrandselectOptions,setBrandselectOptions]= React.useState(part);
    let [BrandID,setBrandID]= React.useState(part);
    let [BrandName,setBrandName]= React.useState(part);


    // ----------------------------Get Brand-----------------
    const getOptionsBrand=async()=>{

      const res = await axios.get('https://backoil.herokuapp.com/api/oil/Brand')
      const data = res.data
      const options = data.map(d => ({
        "value" : d._id,
        "label" : d.BrandEn
      }))
      setBrandselectOptions( options)
    }
     const BrandhandleChange=async(e)=>{
     
      await setBrandName(e.label)
            setBrandID(e.value)
            console.log(BrandName,BrandID)
    }


    useEffect(async () => { 
        setcatName(localStorage.getItem('catName'));
        console.log(props.dataPart)
        setparent(localStorage.getItem('catID'));
        setcatName(localStorage.getItem('catName'));
        getOptionsBrand();
    }, []);
    // ---------------------------post part name api ---------------
    const sendDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      console.log(props.dataPart)
      let parent=parent0
      let nameEN =name0
      let ItemImage =ItemImage
      let nameAr =nameEN0
        axios.post('https://backoil.herokuapp.com/api/partName/PartName',{
            category:parent,
            nameEN:nameEN,
            ItemImage: ItemImage, 
            nameAr: nameAr, 
        }).then( (response) => {
          console.log(response)
          console.log(parent)
            window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };
    
     // -------------------------------------put Item api-------------
     const ItemDataToAPIUpdate = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
        axios.put(`https://backoil.herokuapp.com/api/products/${idEdit}`,{
          BrandID:BrandID,
          BrandName:BrandName,
          // vehicles:vehicles,
          category:Cat,
          Note:Note,
          BrandPartNumber:BrandNum,
          OEMPartNumber:OEMNUMB,
          ItemImage:ItemImage,
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            // window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };
    // -------------------------------------post Item api-------------
    const ItemDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
        axios.post('https://backoil.herokuapp.com/api/products/product/create',{
          BrandID:BrandID,
          BrandName:BrandName,
          // vehicles:vehicles,
          category:partId,
          Note:Note,
          BrandPartNumber:BrandNum,
          OEMPartNumber:OEMNUMB,
          ItemImage:ItemImage,
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            // window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };

    // ------------------------Edit Part Name api----------------
    const EditDataToAPI = () => {
      axios.put(`https://backoil.herokuapp.com/api/partName/PartName/${idEdit}`, {
        nameEN:name0,
        nameAr:nameEN0,
      }).then(() => {
  alert("Updated")
  console.log(props.catID,name0,nameEN0)
        window.location.reload(false);
          localStorage.clear();
      })
  }
    // ----------------------Delete Part Brand--------------------
    const DeleteItemBrand=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backoil.herokuapp.com/api/products/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
  // ----------------------Delete Part Name--------------------
    const DeleteItem=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backoil.herokuapp.com/api/partName/PartName/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
    // -------------get items info --------------------
    const getOptionsPro=async(idNew)=>{
      setparent(localStorage.getItem('catID'));
      async function fetchData() {
        if(parent0.length===24){
          try {
            const res = await axios.post('https://backoil.herokuapp.com/api/products/product/cat',{category:idNew}); 
            setitemData(res.data);
            console.log("from local",itemData)
            console.log("from api",res.data)
        } catch (err) {
            console.log(err);
        }
    }else{alert("re CLick")}
        }
      fetchData();
       }
      //  *----------------------get brand item info -------------------
      const getBrandItem=async(idNew,cat)=>{
        // setparent(localStorage.getItem('catID'));
        async function fetchData() {
          if(parent0.length===24){
            try {
              const res = await axios.post('https://backoil.herokuapp.com/api/products/product/brand',{BrandName:idNew,category:cat}); 
              setbranditemData(res.data);
              console.log("from local",branditemData)
              console.log("from api",res.data)
          } catch (err) {
              console.log(err);
          }
      }else{alert("re CLick")}
          }
        fetchData();
         }
  return (
     <>
      <button onClick={handleOpen}> Add Part Name+</button>
      <br></br>
      {(() => {
              if (!props.partData){
                  return (
                      <h1>loading</h1>
                  )
              }else{
                return (
                  <> <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: 600, flexGrow: 1, maxWidth: "100%", overflowY: 'auto' }}
                >
                  {props.partData.map((item, i) => (
              <>
         <TreeItem nodeId={item._id }   onClick={() => getOptionsPro(item._id)}  label={<>
        <h3>
          {/* <Image rounded  style={{ width: 40, height: 40 }} /> */}
          {item.nameEN}
        </h3>
        <button  onClick={()=> handleOpenItem(item.nameEN,item._id)}>+</button>
        <button onClick={()=> DeleteItem(item._id)} >X</button>
        <button onClick={()=> handleOpenEdit(item._id)}>Edit/</button>
      </>}> 
      {itemData.map((item, i) => (
                          <TreeItem nodeId={item._id} onClick={() => getBrandItem(item.BrandName,item.category)} label={<><h3>{item.BrandName}</h3> </>} >
      {branditemData.map((item, i) => (

                             <TreeItem nodeId={Math.floor(Math.random() * 10)} label={<><h3> OEM#:({item.OEMPartNumber}) BRAND#:({item.BrandPartNumber}) </h3> 
                                      <button onClick={()=> DeleteItemBrand(item._id)} >X</button>
                          <button onClick={()=> handleOpenEditBrand(item._id,item.category)}>Edit/</button></>}  >
                             </TreeItem>
                    ))}

                        </TreeItem>

                    ))}

                        </TreeItem>

                        {/* <TreeItem nodeId="5" label="Documents">
                          <TreeItem nodeId="10" label="OSS" />
                          <TreeItem nodeId="6" label="MUI">
                            <TreeItem nodeId="8" label="index.js" />
                          </TreeItem>
                        </TreeItem> */}
                   </>
                    ))}
                      </TreeView>
                    </>
              )
              }
              return null;
            })()}
      {/* -+------------------------ Add Item info Module------------------------------------------ */}

                <Modal
        open={openItem}
        onClose={handleCloseItem}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Part Name:{partName } </h1>
          <h2>Add Item Info</h2>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
      <Select styles={{ width:"200px" }} justifyContent="center" placeholder="Brand" options={BrandselectOptions} onChange={BrandhandleChange} />
      <TextField
         style={ulStyle}
        id="outlined-number"
        placeholder="ItemImage"

          type="file"
          onChange={(e)=>setItemImage(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <textarea
         
         id="outlined-number"
          style={selectStyle }
 
          placeholder="Note"
           type="text"
           onChange={(e)=>setNote(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="OEMPartNumber"
 
           type="text"
           onChange={(e)=>setOEMNUMB(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
         <TextField
         
         id="outlined-number"
          style={ulStyle}
          placeholder="BrandPartNumber"
 
           type="text"
           onChange={(e)=>setBrandNum(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
        
        <br /><br /><br />
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          ItemDataToAPI()}}}>
        Add Item Info   
        </Button>
      </Grid>
    </div>
        </Box>
      </Modal>
      {/* -+------------------------ Edit Item info Module------------------------------------------ */}
      <Modal
        open={openItemBrand}
        onClose={handleCloseEditBrand}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Part Name:{partName } </h1>
          <h2>Edit Item Info</h2>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
      <Select styles={{ width:"200px" }} justifyContent="center" placeholder="Brand" options={BrandselectOptions} onChange={BrandhandleChange} />
      <TextField
         style={ulStyle}
        id="outlined-number"
        placeholder="ItemImage"

          type="file"
          onChange={(e)=>setItemImage(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <textarea
         
         id="outlined-number"
          style={selectStyle }
 
          placeholder="Note"
           type="text"
           value={Note}
           onChange={(e)=>setNote(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="OEMPartNumber"
 
           type="text"
           onChange={(e)=>setOEMNUMB(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
         <TextField
         
         id="outlined-number"
          style={ulStyle}
          placeholder="BrandPartNumber"
 
           type="text"
           onChange={(e)=>setBrandNum(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
        
        <br /><br /><br />
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          ItemDataToAPIUpdate()}}}>
        Add Item Info   
        </Button>
      </Grid>
    </div>
        </Box>
      </Modal>
      {/* -+------------------------ Edit Part Name Module------------------------------------------ */}

    <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Category:{catName } </h1>
          <h2>Edit Part Name</h2>
        </toolbar>
      </AppBar>
      <br></br><br></br><br></br><br></br><br></br><br></br>
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
        <br /><br /><br />
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          EditDataToAPI()}}}>
        Add Part Name for {parent0}  
        </Button>
      </form>
    </div>
        </Box>
      </Modal>
   
      {/* -+------------------------ Add Part Name Module------------------------------------------ */}

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
      <br></br><br></br><br></br><br></br><br></br><br></br>
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
        <br /><br /><br />
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          sendDataToAPI()}}}>
        Add Part Name for {parent0}  
        </Button>
      </form>
    </div>
        </Box>
      </Modal>
    </>
  );
}
