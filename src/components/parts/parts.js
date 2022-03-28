import * as React from 'react';
// import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView,TreeItem } from '@material-ui/lab'
// import TreeItem from '@mui/lab/TreeItem';
import { JSONTree } from 'react-json-tree';
// If you're using Immutable.js: `npm i --save immutable`
import { Map } from 'immutable';

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
      

<JSONTree data={json} />
      
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
        <TreeItem nodeId="4" label="OSS" />
       <TreeItem nodeId="7" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
    </>
  );
}
