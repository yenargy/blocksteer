import React from 'react';
import { LoadingRing } from '@aragon/ui';

// Styles
import { LoadingContainer } from '../styles/Common'

function Loader(props) {
  return (
    <LoadingContainer>
      <LoadingRing css={`margin-right: 10px;`} /> {props.text}
    </LoadingContainer>
  )
}
export default Loader;