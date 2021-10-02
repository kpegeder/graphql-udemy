import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { TiThumbsUp } from "react-icons/ti";

import "../style/style.css";

const LyricList = ({ lyrics }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onLike = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };

  console.log(lyrics);

  const renderLyrics = () => {
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li
          key={id}
          className="collection-item"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => onLike(id, likes)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  };

  return <ul className="collection">{renderLyrics()}</ul>;
};

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default LyricList;
