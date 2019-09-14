// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { clearNotificationAction } from '../core/actions/notifications';
import type { Notification } from '../types/data.types';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

type Props = {
  notifications: Array<?Notification>,
  clearNotification: (id: string) => void
};

const transformType = type => ({
  [type]: true
});

const GlobalMessages = ({ notifications, clearNotification }: Props) => {
  const handleDismiss = id => () => clearNotification(id);

  return (
    <Container>
      {notifications.map(({ id, message, type }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Message onDismiss={handleDismiss(id)} content={message} {...transformType(type)} />
      ))}
    </Container>
  );
};

const mapStateToProps = ({ notifications }) => ({
  notifications: notifications.filter(({ global }) => global)
});

const mapDispatchToProps = {
  clearNotification: clearNotificationAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalMessages);
