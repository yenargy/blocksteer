import React from 'react';
import styled from 'styled-components/macro';
import { textStyle, IconUser, IconCoin, IconFile } from '@aragon/ui';

// Components Imports
import SmartAddress from './smartAddress';

// Styles
import { BlockCard } from '../styles/Common';

const SUCCESS_COLOR = '#63CD90';
const ERROR_COLOR = '#EB5757';

function Transaction(props) {
  return (
    <TransactionRow>
      <StatusBar status={props.status ? SUCCESS_COLOR : ERROR_COLOR}/>

      <PaddedContainer>
        <TransferDetails>
          <TransactionItem>
            <IconUser size="small" />
            {/* <span css={`${textStyle("label2")};`}>From: </span> */}
            <SmartAddress address={props.from}/>
          </TransactionItem>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" css={`margin: 0 25px;`}>
            <path d="M7.75 0C12.0312 0 15.5 3.46875 15.5 7.75C15.5 12.0312 12.0312 15.5 7.75 15.5C3.46875 15.5 0 12.0312 0 7.75C0 3.46875 3.46875 0 7.75 0ZM4.125 9.125H7.75V11.3406C7.75 11.675 8.15625 11.8437 8.39062 11.6062L11.9625 8.01562C12.1094 7.86875 12.1094 7.63438 11.9625 7.4875L8.39062 3.89375C8.15313 3.65625 7.75 3.825 7.75 4.15938V6.375H4.125C3.91875 6.375 3.75 6.54375 3.75 6.75V8.75C3.75 8.95625 3.91875 9.125 4.125 9.125Z" fill="black"/>
          </svg>
          {props.to ?
            <TransactionItem>
              <IconUser size="small" />
              {/* <span css={`${textStyle("label2")};`}>To: </span> */}
              <SmartAddress address={props.to}/>
            </TransactionItem> :
            <TransactionItem>
              <IconFile size="small" />
              {/* <span css={`${textStyle("label2")};`}>Contract Creation: </span> */}
              <SmartAddress address={props.contractAddress}/>
            </TransactionItem>
          }
        </TransferDetails>

        <TransferValue>
          <TransactionItem css={`margin-right: 35px;`}>
            <IconCoin size="small" />
            {/* <span css={`${textStyle("label2")};`}>Value: </span> */}
            {Number(props.value).toFixed(6)} ETH
          </TransactionItem>
          <TransactionItem>
            <span css={`${textStyle("label2")}; opacity: 0.4; margin-right: 5px;`}>TxFee: </span>
            {props.txFee.toFixed(6)} ETH
          </TransactionItem>
        </TransferValue>
      </PaddedContainer>
    </TransactionRow>
  );
}

const TransactionRow = styled(BlockCard)`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const TransferDetails = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TransferValue = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  ${textStyle("address2")};

  svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`;

const StatusBar = styled.div`
  width: 10px;
  background: ${props => props.status || '#63CD90'};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
const PaddedContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 24px;
`;

export default Transaction;
