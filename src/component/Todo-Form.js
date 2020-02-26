import React, { Component } from 'react'
import ListShow from './List-Show'
import SearchTab from './Todo-search'

export default class TodoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            todoList: []
        }
    }



    handleSubmit = (event) => {

        var index
        if (this.state.todoList[0]) {
            index = this.state.todoList[this.state.todoList.length - 1].id + 1;
        } else {
            index = 0;
        }
        event.preventDefault();
        this.setState({
            todoList: [...this.state.todoList, { text: this.state.text, id: index, itemChecked: false }]
        });

    }

    handleAddFormChange = (e) => {
        this.setState({ text: e.target.value });
    }


    handleToggleCheckbox = (event) => {

        this.state.todoList.map((value, index) => {

            if (value.id == event.target.id) {

                let newTodoList = [...this.state.todoList]
                newTodoList[index].itemChecked = !this.state.todoList[index].itemChecked
                return this.setState({ todoList: newTodoList })
            }
        });
    }

    handleDelete = (event) => {

        let newTodoList = this.state.todoList.filter((value) => {

            if ('trash' + value.id !== event.target.id)
                return true

            return false
        })
        return this.setState({ todoList: newTodoList })
    }

    handleAddFormEmpty = () => {
        setTimeout(() => {
            this.setState({ text: '' })
        })
    }

    componentWillMount() {
        if (JSON.parse(localStorage.getItem('The todolist')))
            return this.setState({ todoList: JSON.parse(localStorage.getItem('The todolist')) })
    }


    componentDidUpdate() {
        localStorage.setItem('The todolist', JSON.stringify(this.state.todoList))
    }

    componentWillUnmount() {
        localStorage.setItem('The todolist', JSON.stringify(this.state.todoList))
    }

    render() {


        console.log(this.state.todoList)
        let numberOfDoneItems = this.state.todoList.filter((object) => {
            if (object.itemChecked == true)
                return true

            return false
        }).length;


        return (
            <div className='todoList'>
                <div style={{ width: '50%' }}>
                    <form onSubmit={this.handleSubmit} className='todoList__form'>
                        <input className='todoList__form__input__add' value={this.state.text} onChange={this.handleAddFormChange} />
                        <button className='todoList__form__button__add' onClick={this.handleAddFormEmpty} type='submit'> Add </button>
                    </form>

                    <ol style={{ padding: '20 px' }}>
                        {
                            this.state.todoList.filter((object) => {
                                if (object.itemChecked == false)
                                    return true

                                return false
                            }).map((value) => {

                                return (
                                    <ListShow
                                        key={value.id}
                                        id={value.id}
                                        text={value.text}
                                        toggleCheckbox={this.handleToggleCheckbox}
                                        isItemChecked={false}
                                        delete={this.handleDelete} />
                                )
                            })
                        }
                    </ol>

                    {numberOfDoneItems ? <h4 className="todoList__header">Done Items</h4> : ''}

                    <ol style={{ padding: '20px' }}>
                        {
                            this.state.todoList.filter((object) => {
                                if (object.itemChecked == true)
                                    return true

                                return false
                            }).map((value) => {

                                return (
                                    <ListShow
                                        key={value.id}
                                        id={value.id}
                                        text={value.text}
                                        toggleCheckbox={this.handleToggleCheckbox}
                                        isItemChecked={true}
                                        delete={this.handleDelete} />
                                )
                            })
                        }
                    </ol>



                    {numberOfDoneItems ? <h6>Number of Done items is {numberOfDoneItems}</h6> : ''}


                </div>
                <div style={{ width: '50%' }}>
                    <SearchTab
                        todoList={this.state.todoList}
                        handlingToggleCheckbox={this.handleToggleCheckbox}
                        handlingDelete={this.handleDelete}
                    />
                </div>
            </div >
        )
    }

}
