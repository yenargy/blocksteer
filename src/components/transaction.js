import React from 'react';
import 'styled-components/macro';
// import moment from 'moment';
import { Card, textStyle, GU} from '@aragon/ui';

// Components Imports
import SmartAddress from './smartAddress';

function Transaction(props) {
  return (
    <Card css={`width: ${30 * GU}px;
                height: ${30 * GU}px;
                margin: ${2 * GU}px`}>
    <p css={`${textStyle("address2")};`}>From: <SmartAddress address={props.from}/></p>
    <p css={`${textStyle("address2")};`}>to: <SmartAddress address={props.to}/></p>
    <p css={`${textStyle("label2")};`}>Gas: {props.gas}</p>
    <p css={`${textStyle("label2")};`}>Value: {props.value}</p>
    </Card>
  );
}
export default Transaction;
