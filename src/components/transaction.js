import React from 'react';
import styled from 'styled-components/macro';
// import moment from 'moment';
import { Card, textStyle, GU} from '@aragon/ui';

// Components Imports
import SmartAddress from './smartAddress';

function Transaction(props) {
  return (
    <TransactionRow>
    <p css={`${textStyle("address2")};`}>From: <SmartAddress address={props.from}/></p>
    <p css={`${textStyle("address2")};`}>to: <SmartAddress address={props.to}/></p>
    <p css={`${textStyle("label2")};`}>TxFee: {props.txFee}</p>
    <p css={`${textStyle("label2")};`}>Value: {props.value}</p>
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
