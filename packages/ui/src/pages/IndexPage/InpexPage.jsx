// @flow
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import HeaderButtons from './components/HeaderButtons';
import NeuronsVisualize from './components/NeuronsVisualize';
import FormContainer from './components/FormContainer';
import {
  startLearningAction,
  stopLearningAction,
  updateEpochAction,
  updateSchemaAction,
  updateActivationFnNameAction,
  updateBiasAction
} from '../../core/actions/learning';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type Props = {
  stopLearning: () => void,
  startLearning: () => void,
  updateSchema: () => void,
  updateEpoch: () => void,
  isLearning: boolean,
  samples: ?Array,
  schema: Array<number>,
  epoch: number,
  activationFnName: string,
  updateActivationFnName: string => void,
  bias: boolean,
  updateBias: boolean => void
};

const IndexPage = ({
  stopLearning,
  startLearning,
  isLearning,
  samples,
  schema,
  updateSchema,
  updateEpoch,
  epoch,
  activationFnName,
  bias,
  updateBias,
  updateActivationFnName
}: Props) => {
  return (
    <Layout>
      <HeaderButtons
        startLearning={startLearning}
        stopLearning={stopLearning}
        isLearning={isLearning}
        samples={samples}
      />
      <FormContainer
        schema={schema}
        updateSchema={updateSchema}
        updateEpoch={updateEpoch}
        epoch={epoch}
        bias={bias}
        updateBias={updateBias}
        activationFnName={activationFnName}
        updateActivationFnName={updateActivationFnName}
      />
      <NeuronsVisualize schema={schema} bias={bias} samples={samples} prefix={Math.random()} />
      <div>
        <Icon name="circle outline" />
        <span>- Input or output neuron &nbsp;</span>
        <Icon name="microchip" />
        <span>- Hidden neurons &nbsp;</span>
        <Icon name="certificate" />
        <span>- Bias</span>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ learning }) => ({
  ...learning
});

const mapDispatchToProps = {
  startLearning: startLearningAction,
  stopLearning: stopLearningAction,
  updateSchema: updateSchemaAction,
  updateEpoch: updateEpochAction,
  updateActivationFnName: updateActivationFnNameAction,
  updateBias: updateBiasAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
