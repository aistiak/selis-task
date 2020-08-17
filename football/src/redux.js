import { createStore } from 'redux'

const initialState = {
    matches : [
      
    ] ,
    stat : {

    }
}

 
const reducer = function(state,{type,payload}){

	switch(type){
		
		case 'populate_matches' :

			return {
				...state ,
				matches : [ ...payload ]
            }
            
        case 'populate_stat' :
            return {
                ...state ,
                stat : { ...payload }
            }

		default :
			return state 	
	}
} 

export const  store = createStore(reducer,initialState)




export const populateMatches = payload => ({
	type: 'populate_matches',
	payload: payload ,
})

export const populateStat = payload => ({
    type : 'populate_stat' ,
    payload : payload , 
})
