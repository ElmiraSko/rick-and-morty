import React from 'react';
import { useQuery} from "react-query";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Episodes from '../episodes/Episodes'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
   userInfo: {
     minWidth: '150px',
     textAlign: 'left',
     paddingLeft: '7px',
 }
}));

function CharacterCard() {
  const classes = useStyles();
  document.title = "Карточка персонажа";
  
  // Достаем id персонажа из url
  let urlVar = window.location.href;  
  let items = urlVar.split('='); 
  let characterId = Number(items[1]);
  
  // Запрос на получение персонажа по id
  const { isLoading, error, data: character, isSuccess } = useQuery(['charact', characterId], 
  () => fetch("https://rickandmortyapi.com/api/character/" + characterId).then(res => res.json()));  

  const characterLocation = character?.location

  // Запрос на получение местоположения
  const {isIdle, isLoading: load, data: locationInfo, isSuccess: success, isError: err} = useQuery(
    ['location', characterLocation], 
    () => fetch(characterLocation.url).then(res => res.json()),
    {enabled: !!characterLocation}
    );  

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4">Карточка персонажа</Typography>
      {isSuccess &&
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{height: 'auto'}}>
          <Paper className={classes.paper} elevation={3}> 
            <div>
              <img src={character.image} alt={character.name}/>
              {isIdle && <p>Ожидание...</p>}
              {load && <p> Загрузка данных ...</p>}
              {success &&              
                <div className={classes.userInfo}>
                  <h4>Местоположение персонажа:</h4>
                    <Link to={`/location-card?locationId=${locationInfo.id}`}
                    className='forLink' style={{color: '#848C8E'}}>
                    {locationInfo.name}</Link>
                  <p>Type: {locationInfo.type}</p>
                  <p>Dimension: {locationInfo.dimension}</p>
                </div>
              }   
              {err && <p>Ошибка!</p>}           
            </div>             
            <div className={classes.userInfo}>
              <h2>{character.name}</h2>
              <p>status: {character.status}</p>
              <p>species: {character.species}</p>
              <p>type: {character.type}</p>
              <p>gender: {character.gender}</p>    
            </div>
          </Paper> 
        </div>
        <div>
            <h3>Cписок эпизодов:</h3>
            {character.episode ?    
                <Episodes  episode={character.episode} />                          
               : null
            }
        </div>
      </div>                
      }  
      {isLoading && <p>Loading..</p>}
      {error && <p>Error occurred!</p>}  
    </Container>
  );
}

export default CharacterCard;
