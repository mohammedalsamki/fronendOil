import React, { useState } from "react";
import { useEffect } from 'react';

import {
  EditingState,
  IntegratedSorting,
  SearchState,
  SortingState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
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
  PagingPanel,
  TableColumnResizing,
  TableTreeColumn
} from "@devexpress/dx-react-grid-material-ui";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { Paper } from "@material-ui/core";
import axios from 'axios'
import { async } from "q";
import { alertClasses } from "@mui/material";



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
        console.log(userid);
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
    }, []);

  const [columns] = useState([
    { name: "Brand", title: "Brand" },
    { name: "name", title: "Name" },
    { name: "_id", title: "ID" },
    { name: "ItemImage", title: "Item Image" },
    { name: "Note", title: "Note" },
    { name: "OEMPartNumber", title: "OEMPartNumber" },
    { name: "BrandPartNumber", title: "BrandPartNumber" },
    { name: "StockNumber", title: "StockNumber" },
    { name: "MinQty", title: "MinQty" ,type: "number"},
    { name: "StockQuantity", title: "StockQuantity" },
    { name: "UnitPrice", title: "UnitPrice" },
    { name: "SaelsPrice", title: "SaelsPrice" },
  

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
    { columnName: "Brand", width: 100 },
    { columnName: "name", width: 250 },
    { columnName: "_id", width: 250 },
    { columnName: "ItemImage", width: 120 },
    { columnName: "Note", width: 80 },
    { columnName: "OEMPartNumber", width: 150 },
    { columnName: "BrandPartNumber", width: 150 },
    { columnName: "StockNumber", width: 150 },
    { columnName: "MinQty", width: 150 ,type: "number"},
    { columnName: "StockQuantity", width: 100 },
    { columnName: "UnitPrice", width: 100 },
    { columnName: "SaelsPrice", width: 100 },

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

        let Brand =added[0].Brand
        let ItemImage =added[0].ItemImage
        let Note =added[0].Note
        let OEMPartNumber =added[0].OEMPartNumber
        let BrandPartNumber =added[0].BrandPartNumber
        let StockNumber =added[0].StockNumber
        let MinQty =Number(added[0].MinQty)
        let StockQuantity =Number(added[0].StockQuantity)
        let UnitPrice =Number(added[0].UnitPrice)
        let SaelsPrice =Number(added[0].SaelsPrice)

        axios.post('https://backendoil.vercel.app/api/category',{
            parent:parent,
            name:name,
            Brand: Brand, 
            ItemImage: ItemImage, 
            Note: Note, 
            OEMPartNumber: OEMPartNumber, 
            BrandPartNumber: BrandPartNumber, 
            StockNumber: StockNumber, 
            MinQty: MinQty, 
            StockQuantity: StockQuantity, 
            UnitPrice: UnitPrice, 
            SaelsPrice: SaelsPrice, 
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
        let Brand 
        let ItemImage 
        let Note 
        let OEMPartNumber 
        let BrandPartNumber 
        let StockNumber 
        let MinQty 
        let StockQuantity 
        let UnitPrice 
        let SaelsPrice 

        console.log("idc",changed)
        for (var i in changed){
            id=i
          console.log('id',id);
          console.log('changed',changed);
          for (var key in changed[i]){
              if(key=='name'){
              name=changed[i][key]
              }
              if(key=='Brand'){
                Brand=changed[i][key]
                }
                if(key=='ItemImage'){
                    ItemImage=changed[i][key]
                    }
                    if(key=='Note'){
                        Note=changed[i][key]
                        }
                        if(key=='OEMPartNumber'){
                            OEMPartNumber=changed[i][key]
                            }
                            if(key=='BrandPartNumber'){
                                BrandPartNumber=changed[i][key]
                                }
                                if(key=='StockNumber'){
                                    StockNumber=changed[i][key]
                                    }
                                    if(key=='MinQty'){
                                        MinQty=Number(changed[i][key])
                                    }
                                    if(key=='StockQuantity'){
                                        StockQuantity=Number(changed[i][key])
                                    }
                                    if(key=='SaelsPrice'){
                                        SaelsPrice=Number(changed[i][key])
                                    }
                                    if(key=='UnitPrice'){
                                        UnitPrice=Number(changed[i][key])
                                    }
              console.log( 'name',name,Brand,ItemImage,Note,OEMPartNumber,BrandPartNumber,StockQuantity,MinQty,UnitPrice,SaelsPrice);
          }
      }
        axios.put(`https://backendoil.vercel.app/api/category/update/${id}`, {
 
            category_name:name,
            Brand: Brand, 
            ItemImage: ItemImage, 
            Note: Note, 
            OEMPartNumber: OEMPartNumber, 
            BrandPartNumber: BrandPartNumber, 
            StockNumber: StockNumber, 
            MinQty: MinQty, 
            StockQuantity: StockQuantity, 
            UnitPrice: UnitPrice, 
            SaelsPrice: SaelsPrice,
    
 
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

  return (
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
        />
        <Getter name="tableColumns" computed={getTableColumnsComputed} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  );
};
