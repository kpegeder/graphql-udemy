import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LyricCreate = (props) => {
  const [lyric, setLyric] = useState("");
  const [addLyricToSong] = useMutation(ADD_LYRIC);

  function handleSubmit(e) {
    e.preventDefault();
    addLyricToSong({
      variables: { songId: props.songId, content: lyric },
    }).then(() => setLyric(""));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add a Lyric</label>
        <input value={lyric} onChange={(e) => setLyric(e.target.value)} />
      </form>
    </div>
  );
};

const ADD_LYRIC = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default LyricCreate;
