import styled, { css, keyframes } from 'styled-components';

interface IStatus {
  busy: boolean;
}

const pulse = keyframes`
  0% {
    opacity: 0.15
  }
  50% {
    opacity: 0.3
  }
  100% {
    opacity: 0.15
  }
`;

const StatusWrapper = styled.div`
  transition: opacity 1s ease-in-out;

  ${(props: IStatus) =>
    props.busy &&
    css`
      cursor: wait;
      animation: ${pulse} 1s infinite ease-in-out;
    `};
`;

export default StatusWrapper;
