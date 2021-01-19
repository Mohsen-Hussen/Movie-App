import React, { Component } from 'react'
import { BsSearch } from "react-icons/bs";
import './SearchBar.css';

class SearchBar extends Component {
    state ={
        value: ''
    }
    timeout = null;
    doSearch = (event) => {
        this.setState({value: event.target.value})
        clearTimeout(this.timeout);
        // Set a timeout to wait for the user to stop writing
        // So we don´t have to make unnessesary calls
        this.timeout = setTimeout( () => {
            this.props.callback(this.state.value);
        }, 500);
    }
    render() {
        return (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                <BsSearch className="rmdb-fa-search" size="2rem" color="white"/>
                <input 
                    type="text"
                    className="rmdb-searchbar-input"
                    placeholder="Search"
                    onChange={this.doSearch}
                    value={this.state.value} />
                </div>
            </div>
        )
    }
}

export default SearchBar;