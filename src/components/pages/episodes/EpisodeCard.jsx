import React from 'react';
import {Link} from 'react-router-dom';
import { useQuery, useQueries} from "react-query";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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

function EpisodeCard() {
  const classes = useStyles();
  document.title = "Карточка эпизода";

  // Достаем id эпизода из url
  let urlVar = window.location.href;
  let items = urlVar.split('='); 
  let episodeId = Number(items[1]);

  // Запрос на получение эпизода по id
  const { isLoading: load, error, data: episode, isSuccess } = useQuery(['episode', episodeId], 
  () => fetch("https://rickandmortyapi.com/api/episode/" + episodeId).then(res => res.json()));  

  // массив url персонажей эпизода
  const characterList = episode?.characters || []

  // Запрос на получение персонажей данного эпизода
  const allCharacters = useQueries(
    characterList.map(char => ({
      queryKey: ['char', char],
      queryFn: () => fetch(char).then(res => res.json())
         .then(resulte => resulte)        
    })) 
    );

    return (
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h4">Карточка эпизода</Typography>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div style={{height: 'auto'}}>
            {load && <p>Loading..</p>}
            {error && <p>Error occurred!</p>} 
            {isSuccess &&        
              <Paper className={classes.paper} elevation={3}>             
                <Typography variant="h2" component="h2">
                  {episode.name}
                </Typography>
                <div>
                  <p>air_date: {episode.air_date}</p>  
                  <p>episode: {episode.air_date}</p>
                </div>             
              </Paper> 
            }  
          </div>
        <div> 
          <Typography variant="h4" >
              Персонажи:
          </Typography> 
          {allCharacters && allCharacters.map((item, index) => 
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
  
export default EpisodeCard;