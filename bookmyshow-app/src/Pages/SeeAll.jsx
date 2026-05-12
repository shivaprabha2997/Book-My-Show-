import React, { useEffect, useState } from 'react'
import styles from '../Components/Styling/SeeAll.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from "../Redux/app/actions"
import Card from '../Components/Card_seeAll'

const languageOptions = [
    'Hindi',
    'English',
    'Telugu',
    'Kannada',
    'Japanese',
    'Malayalam',
    'Punjabi'
]

const genreOptions = [
    'Action',
    'Drama',
    'Thriller',
    'Comedy',
    'Adventure',
    'Family',
    'Fantasy'
]

const formatOptions = [
    '2D',
    '4D',
    '4DX',
    'IMAX 2D',
    'IMAX 3D'
]

const SeeAll = () => {

    const dispatch = useDispatch()

    const movies_data = useSelector(state => state.app.movies_data)
    const city = useSelector(state => state.app.city)

    const [showLanguage, setShowLanguage] = useState(false)
    const [showGenre, setShowGenre] = useState(false)
    const [showFormat, setShowFormat] = useState(false)

    const [filterLanguage, setFilterLanguage] = useState([])
    const [filterGenre, setFilterGenre] = useState([])
    const [filterFormat, setFilterFormat] = useState([])

    const [movie, setMovie] = useState([])

    useEffect(() => {
        dispatch(getMovies())
        window.scrollTo(0, 0)
    }, [dispatch])

    useEffect(() => {
        let filteredMovies = [...movies_data]

        // Language Filter
        if (filterLanguage.length > 0) {
            filteredMovies = filteredMovies.filter(item =>
                filterLanguage.some(lang =>
                    item.languages?.includes(lang)
                )
            )
        }

        // Genre Filter
        if (filterGenre.length > 0) {
            filteredMovies = filteredMovies.filter(item =>
                item.movie_genre?.some(gen =>
                    filterGenre.includes(gen.genre)
                )
            )
        }

        // Format Filter
        if (filterFormat.length > 0) {
            filteredMovies = filteredMovies.filter(item =>
                item.screen_type?.some(type =>
                    filterFormat.includes(type.type)
                )
            )
        }

        setMovie(filteredMovies)

    }, [movies_data, filterLanguage, filterGenre, filterFormat])

    const toggleFilter = (value, filter, setFilter) => {
        if (filter.includes(value)) {
            setFilter(filter.filter(item => item !== value))
        } else {
            setFilter([...filter, value])
        }
    }

    const clearFilter = (type) => {
        const clearMap = {
            language: setFilterLanguage,
            genre: setFilterGenre,
            format: setFilterFormat
        }

        clearMap[type]([])
    }

    const renderButtons = (options, filter, setFilter) => (
        options.map(item => (
            <button
                key={item}
                style={
                    filter.includes(item)
                        ? {
                            background: '#e67088',
                            border: 'none',
                            color: 'white'
                        }
                        : {}
                }
                onClick={() =>
                    toggleFilter(item, filter, setFilter)
                }
            >
                {item}
            </button>
        ))
    )

    return (
        <div className={styles.container}>

            <div className={styles.leftsideNav}>

                <h2
                    style={{
                        background: 'none',
                        fontSize: '25px',
                        fontWeight: '700'
                    }}
                >
                    Filters
                </h2>

                {/* Languages */}
                <div>

                    <div className={styles.header}>

                        <div onClick={() => setShowLanguage(!showLanguage)}>
                            <span
                                style={{
                                    marginLeft: '10px',
                                    color: showLanguage ? '#e67088' : 'black'
                                }}
                            >
                                Languages
                            </span>
                        </div>

                        <div onClick={() => clearFilter("language")}>
                            Clear
                        </div>

                    </div>

                    {
                        showLanguage && (
                            <div className={styles.dialogue}>
                                {
                                    renderButtons(
                                        languageOptions,
                                        filterLanguage,
                                        setFilterLanguage
                                    )
                                }
                            </div>
                        )
                    }

                </div>

                {/* Genre */}
                <div>

                    <div className={styles.header}>

                        <div onClick={() => setShowGenre(!showGenre)}>
                            <span
                                style={{
                                    marginLeft: '10px',
                                    color: showGenre ? '#e67088' : 'black'
                                }}
                            >
                                Genre
                            </span>
                        </div>

                        <div onClick={() => clearFilter("genre")}>
                            Clear
                        </div>

                    </div>

                    {
                        showGenre && (
                            <div className={styles.dialogue}>
                                {
                                    renderButtons(
                                        genreOptions,
                                        filterGenre,
                                        setFilterGenre
                                    )
                                }
                            </div>
                        )
                    }

                </div>

                {/* Format */}
                <div>

                    <div className={styles.header}>

                        <div onClick={() => setShowFormat(!showFormat)}>
                            <span
                                style={{
                                    marginLeft: '10px',
                                    color: showFormat ? '#e67088' : 'black'
                                }}
                            >
                                Format
                            </span>
                        </div>

                        <div onClick={() => clearFilter("format")}>
                            Clear
                        </div>

                    </div>

                    {
                        showFormat && (
                            <div className={styles.dialogue}>
                                {
                                    renderButtons(
                                        formatOptions,
                                        filterFormat,
                                        setFilterFormat
                                    )
                                }
                            </div>
                        )
                    }

                </div>

            </div>

            <div>

                <h2
                    style={{
                        background: 'none',
                        fontSize: '25px',
                        fontWeight: '700',
                        marginLeft: '30px'
                    }}
                >
                    Movies in {city}
                </h2>

                <div className={styles.appliedFilter}>
                    {
                        [
                            ...filterLanguage,
                            ...filterGenre,
                            ...filterFormat
                        ].map(item => (
                            <div key={item}>{item}</div>
                        ))
                    }
                </div>

                <div className={styles.explore}>
                    <div>Coming Soon</div>

                    <div
                        style={{
                            color: '#e67088',
                            fontSize: '18px'
                        }}
                    >
                        Explore Upcoming Movies &gt;
                    </div>
                </div>

                <div className={styles.mainCards}>

                    {
                        movie.length === 0
                            ? (
                                <div
                                    style={{
                                        margin: '20px auto',
                                        width: 'fit-content',
                                        background: '#ffcece',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <h2 style={{ color: 'gray' }}>
                                        Oops, We are not able to find the specific movie.
                                    </h2>
                                </div>
                            )
                            : (
                                movie.map(item => (
                                    <Card
                                        key={item.id}
                                        {...item}
                                    />
                                ))
                            )
                    }

                </div>

            </div>

        </div>
    )
}

export default SeeAll
