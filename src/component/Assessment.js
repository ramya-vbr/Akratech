import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './assessment.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Assessment() {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';
      const data = await fetch(url)
        .then((response) => {
          return response.json();
        })
      setLoader(false);
      setResult(data);
      await localStorage.setItem('Item', JSON.stringify(data));
      setValue(JSON.parse(localStorage.getItem('Item')))
    }

    fetchData()
      .catch(console.error);
  }, [])

  const handledelete = (indexdel) => {
    let deleteitem = [];
    value.map((detail, index) => {
      if (index !== indexdel) {
        deleteitem.push(detail)
      }
    })
    setValue(deleteitem);
    console.log("del", deleteitem)
  }

  const handleRefresh = () => {
    window.location.reload(false);
  }

  return (<>
    {loader ? <div className='loader'><CircularProgress /></div> :
      <div className='container'>
        <div className='countButton'>
          <Button variant="contained" className='item-style'>Item {value.length}</Button>
          <Button variant="contained" className='refresh-style' onClick={handleRefresh}>Refresh</Button>
        </div>
        <div className='style-page'>
          {value.map((datas, index) => {
            return (
              <Card sx={{ maxWidth: 345 }} className='card-style'>
                <CardActionArea>
                  <CardContent className='card-content'>
                    <div className='name-style'>{datas.name}</div>
                    <img src={datas.image_link} alt="profile-pic" className='card-image' />
                    <div className='details-ctn'>
                      <div className='price-style'>Price:${datas.price}</div>
                      <div className='rating-style'>Rating:{(datas.rating === null) ? 0 : datas.rating}</div>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions className='buttonActionContainer'>
                  <Button variant="outlined" color="error" href="#contained-buttons" onClick={() => handledelete(index)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>

            )
          })}
        </div>
      </div>}
  </>
  )
}


export default Assessment;