// @flow
import React from 'react';
import { Form, Input, Select, Checkbox } from 'semantic-ui-react';
import { ACTIVATION } from 'neuron-network';
import Slider from 'rc-slider';
import LayersSlider from './LayersSlider';
import type { Epoch, Schema, ActivationFnName } from '../../../types/data.types';

const createOptions = option => option.map(o => ({ key: o, value: o, text: o }));

type Props = {
  schema: Schema,
  updateSchema: Schema => void,
  updateEpoch: Epoch => void,
  epoch: Epoch,
  activationFnName: ActivationFnName,
  updateActivationFnName: ActivationFnName => void,
  maxEpoch: number,
  minEpoch: number,
  bias: boolean,
  updateBias: (boolean) => void,
};

const FormContainer = ({
  schema,
  updateSchema,
  updateEpoch,
  epoch,
  activationFnName,
  updateActivationFnName,
  maxEpoch,
  bias,
  updateBias,
  minEpoch
}: Props) => {
  const biasDiff = bias ? 1 : 0;

  const createSchema = val => {
    const newSchema = [...Array(val)].map(() => 3);
    updateSchema([schema[0], ...newSchema, schema[schema.length - 1]]);
  };

  const changeSchema = (val, i) => {
    const newSchema = [...schema];
    newSchema[i + 1] = val + biasDiff;
    updateSchema([...newSchema]);
  };

  const changeEpoch = e => {
    const val = +e.target.value;
    if (val > maxEpoch) {
      updateEpoch(maxEpoch);
    } else if (val < minEpoch) {
      updateEpoch(minEpoch);
    } else {
      updateEpoch(val);
    }
  };

  const changeActivationFnName = (_, { value }) => {
    console.log(value)
    updateActivationFnName(value);
  };

  const changeBias = (_, { checked }) => {
    updateBias(checked);
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          control={Slider}
          label="Hidden layers:"
          onChange={createSchema}
          value={schema.length - 2}
          min={0}
          max={10}
          dots
          marks={{
            '0': <strong>0</strong>,
            '5': '5',
            '10': <strong>10</strong>
          }}
        />
        <Form.Field
          control={Input}
          label="Epoch:"
          type="number"
          value={epoch}
          onChange={changeEpoch}
        />
        <Form.Field
          control={Select}
          label="Activation fn:"
          value={activationFnName}
          onChange={changeActivationFnName}
          options={createOptions(Object.keys(ACTIVATION))}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Field control={LayersSlider} biasDiff={biasDiff} schema={schema.slice(1, -1)} onChange={changeSchema} />
        <Form.Field
          control={Checkbox}
          label="Use bias:"
          value={bias}
          slider
          onChange={changeBias}
        />
      </Form.Group>
    </Form>
  );
};

export default FormContainer;
