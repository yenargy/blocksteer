import React, { useEffect }  from 'react';
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components/macro';
import { IconArrowLeft, textStyle, ToastHub, Toast, useViewport} from '@aragon/ui';
import moment from 'moment';

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { fetchBlock } from '../actions';

// Components Imports
import Transaction from '../components/transaction';
import Loader from '../components/loader';
import SmartAddress from '../components/smartAddress';

// Utils
import { copyTextToClipboard } from '../utils';

// Styles
import { BlockCard, hoverBg } from '../styles/Common';


function BlockDetails() {
  let { id } = useParams();
  let history = useHistory();
  const { below } = useViewport();

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

  // Function to ge ot previous state using react router
  function goBack() {
    history.push("/");
  }

  return (
    <BlockDetailsContainer>
      <BackButton onClick={() => goBack()}>
        <IconArrowLeft css={`margin-right: 5px;`} size="small" />
        <p css={`${textStyle("label2")};`}>Go Back</p>
      </BackButton>
      <BlockDetailsCard>
        <h1 css={`${textStyle("title1")};`}>Block #{block.number}</h1>
        <BlockMetaDetailsContainer>
          <BlockMetaDetails>
            <svg width="12" height="12" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.20646 12.2732C2.26106 9.62381 3.33933 7.09847 5.21516 5.22671C6.15992 4.28195 7.25875 3.53777 8.48258 3.02033C9.75002 2.48545 11.0959 2.2122 12.4826 2.2122C13.8721 2.2122 15.218 2.48254 16.4825 3.02033C17.7064 3.53777 18.8052 4.28195 19.75 5.22671C20.0407 5.51741 20.311 5.82264 20.561 6.1395L19.1075 7.27612C19.0729 7.30291 19.0465 7.33892 19.0315 7.38002C19.0164 7.42112 19.0132 7.46564 19.0223 7.50846C19.0315 7.55128 19.0525 7.59065 19.083 7.62206C19.1135 7.65347 19.1522 7.67563 19.1947 7.686L23.7528 8.79937C23.8982 8.83425 24.0406 8.72379 24.0406 8.57553L24.0639 3.88079C24.0639 3.68603 23.8401 3.57556 23.6889 3.69765L22.2994 4.78486C20.0203 1.86918 16.4709 0 12.4855 0C5.66864 0 0.125072 5.46799 7.26914e-05 12.2616C-0.000703191 12.2926 0.00473872 12.3234 0.0160779 12.3523C0.0274171 12.3812 0.0444241 12.4076 0.0660967 12.4298C0.0877694 12.452 0.113669 12.4696 0.14227 12.4817C0.170871 12.4937 0.201594 12.4999 0.232629 12.4999H1.97681C2.1018 12.4999 2.20355 12.3982 2.20646 12.2732ZM24.7674 12.4999H23.0232C22.8982 12.4999 22.7935 12.6017 22.7906 12.7267C22.736 15.376 21.6578 17.9014 19.7819 19.7731C18.8458 20.7131 17.7362 21.4625 16.5145 21.9795C15.2471 22.5144 13.9012 22.7877 12.5145 22.7877C11.1279 22.7877 9.77909 22.5173 8.51456 21.9795C7.29289 21.4625 6.18322 20.7131 5.24714 19.7731C4.95644 19.4824 4.68609 19.1772 4.43609 18.8604L5.88667 17.7237C5.92129 17.6969 5.94765 17.6609 5.96272 17.6198C5.97779 17.5787 5.98095 17.5342 5.97184 17.4914C5.96273 17.4486 5.94172 17.4092 5.91122 17.3778C5.88073 17.3464 5.84199 17.3242 5.79946 17.3139L1.24134 16.2005C1.096 16.1656 0.953556 16.2761 0.953556 16.4243L0.9303 21.1249C0.9303 21.3196 1.15414 21.4301 1.3053 21.308L2.69482 20.2208C4.97969 23.1307 8.52909 24.9999 12.5145 24.9999C19.3314 24.9999 24.8749 19.5319 24.9999 12.7383C25.0007 12.7073 24.9953 12.6764 24.9839 12.6475C24.9726 12.6186 24.9556 12.5923 24.9339 12.5701C24.9122 12.5479 24.8863 12.5302 24.8577 12.5182C24.8291 12.5061 24.7984 12.4999 24.7674 12.4999Z" fill="black"/>
              <path d="M7.84314 17.6155C7.84314 17.015 8.32991 16.5283 8.93037 16.5283H15.8057C16.4061 16.5283 16.8929 17.015 16.8929 17.6155V17.6155C16.8929 18.216 16.4061 18.7027 15.8057 18.7027H8.93037C8.32991 18.7027 7.84314 18.216 7.84314 17.6155V17.6155ZM8.79626 12.6205C8.79626 12.0181 9.28462 11.5297 9.88705 11.5297H14.7606C15.363 11.5297 15.8513 12.0181 15.8513 12.6205V12.6205C15.8513 13.2229 15.363 13.7113 14.7606 13.7113H9.88705C9.28462 13.7113 8.79626 13.2229 8.79626 12.6205V12.6205ZM7.96105 7.73235C7.96105 7.12707 8.45173 6.6364 9.05701 6.6364H15.5218C16.1271 6.6364 16.6178 7.12707 16.6178 7.73235V7.73235C16.6178 8.33763 16.1271 8.8283 15.5218 8.8283H9.05701C8.45173 8.8283 7.96105 8.33763 7.96105 7.73235V7.73235Z" fill="black"/>
            </svg>
            <p>{block.transactions && block.transactions.length}  Transactions</p>
          </BlockMetaDetails>
          <BlockMetaDetails>
            <svg width="12" height="12" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2812 23H19.4062C19.2116 23 19.0431 22.9289 18.9009 22.7866C18.7586 22.6444 18.6875 22.4759 18.6875 22.2812V20.8438C18.6875 20.6491 18.7586 20.4806 18.9009 20.3384C19.0431 20.1961 19.2116 20.125 19.4062 20.125H20.125V19.4062C20.125 19.2116 20.1961 19.0431 20.3384 18.9009C20.4806 18.7586 20.6491 18.6875 20.8438 18.6875H22.2812C22.4759 18.6875 22.6444 18.7586 22.7866 18.9009C22.9289 19.0431 23 19.2116 23 19.4062V22.2812C23 22.4759 22.9289 22.6444 22.7866 22.7866C22.6444 22.9289 22.4759 23 22.2812 23ZM22.2812 17.25H20.8438C20.6491 17.25 20.4806 17.1789 20.3384 17.0366C20.1961 16.8944 20.125 16.7259 20.125 16.5312V15.0938C20.125 14.8991 20.1961 14.7306 20.3384 14.5884C20.4806 14.4461 20.6491 14.375 20.8438 14.375H22.2812C22.4759 14.375 22.6444 14.4461 22.7866 14.5884C22.9289 14.7306 23 14.8991 23 15.0938V16.5312C23 16.7259 22.9289 16.8944 22.7866 17.0366C22.6444 17.1789 22.4759 17.25 22.2812 17.25ZM22.2812 12.9375H20.8438C20.6491 12.9375 20.4806 12.8664 20.3384 12.7241C20.1961 12.5819 20.125 12.4134 20.125 12.2188V10.7812C20.125 10.5866 20.1961 10.4181 20.3384 10.2759C20.4806 10.1336 20.6491 10.0625 20.8438 10.0625H22.2812C22.4759 10.0625 22.6444 10.1336 22.7866 10.2759C22.9289 10.4181 23 10.5866 23 10.7812V12.2188C23 12.4134 22.9289 12.5819 22.7866 12.7241C22.6444 12.8664 22.4759 12.9375 22.2812 12.9375ZM22.2812 8.625H20.8438C20.6491 8.625 20.4806 8.55387 20.3384 8.41162C20.1961 8.26937 20.125 8.10091 20.125 7.90625V6.46875C20.125 6.27409 20.1961 6.10563 20.3384 5.96338C20.4806 5.82113 20.6491 5.75 20.8438 5.75H22.2812C22.4759 5.75 22.6444 5.82113 22.7866 5.96338C22.9289 6.10563 23 6.27409 23 6.46875V7.90625C23 8.10091 22.9289 8.26937 22.7866 8.41162C22.6444 8.55387 22.4759 8.625 22.2812 8.625ZM22.2812 4.3125H20.8438C20.6491 4.3125 20.4806 4.24137 20.3384 4.09912C20.1961 3.95687 20.125 3.78841 20.125 3.59375V2.875H19.4062C19.2116 2.875 19.0431 2.80387 18.9009 2.66162C18.7586 2.51937 18.6875 2.35091 18.6875 2.15625V0.71875C18.6875 0.524089 18.7586 0.355632 18.9009 0.213379C19.0431 0.0711263 19.2116 0 19.4062 0H22.2812C22.4759 0 22.6444 0.0711263 22.7866 0.213379C22.9289 0.355632 23 0.524089 23 0.71875V3.59375C23 3.78841 22.9289 3.95687 22.7866 4.09912C22.6444 4.24137 22.4759 4.3125 22.2812 4.3125ZM16.5312 23H15.0938C14.8991 23 14.7306 22.9289 14.5884 22.7866C14.4461 22.6444 14.375 22.4759 14.375 22.2812V20.8438C14.375 20.6491 14.4461 20.4806 14.5884 20.3384C14.7306 20.1961 14.8991 20.125 15.0938 20.125H16.5312C16.7259 20.125 16.8944 20.1961 17.0366 20.3384C17.1789 20.4806 17.25 20.6491 17.25 20.8438V22.2812C17.25 22.4759 17.1789 22.6444 17.0366 22.7866C16.8944 22.9289 16.7259 23 16.5312 23ZM16.5312 2.875H15.0938C14.8991 2.875 14.7306 2.80387 14.5884 2.66162C14.4461 2.51937 14.375 2.35091 14.375 2.15625V0.71875C14.375 0.524089 14.4461 0.355632 14.5884 0.213379C14.7306 0.0711263 14.8991 0 15.0938 0H16.5312C16.7259 0 16.8944 0.0711263 17.0366 0.213379C17.1789 0.355632 17.25 0.524089 17.25 0.71875V2.15625C17.25 2.35091 17.1789 2.51937 17.0366 2.66162C16.8944 2.80387 16.7259 2.875 16.5312 2.875ZM12.2188 23H10.7812C10.5866 23 10.4181 22.9289 10.2759 22.7866C10.1336 22.6444 10.0625 22.4759 10.0625 22.2812V20.8438C10.0625 20.6491 10.1336 20.4806 10.2759 20.3384C10.4181 20.1961 10.5866 20.125 10.7812 20.125H12.2188C12.4134 20.125 12.5819 20.1961 12.7241 20.3384C12.8664 20.4806 12.9375 20.6491 12.9375 20.8438V22.2812C12.9375 22.4759 12.8664 22.6444 12.7241 22.7866C12.5819 22.9289 12.4134 23 12.2188 23ZM12.2188 12.9375H0.71875C0.524089 12.9375 0.355632 12.8664 0.213379 12.7241C0.0711263 12.5819 0 12.4134 0 12.2188V0.71875C0 0.524089 0.0711263 0.355632 0.213379 0.213379C0.355632 0.0711263 0.524089 0 0.71875 0H12.2188C12.4134 0 12.5819 0.0711263 12.7241 0.213379C12.8664 0.355632 12.9375 0.524089 12.9375 0.71875V12.2188C12.9375 12.4134 12.8664 12.5819 12.7241 12.7241C12.5819 12.8664 12.4134 12.9375 12.2188 12.9375ZM0.71875 14.375H2.15625C2.35091 14.375 2.51937 14.4461 2.66162 14.5884C2.80387 14.7306 2.875 14.8991 2.875 15.0938V16.5312C2.875 16.7259 2.80387 16.8944 2.66162 17.0366C2.51937 17.1789 2.35091 17.25 2.15625 17.25H0.71875C0.524089 17.25 0.355632 17.1789 0.213379 17.0366C0.0711263 16.8944 0 16.7259 0 16.5312V15.0938C0 14.8991 0.0711263 14.7306 0.213379 14.5884C0.355632 14.4461 0.524089 14.375 0.71875 14.375ZM0.71875 18.6875H2.15625C2.35091 18.6875 2.51937 18.7586 2.66162 18.9009C2.80387 19.0431 2.875 19.2116 2.875 19.4062V20.125H3.59375C3.78841 20.125 3.95687 20.1961 4.09912 20.3384C4.24137 20.4806 4.3125 20.6491 4.3125 20.8438V22.2812C4.3125 22.4759 4.24137 22.6444 4.09912 22.7866C3.95687 22.9289 3.78841 23 3.59375 23H0.71875C0.524089 23 0.355632 22.9289 0.213379 22.7866C0.0711263 22.6444 0 22.4759 0 22.2812V19.4062C0 19.2116 0.0711263 19.0431 0.213379 18.9009C0.355632 18.7586 0.524089 18.6875 0.71875 18.6875ZM6.46875 20.125H7.90625C8.10091 20.125 8.26937 20.1961 8.41162 20.3384C8.55387 20.4806 8.625 20.6491 8.625 20.8438V22.2812C8.625 22.4759 8.55387 22.6444 8.41162 22.7866C8.26937 22.9289 8.10091 23 7.90625 23H6.46875C6.27409 23 6.10563 22.9289 5.96338 22.7866C5.82113 22.6444 5.75 22.4759 5.75 22.2812V20.8438C5.75 20.6491 5.82113 20.4806 5.96338 20.3384C6.10563 20.1961 6.27409 20.125 6.46875 20.125Z" fill="black"/>
            </svg>
            <p>{block.size}  bytes</p>
          </BlockMetaDetails>
          <BlockMetaDetails>
            <svg width="12" height="12" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.339 3.66097C20.181 2.49657 18.8035 1.57345 17.2863 0.945051C15.769 0.316649 14.1422 -0.00455038 12.5 4.86981e-05C10.8578 -0.00446409 9.23102 0.316774 7.7138 0.945171C6.19658 1.57357 4.81906 2.49664 3.66097 3.66097C2.49664 4.81906 1.57357 6.19658 0.94517 7.7138C0.316773 9.23102 -0.00446589 10.8578 4.68945e-05 12.5C4.68945e-05 15.8391 1.30004 18.9781 3.66097 21.339C4.81906 22.5034 6.19658 23.4264 7.7138 24.0548C9.23102 24.6832 10.8578 25.0045 12.5 25C14.1422 25.0045 15.769 24.6832 17.2862 24.0548C18.8034 23.4264 20.1809 22.5034 21.339 21.339C22.5034 20.1809 23.4264 18.8034 24.0548 17.2862C24.6832 15.769 25.0045 14.1422 25 12.5C25.0045 10.8578 24.6832 9.23102 24.0548 7.7138C23.4264 6.19658 22.5034 4.81906 21.339 3.66097ZM12.5 22.9797C9.72164 22.9763 7.05802 21.8712 5.09342 19.9066C3.12883 17.942 2.02366 15.2784 2.02035 12.5C2.02366 9.72164 3.12883 7.05802 5.09342 5.09343C7.05802 3.12883 9.72164 2.02366 12.5 2.02035C15.2784 2.02366 17.942 3.12883 19.9066 5.09343C21.8712 7.05802 22.9763 9.72164 22.9797 12.5C22.9763 15.2784 21.8712 17.942 19.9066 19.9066C17.942 21.8712 15.2784 22.9763 12.5 22.9797Z" fill="black"/>
              <path d="M16.6609 15.2344L13.5093 12.0813V5.60628C13.5093 5.33857 13.403 5.08184 13.2137 4.89254C13.0244 4.70325 12.7677 4.59691 12.5 4.59691C12.2323 4.59691 11.9755 4.70325 11.7862 4.89254C11.5969 5.08184 11.4906 5.33857 11.4906 5.60628V12.5C11.4906 12.7672 11.5969 13.025 11.7859 13.2141L15.2328 16.6609C15.3263 16.7551 15.4376 16.8299 15.5601 16.8809C15.6827 16.9319 15.8141 16.9582 15.9468 16.9582C16.0796 16.9582 16.211 16.9319 16.3336 16.8809C16.4561 16.8299 16.5674 16.7551 16.6609 16.6609C16.7547 16.5672 16.8292 16.4559 16.8799 16.3333C16.9307 16.2108 16.9569 16.0795 16.9569 15.9469C16.9569 15.8142 16.9307 15.6829 16.8799 15.5604C16.8292 15.4379 16.7547 15.3265 16.6609 15.2328V15.2344Z" fill="black"/>
            </svg>
            <p>{moment.unix(block.timestamp).format('DD/MM/YYYY hh:mm a')}</p>
          </BlockMetaDetails>
        </BlockMetaDetailsContainer>
        <Divider />
        <BlockMoreDetails css={`margin-bottom: 25px;`} hoverEnabled>
          <label>Hash</label>
          <ToastHub timeout={500}>
            <Toast>
              {toast => (
                below('large') ?
                <Hash onClick={() => copyTextToClipboard(block.hash) ? toast("Block Hash copied to clipboard") : toast("Failed to copy the block hash. Please try again.")}>
                  {block.hash && <SmartAddress address={block.hash}/>}
                </Hash>
                :
                <Hash onClick={() => copyTextToClipboard(block.hash) ? toast("Block Hash copied to clipboard") : toast("Failed to copy the block hash. Please try again.")}>{block.hash}</Hash>
              )}
            </Toast>
          </ToastHub>
        </BlockMoreDetails>
        <BlockMoreDetails css={`margin-bottom: 25px;`} hoverEnabled>
          <label>Mined By</label>
          <ToastHub timeout={500}>
            <Toast>
              {toast => (
                below('large') ?
                <Hash onClick={() => copyTextToClipboard(block.miner) ? toast("Miner address copied to clipboard") : toast("Failed to copy the miner address. Please try again.")}>
                  {block.miner && <SmartAddress address={block.miner}/>}
                </Hash>
                :
                <Hash onClick={() => copyTextToClipboard(block.miner) ? toast("Miner address copied to clipboard") : toast("Failed to copy the miner address. Please try again.")}>{block.miner}</Hash>
              )}
            </Toast>
          </ToastHub>
        </BlockMoreDetails>
        <BlockMoreDetails>
          <label>Gas Used</label>
          <p css={`padding: 5px;`}>{(block.gasUsed/block.gasLimit * 100).toFixed(2) + '%'}</p>
        </BlockMoreDetails>
      </BlockDetailsCard>

      <TransactionsHeader>
        <svg width="23" height="23" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.20646 12.2732C2.26106 9.62381 3.33933 7.09847 5.21516 5.22671C6.15992 4.28195 7.25875 3.53777 8.48258 3.02033C9.75002 2.48545 11.0959 2.2122 12.4826 2.2122C13.8721 2.2122 15.218 2.48254 16.4825 3.02033C17.7064 3.53777 18.8052 4.28195 19.75 5.22671C20.0407 5.51741 20.311 5.82264 20.561 6.1395L19.1075 7.27612C19.0729 7.30291 19.0465 7.33892 19.0315 7.38002C19.0164 7.42112 19.0132 7.46564 19.0223 7.50846C19.0315 7.55128 19.0525 7.59065 19.083 7.62206C19.1135 7.65347 19.1522 7.67563 19.1947 7.686L23.7528 8.79937C23.8982 8.83425 24.0406 8.72379 24.0406 8.57553L24.0639 3.88079C24.0639 3.68603 23.8401 3.57556 23.6889 3.69765L22.2994 4.78486C20.0203 1.86918 16.4709 0 12.4855 0C5.66864 0 0.125072 5.46799 7.26914e-05 12.2616C-0.000703191 12.2926 0.00473872 12.3234 0.0160779 12.3523C0.0274171 12.3812 0.0444241 12.4076 0.0660967 12.4298C0.0877694 12.452 0.113669 12.4696 0.14227 12.4817C0.170871 12.4937 0.201594 12.4999 0.232629 12.4999H1.97681C2.1018 12.4999 2.20355 12.3982 2.20646 12.2732ZM24.7674 12.4999H23.0232C22.8982 12.4999 22.7935 12.6017 22.7906 12.7267C22.736 15.376 21.6578 17.9014 19.7819 19.7731C18.8458 20.7131 17.7362 21.4625 16.5145 21.9795C15.2471 22.5144 13.9012 22.7877 12.5145 22.7877C11.1279 22.7877 9.77909 22.5173 8.51456 21.9795C7.29289 21.4625 6.18322 20.7131 5.24714 19.7731C4.95644 19.4824 4.68609 19.1772 4.43609 18.8604L5.88667 17.7237C5.92129 17.6969 5.94765 17.6609 5.96272 17.6198C5.97779 17.5787 5.98095 17.5342 5.97184 17.4914C5.96273 17.4486 5.94172 17.4092 5.91122 17.3778C5.88073 17.3464 5.84199 17.3242 5.79946 17.3139L1.24134 16.2005C1.096 16.1656 0.953556 16.2761 0.953556 16.4243L0.9303 21.1249C0.9303 21.3196 1.15414 21.4301 1.3053 21.308L2.69482 20.2208C4.97969 23.1307 8.52909 24.9999 12.5145 24.9999C19.3314 24.9999 24.8749 19.5319 24.9999 12.7383C25.0007 12.7073 24.9953 12.6764 24.9839 12.6475C24.9726 12.6186 24.9556 12.5923 24.9339 12.5701C24.9122 12.5479 24.8863 12.5302 24.8577 12.5182C24.8291 12.5061 24.7984 12.4999 24.7674 12.4999Z" fill="black"/>
          <path d="M7.84314 17.6155C7.84314 17.015 8.32991 16.5283 8.93037 16.5283H15.8057C16.4061 16.5283 16.8929 17.015 16.8929 17.6155V17.6155C16.8929 18.216 16.4061 18.7027 15.8057 18.7027H8.93037C8.32991 18.7027 7.84314 18.216 7.84314 17.6155V17.6155ZM8.79626 12.6205C8.79626 12.0181 9.28462 11.5297 9.88705 11.5297H14.7606C15.363 11.5297 15.8513 12.0181 15.8513 12.6205V12.6205C15.8513 13.2229 15.363 13.7113 14.7606 13.7113H9.88705C9.28462 13.7113 8.79626 13.2229 8.79626 12.6205V12.6205ZM7.96105 7.73235C7.96105 7.12707 8.45173 6.6364 9.05701 6.6364H15.5218C16.1271 6.6364 16.6178 7.12707 16.6178 7.73235V7.73235C16.6178 8.33763 16.1271 8.8283 15.5218 8.8283H9.05701C8.45173 8.8283 7.96105 8.33763 7.96105 7.73235V7.73235Z" fill="black"/>
        </svg>
        <h1 css={`${textStyle("title2")};`}>Transactions</h1>
      </TransactionsHeader>
      {!loading ? (
        blockTransactions.length > 0 ?
        <TransactionsContainer>
          {blockTransactions.map((transaction) =>
            <Transaction {...transaction} key={transaction.hash}/>
          )}
        </TransactionsContainer> 
        :
        <EmptyTransactions>
          <svg width="134" height="144" viewBox="0 0 134 144" fill="none" xmlns="http://www.w3.org/2000/svg" css={`margin-bottom: 25px;`}>
            <path d="M63.9083 85C63.9083 85 62.733 126.921 32.351 137.802C1.96902 148.683 9.45653 118.207 17.7068 121.301C25.9571 124.395 22.657 130.376 18.5318 134.089C14.4067 137.802 1 128.52 1 128.52" stroke="#A7B6BA" strokeWidth="1.10875" strokeLinecap="round" strokeDasharray="2.22 3.33"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M124.684 17.9676C123.749 17.2623 123.561 15.9304 124.267 14.9945C124.972 14.0586 126.304 13.8714 127.24 14.5767C128.176 15.282 128.363 16.614 127.658 17.5499C126.952 18.4858 125.62 18.6728 124.684 17.9676Z" fill="#F5A623"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M122.639 9.58741C123.049 9.89621 122.482 11.3405 121.372 12.8134C120.262 14.2863 119.03 15.2296 118.62 14.9208C118.322 14.7589 118.03 14.5692 117.746 14.3545C117.46 14.1395 117.197 13.911 116.954 13.6729C117.371 13.9693 118.599 13.0267 119.706 11.558C120.813 10.0892 121.379 8.64936 120.977 8.33469C121.276 8.49715 121.569 8.68757 121.854 8.90251C122.138 9.11648 122.401 9.34506 122.643 9.58251C122.404 9.40694 122.403 9.409 122.639 9.58741Z" fill="#F5A623"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M120.862 15.7208C121.354 15.7803 122.264 15.112 123.046 14.0744C123.827 13.0369 124.219 11.9783 124.021 11.5289C124.566 12.7122 124.581 13.9064 123.944 14.7515C123.308 15.5956 122.155 15.9117 120.862 15.7208Z" fill="#F5A623"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M118.891 7.60105C119.302 7.91083 118.916 9.11633 118.029 10.2939C117.141 11.4715 116.089 12.1744 115.678 11.8646C115.629 11.8281 115.593 11.7802 115.566 11.7217L115.551 11.6851C115.034 10.5121 115.028 9.33898 115.655 8.507C116.282 7.67476 117.411 7.35698 118.681 7.53037L118.721 7.53498C118.786 7.54288 118.842 7.56451 118.891 7.60105Z" fill="#F5A623"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M120.195 20.1732L120.174 20.2014C120.102 20.2952 120.024 20.3864 119.938 20.4722C119.657 20.756 119.309 20.984 118.909 21.1294C117.456 21.6579 115.85 20.9089 115.321 19.4556C114.793 18.0024 115.542 16.3965 116.995 15.868C117.396 15.7223 117.808 15.6735 118.206 15.7094C118.326 15.7205 118.444 15.7389 118.561 15.765L118.596 15.7727L122.792 16.7378L120.195 20.1732Z" fill="#FFD927"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M128.122 9.65327L128.143 9.62516C128.214 9.52974 128.28 9.42959 128.339 9.32399C128.534 8.9749 128.657 8.57928 128.687 8.15373C128.794 6.61078 127.632 5.27375 126.089 5.16614C124.547 5.05872 123.209 6.22111 123.102 7.76406C123.072 8.18884 123.139 8.5991 123.283 8.97176C123.327 9.08347 123.377 9.1926 123.434 9.2971L123.452 9.32801L125.536 13.0957L128.122 9.65327Z" fill="#FFD927"/>
            <g filter="url(#filter0_di)">
            <path d="M55.8628 31.6079C55.8628 28.5107 58.0371 27.2554 60.7193 28.8039L97.1434 49.8334C99.8256 51.3819 102 55.148 102 58.2451L102 100.304C102 103.401 99.8256 104.657 97.1434 103.108L80.3366 93.4046C79.4186 92.8745 78.5194 92.6558 77.7432 92.7738L63.3127 94.9662C60.0789 95.4576 55.8628 90.3402 55.8628 85.9237L55.8628 31.6079Z" fill="white"/>
            </g>
            <g filter="url(#filter1_di)">
            <path d="M11 58.2451C11 55.1479 13.1743 51.3818 15.8565 49.8333L52.2806 28.8038C54.9628 27.2553 57.1371 28.5106 57.1371 31.6078L57.1371 83.0306C57.1371 87.1474 53.4236 92.005 50.2016 92.1029L35.0555 92.5632C34.4057 92.5829 33.6956 92.8085 32.9765 93.2237L15.8565 103.108C13.1744 104.656 11 103.401 11 100.304L11 58.2451Z" fill="white"/>
            </g>
            <path d="M45.5 97.5002C45.5 97.5002 62.2987 91.6628 67.5 69C70.2656 56.9501 37 51 60 24C83 -3 109.125 16.1323 97.5764 19.8852C91.719 21.7887 86.2346 17.0569 91.9969 11.5363C97.7593 6.0157 110.827 8.54355 110.827 8.54355" stroke="#A7B6BA" strokeWidth="0.991237" strokeLinecap="round" strokeDasharray="1.98 2.97"/>
            <g filter="url(#filter2_di)">
            <rect width="53.2746" height="53.2746" rx="5.60785" transform="matrix(0.866025 -0.5 2.20305e-08 1 55.8628 77.8726)" fill="white"/>
            </g>
            <g filter="url(#filter3_di)">
            <rect width="53.2746" height="53.2746" rx="5.60785" transform="matrix(0.866025 0.5 -2.20305e-08 1 11 51.2354)" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_di" x="48.4799" y="28.1406" width="60.903" height="90.3964" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="7.38291"/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="6.49109"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.355328 0 0 0 0 0.450202 0 0 0 0 0.517969 0 0 0 0.71 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
            </filter>
            <filter id="filter1_di" x="3.61709" y="28.1406" width="60.903" height="90.3964" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="7.38291"/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="6.49109"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.355328 0 0 0 0 0.450202 0 0 0 0 0.517969 0 0 0 0.71 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
            </filter>
            <filter id="filter2_di" x="48.4799" y="53.376" width="60.903" height="90.3964" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="7.38291"/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 0.71 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
            </filter>
            <filter id="filter3_di" x="3.61709" y="53.376" width="60.903" height="90.3964" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="7.38291"/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="3.69145"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.894118 0 0 0 0 0.913725 0 0 0 0.71 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
            </filter>
            </defs>
          </svg>
          Uh oh! Looks like there are no transactions performed in this block!
        </EmptyTransactions>
        ) : (
          <Loader text="Fetching the latest Transactions from this block... Hang Tight!" />
        )
      }
    </BlockDetailsContainer>
  );
}

const EmptyTransactions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 25px;
`;

const BlockDetailsContainer = styled.div`
  @media (max-width: 768px) {
    padding: 5px; 
  }
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TransactionsHeader = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 25px 0 15px 0;
  
  svg {
    margin-right: 10px;
    opacity: 0.2;
    margin-bottom: 5px;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding-left: 0;
  align-items: center;
  transition: all .2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const BlockDetailsCard = styled(BlockCard)`
  padding: 25px;
`;

const BlockMetaDetailsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  flex-wrap: wrap;
`;

const BlockMetaDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;
  
  p {
    ${textStyle("label1")};
  }

  svg {
    margin-right: 5px;
    opacity: 0.3;
    margin-bottom: 2px;
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #0e1e241f;
  margin: 25px 0;
`;

const BlockMoreDetails = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
  align-items: baseline;

  label {
    width: 12%;
    ${textStyle("label1")};

    @media (max-width: 768px) {
      width: 25%;
    }
  }
`;

const Hash = styled.p`
  cursor: pointer;
  ${textStyle("address1")};
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: ${hoverBg};
  }
`;


export default BlockDetails;
