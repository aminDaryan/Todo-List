import React, { Component } from 'react'

export default class ListShow extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <li style={{ margin: '20px'}}>
                <div className='grid-container'>
                    <div className='grid-container__item1'>
                        {this.props.text}
                    </div>
                    <div className='grid-container__item2'>
                        <button className='btn btn-primary'
                            id={'trash' + this.props.id}
                            name='Trash'
                            onClick={this.props.delete}>
                            Delete
                            </button>
                    </div>
                    <div className=' grid-container__item3 custom-control custom-checkbox'>
                        <input
                            className='custom-control-input'
                            id={this.props.id}
                            name='Checkbox'
                            onChange={this.props.toggleCheckbox}
                            checked={this.props.isItemChecked}
                            type='checkbox' ></input>
                        <label className="custom-control-label" htmlFor={this.props.id}></label>
                    </div>
                </div >
            </li >
        )
    }
}

// const ListShow = props => (
//     <ul>
//         {props.todolist.map((text, index) => (
//             <li key={index}>{text}</li>
//         ))};
//     </ul>
// );

// export default ListShow