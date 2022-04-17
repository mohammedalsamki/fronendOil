import * as React from 'react';
import axios from "axios"
import { useEffect,useState } from 'react';
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
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';
import "./styles.css";
import AddIcon from '@mui/icons-material/Add';
import {
    AppBar,
    TextField,
  } from "@material-ui/core";
import { Grid } from '@material-ui/core';
import { set } from 'lodash';
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



export default function vehicles(props) {
  // ------------------------------start select year --------------------
  const [value, setvalue] = useState([])
  const [valueFule, setvalueFule] = useState([])

  let arr= []
  const  handleOnchangeFule  =  val  => {
    setvalueFule(val)

  }
  const  handleOnchange  =  val  => {
    setvalue(val)

  }
  const sortedValue=()=>{
    arr= value
    // arr.sort();
    console.log(arr)

  }

  const  optionsFule  = [
    { label:  'Hybrid', value:  "Hybrid"  },
    { label:  'Electric', value:  "Electric"  },
    { label:  'Gasoline', value:  "Gasoline"  },
    { label:  'Gasoline', value:  "Gasoline"  },



  ]
  const  options  = [
    { label:  '2000', value:  2000  },
    { label:  '2001', value:  2001  },
    { label:  '2002', value:  2002  },
    { label:  '2003', value:  2003  },
    { label:  '2004', value:  2004  },
    { label:  '2005', value:  2005  },
    { label:  '2006', value:  2006  },
    { label:  '2007', value:  2007  },
    { label:  '2008', value:  2008  },
    { label:  '2009', value:  2009  },
    { label:  '2010', value:  2010  },
    { label:  '2011', value:  2011  },
    { label:  '2012', value:  2012  },
    { label:  '2013', value:  2013  },
    { label:  '2014', value:  2014  },
    { label:  '2015', value:  2015  },
    { label:  '2016', value:  2016  },
    { label:  '2017', value:  2017  },
    { label:  '2018', value:  2018  },
    { label:  '2019', value:  2019  },
    { label:  '2020', value:  2020  },
    { label:  '2021', value:  2021  },
    { label:  '2022', value:  2022  },

  ]
  // ------------------------------end select year --------------------

    const [open, setOpen] = React.useState(false);
    const [openEdit, setopenEdit] = React.useState(false);
    const [Fueltype, setFueltype] = React.useState(false);

    const [propsdata, setpropsdata] = React.useState(false);
    const [openItem, setopenItem] = React.useState(false);
    const [openItemBrand, setopenItemBrand] = React.useState(false);
    const [openVehicles, setopenVehicles] = React.useState(false);
    const [openEditVehicles, setopenEditVehicles] = React.useState(false);


    const [partName, setopartName] = React.useState(false);
    const [partId, setpartId] = React.useState(false);
    const [idEdit, setidEdit] = React.useState(false);
    const [Cat, setCat] = React.useState(false);
    const [Note, setNote] = React.useState(false);
    const [NameEn, setNameEn] = React.useState(false);
    const [NameAr, setNameAr] = React.useState(false);
    // const [idEdit, setidEdit] = React.useState(false);
    let test = [{}]
    
    const handleOpenVehicles = (partNamedrom,id) => {
      setidEdit(id)
    setopartName(partNamedrom)

      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenVehicles(true)};
    const handleCloseVehicles = () => setopenVehicles(false);
    // --------------edit Vehicles module--------------------------------------------------

    const handleEditVehicles = (partNamedrom,id,Note,logo,BodyNo,EngVol,EngNo,Fueltype) => {
      setidEdit(id)
      setNote(Note)
      setBodyNo(BodyNo)
      setEngVol(EngVol)
      setEngNo(EngNo)
      setFueltype(Fueltype)
      setItemImage(logo)
    setopartName(partNamedrom)

      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenEditVehicles(true)};
    const handleCloseEditVehicles = () => setopenEditVehicles(false);
    // --------------edit part name module--------------------------------------------------
    const handleOpenEditBrand = (id,partNamedrom) => {
      setidEdit(id)
    setopartName(partNamedrom)

      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenItemBrand(true)};
    const handleCloseEditBrand = () => setopenItemBrand(false);
  // --------------edit part name module------------------------------------------------
    const handleOpenEdit = (id,partNamedrom) => {
      setidEdit(id)
    setopartName(partNamedrom)

      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenEdit(true)};
    const handleCloseEdit = () => setopenEdit(false);

  // --------------Add part name module--------------------------------------------------------

    const handleOpen = () => {
      console.log("its me",props.partData)
      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setOpen(true)};
    const handleClose = () => setOpen(false);
  // --------------Add item info module--------------------------------------------------------------
  const handleOpenItem = (partNamedrom,partID) => {
    console.log("its me",propsdata)
    console.log("test",test)
    setpartId(partID)
    setopartName(partNamedrom)
    setparent(localStorage.getItem('catID'));
    setcatName(localStorage.getItem('catName'));
    setopenItem(true)};
  const handleCloseItem = () => setopenItem(false);
  // --------------Add item info module----------------------------------------------------------
    let [name0,setName]= React.useState(String);
    let [nameEN0,setnameEN]= React.useState(String);
    let [BodyNo,setBodyNo]= React.useState(String);
    let [EngNo,setEngNo]= React.useState(String);
    let [Notes,setNotes]= React.useState(String);
    let [EngVol,setEngVol]= React.useState(String);


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

    useEffect(async () => { 
        async function fetchData() {
            try {
                const res = await axios.get('https://backoil.herokuapp.com/api/vehicles/Manufacturer/get/'); 
                setpropsdata(res.data);
                console.log(propsdata)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
        setcatName(localStorage.getItem('catName'));
        console.log(props.dataPart)
        setparent(localStorage.getItem('catID'));
        setcatName(localStorage.getItem('catName'));
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
        axios.post('https://backoil.herokuapp.com/api/vehicles/Manufacturer/create',{
            nameEn:nameEN,
            nameAr: nameAr, 
            logo:ItemImage

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
        axios.put(`https://backoil.herokuapp.com/api/vehicles/Modale/${idEdit}`,{
          ModelAr:NameAr,
          ModelEn:NameEn,
          ModelLogo:ItemImage

         
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };
     // -------------------------------------Put Vehicles api-------------
     const VehiclesEditDataToAPI = () => {
      // sortedValue();
      setparent(localStorage.getItem('catID'));
      console.log(ItemImage)
      setcatName(localStorage.getItem('catName'));
        axios.put(`https://backoil.herokuapp.com/api/vehicles/Vehicles/${idEdit}`,{
          ModelYear:value.value,
          Fueltype:valueFule.value,
          BodyNo:BodyNo,
          EngNo:EngNo,
          EngVol:EngVol,
          Notes:Note,
          ModelImage:ItemImage

         
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            // window.location.reload(false);
            alert("Edit  vehicles info")

          }).catch((error) => {
            console.log(error.message);
        })
    };

    // -------------------------------------post Item api-------------
    const VehiclesDataToAPI = () => {
      sortedValue();
      setparent(localStorage.getItem('catID'));
      console.log(arr.value,value.value,valueFule.value,BodyNo,idEdit)
      setcatName(localStorage.getItem('catName'));
        axios.post('https://backoil.herokuapp.com/api/vehicles/Vehicles/create',{
          ModelYear:value.value,
          Fueltype:valueFule.value,
          BodyNo:BodyNo,
          EngNo:EngNo,
          EngVol:EngVol,
          Notes:Note,
          category:idEdit,
          logo:ItemImage

         
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            // window.location.reload(false);
            alert("added new Item")
          }).catch((error) => {
            console.log(error.message);
        })
    };

    // -------------------------------------post Item api-------------
    const ItemDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
        axios.post('https://backoil.herokuapp.com/api/vehicles/Modale/create',{
          ModelEn:NameEn,
          ModelAr:NameAr,
          category:partId,
          ModelLogo:ItemImage


         
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
            // window.location.reload(false);
            alert("added new Vehicles")

          }).catch((error) => {
            console.log(error.message);
        })
    };

    // ------------------------Edit Part Name api----------------
    const EditDataToAPI = () => {
      axios.put(`https://backoil.herokuapp.com/api/vehicles/Manufacturer/${idEdit}`, {
        nameEn:name0,
        nameAr:nameEN0,
        logo:ItemImage
      }).then(() => {
  alert("Updated")
  console.log(props.catID,name0,nameEN0)
        window.location.reload(false);
          localStorage.clear();
      })
  }

  // ----------------------Delete Vehicles--------------------
  const DeleteVehicles=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backoil.herokuapp.com/api/vehicles/Vehicles/${id}`).then( () =>{
      alert('delete done')
      window.location.reload(false);
    } )}
  }
    // ----------------------Delete Part Brand--------------------
    const DeleteItemBrand=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backoil.herokuapp.com/api/vehicles/Modale/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
  // ----------------------Delete Part Name--------------------
    const DeleteItem=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backoil.herokuapp.com/api/vehicles/Manufacturer/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
    // -------------get items info --------------------
    
      //  *----------------------get brand item info -------------------
      const getBrandItem=async(idNew,cat)=>{
        // setparent(localStorage.getItem('catID'));
        console.log(cat)
        async function fetchData() {
            try {
              const res = await axios.post('https://backoil.herokuapp.com/api/vehicles/Modale/get/',{category:cat}); 
              setitemData(res.data);
              console.log("from local",itemData)
              console.log("from api",res.data)
          } catch (err) {
              console.log(err);
          }
        }
        fetchData();
         }
      //  *----------------------get brand item info -------------------

         const getVehiclesItem=async(idNew,cat)=>{
          // setparent(localStorage.getItem('catID'));
          console.log(cat)
          async function fetchData() {
              try {
                const res = await axios.post('https://backoil.herokuapp.com/api/vehicles/Vehicles/get/',{category:cat}); 
                setbranditemData(res.data);
                console.log("from local",branditemData)
                console.log("from api",res.data)
            } catch (err) {
                console.log(err);
            }
          }
          fetchData();
           }
  return (
     <>
      <button class="mainButt" onClick={handleOpen}> Add Manufacturer Name</button>
      <br></br>
      <br></br>
      <br></br>

      {(() => {
              if (!propsdata){
                  return (
                      <h1>loading</h1>
                  )
              }else{
                return (
                  // <> <div id="theTree" class="custom-tree">
                  <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: "100%", flexGrow: 1, maxWidth: "50%", overflowY: 'auto'  ,borderRadius: "10px"}}
                >
                  {propsdata.map((item1, i) => (
              <>
         <TreeItem style={ { textAlign: "left",borderStyle: "outset" }} nodeId={item1._id }   onClick={() => getBrandItem(item1.ModelEn,item1._id)}  label={<>
          <img style={{ width:"55px" }} src={item1.logo} alt="Logo" />
        <h3 style={{  display:"inline-block" }}>
          {/* <Image rounded  style={{ width: 40, height: 40 }} /> */}
          {item1.nameEn}
        </h3>
        <button style={{  display:"inline-block" }} class="add"  onClick={()=> handleOpenItem(item1.nameEn,item1._id)}><AddIcon/></button>
        <button style={{  display:"inline-block" }} className="remove" onClick={()=> DeleteItem(item1._id)} ><RestoreFromTrashIcon/></button>
        <button style={{  display:"inline-block" }} className="edit" onClick={()=> handleOpenEdit(item1._id,item1.nameEn)}><EditIcon/></button>
      </>}> 
      {itemData.map((item, i) => {
        if(item1._id===item.category){return( 
                          <TreeItem style={ { textAlign: "left",borderRadius: "25px" }} nodeId={item._id} onClick={() => getVehiclesItem(item.ModelEn,item._id)}  
                          label={<>
                          <img style={{ width:"55px" }} src={item1.logo} alt="Logo" />
                          <h4 style={{  display:"inline-block" }}>{item.ModelEn}</h4>   <br/><button style={{  display:"inline-block" }} class="add" onClick={()=> handleOpenVehicles(item.ModelEn,item._id)}><AddIcon/></button>
                          <button style={{  display:"inline-block" }} className="remove" onClick={()=> DeleteItemBrand(item._id)} ><RestoreFromTrashIcon/></button>
                          <button style={{  display:"inline-block" }} className="edit" onClick={()=> handleOpenEditBrand(item._id,item.ModelEn)}><EditIcon/></button></>} >
      {branditemData.map((item0, i) => {
                             if(item._id===item0.category){return( <TreeItem style={ { textAlign: "left",borderRadius: "25px" }} nodeId={Math.floor(Math.random() * 10)} 
                             label={<div style={{  display:"inline-block" }}>
          <img style={{ width:"55px" }} src={item0.ModelImage} alt="Logo" />
                               <h5 style={{  display:"inline-block",border: "5px solid gray" }}> ( . {item0.ModelYear} . )      </h5> 
                                                                             <h5 style={{  display:"inline-block",border: "5px solid gray" }}>.  {item0.Fueltype}  .</h5>
                                                                             <h5 style={{  display:"inline-block",border: "5px solid gray" }}>.  BodyNo# : {item0.BodyNo}  .</h5>
                                                                             <h5 style={{  display:"inline-block",border: "5px solid gray" }}>.  EngVol# : {item0.EngVol}  .</h5>
                                                                             <h5 style={{  display:"inline-block",border: "5px solid gray" }}>.  EngNo# : {item0.EngNo} .</h5>
                                      <button style={{  display:"inline-block" }} className="remove" onClick={()=> DeleteVehicles(item._id)} ><RestoreFromTrashIcon/></button>
                          <button style={{  display:"inline-block" }} className="edit" onClick={()=> handleEditVehicles(item0.ModelYear,item0._id,item0.Notes,item0.ModelImage,item0.BodyNo,item0.EngVol,item0.EngNo,item0.Fueltype)}><EditIcon/></button></div>}  >
                             </TreeItem>
                             )}
                            
                    })}
                        </TreeItem>
                             )}

              })}
                        </TreeItem>
                   </>
                    ))}
                      </TreeView>
                      // </div> </>
              )
              }
              return null;
            })()}
      {/* ------------------------------------------- Add Vehicles Module----------------------------------------------------------- */}
      
      <Modal
        open={openVehicles}
        onClose={handleCloseVehicles}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Modal Name : {partName} </h1>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
<Select 
          placeholder="Year"
        onChange={handleOnchange}
        options={options}
      />
<Select 
          placeholder="Fule Type"
        onChange={handleOnchangeFule}
        options={optionsFule}
      />
        <br /><br /><br />

          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="BodyNo"
 
           type="text"
           onChange={(e)=>setBodyNo(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
                   <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="EngNo"
 
           type="text"
           onChange={(e)=>setEngNo(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="EngVol"
 
           type="text"
           onChange={(e)=>setEngVol(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
                   <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="Notes"
 
           type="text"
           onChange={(e)=>setNote(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
         <TextField
         style={ulStyle}
        id="outlined-number"
        placeholder="ItemImage"
           value={ItemImage}
           type="text"
          onChange={(e)=>setItemImage(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <br /><br /><br />

      </Grid>
      <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
                VehiclesDataToAPI()}}}>
        Add Model Info   
        </Button>
    </div>
        </Box>
      </Modal>
      {/* -+------------------------ Edit Vehicles Module------------------------------------------ */}
      <Modal
        open={openEditVehicles}
        onClose={handleCloseEditVehicles}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="App">
      <AppBar>
        <toolbar>
          <h1>Edit ModelYear : {partName} </h1>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>

<Select 
          placeholder="Year"
        onChange={handleOnchange}
        options={options}
        value={partName}

      />

<Select 
          placeholder="Fule Type"
        onChange={handleOnchangeFule}
        options={optionsFule}
        value={Fueltype}

      />
        <br /><br /><br />

          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="BodyNo"
          value={BodyNo}
           type="text"
           onChange={(e)=>setBodyNo(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
                            <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="EngNo"
          value={EngNo}
           type="text"
           onChange={(e)=>setEngNo(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="EngVol"
          value={EngVol}
           type="text"
           onChange={(e)=>setEngVol(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
                   <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="Note"
          value={Note}
           type="text"
           onChange={(e)=>setNote(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
          <TextField
         style={ulStyle}
        id="outlined-number"
        placeholder="ItemImage"
           value={ItemImage}
           type="text"
          onChange={(e)=>setItemImage(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <br /><br /><br />

      </Grid>
      <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
                VehiclesEditDataToAPI()}}}>
        Add Model Info   
        </Button>
    </div>
        </Box>
      </Modal>

      {/* -+------------------------ Add Manufacturer info Module------------------------------------------ */}

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
          <h1>Manufacturer Name : {partName} </h1>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>

          <TextField
         id="outlined-number"
          style={ulStyle}
          placeholder="Name En"
 
           type="text"
           onChange={(e)=>setNameEn(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
         <TextField
         
         id="outlined-number"
          style={ulStyle}
          placeholder="Name Ar"
 
           type="text"
           onChange={(e)=>setNameAr(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
        
        <br /><br /><br />

      </Grid>
      <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          ItemDataToAPI()}}}>
        Add Model Info   
        </Button>
    </div>
        </Box>
      </Modal>
      {/* -+------------------------ Edit Manufacturer info Module------------------------------------------ */}
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
          <h1>Manufacturer Name : {partName } </h1>
        </toolbar>
      </AppBar>
<br></br><br></br><br></br><br></br><br></br><br></br>
<Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
     
          <TextField
         id="outlined-number"
          style={ulStyle}
           value={NameEn}
           placeholder="OEMPartNumber"
           type="text"
           onChange={(e)=>setNameEn(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
         <TextField
         
         id="outlined-number"
          style={ulStyle}
          placeholder="BrandPartNumber"
          value={NameAr}
           type="text"
           onChange={(e)=>setNameAr(e.target.value)}
           InputLabelProps={{
             shrink: true,
           }}
         />
        
        <br /><br /><br />

      </Grid>
      <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          ItemDataToAPIUpdate()}}}>
        Edit Modal Info   
        </Button>
    </div>
        </Box>
      </Modal>
      {/* -+------------------------ Edit Manufacturer Name Module------------------------------------------ */}

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
          <h1>Manufacturer : {partName } </h1>
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
        Add 
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
          <h2>Add Manufacturer Name</h2>
        </toolbar>
      </AppBar>
<br></br>
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
        Add 
        </Button>
      </form>
    </div>
        </Box>
      </Modal>
    </>
  );
}
