import React, { useEffect }  from 'react';
import { useParams, useHistory } from "react-router-dom";
// import styled from 'styled-components/macro';
import { BackButton, Bar, DataView } from '@aragon/ui';

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { fetchBlock } from '../actions';


function BlockDetails() {
  let { id } = useParams();
  let history = useHistory();

  const { block } = useSelector(state => ({
    block: state.block,
  }));
  const dispatch = useDispatch();
 
  useEffect(() => {
    console.log('calling fetch blocks');
    dispatch(fetchBlock(id));
  }, [dispatch, id])  

  function goBack() {
    history.push("/");
  }
  console.log(block);
  return (
    <div>
      <Bar primary={<BackButton onClick={() => goBack()} />} />
      {block.length !== 0 && 
        <DataView
          fields={['Block#', 'Hash', 'Gas Used', 'Timestamp']}
          entries={[{ 
              blockNum: block.number, 
              hash: block.hash,
              gasUsed: block.gasUsed,
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

    </div>
  );
}

export default BlockDetails;
