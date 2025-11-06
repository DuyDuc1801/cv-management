export const getInputSearch = (state = {}, action) => {
    switch(action.type){
        case "INPUT_SEARCH":
            return action.data;
        default:
            return state;
    }
}