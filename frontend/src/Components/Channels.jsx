import React, { useRef } from 'react';
import { Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../slices/chatSlice';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector(
    (state) => state.channelsInfo,
  );
  const bottom = useRef();
  const dispatch = useDispatch();

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
        <b>Каналы</b>
        <Button 
          type="button"
          variant="light"
          size="sm"
          className="pb-0 pt-0 btn-outline-primary"
          onClick={addNewChannel}
        >
          <span className="visually-hidden">+</span>
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
              type="button"
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 rounded-0 text-start"
              onClick={changeChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <DropdownToggle split className="flex-grow-0" variant="group-veritical">
                <span className="visually-hidden"></span>
              </DropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={removeChannel(id)}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={renameChannel(id)}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </li>
      ) : (
        <li className="nav-item w-100" key={id}>
            <Button
              type="button"
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 rounded-0 text-start"
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