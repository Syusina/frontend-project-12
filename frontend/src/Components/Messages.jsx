import React, { useRef, useEffect } from 'react';
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
  const { t } = useTranslation();

  const messagesInEnd = useRef(null);
  const scroll = () => messagesInEnd.current?.scrollIntoView({ behavior: 'auto' });
  useEffect(() => scroll(), [messages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel?.name}`}</b></p>
          <span className="text-muted">{`${countMessages} ${t('chat.message', { count: currentChannelMessages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {currentChannelMessages.map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              :
              {` ${body}`}
            </div>
          ))}
          <div ref={messagesInEnd} />
        </div>
        <NewMessage />
      </div>
    </Col>
  );
};

export default Messages;
