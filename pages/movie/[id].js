import styles from '../../styles/Home.module.css';
import Link from 'next/link';

function isDirector(person){
    return person.job == "Director" || person.job == "Producer" || person.job == "Screenplay";

}

function isTrailer(video){
    return video.type == "Trailer";

}

export default function movie({movie, movie_cast, trailer}) {
const crew = movie_cast.crew.filter(isDirector);
const bg = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;

    return <>
    <div className={styles.container}>
    <main className={styles.main}>
        <div className="block movie-block">
            <div className="custombg" style={{backgroundImage: `url(${bg})`,backgroundPosition: `left calc((50vw - 170px) - 340px) top`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`}}>
            <div className="custombg2" style={{backgroundImage: `linear-gradient(to right, rgb(38, 38, 38) calc((50vw - 170px) - 340px), rgba(79, 79, 79, 0.84) 50%, rgba(77, 77, 77, 0.84) 100%)`}}>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <figure className="image is-3by6 movie-poster">
                        <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>
                        </figure>
                    </div>
                    <div className="column has-text-light">
                        <h1 className='title is-1 has-text-light'>{movie.title}</h1>
                        <h1 className='more-infos subtitle is-8 has-text-light'>
                           <span>{movie.release_date} • </span>
                           <span>{movie.genres.map((genre, index)=> (index ? ', ': '') + genre.name) } • </span>
                           <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60 == 0 ? '' : movie.runtime % 60 + "m"}</span>
                        </h1><br/>
                            <div className="movie-crew columns is-multiline">
                                {crew.slice(0, 10).map(crew_member=>
                                <div className="column is-one-fifth p-0">
                                    <div>
                                        <p className="title is-6 has-text-light">{crew_member.name}</p>
                                        <p className="subtitle is-6 has-text-light">{crew_member.job}</p>
                                    </div>
                                    </div>
                                    )}
                            </div>
                        <p className="is-size-6 is-italic has-text-grey-light has-text-centered">{movie.tagline}<br/><br/></p>
                        <h3 className='title is-4 has-text-light'>Synopsis</h3><p>{movie.overview}</p>
                    </div>
                </div>
            </div>
            </div>
            </div>

            <div className="cast block">
            <span className='subtitle is-8 has-text-light'>Têtes d'affiche</span>
            <div className="actors columns is-mobile is-multiline">
                {movie_cast.cast.slice(0, 10).map(actor=>
                <div className=" column is-one-third-mobile p-0">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image">
                                <img src={"https://media.themoviedb.org/t/p/w138_and_h175_face/" + actor.profile_path} />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <p className="title is-6 has-text-light">{actor.name}</p>
                                <p className="subtitle is-7 has-text-grey">{actor.character}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    )}
            </div>
            </div>
        </main>
        </div>
    </>

}

export async function getServerSideProps({params}){
    const url_movie = `https://api.themoviedb.org/3/movie/${params.id}?language=fr-FR`;
    const options_movie = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlkZTFkYWRiNjM2ODFiMzM1N2MyZGM0YmM1MWNhNCIsInN1YiI6IjY0MmU3ZmZkMTU4Yzg1MDBlMGI4NWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HqpmtsrBeXh6h_oHIHn1lL_djy18CAWqDDMauq0VQw'
      }
    };
  const movie = await fetch(url_movie, options_movie)
    .then(res => res.json());

    const url_movie_cast = `https://api.themoviedb.org/3/movie/${params.id}/credits?language=fr-FR`;
    const options_movie_cast = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlkZTFkYWRiNjM2ODFiMzM1N2MyZGM0YmM1MWNhNCIsInN1YiI6IjY0MmU3ZmZkMTU4Yzg1MDBlMGI4NWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HqpmtsrBeXh6h_oHIHn1lL_djy18CAWqDDMauq0VQw'
      }
    };
  const movie_cast = await fetch(url_movie_cast, options_movie_cast)
    .then(res => res.json());


    const url_trailer = `https://api.themoviedb.org/3/movie/${params.id}/videos?language=fr-FR`;
    const options_trailer = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlkZTFkYWRiNjM2ODFiMzM1N2MyZGM0YmM1MWNhNCIsInN1YiI6IjY0MmU3ZmZkMTU4Yzg1MDBlMGI4NWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HqpmtsrBeXh6h_oHIHn1lL_djy18CAWqDDMauq0VQw'
      }
    };
  const trailers = await fetch(url_trailer, options_trailer)
    .then(res => res.json());

    const trailer = trailers.results.filter(isTrailer);

    return{
        props: {
            movie,
            movie_cast,
            trailer
        }
      }
}

/*
export async function getStaticPaths(){
    const url = 'https://api.themoviedb.org/3/search/movie?query=Monstre&include_adult=false&language=fr-FR&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlkZTFkYWRiNjM2ODFiMzM1N2MyZGM0YmM1MWNhNCIsInN1YiI6IjY0MmU3ZmZkMTU4Yzg1MDBlMGI4NWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HqpmtsrBeXh6h_oHIHn1lL_djy18CAWqDDMauq0VQw'
        }
      };
    
    const movies = await fetch(url, options)
      .then(res => res.json());
  
      return{
        paths: movies.results.map(post => ({
          params: {id:post.id.toString()}
      })),
      fallback: false,
      }
  }
  */