import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { FETCH_SINGLE_SONG } from "../queries/fetchSingleSong";

// COMPONENTS
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

// import styles from './SongDetail.module.css';

const SongDetails = () => {
  const { id } = useParams();

  const { loading, error, data, refetch } = useQuery(FETCH_SINGLE_SONG, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error...</p>;

  const { song } = data;
  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={song.id} refetch={refetch} />
    </div>
  );
};

export default SongDetails;
