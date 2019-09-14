// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import type { Samples } from '../../../types/data.types';

const HeaderBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

type Props = {
  startLearning: () => void,
  stopLearning: () => void,
  isLearning: boolean,
  samples: ?Samples
};

const HeaderButtons = ({ startLearning, stopLearning, isLearning, samples }: Props) => (
  <HeaderBtn>
    <Button.Group>
      <Button
        labelPosition="left"
        icon="play"
        color="orange"
        content="Learn"
        onClick={startLearning}
        disabled={!samples || isLearning}
      />
      <Button icon="stop" content="Stop" onClick={stopLearning} disabled={!isLearning} />
      <Button icon="circle" color="blue" content="Calc" />
    </Button.Group>
  </HeaderBtn>
);

export default HeaderButtons;
