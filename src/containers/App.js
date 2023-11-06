import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

function App(props) {
	const [count, setCount] = useState(0);
	const {searchField, onSearchChange, onRequestRobots, robots, isPending} = props;

	useEffect(() => {
		onRequestRobots();
		console.log(count);
	}, [count]) // only run if count changes.

	const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
	});
	return isPending ? 
		<h1>Loading</h1> :
	    (
		<div className='tc'>
		    <h1 className='f1'>RoboFriends</h1>
		    <button title='Increment in the console' onClick={()=>setCount(count + 1)}>Click Me!</button>
		    <SearchBox searchChange={onSearchChange} />
		    <Scroll>
		        <ErrorBoundry>
		            <CardList robots={filteredRobots} />
		        </ErrorBoundry>
		    </Scroll>
		</div>
	    );  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);