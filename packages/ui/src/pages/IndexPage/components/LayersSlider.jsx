// @flow
import React from 'react';
import styled from 'styled-components';
import { Button, Popup } from 'semantic-ui-react';
import BaseSlider from 'rc-slider';
import type { Schema } from '../../../types/data.types';

const SliderContainer = styled.div`
  display: flex;
  height: 250px;
`;

const SliderWrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Slider = styled(BaseSlider)`
  height: 200px;
`;

type Props = {
  schema: Schema,
  onChange: (string, number) => void
};

const LayersSlider = ({ schema, onChange, biasDiff }: Props) => (
  <SliderContainer>
    {schema.map((value, i) => (
      <SliderWrapper>
        <span>{`L${i + 1}`}</span>
        <Slider
          min={1}
          max={10}
          value={value - biasDiff}
          onChange={v => onChange(v, i)}
          dots
          vertical
          marks={{
            '1': <strong>1</strong>,
            '5': '5',
            '10': <strong>10</strong>
          }}
        />
      </SliderWrapper>
    ))}
  </SliderContainer>
);

const PopupBtn = ({ schema, onChange, biasDiff }: Props) => (
  <Popup
    content={<LayersSlider schema={schema} onChange={onChange} biasDiff={biasDiff} />}
    on="click"
    position="bottom left"
    pinned
    trigger={
      <Button disabled={!schema.length} circular icon="settings" content="Count of neurons" />
    }
  />
);

export default PopupBtn;
