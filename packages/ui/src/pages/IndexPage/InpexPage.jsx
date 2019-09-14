// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import HeaderButtons from './components/HeaderButtons';
import NeuronsVisualize from './components/NeuronsVisualize';
import FormContainer from './components/FormContainer';
import {
  startLearningAction,
  stopLearningAction,
  updateEpochAction,
  updateSchemaAction,
  updateActivationFnNameAction
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
  updateActivationFnName: string => void
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
        activationFnName={activationFnName}
        updateActivationFnName={updateActivationFnName}
      />
      <NeuronsVisualize schema={schema} samples={samples} prefix={Math.random()} />
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
  updateActivationFnName: updateActivationFnNameAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
