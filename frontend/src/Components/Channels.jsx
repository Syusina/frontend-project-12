import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../slices/chatSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector(
    (state) => state.channelsInfo,
  );
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button 
          type="button"
          variant="light"
          size="sm"
          className="btn btn-outline-primary"
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
            <Button 
              type="button"
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 rounded-0 text-start"
              onClick={handleChangeChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
      ) : (
        <li className="nav-item w-100" key={id}>
            <Button
              type="button"
              key={id}
              variant={currentChannelId === id ? "secondary" : "light"}
              className="w-100 rounded-0 text-start"
              onClick={handleChangeChannel(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
      )))}
      </ul>
    </Col>
  );
};

export default Channels;