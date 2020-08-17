import React ,{ useEffect} from 'react';
import ScoreBoard from "./components/ScoreBoard"
import axios from 'axios';
import { useSelector ,useDispatch } from 'react-redux'
import { populateMatches ,populateStat} from "./redux"
import "./App.css"

const api_end_point = `https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json`


const App =  () => {

  const dispatch = useDispatch() ;
  
  const matches = useSelector( state => state.matches )
  
  useEffect( () => {

   axios.get(api_end_point)
        .then(res => {
         
          let t = []
          res.data.rounds.forEach(v => {t = [...t,...v.matches] })
          dispatch( populateMatches(t) )
          
          let stat = {}
          t.forEach( v => {

              let [ t1 ,t2 ] = v.score.ft 
              stat[v.team1] = stat[v.team1] ? stat[v.team1] : {  played : 0 , win : 0 , los : 0 , draw : 0 }   
              stat[v.team2] = stat[v.team2] ? stat[v.team2] : {  played : 0 , win : 0 , los : 0 , draw : 0 }   
              stat[v.team1].played += 1
              stat[v.team2].played += 1
              if( t1 == t2 ){
                stat[v.team1].draw += 1
                stat[v.team2].draw += 1
              }else if( t1 > t2 ){
                stat[v.team1].win += 1
                stat[v.team2].los += 1  
              }else if(t1 < t2){
                stat[v.team1].los += 1
                stat[v.team2].win += 1  
              }
          })
          dispatch( populateStat(stat) )
        })
  },[]);


  
  return (
    <div className="flex-container" >
        <div>
            Premier League 2015/16
        </div>
        {/* <div> */}
            <ScoreBoard rows={matches} />
        {/* </div> */}
      
    </div>
 
  );
}

export default App;
