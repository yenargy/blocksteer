import React from 'react';
import { LoadingRing } from '@aragon/ui';
import 'styled-components/macro';

// Styles
import { LoadingContainer } from '../styles/Common'

function Loader(props) {
  return (
    <LoadingContainer>
      <LoadingRing/> <p  css={`margin-left: 5px;`} >{props.text}</p>
    </LoadingContainer>
  )
}
export default Loader;