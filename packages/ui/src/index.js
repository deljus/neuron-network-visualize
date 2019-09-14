import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Switch, Router as BrowserRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import history from './core/history';
import { LeftMenu } from './containers';
import { IndexPage, SettingsPage, InputLayerPage } from './pages';
import URLS from './core/urls';
import store from './core/store';
import GlobalMessages from './containers/GlobalMessages';

import 'semantic-ui-css/semantic.min.css';
import 'rc-slider/assets/index.css';

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const LeftMenuContainer = styled.div`
  display: flex;
  border-right: 1px solid rgba(16, 22, 26, 0.15);
  box-shadow: 8px 5px 12px -3px #c1c1c1;
  z-index: 1;
`;

const PageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  background: #9e9e9e1c;
`;

const App = () => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <GlobalMessages />
      <Container>
        <LeftMenuContainer>
          <LeftMenu />
        </LeftMenuContainer>
        <PageContainer>
          <Switch>
            <Route path={URLS.INDEX} component={IndexPage} exact />
            <Route path={URLS.SETTINGS} component={SettingsPage} exact />
            <Route path={URLS.LAYERS} component={InputLayerPage} exact />
          </Switch>
        </PageContainer>
      </Container>
    </BrowserRouter>
  </Provider>
);

export default render(<App />, document.getElementById('root'));
