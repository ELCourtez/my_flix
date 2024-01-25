import styles from '../styles/Home.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import getConfig from 'next/config'
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { stringify } from 'querystring';

export default function home({movies, genres}) {
  const { serverRuntimeConfig } = getConfig();

  movies.results.map(movie => (movie.poster_path === null) ? movie.poster_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" : movie.poster_path="https://image.tmdb.org/t/p/w500" + movie.poster_path );

  return (
    <>
      <Head>
        <title>Personnal Flix</title>
      </Head>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className='movies-block'>
            <div className="movies columns is-mobile is-multiline">
             {movies.results.map(
                movie => 
                <div key={movie.id} className="movie column is-one-fifth-desktop is-one-third-mobile p-0">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-3by6">
                      <Link href={`/movie/${movie.id}`}><img src={movie.poster_path}/></Link>
                      </figure>
                      </div>
                      <div className="card-content">
                      <div className="content">
                        <Link href={`/movie/${movie.id}`}><p className="title is-5 has-text-light">{movie.title}</p></Link>
                        <p className="subtitle is-6 has-text-grey">{movie.genre_ids.map((genre_id, index)=><span key={genre_id}> {(index ? ', ': '') + genres[genre_id]}</span>)}</p>
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
  );
}

export async function getStaticProps(){

  var movies='';

    async function getMoviesFromFiles() {
      const filenames = await fs.readdir('./public/movies')
      .then(res => res);
      var element = '{ "results": [';
      for (const filename of filenames) {
          const movie_filename = path.parse(filename).name;
          const url = `https://api.themoviedb.org/3/search/movie?query=` + movie_filename + `&include_adult=false&language=fr-FR&page=1`;
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTlkZTFkYWRiNjM2ODFiMzM1N2MyZGM0YmM1MWNhNCIsInN1YiI6IjY0MmU3ZmZkMTU4Yzg1MDBlMGI4NWY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7HqpmtsrBeXh6h_oHIHn1lL_djy18CAWqDDMauq0VQw'
            }
          }; 
          const movie = await fetch(url, options)
            .then(res => res.json());
          element = element + JSON.stringify(movie.results[0]);
          if((filenames.length - 1 )!=filenames.indexOf(filename))
          {
            element = element + ',';
          }
      }
      element = element + "]}";
      return element;
    }

  movies = JSON.parse(await getMoviesFromFiles());

  const genres_file= await fs.readFile(`${process.cwd()}/public/genres_fr.json`, 'utf8');
  const genre_json=JSON.parse(genres_file);
  
  const genres = new Array();

  genre_json['genres'].forEach(item => {
    genres[item.id]=item.name;
  });

    return{
      props: {
        movies,
        genres
      },
      revalidate:300
    }
}