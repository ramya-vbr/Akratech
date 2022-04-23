import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './assessment.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, CardActionArea, CardActions } from '@mui/material';


function Assessment() {
    const [result,setResult] = useState([]);
    const [loader, setLoader] = useState(true);
    const [value, setValue] = useState([]);

    useEffect(() => {
        const url='http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((parsedData) => {
          setLoader(false);
            setResult(parsedData);
            localStorage.setItem('Item', JSON.stringify(parsedData));

        })
       
    }, [])

    useEffect(() => {
    setValue (JSON.parse(localStorage.getItem('Item')))
    }, [])
      
    const handledelete = (indexdel) =>{
      let deleteitem = [];
     value.map((detail,index) =>{
         if(index !== indexdel){
             deleteitem.push(detail)
         }
     })
     setValue(deleteitem);
     console.log("del",deleteitem)
  }

const handleRefresh =() =>{
  window.location.reload(false);
}
  return (
    <div className='style-page'>
       {loader ?  <CircularProgress/>:
       <>
       <Button variant="contained" className='refresh-style' onClick={handleRefresh}>Refresh</Button>
       <Button variant="contained" className='item-style'>Item {value.length}</Button>
     {value.map((datas,index) =>{
      return(  
    <Card sx={{ maxWidth: 345 }} className='card-style'>
      <CardActionArea>
        <img src={datas.image_link} alt="profile-pic" className='card-image'/>
        <CardContent className='card-content'>
           <div className='name-style'>{datas.name}</div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" href="#contained-buttons" onClick={()=>handledelete(index)}>
        Delete
      </Button>
      </CardActions>
    </Card>
    
    ) } ) }
    </>
}
    </div>
   
  )
}


export default Assessment;