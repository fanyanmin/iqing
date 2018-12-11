// import { StateType } from "../node_modules/rmc-calendar/lib/Calendar";
let initState={
    displayTop:'',
}
let commonReducer=(state=initState,action)=>{
    switch(action.type){
        case 'CHANGE':
        return{
            ...state,
            displayTop:action.payload
        }
        default:
        return state;
    }
}
export default commonReducer;