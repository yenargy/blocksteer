import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { textStyle, GU, IconTime } from '@aragon/ui';

// Styles
import { darkBg } from '../styles/Common';

function Block({data}) {
  return (
    <BlockCard css={`width: ${30 * GU}px; height: ${30 * GU}px;`}>
      <BlockCardHat>
        <IconTime size="small"  css={`opacity: 0.6; margin-right: 3px;`}/>
        <Timestamp>{formatedTimeFrom(data.timestamp)}</Timestamp>
      </BlockCardHat>
      <div>
        <TransactionCount css={`${textStyle("body1")};`}>{data.transactions.length} Transactions</TransactionCount>    
        <BlockNumber>#{data.number}</BlockNumber>
      </div>
    </BlockCard>
  );
}

export const formatedTimeFrom = text => {
  const now = moment();
  const expiration = moment.unix(text);
  const diff = expiration.diff(now);
  const diffDuration = moment.duration(diff);

  return [
    diffDuration.years() > 0 ? diffDuration.years() + 'y ' : '',
    diffDuration.months() > 0 ? diffDuration.months() + 'mo ' : '',
    diffDuration.days() > 0 ? diffDuration.days() + 'd ' : '',
    diffDuration.hours() > 0 ? diffDuration.hours() + 'h ' : '',
    diffDuration.minutes() > 0 ? diffDuration.minutes() + 'm ' : '',
    diffDuration.seconds() > 0 ? diffDuration.seconds() + 's ' : '',
    diffDuration.seconds() < 0 ? moment.unix(text).fromNow() : '',
  ].join('');
};

const BlockCard = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 4px #dde4e94a, inset 0px 0px 5px rgb(221, 228, 233);
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 7px 7px #d2d8dda3, inset 0px 0px 5px rgb(221,228,233);
  }

  &:active {
    transform: scale(1.025);
    transition: all .15s ease-in-out;
    box-shadow: 0px 4px 4px #dde4e94a, inset 0px 0px 7px #cbd5dd;
  }
`;

const BlockNumber = styled.p`
  position: absolute;
  right: 10px;
  color: ${darkBg};
  opacity: 0.3;
  bottom: 0;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.5;
  font-family: aragon-ui-monospace,monospace;
`;

const Timestamp = styled.p`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.4;
`;

const BlockCardHat = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background: linear-gradient(270.17deg, hsla(206, 28%, 91%, 1) 0.03%, rgba(239,243,246,0) 99.96%);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  text-align: right;
  padding: 10px 10px;
`;

const TransactionCount = styled.p`
  margin: 10px 10px 50px 0;
  opacity: 0.8;
  font-weight: 600;
`;
export default Block;
