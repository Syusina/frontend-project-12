import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from './Channels';
import Messages from './Messages';
import useAuth from '../hooks/useAuth';
import routes from '../routes';
import { loadChannels } from '../slices/chatSlice';
import ModalComponent from './modalComponents/ModalComponent';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const addChat = async (token) => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loadChannels(data));
        setAdded(true);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('error.unknown'));
          return;
        }
        if (error.response.status === 401) {
          navigate(routes.loginPagePath());
        } else {
          toast.error(t('error.network'));
        }
      }
    };
    addChat(auth.user.token);
  }, [auth, dispatch, navigate, t]);

  return (
    added ? (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <ModalComponent />
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    ) : null
  );
};

export default Chat;

