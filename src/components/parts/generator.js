import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";
import "./styles.css";

function ModalBox(props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    dname: "",
    dsource: ""
  });

  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={state.dname || ""}
            onChange={handleChange("dname")}
            fullWidth
          />
          <Select
            native
            fullWidth
            value={state.dsource || ""}
            onChange={handleChange("dsource")}
          >
            <option value="" />
            <option value={"mssql"}>mssql</option>
            <option value={"oracle"}>oracle</option>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.addDataSource(state.dname, state.dsource);
              setOpen(false);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ProdectTable() {
  const columns = ["Id", "Name", "Provider"];
  const [data, setData] = useState([]);

  let id = 0;
  function createData(name, provider) {
    id += 1;
    return [id, name, provider];
  }

  useEffect(() => {
    const data = [
      createData("Dummy1", "oracle"),
      createData("Dummy2", "mssql"),
      createData("Dummy3", "oracle")
    ];
    setData(data);
  }, []);

  const options = {
    filterType: "checkbox"
  };

  const addDataSource = (dname, dsource) => {
    const updated = [...data];
    updated.push(createData(dname, dsource));
    setData(updated);
  };

  return (
    <div className="f-height fx-column-cont">
      <div>
        <ModalBox
          addDataSource={(dname, dsource) => addDataSource(dname, dsource)}
        />
        <MUIDataTable
          title={"Test Source"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}

export default ProdectTable;
