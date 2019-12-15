import React, { useEffect }  from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from "react-redux";
import { GU } from '@aragon/ui';

// Actions
import { fetchLatestBlocks } from '../actions';

// Components Imports
import Block from '../components/block';
import Transaction from '../components/transaction';
import Loader from '../components/loader';

function Home() {
  const { blocks, blocksLoading, blockTransactions, blockTransactionsLoading, showLatestBlocks } = useSelector(state => ({
    blocks: state.blocks.list,
    blocksLoading: state.blocks.loading,
    blockTransactions: state.blockTransactions.list,
    blockTransactionsLoading: state.blockTransactions.loading,
    showLatestBlocks: state.blocks.showLatestBlocks
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
    <BlocksContainer>
      {showLatestBlocks && (blocksLoading ?
        <LoaderContainer>
          <Loader text="Fetching latest Ethereum Blocks..." />
        </LoaderContainer>
        :
        <>
          {blocks.map((block) =>
            <Link to={`/block/${block.number}`} key={block.hash} css={`text-decoration: none; margin: ${2 * GU}px`}>
              <Block data={block}/>
            </Link>
          )}
        </>
      )}
      {!showLatestBlocks && (blockTransactionsLoading ?
        <LoaderContainer>
          <Loader css={`margin-top: 150px;`}  text="Fetching latest transactions..." />
        </LoaderContainer>
        :
        <div css={`padding-top: 50px; width: 100%;`}>
          {blockTransactions.map((transaction) =>
            <Transaction {...transaction} showBlockNumber key={transaction.hash}/>
          )}
        </div>
      )}
    </BlocksContainer>
  );
}

const BlocksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoaderContainer = styled.div`
  width: 100%;
  margin-top: 150px;
`

export default Home;
