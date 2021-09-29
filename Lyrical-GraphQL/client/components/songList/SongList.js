import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FETCH_SONGS } from "../../queries/fetchSongs";
import { Link } from "react-router-dom";
import "./SongList.module.css";

const SongList = () => {
  const { loading, error, data } = useQuery(FETCH_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG);
  console.log(useMutation(DELETE_SONG), deleteSong);

  const onSongDelete = (songId) => {
    deleteSong({
      variables: { id: songId },
      refetchQueries: [{ query: FETCH_SONGS }],
    });
  };

  const renderSongs = () => {
    return data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collectionItem">
          <Link className="collectionItem__link" to={`/songs/${id}`}>
            {title}
          </Link>
          <span onClick={() => onSongDelete(id)} className="deleteSpan">
            X
          </span>
        </li>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="collection__container container">
      <h1>Song List</h1>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="collection__link">
        Add Song
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
