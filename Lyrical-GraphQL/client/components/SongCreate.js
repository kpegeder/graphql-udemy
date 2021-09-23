import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { FETCH_SONGS } from '../queries/fetchSongs';

const SongCreate = () => {
  const [addSong, { data }] = useMutation(ADD_SONG);
  const history = useHistory();
  const [songTitle, setSongTitle] = useState('');

  const submitNewSong = (e) => {
    e.preventDefault();
    addSong({
      variables: { title: songTitle },
      refetchQueries: [{ query: FETCH_SONGS }],
    })
      .then(() => {
        setSongTitle('');
        history.push('/');
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className='container'>
      <Link to='/'>Back</Link>
      <h3>Create a New Song</h3>
      <form className='form' onSubmit={submitNewSong}>
        <label>Song Title:</label>
        <input
          className='input'
          type='text'
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
      </form>
    </div>
  );
};

const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default SongCreate;
