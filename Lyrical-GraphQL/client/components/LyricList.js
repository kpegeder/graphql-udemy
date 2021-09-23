import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
//import { TiThumbsUp } from 'react-icons/ti';

// import styles from './LyricList.module.css';

const LyricList = ({ lyrics }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onLike = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  };

  const renderLyrics = () => {
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id}>
          {content}
          <div>
            <span>
              <TiThumbsUp onClick={() => onLike(id, likes)} />
            </span>
            {likes}
          </div>
        </li>
      );
    });
  };

  return <ul>{renderLyrics()}</ul>;
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
