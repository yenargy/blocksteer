import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { textStyle, GU} from '@aragon/ui';

function Block({data}) {
  return (
    <BlockCard css={`width: ${30 * GU}px; height: ${30 * GU}px;`}>
      <BlockCardHat>
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
`;

const BlockNumber = styled.p`
  position: absolute;
  right: 10px;
  color: #c5ccd9;
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
  width: 100%;
  background: #eff3f6;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  text-align: right;
  padding: 10px 10px;
`;

const TransactionCount = styled.p`
  margin: 10px 10px 50px 0;
`;
export default Block;
