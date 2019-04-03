import React from 'react'


export default class Search extends React.Component {

    searchChanged = (e) => {
        this.props.history.push(`/?search=${e.target.value}`);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.searchChanged} placeholder="search" />
            </div >
        )
    }

}

