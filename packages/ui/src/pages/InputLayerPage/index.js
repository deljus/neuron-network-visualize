// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import colors from '../../core/constants/colors';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

const generateItems = (weightMatrix, layerId, neuronId) =>
  weightMatrix[layerId][neuronId].reduce((acc, el, i) => ({ ...acc, [`weight${i}`]: el }), {});

const generateData = (visualize, layerId, neuronId) =>
  visualize.map(({ weightMatrix, epoch }) => {
    return {
      epoch,
      ...generateItems(weightMatrix, layerId, neuronId)
    };
  });

const generateLine = ({ epoch, ...rest }) => {
  const keys = Object.keys(rest);

  return keys.map((key, i) => <Line type="natural" dataKey={key} stroke={colors[i]} />);
};

const InputLayerPage = ({ visualize, match, schema }) => {
  const layerId = +match.params.id;
  const layer = [...Array(schema[layerId])];

  return (
    <Layout>
      <Header size="medium">{`Layer ${layerId + 1}`}</Header>
      {layer.map((_, neuronId) => {
        const data = generateData(visualize, layerId, neuronId);
        return (
          <>
            <Header size="small">{`Neuron ${neuronId + 1}`}</Header>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                {data.length && generateLine(data[0])}
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="epoch" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      })}
    </Layout>
  );
};

const mapStateToProps = ({ learning }) => ({
  visualize: learning.visualize,
  schema: learning.schema
});

export default connect(mapStateToProps)(InputLayerPage);
