const initialState = {
    data: [20],
    height: 500,
    width: 600
}

/*
 * A C T I O N S
 */
export const setVis = (vis) => {

    return dispatch => {

        dispatch({
            type: 'ROT_ARR_SET_VIS',
            data: {
                vis: vis
            }
        })
    }
}


const rotatingArrowReducer = (state = initialState, action) => {

    switch(action.type){

        default:
          return state

    }    
}

export default rotatingArrowReducer;