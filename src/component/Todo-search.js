import React, { Component } from 'react'
import ListShow from './List-Show'




export default class TodoSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todoList: '',
            searchText: '',
            searchTodoList: []
        }


        console.log(this.props.todoList)
    }


    handleSearchFormChange = (e) => {
        this.setState({ searchText: e.target.value });
    }


    handleSearchFormEmpty = () => {
        setTimeout(() => {
            this.setState({ searchText: '' })
        })
    }

    handleSearch = () => {
        setInterval(() => {
            let newTodoList = this.props.todoList.filter((value) => {
                if (value.text.includes(this.state.searchText))
                    return true

                return false
            });

            this.setState({ searchTodoList: newTodoList })
        })
    }

    render() {


        return (
            <>
                <form className='todoList__form'>
                    <input className='todoList__form__input__search' value={this.state.searchText} onChange={this.handleSearchFormChange} />
                    <button className='todoList__form__button__search' onClick={this.handleSearchFormEmpty, this.handleSearch} type='button'> Search </button>

                </form>

                <ol style={{ padding: '20 px' }}>
                    {
                        this.state.searchTodoList.filter((object) => {
                            if (object.itemChecked == false)
                                return true

                            return false
                        }).map((value) => {

                            return (
                                <ListShow
                                    key={value.id}
                                    id={value.id}
                                    text={value.text}
                                    toggleCheckbox={this.props.handlingToggleCheckbox}
                                    isItemChecked={false}
                                    delete={this.props.handlingDelete} />
                            )
                        })
                    }
                </ol>

                <ol style={{ padding: '20px' }}>
                    {
                        this.state.searchTodoList.filter((object) => {
                            if (object.itemChecked == true)
                                return true

                            return false
                        }).map((value) => {

                            return (
                                <ListShow
                                    key={value.id}
                                    id={value.id}
                                    text={value.text}
                                    toggleCheckbox={this.props.handlingToggleCheckbox}
                                    isItemChecked={true}
                                    delete={this.props.handlingDelete} />
                            )
                        })
                    }
                </ol>

            </>
        )
    }
}
