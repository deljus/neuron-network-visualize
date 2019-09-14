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
  const handleClick = (path, id) => e => {
    e.preventDefault();
    history.push(path.replace(':id', id));
  };

  const isActive = (url, id) => location.pathname === url.replace(':id', id);

  const hiddenLayers = schema.slice(1, -1);

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
        onClick={handleClick(URLS.LAYERS, 0)}
        active={isActive(URLS.LAYERS, 0)}
        name="Input layout"
      />
      <Dropdown item text="Hidden layers" disabled={!hiddenLayers.length}>
        <Dropdown.Menu>
          {hiddenLayers.map((_, i) => (
            <Dropdown.Item
              onClick={handleClick(URLS.LAYERS, i + 1)}
              active={isActive(URLS.LAYERS, i + 1)}
            >
              {`Layer ${i + 1}`}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        icon="step-chart"
        onClick={handleClick(URLS.LAYERS, schema.length - 1)}
        active={isActive(URLS.LAYERS, schema.length - 1)}
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
