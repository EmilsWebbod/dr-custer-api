import styled, { css, keyframes } from 'styled-components';
import * as React from 'react';

const FlexContainer = styled.div<{direction?: string}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
`;

const FlexItem = styled.div`
  flex: 1;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  margin: 0;
  padding: 0;
`;

const CrudModalForm = Form.extend`
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  ${(props: any) =>
  props.fullScreen &&
  css`
      max-height: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    `};
`;

const crudPulse = keyframes`
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

const CrudStatusWrapper = styled.div<{busy: boolean}>`
  transition: opacity 1s ease-in-out;

  ${props =>
  props.busy &&
  css`
      cursor: wait;
      animation: ${crudPulse} 1s infinite ease-in-out;
    `};
`;

const CrudBody = styled.div`
  padding: 1rem;
`;

interface IStyledProps {
  block: boolean;
}

const CrudStatusText = styled.span<IStyledProps>`
  display: inline-block;
  font-size: 0.9em;
  text-transform: uppercase;
  color: ${props => props.theme.palette.secondary.light};
  font-weight: 300;

  ${props =>
  props.block &&
  css`
      display: block;
    `};
`;

const StyledChip = styled.div`
  border: 1px solid ${props => props.theme.palette.primary.main};
  border-radius: 50%;
  padding: 0.5rem;
`;

const CrudChip = ({ label }: {label: string}) => (
  <StyledChip>{label}</StyledChip>
);

export {
  CrudBody,
  CrudChip,
  CrudModalForm,
  CrudStatusText,
  crudPulse,
  CrudStatusWrapper,
  FlexContainer,
  FlexItem
};
