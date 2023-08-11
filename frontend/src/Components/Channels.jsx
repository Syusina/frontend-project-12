import React from 'react';
import { Col, Button } from 'react-bootstrap';

const Channels = () => {
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" className="p-0 text-primary btn-group-vertical">
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          <Button type="button" className="w-100 rounded-0 text-start btn-secondary">
            <span className="me-1">#</span>
             general
          </Button>
        </li>
        <li className="nav-item w-100">
          <Button type="button" className="w-100 rounded-0 text-start">
            <span className="me-1">#</span>
            random
          </Button>
        </li>
        <li className="nav-item w-100">
          <div role="group" className="d-flex dropdown btn-group">
            <Button type="button" className="w-100 rounded-0 text-start">
              <span className="me-1">#</span>
              123
            </Button>
            <Button type="button" id="react-aria6522085436-1" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split">
              <span className="visually-hidden">
              {/* Управление каналом */}
              </span>
             </Button>
          </div>
        </li>
      </ul>
    </Col>
  );
};

export default Channels;