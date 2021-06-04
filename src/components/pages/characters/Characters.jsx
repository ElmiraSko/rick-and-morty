// @flow
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import CharacterItem from './CharacterItem';

function Characters() {
  document.title = "Главная";

  const [name, setName] = useState('')
  // const [param, setParam] = useState('')
  // Данные для отображения
  const [currentData, setCurrentData] = useState([])

  // const url = `https://rickandmortyapi.com/api/character${param}`
  const url = "https://rickandmortyapi.com/api/character"

  const { isLoading, error, data, isSuccess } = useQuery("characters", () =>
    fetch(url).then(res => res.json()))

  // Получаем значение имени из формы поиска
  function getName(name) {
    setName(name.slice(1, name.length-1))
  }

  // Формируем новый массив для отображения на странице
  function getAllByName(searchName) {
    const resultArr = []
    if(data){
      if(searchName.length > 0) {
        data.results.map(current => {
          const charactersName = (current.name).toLowerCase()
          if(charactersName.indexOf(searchName.toLowerCase()) > 0){
            resultArr.push(current)
          }
        })
        setCurrentData(resultArr)
      } else {
        setCurrentData(data.results) 
      }   
    }    
  }

  // Следим за значением имени в поисковой форме
  useEffect(()=>{
  getAllByName(name)  
  }, [name])

  // получаем значение имени из формы поиска
  useEffect(()=>{
    console.log(currentData)  
  }, [currentData])

  useEffect(()=>{
    if(data) {setCurrentData(data.results)}
  }, [data])

  return ( 
      <Container maxWidth="lg" >
        <SearchBar nameH={getName}/>       
        <Grid container spacing={3}>
          {isSuccess &&
            currentData ? currentData.map((item) => (
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
