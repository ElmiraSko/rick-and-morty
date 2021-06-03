import React from 'react';
import {Link} from 'react-router-dom';
import { useQuery, useQueries} from "react-query";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginTop: '10px',
  },
}));

function LocationCard() {
    const classes = useStyles();
    document.title = "Карточка местоположения";

    //Достаем id местоположения из url
    let urlVar = window.location.href;
    let items = urlVar.split('='); 
    let locationId = Number(items[1]);

     // Запрос на получение местоположения по id
  const { isLoading: load, error, data: location, isSuccess } = useQuery(['episode', locationId], 
  () => fetch("https://rickandmortyapi.com/api/location/" + locationId).then(res => res.json()));  

  // Массив url жителей
  const residentsList = location?.residents || []

  // Запрос на получение жителей
  const allResidents = useQueries(
    residentsList.map(resident => ({
      queryKey: ['resident', resident],
      queryFn: () => fetch(resident).then(res => res.json())
        //  .then(resulte => resulte)        
    })) 
    );

    return (
        <Container maxWidth="lg" className={classes.root}>
          <Typography variant="h4" >Карточка местоположения</Typography>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{height: 'auto'}}>
              {load && <p>Loading..</p>}
              {error && <p>Error occurred!</p>} 
              {isSuccess &&        
                <Paper className={classes.paper} elevation={3}>             
                  <Typography variant="h3" >
                    {location.name}
                  </Typography>
                  <div>
                    <p>type: {location.type}</p>  
                    <p>dimension: {location.dimension}</p>
                  </div>             
                </Paper>  
              }  
            </div>
          <div> 
            <Typography variant="h4" >
                Residents:
            </Typography>  
            {allResidents && allResidents.map((item, index) => 
              <div key={index}> 
                {item.isLoading && <p> Загрузка данных ...</p>}
                {item.isSuccess && 
                <Link to={`/character-item?id=${item.data.id}`}
                  className='forLink' style={{color: '#848C8E'}}>
                    {item.data.name}
                </Link>}
                {item.isError && <p> Ошибка!</p>}
              </div>        
            )}
          </div>
        </div>
      </Container>
    );
  }
    
  export default LocationCard;  