import React from 'react';
import styled from 'styled-components/macro';
import { textStyle } from '@aragon/ui';

// Components Imports
import SmartAddress from './smartAddress';

function Transaction(props) {
  return (
    <TransactionRow>
      <p css={`${textStyle("address2")};`}>
        <span css={`${textStyle("label2")};`}>From: </span>
        <SmartAddress address={props.from}/>
      </p>
      {props.to ?
        <p css={`${textStyle("address2")};`}>
          <span css={`${textStyle("label2")};`}>To: </span>
          <SmartAddress address={props.to}/>
        </p> :
        <p css={`${textStyle("address2")};`}>
          <span css={`${textStyle("label2")};`}>Contract Creation: </span>
          <SmartAddress address={props.contractAddress}/>
        </p>
      }
      <p css={`${textStyle("address2")};`}>
        <span css={`${textStyle("label2")};`}>TxFee: </span>
        {props.txFee.toFixed(6)} ETH
      </p>
      <p css={`${textStyle("address2")};`}>
        <span css={`${textStyle("label2")};`}>Value: </span>
        {Number(props.value).toFixed(6)} ETH
      </p>
    </TransactionRow>
  );
}

const TransactionRow = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  border-radius: 4px;
  background: #FFFFFF;
  border-style: solid;
  border-color: #DDE4E9;
  border-width: 1px;
  margin-bottom: 8px;
  justify-content: space-between;
`;

export default Transaction;
