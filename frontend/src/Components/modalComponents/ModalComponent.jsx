import React from 'react';
import { useSelector } from 'react-redux';
import NewChannelModal from './NewChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const map = {
  addChannel: NewChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const ModalComponent = () => {
  const type = useSelector((state) => state.modalInfo.type);
  const Component = map[type];
  return (Component === undefined ? null : <Component />);
};

export default ModalComponent;
