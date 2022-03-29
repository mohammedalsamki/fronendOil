import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView,TreeItem } from '@material-ui/lab'
import { JSONTree } from 'react-json-tree';
import DxTableTree from "./DxTableTree";


const json = [
    {
    "_id": "6241710a18005d8c8b7c5a93",
    "name": "Door lock",
    "parent": "6241709418005d8c8b7c5a8f",
    "ancestors": [
    {
    "_id": "6241709418005d8c8b7c5a8f",
    "name": "samki",
    "slug": "samki"
    },
    {
    "_id": "62416def067566249d79d8f6",
    "name": "new",
    "slug": "new"
    }
    ],
    "slug": "door-lock",
    "__v": 0
    }
    ];
export default function Parts() {
  return (
      <>
      
      <DxTableTree />


    </>
  );
}
