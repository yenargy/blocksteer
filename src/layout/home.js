import React, { useEffect }  from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from "react-redux";
import { SyncIndicator , GU } from '@aragon/ui';

// Actions
import { fetchLatestBlocks } from '../actions';

// Components Imports
import Block from '../components/block';

function Home() {
  const { blocks } = useSelector(state => ({
    blocks: state.blocks,
  }));
  const dispatch = useDispatch();
 
  useEffect(() => {
    console.log('calling fetch blocks');
    if (blocks.length > 0) {
      console.log('exiting call hook');
      return;
    }
    dispatch(fetchLatestBlocks());
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <>
      {blocks.length === 0 && <SyncIndicator label="Fetching latest Ethereum Blocks..." />}
      <BlocksContainer>
        {blocks.map((block) =>
          <Link to={`/block/${block.number}`} key={block.hash} css={`text-decoration: none; margin: ${2 * GU}px`}>
            <Block data={block}/>
          </Link>
        )}
      </BlocksContainer>
    </>
  );
}

const BlocksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Home;
