import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Channels from './Channels';
import Messages from './Messages';
import useAuth from '../hooks/useAuth';
import routes from '../routes';
import { loadChannels } from '../slices/chatSlice';
import { useDispatch } from 'react-redux';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

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
        console.log(error);
      }
    };
    addChat(auth.user.token);
  }, [auth, dispatch]);

  return (
    added ? (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row"> 
        <Channels />
        <Messages />
       </Row>
    </Container>
    ) : null
  );
};

export default Chat;
