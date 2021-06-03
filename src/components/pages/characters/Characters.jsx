import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar'
import CharacterItem from './CharacterItem';

function Characters() {
  document.title = "Главная";

  const [name, setName] = useState('')
  const [param, setParam] = useState('')
  const url = `https://rickandmortyapi.com/api/character${param}`

  const { isLoading, error, data, isSuccess } = useQuery("characters", () =>
    fetch(url).then(res => res.json())
  );

  function getName(name) {
    setName(name)
  }
  useEffect(()=>{
   if(name.length>0){
    setParam('/?name='+ name.slice(1, name.length-1))
   }  else setParam('')  
  }, [param, name])

  return ( 
      <Container maxWidth="lg" >
        <SearchBar nameH={getName}/>       
        <Grid container spacing={3}>
          {isSuccess &&
            data.results ? data.results.map((item) => (
            <Grid  key={item.id} item xs={4}>
              <CharacterItem itemValues={item} />
            </Grid >
            )) : null
          }        
          {isLoading && <p>Loading..</p>}
          {error && <p>Error occurred!</p>} 
        </Grid>  
      </Container>
  );
}

export default Characters;
