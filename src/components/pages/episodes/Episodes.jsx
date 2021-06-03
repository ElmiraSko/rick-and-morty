import {Link} from 'react-router-dom';
import { useQueries } from "react-query";

function Episodes(props) {
    const episodeList = props.episode

     // Запрос на получение эпизодов
  const allEpisodes = useQueries(
    episodeList.map(episode => ({
      queryKey: ['episode', episode],
      queryFn: () => fetch(episode).then(res => res.json())
         .then(resulte => resulte)        
    })) 
    );
   
    return (   
        <div>  
            {allEpisodes.length > 0 ? 
            allEpisodes.map((item, index) => 
                <div  key={index}>
                    {item.isLoading && <p> Загрузка данных ...</p>}
                    {item.isSuccess && 
                    <Link to={`/episode-card?episodeId=${item.data.id}`}                     
                    className="forLink "
                    style={{color: '#848C8E'}}>
                        {item.data.name}
                    </Link>}
                    {item.isError && <p> Ошибка!</p>}
                </div>
            )  : null}      
        </div> 
    );
  }
  
  export default Episodes;