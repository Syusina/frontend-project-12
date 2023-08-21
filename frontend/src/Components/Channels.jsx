import React from 'react';
import { Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/chatSlice';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector(
    (state) => state.channelsInfo,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const addNewChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const renameChannel = (id) => () => {
    dispatch(openModal({ type: 'renameChannel', id }));
  };

  const removeChannel = (id) => () => {
    dispatch(openModal({ type: 'removeChannel', id }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button 
          variant="light"
          size="sm"
          className="pb-0 pt-0 btn-outline-primary"
          onClick={addNewChannel}
        >
          <b><span>{t('channels.add')}</span></b>
        </Button>
      </div>

      <ul 
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
      {channels.map(({ id, name, removable }) => (removable ? (
        <li className="nav-item w-100" key={id}>
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 text-start"
              onClick={changeChannel(id)}
            >
              <span className="me-1">{t('channels.grid')}</span>
              {name}
            </Button>
            <DropdownToggle split className="flex-grow-0" variant="group-veritical">
                <span className="visually-hidden"></span>
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
              <span className="me-1">{t('channels.grid')}</span>
              {name}
            </Button>
          </li>
      )))}
       
      </ul>
    </Col>
  );
};

export default Channels;