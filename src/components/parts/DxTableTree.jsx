import React, { useState } from "react";
import { useEffect } from 'react';
import ProdectTable from "./generator";
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
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
    return fetch('https://backendoil.vercel.app/api/category/get', {
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
    const res = await axios.get('https://backendoil.vercel.app/api/category/get')
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
  
    const [PartslList, setPartslList]= useState([]);
    const [rows, setRows] = useState(PartslList);

    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get('https://backendoil.vercel.app/api/category/get'); 
                setRows(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    localStorage.setItem('catName', catName)

    }, []);

  const [columns] = useState([
    { name: "name", title: "Name EN" },
    { name: "ItemImage", title: "Item Image",id:'truid' },
    { name: "nameEn", title: "Name AR" },
    { name: "_id", title: "ID" },

  ]);



  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 300 }
  ]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [sorting, setSorting] = useState([
    { columnName: "city", direction: "asc" }
  ]);
  const [searchValue, setSearchState] = useState("");
  const [columnWidths, setColumnWidths] = useState([

    { columnName: "name", width: 250 },
    { columnName: "_id", width: 250 },
    { columnName: "nameEn", width: 250 },
    { columnName: "ItemImage", width: 250 },

  ]);
  const [expandedRowIds, setExpandedRowIds] = useState([0, 1]);

  const changeAddedRows = value => {
    const initialized = value.map(row =>
      Object.keys(row).length ? row : { name: "Tokio" }
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


        axios.post('https://backendoil.vercel.app/api/category',{
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
        axios.put(`https://backendoil.vercel.app/api/category/update/${id}`, {
 
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
      axios.delete(`https://backendoil.vercel.app/api/category/delete/${deleted}`).then( () =>{
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
  
  // const {  popupVisible, activeRow } = this.state;
  const [popupVisible, setpopupVisible] = useState(false);
  const [activeRow, setactiveRow] = useState([]);


  // const showDetails =() => {
  //   <ProdectTable/>

  // };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showDetails = () => (
    <ProdectTable />
      
  );
  const CellComponent = ({ children, rows, ...restProps }) => (

 <TableEditColumn.Cell rows={rows} {...restProps}>
      {children}
      <TableEditColumn.Command
        id="custom"
        text="Show Info"
        onClick={() => {{ 
          localStorage.setItem('catName', restProps.row.name);
          setcatName(restProps.row.name);
          console.log(catName);
          handleOpen() }} }
      />
    </TableEditColumn.Cell>
  );
  return (
    <>
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
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
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <CustomTreeData getChildRows={getChildRows} />

        <Table height="auto" columnExtensions={tableColumnExtensions} />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />
        <TableHeaderRow showSortingControls />
        <TableTreeColumn for="name" />
        <TableEditRow />
        <TableEditColumn
          width={150}
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
          cellComponent={CellComponent}
        />
        <Getter name="tableColumns" computed={getTableColumnsComputed} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ProdectTable />

        </Box>
      </Modal>
    </>
  );
};
