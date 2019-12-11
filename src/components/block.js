import React from 'react';
import 'styled-components/macro';
import moment from 'moment';
import { Card, textStyle, theme, GU} from '@aragon/ui';

function Block({data}) {
  return (
    <Card css={`width: ${30 * GU}px;
                height: ${30 * GU}px;
                margin: ${2 * GU}px`}>
    <p css={`${textStyle("address2")}; color: ${theme.negative};`}>#{data.number}</p>
    <p css={`${textStyle("label2")};`}>{data.transactions.length} Transactions</p>
    <p>{moment.unix(data.timestamp).format('DD/MM/YYYY hh:mm:ss')}</p>
    </Card>
  );
}
export default Block;
