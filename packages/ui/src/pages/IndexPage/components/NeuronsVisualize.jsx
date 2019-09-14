// @flow
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { compose } from 'redux';
import Graph, { Edge as BaseEdge, Node as BaseNode } from 'react-json-graph';
import sizeMe from 'react-sizeme';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { generateEdges, generateNodes } from '../../../core/untils/graph';
import type { Samples, Schema } from '../../../types/data.types';

const GraphLayout = styled.div`
  width: 100%;
  height: 100%;
`;

class Node extends BaseNode {
  renderContainer = ({ content: { color, isInputNeuron, isOutNeuron } }) => {
    if (isInputNeuron) {
      return (
        <div>
          Input
          <Icon name="circle" size="large" color={color} />
        </div>
      );
    }
    if (isOutNeuron) {
      return (
        <div>
          <Icon name="circle" size="large" color={color} />
          Output
        </div>
      );
    }
    return (
      <div>
        <Icon name="circle outline" size="large" color={color} />
      </div>
    );
  };
}

class Edge extends BaseEdge {
  getStyles = () => {
    return { stroke: 'rgba(154,172,188,0.59)' };
  };
}

type NeuronsVisualizeProps = {
  size: {
    width: number,
    height: number
  },
  schema: Schema,
  samples: Samples
};

const NeuronsVisualize = ({ size: { width, height }, schema, samples }: NeuronsVisualizeProps) => {
  const prefix = Math.random();
  return (
    <GraphLayout>
      <Graph
        width={width}
        height={height}
        json={{
          nodes: generateNodes(schema, { width, height, prefix }),
          edges: generateEdges(schema, prefix, !!samples),
          isStatic: true
        }}
        Node={Node}
        Edge={Edge}
      />
    </GraphLayout>
  );
};

export default compose(sizeMe({ monitorHeight: true, monitorWidth: true }))(NeuronsVisualize);
