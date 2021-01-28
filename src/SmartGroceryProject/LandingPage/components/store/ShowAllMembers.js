

import Button from '@material-ui/core/Button';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useEffect, useState} from 'react';
import axios from 'axios';
import API from '../API/API';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const drawerWidth=240;

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: drawerWidth,
        height: 400,
        width: 800
    },
    buttondelete:{
       
        
    },
  }));



// marginLeft: drawerWidth,














const columns = [
  { field: 'id',headerAlign: 'center', headerName: 'ID', width: 70 },

  { field: 'name',headerAlign: 'center', headerName: ' name', width: 130 },
  {
    field: 'email',
    headerName: 'email',
    type: 'number',
    headerAlign: 'center',
    width: 260,
  },
  {
    field: 'role',
    headerName: 'role ',
    headerAlign: 'center',

    width: 160,

  },
  
  

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



export default function ShowAllMembers() {
    const classes = useStyles();
    const [members, setMembers] = useState(null);
    const [deletedRows, setDeletedRows] = useState([]);

    const handleRowSelection = (e) => {

     setDeletedRows([...deletedRows, ...members.filter((r) => r.id === e.data.id)]);
   };
   const handlePurge = () => {
       deletedRows.forEach(element => {
             deleteMember(element.id);
       });
    setMembers(
      members.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1)
    );
  };

  //
  function deleteMember(id){
    console.log("id is ",id);
   // var send_url="http://localhost:8000/api/user/"+id;
  API.deletemember(id).then(res => {
      const result = res.data.success;
      console.log("RESULT:from home ", result);
      
      alert('post deleted');
  }).catch(error => console.log(error));

}//end of delete members by id

    const fetchMembers = () => {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
        API.getAllMembers().then(res => {
            const result = res.data.members;
            console.log("RESULT: ", result);
            
           if(res.data.success==false){
           //alert


           }else{
          
            setMembers(res.data.members);
           }
        }).catch(error => console.log("error",error));

       

            
          }//end of fetch members


          useEffect(() => {
            fetchMembers();

          }, []);





function returnmembers_data(){
}







if(members!=null){
    return (
        <div>
        <div  className={classes.root} >

          <DataGrid rows={members}
         
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelected={handleRowSelection}
        
          />

        </div>
        <Button style={{
          marginLeft:drawerWidth
        }} color='primary' variant="contained" endIcon={  <EditIcon /> } onClick={handlePurge}>EDIT</Button>
        <Button className={classes.buttondelete} endIcon={ <DeleteIcon />} color='secondary' variant="contained"  onClick={handlePurge}>DELETE</Button>
        </div>
      );
}else{
    return <div>loading members
        <LinearProgress color="secondary" />
    </div>
}


}








