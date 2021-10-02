import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FETCH_SONGS } from "../queries/fetchSongs";
import { Link } from "react-router-dom";
import "../style/style.css";

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
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => onDeletSong(id)}>
            delete
          </i>
        </li>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      <h1>Song List</h1>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/create" className="btn-floating btn-large red right">
        <i className="material-icons ">add</i>
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
