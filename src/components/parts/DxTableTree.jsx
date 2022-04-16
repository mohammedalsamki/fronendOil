import React, { useState } from "react";
import { useEffect } from 'react';
import ProdectTable from "./generator";
import {
  AppBar,
  TextField,
} from "@material-ui/core";
import {
  EditingState,
  IntegratedSorting,
  SearchState,
  SortingState,
  IntegratedFiltering,
  TreeDataState,
  CustomTreeData
} from "@devexpress/dx-react-grid";
import { Getter } from "@devexpress/dx-react-core";
import {
  Grid,
  Table,
  SearchPanel,
  Toolbar,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableColumnResizing,
  TableTreeColumn,
} from "@devexpress/dx-react-grid-material-ui";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { Paper } from "@material-ui/core";
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileSystemNavigator from "./partName";
const styles = {
  banking: {
    backgroundColor: '#f5f5f5',
  },
  health: {
    backgroundColor: '#a2e2a4',
  },
  telecom: {
    backgroundColor: '#b3e5fc',
  },
  energy: {
    backgroundColor: '#ffcdd2',
  },
  insurance: {
    backgroundColor: '#f0f4c3',
  },
};
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

const getRowId = row => row._id;
const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: "center" }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm("Are you sure you want to delete this row?")) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);
const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parent === (row ? row._id : null));
  return childRows.length ? childRows : null;

};
function  currentloginid() {
    return fetch('https://backoil.herokuapp.com/api/category/get', {
        method: 'GET',
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var userid = JSON.parse(JSON.stringify(data));
        // console.log(userid);
        return userid;
      })
  }
  
  console.log(currentloginid());
const  getOptions= async()=>{
    const res = await axios.get('https://backoil.herokuapp.com/api/category/get')
    let data = res.data
    return data;
    }
console.log('tests',getOptions())

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
  


};
export default () => {
  let [catName,setcatName]= React.useState(String);
  let [catID,setcatID]= React.useState(String);
  let [name0,setName]= React.useState(String);
  let [nameEN,setnameEN]= React.useState(String);
  let [parent0,setparent]= React.useState(String);
  let [ItemImage,setItemImage]= React.useState(String);


  const sendDataToAPI = () => {
    setparent(localStorage.getItem('catID'));

    let parent=parent0
    let name =name0
    let ItemImage =ItemImage
    let nameEn =nameEN

console.log(name,parent,nameEN)
    axios.post('https://backoil.herokuapp.com/api/category',{
        parent:parent,
        name:name,
        ItemImage: ItemImage, 
        nameEn: nameEn, 

    }).then( () => {
        window.location.reload(false);
      }).catch((error) => {
        console.log(error.message);
    })
  }
  
    const [PartslList, setPartslList]= useState([]);
    const [rows, setRows] = useState(PartslList);

    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get('https://backoil.herokuapp.com/api/category/get'); 
                setRows(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    localStorage.setItem('catName', catName)
    localStorage.setItem('catID', catID)

    

    }, []);
