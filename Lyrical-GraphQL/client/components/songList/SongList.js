import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { FETCH_SONGS } from '../../queries/fetchSongs';
import { Link } from 'react-router-dom';
import styles from './SongList.module.css';
const SongList = () => {
  const { loading, error, data } = useQuery(FETCH_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG);

  const onSongDelete = (songId) => {
    deleteSong({
      variables: { id: songId },
      refetchQueries: [{ query: FETCH_SONGS }],
    });
  };

  const renderSongs = () => {
    return data.songs.map(({ id, title }) => {
      return (
        <li key={id} className={styles.collectionItem}>
          <Link className={styles.collectionItem__link} to={`/songs/${id}`}>
            {title}
          </Link>
          <span onClick={() => onSongDelete(id)} className={styles.deleteSpan}>
            X
          </span>
        </li>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  return (
    <div className={styles.collection__container}>
      <ul className={styles.collection}>{renderSongs()}</ul>
      <Link to='/songs/new' className={styles.collection__link}>
        +
      </Link>
    </div>
  );
};

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default SongList;
