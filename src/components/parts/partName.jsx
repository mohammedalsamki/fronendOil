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
import Vehicles from "./vehicles";
import { Paper } from "@material-ui/core";
import "./styles.css"
import {
    AppBar,
    TextField,
  } from "@material-ui/core";
import { Grid } from '@material-ui/core';
import { async } from 'q';
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
    const [partID, setpartID] = React.useState(false);
    const [vehclesID, setvehclesID] = React.useState(false);
    const [allVehcles, setallVehcles] = React.useState([]);
    let arr = []

    console.log(allVehcles)

    
    const [openItemBrand, setopenItemBrand] = React.useState(false);
    const [vehclesItem, setvehclesItem] = React.useState(false);
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
    const handleOpenEditBrand = (id,cat,BrandPartNumber,OEMPartNumber,ItemImage,Note,BrandName,BrandID) => {
      setidEdit(id)
      setBrandID(BrandID)
      setBrandName(BrandName)
      setBrandNum(BrandPartNumber)
      setOEMNUMB(OEMPartNumber)
      setItemImage(ItemImage)
      setNote(Note)
      setCat(cat)
      setopartName(BrandName)
      console.log("its me",id)

      test=props.partData
      console.log("test",test)
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      setopenItemBrand(true)};
    const handleCloseEditBrand = () => setopenItemBrand(false);
  // --------------edit part name module------------------
    const handleOpenEdit = (id,en,ar,img) => {
      setnameEN(en)
      setName(ar)
      setItemImage(img)
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

      const res = await axios.get('https://backendapioill.herokuapp.com/api/oil/Brand')
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
    }, [partID,allVehcles ]);
    // ---------------------------post part name api ---------------
    const sendDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
      console.log(props.dataPart)
      let parent=parent0
      let nameEN =name0
      let ItemImage =ItemImage
      let nameAr =nameEN0
        axios.post('https://backendapioill.herokuapp.com/api/partName/PartName',{
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
        axios.put(`https://backendapioill.herokuapp.com/api/products/${idEdit}`,{
          BrandID:BrandID,
          // BrandName:BrandName,
          // vehicles:vehicles,
          category:Cat,
          Note:Note,
          BrandPartNumber:BrandNum,
          OEMPartNumber:OEMNUMB,
          ItemImage:ItemImage,
        }).then( (response) => {
          console.log(response)
          console.log(parent0)
          alert("Updated")
          handleCloseEditBrand()
            // window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };
    // -------------------------------------post Item api-------------
    const ItemDataToAPI = () => {
      setparent(localStorage.getItem('catID'));
      setcatName(localStorage.getItem('catName'));
        axios.post('https://backendapioill.herokuapp.com/api/products/product/create',{
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
          alert("Added ")
            // window.location.reload(false);
          }).catch((error) => {
            console.log(error.message);
        })
    };

    // ------------------------Edit Part Name api----------------
    const EditDataToAPI = () => {
      axios.put(`https://backendapioill.herokuapp.com/api/partName/PartName/${idEdit}`, {
        nameEN:nameEN0,
        nameAr:name0,
        ItemImage:ItemImage
      }).then(() => {
  alert("Updated")
  console.log(props.catID,name0,nameEN0)
  handleCloseItem()
        // window.location.reload(false);
          localStorage.clear();
      })
  }
    // ----------------------Delete Part Brand--------------------
    const DeleteItemBrand=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backendapioill.herokuapp.com/api/products/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
  // ----------------------Delete Part Name--------------------
    const DeleteItem=(id)=>{
      let isExecuted = window.confirm("Are you sure to execute this action?");
      console.log(isExecuted);
      if(isExecuted){
      axios.delete(`https://backendapioill.herokuapp.com/api/partName/PartName/${id}`).then( () =>{
        alert('delete done')
        window.location.reload(false);
      } )}
    }
    // -------------get items info --------------------
    function removeDuplicates(itemData, prop) {
      var newArray = [];
      var lookupObject  = {};
 
      for(var i in itemData) {
         lookupObject[itemData[i][prop]] = itemData[i];
      }
 
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
      console.log(newArray)
       return newArray;
  }
    const getOptionsPro=async(idNew)=>{
      setparent(localStorage.getItem('catID'));
      async function fetchData() {
        // if(parent0.length===24){
          try {
            const res = await axios.post('https://backendapioill.herokuapp.com/api/products/product/cat',{category:idNew}); 
            // setitemData(res.data);
            setitemData(removeDuplicates(res.data,"BrandName"))
            console.log("from local",itemData)
            console.log("fun", removeDuplicates(itemData,"BrandName"))

            console.log("from api",res.data)
        } catch (err) {
            console.log(err);
        }
    // }else{alert("re CLick")}
        }
      fetchData();
       }
      //  *----------------------get brand item info -------------------
      const getBrandItem=async(idNew,cat)=>{
        // setparent(localStorage.getItem('catID'));
        async function fetchData() {
          if(parent0.length===24){
            try {
              const res = await axios.post('https://backendapioill.herokuapp.com/api/products/product/brand',{BrandName:idNew,category:cat}); 
              setbranditemData(res.data);
          } catch (err) {
              console.log(err);
          }
      }else{alert("re CLick")}
          }
        fetchData();
         }

         const getvehclesID=async()=>{
          // setparent(localStorage.getItem('catID'));
          let obj={}
          async function fetchData() {
            if(parent0.length===24){
              try {
                // const res = await axios.post('https://backendapioill.herokuapp.com/api/products/product/brand',{BrandName:idNew,category:cat}); 
                
                // setbranditemData(res.data);
                // console.log(res.data[0].vehicles[0])
                for (let index = 0; index < vehclesID.length; index++) {
                  const resn = await axios.get(`https://backendapioill.herokuapp.com/api/vehicles/Vehicles/get/${vehclesID[index]}`); 
                  console.log(resn.data)
                  console.log("modale",resn.data.category)
                  const resnM = await axios.get(`https://backendapioill.herokuapp.com/api/vehicles/Modale/get/${resn.data.category}`);; 
                  console.log(resnM.data)  
                  const resnL = await axios.get(` https://backendapioill.herokuapp.com/api/vehicles//Manufacturer/get/${resnM.data.category}`);; 
                  // console.log(resnL.data)

                  obj = {id:vehclesID[index],Modale: resnM.data.ModelEn,year:resn.data.ModelYear[0],Manufacturer:resnL.data.nameEn};    
                  console.log(obj) 
                  arr.push(obj);           
                }
                setallVehcles(arr)
console.log("arr",allVehcles)
console.log("arr",arr)

            } catch (err) {
                console.log(err);
            }
        }else{alert("re CLick")}
            }
          fetchData();
           }
           const deleteCar=async(id)=>{
             console.log(partID,id)
             try {
              let isExecuted = window.confirm("Are you sure to execute this action?");
              console.log(isExecuted);
              if(isExecuted){
              axios.post(`https://backendapioill.herokuapp.com/api/products/specDelete/`,{id:partID,vehicles:id}).then( () =>{
                alert('delete done')
                window.location.reload(false);
              } )}
               
             } catch (error) {
               
             }
           }
  return (
     <>
    <div class="flex-container">
    <div class="flex-child magenta">

      <button onClick={handleOpen}> Add Part Name</button>
      <br></br>
      <br></br>
      {(() => {
              if (!props.partData){
                  return (
                      <h3>Click in category </h3>
                  )
              }else{
                return (
                  <> <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: 600, flexGrow: 1, maxWidth: "100%", overflowY: 'auto' }}
                >
                  {props.partData.map((item1, i) => (
              <>
         <TreeItem style={ { textAlign: "left",borderStyle: "outset" }} nodeId={item1._id }   onClick={() => getOptionsPro(item1._id)}  label={<>
          <img style={{ width:"55px" }} src={item1.ItemImage} alt="Logo" />
        <h3 style={{  display:"inline-block" }}>
          {/* <Image rounded  style={{ width: 40, height: 40 }} /> */}
          {item1.nameEN}
        </h3>
        <button style={{  display:"inline-block" }} class="add" onClick={()=> handleOpenItem(item1.nameEN,item1._id)}>+</button>
        <button style={{  display:"inline-block" }} className="remove" onClick={()=> DeleteItem(item1._id)} >X</button>
        <button style={{  display:"inline-block" }} className="edit" onClick={()=> handleOpenEdit(item1._id,item1.nameEN,item1.nameAr,item1.ItemImage)}>Edit/</button>
      </>}> 
      {itemData.map((item, i) => {
if(item1._id===item.category){return(<>

                          <TreeItem nodeId={item._id} onClick={() => getBrandItem(item.BrandName,item.category)} label={<><h3>{item.BrandName}</h3> </>} >
      {branditemData.map((item0, i) => {
if(item1._id===item0.category && item.BrandName===item0.BrandName){return(
  
                           <> 
                            <TreeItem onClick={()=> {getvehclesID();setpartID(item0._id);setvehclesItem(item0.vehicles);setvehclesID(item0.vehicles);console.log(vehclesID)}} style={ { textAlign: "left",borderRadius: "25px" }} nodeId={Math.floor(Math.random() * 10)} label={<> <img style={{ width:"55px" }} src={item0.ItemImage} alt="Logo" />  <h3 style={{  display:"inline-block" }}> OEM#:({item0.OEMPartNumber}) BRAND#:({item0.BrandPartNumber}) </h3> 
                                      <br></br>
                



                                      <button  style={{  display:"inline-block" }} className="remove" onClick={()=> DeleteItemBrand(item0._id)} >X</button>
                          <button style={{  display:"inline-block" }} className="edit" onClick={()=> handleOpenEditBrand(
                            item0._id,item0.category,item0.BrandPartNumber,item0.OEMPartNumber,item0.ItemImage,item0.Note,item0.BrandName,item0.BrandID)}>Edit/</button></>}  >
                                    {allVehcles.map((item, i) => (

<div class='parent'>
<h3 class='child'> {item.Manufacturer} </h3>
<h3 class='child'> {item.Modale} </h3>
<h3 class='child'> {item.year} </h3>
<Button onClick={() => deleteCar(item.id)}>X</Button>

</div>
))}
                             </TreeItem>
                             </>
                             )}
                          }
      )}
                        </TreeItem>
                        </> )}
      
              })}
                        </TreeItem>
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

          type="text"
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
           value={ItemImage}
           type="text"
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
           value={OEMNUMB}
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
          value={BrandNum}
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
        Edit Item Info   
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
          value={nameEN0}
          onChange={(e) => setnameEN(e.target.value)}
        />
        {/* <br /> */}
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Name Ar"
          variant="outlined"
          value={name0}
          onChange={(e) => setName(e.target.value)}

        />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Image"
          variant="outlined"
          value={ItemImage}
          onChange={(e) => setItemImage(e.target.value)}

        />
        {/* <br /><br /><br /> */}
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          EditDataToAPI()}}}>
        Edit Part Name for {catName }  
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
        {/* <br /> */}
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Name Ar"
          variant="outlined"
          onChange={(e) => setnameEN(e.target.value)}

        />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          type="text"
          label="Image"
          variant="outlined"
          onChange={(e) => setItemImage(e.target.value)}

        />
        {/* <br /><br /><br /> */}
        <Button variant="contained" color="primary" onClick={()=>{{
                setparent(localStorage.getItem('catID'));
                setcatName(localStorage.getItem('catName'));
          sendDataToAPI()}}}>
        Add Part Name for {catName}  
        </Button>
      </form>
    </div>
    
        </Box>
      </Modal>
    </div>

      <div class="flex-child green">
      <Paper >
    <Vehicles vehclesItem={vehclesItem} partID={partID}/>
    </Paper>
      </div>
    </div>

    </>
    
  );
}
