import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessage from './NewMessage';

const Messages = () => {
  const { channels, currentChannelId } = useSelector(
    (state) => state.channelsInfo,
  );
  const { messages } = useSelector(
    (state) => state.messagesInfo,
  );
  const currentChannelMessages = messages
    .filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  
  const countMessages = currentChannelMessages.length;
  let messagesText;
  if (countMessages === 0) {
    messagesText = 'message_zero';
  } else if (countMessages === 1) {
    messagesText = 'message_one';
  }
  else if (countMessages === 2 || countMessages === 3 || countMessages === 4) {
    messagesText = 'message_few';
  } else {
    messagesText = 'message_many';
  }

  const { t } = useTranslation();

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel?.name}`}</b></p>
          <span className="text-muted">{`${countMessages} ${t(`chat.${messagesText}`)}`}</span>
        </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentChannelMessages.map(({ body, username, id }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b> : {` ${body}`}
          </div>
        ))}
      </div>
      <NewMessage />
      </div>
    </Col>
  );
};

export default Messages;