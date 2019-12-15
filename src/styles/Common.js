import styled from 'styled-components/macro';

// Common Colors
const hoverBg = '#edeff2';
const darkBg = '#0E1E24';
const primary = '#E9B50C';
const lightBg = '#F0F4F6';
const success = '#63CD90';
const error = '#EB5757';



// Common component styles
const BlockCard = styled.div`
  box-shadow: 0px 4px 4px #dde4e94a, inset 0px 0px 5px rgb(221, 228, 233);
  border-radius: 12px;
  background: #FFFFFF;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export {
  BlockCard,
  LoadingContainer,
  hoverBg,
  success,
  error,
  primary,
  darkBg,
  lightBg
};
