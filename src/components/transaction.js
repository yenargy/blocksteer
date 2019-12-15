import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from "react-router-dom";
import { textStyle, IconUser, IconCoin, IconFile, IconBlock, ToastHub, Toast } from '@aragon/ui';

// Components Imports
import SmartAddress from './smartAddress';

// Styles
import { BlockCard, hoverBg, success, error } from '../styles/Common';

// Utils
import { copyTextToClipboard } from '../utils';

function Transaction(props) {
  return (
    <TransactionRow>
      <StatusBar status={props.status ? success : error}/>

      <PaddedContainer>
        <TransferDetails>
          {props.showBlockNumber && 
            <BlockLink to={`/block/${props.blockNumber}`}>
              <TransactionItem css={`margin-right: 35px;`} hoverEnabled>
                <IconBlock size="small" css={`opacity: 0.6;`} />
                {props.blockNumber}
              </TransactionItem>
            </BlockLink>
          }
          <ToastHub timeout={500}>
            <Toast>
              {toast => (
                <TransactionItem 
                  hoverEnabled
                  onClick={() => copyTextToClipboard(props.from) ? toast("From address copied to clipboard") : toast("Failed to copy the block hash. Please try again.")}>
                  <IconUser size="small" css={`opacity: 0.6;`} />
                  <SmartAddress address={props.from}/>
                </TransactionItem>
              )}
            </Toast>
          </ToastHub>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" css={`margin: 0 25px; opacity: 0.5;`}>
            <path d="M7.75 0C12.0312 0 15.5 3.46875 15.5 7.75C15.5 12.0312 12.0312 15.5 7.75 15.5C3.46875 15.5 0 12.0312 0 7.75C0 3.46875 3.46875 0 7.75 0ZM4.125 9.125H7.75V11.3406C7.75 11.675 8.15625 11.8437 8.39062 11.6062L11.9625 8.01562C12.1094 7.86875 12.1094 7.63438 11.9625 7.4875L8.39062 3.89375C8.15313 3.65625 7.75 3.825 7.75 4.15938V6.375H4.125C3.91875 6.375 3.75 6.54375 3.75 6.75V8.75C3.75 8.95625 3.91875 9.125 4.125 9.125Z" fill="black"/>
          </svg>
          <ToastHub timeout={500}>
            <Toast>
              {toast => (
                <TransactionItem 
                  hoverEnabled
                  onClick={() => copyTextToClipboard(props.to ? props.to : props.contractAddress) ? toast("Contract address copied to clipboard") : toast("Failed to copy the block hash. Please try again.")}>
                  {props.input === '0x' ?
                    <IconUser size="small" css={`opacity: 0.6;`} />
                    :
                    <IconFile size="small" css={`opacity: 0.6;`} />
                  }
                  <SmartAddress address={props.to ? props.to : props.contractAddress}/>
                </TransactionItem>
              )}
            </Toast>
          </ToastHub>
        </TransferDetails>

        <TransferValue>
          <TransactionItem css={`margin-right: 35px;`}>
            <IconCoin size="small" css={`opacity: 0.6;`} />
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

const BlockLink = styled(Link)`
  text-decoration: none;
  margin-right: 25px;
  cursor: pointer;
`;

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
  cursor: ${props => props.hoverEnabled ? 'pointer' : 'default'};
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
  opacity: 0.8;

  ${props => props.hoverEnabled && css`
    &:hover {
      background-color: ${hoverBg};
    }
  `};

  svg {
    margin-right: 5px;
    margin-bottom: 2px;
  }
`;

const StatusBar = styled.div`
  width: 10px;
  background: ${props => props.status || success};
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
