import React from 'react'
import { connect  } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const input = event.target.value
        props.setFilter(input)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(
    null,
    { setFilter }
)(Filter)