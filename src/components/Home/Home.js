import React, { Component } from 'react';
import { API_URL , API_KEY , IMAGE_BASE_URL , BACKDROP_SIZE , POSTER_SIZE } from '../../config';
import HeroImage from '../HeroImage/HeroImage';
import SearchBar from '../SearchBar/SearchBar';
import FourColGrid from '../FourColGrid/FourColGrid';
import MovieThumb from '../MovieThumb/MovieThumb';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Spinner from '../Spinner/Spinner';
import './Home.css';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    componentDidMount () {
        this.setState({loading:true});
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm: searchTerm
        })
        if (searchTerm === "") {
            endpoint = `${API_URL}movie/popular?api_key${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    }
    loadMoreItems = () => {
        // ES6 Destructuring the state
        const { searchTerm, currentPage } = this.state;
    
        let endpoint = '';
        this.setState({ loading: true })
    
        if (searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    }
    
    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies:[...this.state.movies, ...result.results],
                heroImage: this.state.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            })
        })
    }
    render() {
        return (
            <div className="rmdb-home">
                {this.state.heroImage ?
                <div>
                    <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                        title={this.state.heroImage.original_title}
                        text={this.state.heroImage.overview} />
                    <SearchBar callback={this.searchItems} />
                </div> : null }
                <div className="rmdb-home-grid">
                    <FourColGrid 
                        header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={this.state.loading}>
                        {this.state.movies.map((element , i) => {
                            return <MovieThumb 
                                        key={i}
                                        clickable={true}
                                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './image/no_image.jpg'}
                                        movieId={element.id}
                                        movieName={element.original_title}/>
                        })}
                    </FourColGrid>
                    {this.state.loading ? <Spinner /> : null}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ? 
                    <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null}
                </div>
            </div>
        )
    }
}

export default Home;