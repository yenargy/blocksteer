import React, { useEffect }  from 'react';
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components/macro';
import { BackButton, Bar, DataView } from '@aragon/ui';

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { fetchBlock } from '../actions';

// Components Imports
import Transaction from '../components/transaction';


function BlockDetails() {
  let { id } = useParams();
  let history = useHistory();

  const { block, blockTransactions, loading } = useSelector(state => ({
    block: state.block,
    blockTransactions: state.blockTransactions.list,
    loading: state.blockTransactions.loading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('calling fetch blocks');
    dispatch(fetchBlock(id));
  }, [dispatch, id])  

  function goBack() {
    history.push("/");
  }
  return (
    <div>
      <Bar primary={<BackButton onClick={() => goBack()} />} />
      <h2>Block Details</h2>
      {block.length !== 0 && 
        <DataView
          fields={['Block#', 'Hash', 'Gas Used', 'Timestamp']}
          entries={[{ 
              blockNum: block.number, 
              hash: block.hash,
              gasUsed: (block.gasUsed/block.gasLimit * 100).toFixed(2) + '%',
              timestamp: block.timestamp,
            }
          ]}
          renderEntry={({ blockNum, hash, gasUsed, timestamp }) => {
            return [
              <div>{blockNum}</div>, 
              <div>{hash}</div>,
              <div>{gasUsed}</div>,
              <div>{timestamp}</div>
            ]
          }}
        />
      }
      <h2>Transactions</h2>
      {!loading ? (
        <TransactionsContainer>
          {blockTransactions.map((transaction) =>
            <Transaction
              key={transaction.hash}
              from={transaction.from}
              to={transaction.to}
              value={transaction.value}
              txFee={transaction.txFee}
            />
          )}
        </TransactionsContainer>
      ) : ('Loading')}

    </div>
  );
}


const TransactionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default BlockDetails;
