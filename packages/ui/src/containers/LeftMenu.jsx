// @flow
import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import history from '../core/history';
import URLS from '../core/urls';
import { compose } from '../core/untils/fns';
import type { Schema } from '../types/data.types';

type Props = {
  location: {
    pathname: string,
    key: string
  },
  schema: Schema
};

const LeftMenu = ({ location, schema }: Props) => {
  const handleClick = path => e => {
    e.preventDefault();
    history.push(path);
  };

  const isActive = url => location.pathname === url;

  const hiddenLayers = schema.slice(0, -1);

  return (
    <Menu pointing secondary vertical>
      <Menu.Item
        icon="predictive-analysis"
        onClick={handleClick(URLS.INDEX)}
        active={isActive(URLS.INDEX)}
        name="Schema"
      />
      <Menu.Item
        icon="step-chart"
        onClick={handleClick(URLS.INPUT_LAYER)}
        active={isActive(URLS.INPUT_LAYER)}
        name="Input layout"
      />
      <Dropdown item text="Hidden layers" disabled={!!hiddenLayers.length}>
        <Dropdown.Menu>
          {hiddenLayers.map((_, i) => (
            <Dropdown.Item>{`Layer ${i + 1}`}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        icon="step-chart"
        onClick={handleClick(URLS.OUTPUT_LAYER)}
        active={isActive(URLS.OUTPUT_LAYER)}
        name="Output layout"
      />
      <Menu.Item
        name="Settings..."
        icon="cog"
        active={isActive(URLS.SETTINGS)}
        onClick={handleClick(URLS.SETTINGS)}
      />
    </Menu>
  );
};

const mapStateToProps = ({ learning }) => ({
  schema: learning.schema
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(LeftMenu);
