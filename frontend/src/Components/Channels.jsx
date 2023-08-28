import React, { useRef } from 'react';
import { Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/chatSlice';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeChannel = (id) => () => dispatch(setCurrentChannel({ id }));
  const addNewChannel = () => dispatch(openModal({ type: 'addChannel' }));
  const renameChannel = (id) => () => dispatch(openModal({ type: 'renameChannel', id }));
  const removeChannel = (id) => () => dispatch(openModal({ type: 'removeChannel', id }));
  const bottom = useRef();

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="first"  
          className="p-0 text-primary" 
          onClick={addNewChannel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ id, name, removable }) => (removable ? (
        <li className="nav-item w-100" key={id}>
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 text-start text-truncate"
              onClick={changeChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <DropdownToggle split className="flex-grow-0" variant={currentChannelId === id ? "secondary" : "light"}>
              <span className="visually-hidden">{t('channels.menu')}</span>
            </DropdownToggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={removeChannel(id)}>{t('channels.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={renameChannel(id)}>{t('channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      ) : (
        <li className="nav-item w-100" key={id}>
            <Button
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 text-start"
              onClick={changeChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
      )))}
       <li ref={bottom} />
      </ul>
    </Col>
  );
};

export default Channels;