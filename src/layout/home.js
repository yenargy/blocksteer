import React, { useEffect }  from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from "react-redux";
import { FloatIndicator } from '@aragon/ui';

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
    dispatch(fetchLatestBlocks());
  }, [dispatch])  

  return (
    <>
      {blocks.length === 0 && <FloatIndicator>Fetching latest Ethereum Blocks...</FloatIndicator>}
      <BlocksContainer>
        {blocks.map((block) =>
          <Link to={`/block/${block.number}`} key={block.hash}>
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
`;

export default Home;
