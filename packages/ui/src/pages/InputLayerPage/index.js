// @flow
import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import colors from '../../core/constants/colors';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

const generateItems = (neuron, idx) =>
  neuron[0].reduce((acc, el, i) => ({ ...acc, [`weight${i}`]: el }), {});

const generateData = (data, idx) =>
  data.map((dt, i) => {
    return {
      name: i,
      ...generateItems(dt, i)
    };
  });

const InputLayerPage = ({ weightMatrix }) => {
  const weightMatrixLayer = weightMatrix ? weightMatrix[0] : [];

  return (
    <Layout>
      {weightMatrixLayer.map((neuron, idx) => {
        const data = generateData(neuron, idx);
        return (
          <LineChart width={600} height={300} data={data}>
            {neuron[0][0].map((el, i) => (
              <Line type="natural" dataKey={`weight${i}`} stroke={colors[i]} />
            ))}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        );
      })}
    </Layout>
  );
};

export default InputLayerPage;