const test=()=>{
  console.log("test")
  alert("iam working")
}
  const [columns] = useState([
    { name: "name", title: "Name EN" ,onclick:{test}},
  ]);



  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 350, onclick:{test}}
  ]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [sorting, setSorting] = useState([
    { columnName: "city", direction: "asc" }
  ]);
  const [searchValue, setSearchState] = useState("");
  const [columnWidths, setColumnWidths] = useState([

    // { columnName: "name", width: 250,onclick:{test} },

  ]);
  const [expandedRowIds, setExpandedRowIds] = useState([0, 1]);

  const changeAddedRows = value => {
    const initialized = value.map(row =>
      Object.keys(row).length ? row : { name: "" }
    );
    setAddedRows(initialized);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
        console.log('name',added[0].name)
        console.log('id',added[0]._id)
        let parent=added[0]._id || null
        let name =added[0].name
        let ItemImage =added[0].ItemImage
        let nameEn =added[0].nameEn


        axios.post('https://backoil.herokuapp.com/api/category',{
            parent:parent,
            name:name,
            ItemImage: ItemImage, 
            nameEn: nameEn, 

        }).then( () => {
            window.location.reload(false);
          })
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1]._id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
            _id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
        alert("test")
        let name 
        let id
        let ItemImage 
        let nameEn 

        for (var i in changed){
            id=i
          console.log('id',id);
          console.log('changed',changed);
          for (var key in changed[i]){
              if(key=='name'){
              name=changed[i][key]
              }

                if(key=='ItemImage'){
                    ItemImage=changed[i][key]
                    }
                    if(key=='nameEn'){
                        nameEn=changed[i][key]
                        }
          }
      }
        axios.put(`https://backoil.herokuapp.com/api/category/update/${id}`, {
 
            category_name:name,
            ItemImage: ItemImage, 
            nameEn: nameEn, 

        }).then(() => {
        alert("Updated")

    // history.push('/lamps');
        localStorage.clear();
      window.location.reload(false);

    })


      changedRows = rows.map(row =>
        changed[row._id] ? { ...row, ...changed[row._id] } : row,
        
      );

    }
    if (deleted) {
        alert("test")

      const deletedSet = new Set(deleted);
      console.log(deletedSet);
      axios.delete(`https://backoil.herokuapp.com/api/category/delete/${deleted}`).then( () =>{
      window.location.reload(false);    } )
      changedRows = rows.filter(row => !deletedSet.has(row._id));
    }
    setRows(changedRows);
  };

  const getTableColumnsComputed = React.useCallback(({ tableColumns }) => {
    const result = [
      ...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
      {
        key: "editCommand",
        type: TableEditColumn.COLUMN_TYPE,
        width: 140
      }
    ];
    return result;
  }, []);
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [partData,setpartData]= React.useState(String);
  console.log(partData)
  let idNew
  const CellComponent = ({ children, rows, ...restProps }) => (

 <TableEditColumn.Cell rows={rows} {...restProps}>
      {children}
     
       <TableEditColumn.Command
        id="custom"
        text="+"
        onClick={() => {{ 
          localStorage.setItem('catName', restProps.row.name);
          localStorage.setItem('catID', restProps.row._id);
    setparent(localStorage.getItem('catID'));


          setcatName(restProps.row.name);
          setcatID(restProps.row._id);

          console.log(catName);
          console.log(catID);

          handleOpen() }} }
      />
    </TableEditColumn.Cell>
    
  );
  
  const getOptionsPro=async(idNew)=>{
    // alert("test")
    setparent(localStorage.getItem('catID'));
    async function fetchData() {
      if(parent0.length===24){
        try {
          const res = await axios.post('https://backoil.herokuapp.com/api/partName/product/cat/',{category:idNew}); 
          setpartData(res.data);
          // console.log(partData)
          setpartData(res.data)
          console.log(partData)


      } catch (err) {
          console.log(err);
      }
  }else{alert("re CLick")}
      }

    fetchData();

     }

    const  onCellPrepared = (e) => {
      if(e.rowType === "data" && e.column.dataField === "name") {
          e.cellElement.style.color = e.data.Amount >= 10000 ? "green" : "red";
          // Tracks the `Amount` data field
          e.watch(function() {
              return e.data.Amount;
          }, function() {
              e.cellElement.style.color = e.data.Amount >= 10000 ? "green" : "red";
          })
      }
  }
  const TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => {{ 
        localStorage.setItem('catName', row.name);
        localStorage.setItem('catID', row._id);
  setparent(localStorage.getItem('catID'));
    idNew = row._id

        setcatName(row.name);
        setcatID(row._id);

        console.log(catName);
        console.log(catID);
        getOptionsPro(idNew);

         }} }
      // onClick={() => alert(JSON.stringify(row))}
      style={{
        cursor: 'pointer',
        ...styles[row.name.toLowerCase()],
      }}
    />
  );
  return (
    <>
    <div class="flex-container">
    <div class="flex-child magenta">

    <Paper style={{ width:"600px" }}>
      <Grid onClick={onCellPrepared} rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <IntegratedSorting />
        <IntegratedFiltering />
        <TreeDataState
        onClick={test}
           expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <CustomTreeData onClick={test} getChildRows={getChildRows} />

        <Table height="auto" rowComponent={TableRow} columnExtensions={tableColumnExtensions} />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />
        <TableHeaderRow  showSortingControls />
        <TableTreeColumn   for="name"   onCellPrepared={onCellPrepared}/>
        <TableEditRow  />
        <TableEditColumn
          width={150}
          cellComponent={CellComponent}
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
        <Getter name="tableColumns" computed={getTableColumnsComputed} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
    </div>
    <div class="flex-child green">

    <Paper style={{ width:"600px" }}>
      <h1>{catName}</h1>
      <FileSystemNavigator
            catID={catID}
            partData={partData}
          />    </Paper>
    </div>
    <div class="flex-child green"></div>

    </div>
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
          <h1>Category: {catName} </h1>
          <h2>Add Chailed</h2>
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
          {/* <TextField
            style={{ width: "300px", margin: "5px" }}
            type="file"
            label="image"
            variant="outlined"
            onChange={(e) => setItemImage(e.target.value)}

          /> */}
        <br />

        <br />
        <Button variant="contained" color="primary" onClick={sendDataToAPI}>
        Add Chailed for {catName} 
        </Button>
      </form>
    </div>
        </Box>
      </Modal>
    </>
  );
};
