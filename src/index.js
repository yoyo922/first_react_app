import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail';
const API_KEY = 'AIzaSyDu7m0BipQ2gdOYMAKEaRkMRrEl3vtRG9g';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch);

// Create new componet, this makes some html

class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('surfBoards');
	}

	videoSearch(term){
		YTSearch({key:API_KEY, term:term}, (videos) => {
			this.setState({
				videos:videos,
				selectedVideo:videos[0]
			}); // ({videos:videos})
		});
	};

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)} , 300);

		return (
			<div>
				<SearchBar onSearchChange = {videoSearch} />
				<VideoDetail video = {this.state.selectedVideo}/>
				<VideoList
					onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
					videos = {this.state.videos}/>
			</div>
		);
	}
}

//Take this componet put it on the page(DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
