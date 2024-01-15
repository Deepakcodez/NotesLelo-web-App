import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { createGroupContext } from '../../../Context';
import axios from 'axios';
import { io } from 'socket.io-client';

export const Chat = ({ currentGroupId }) => {
  const [message, setMessage] = useState('');
  const [receivedMsg, setReceivedMsg] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  const { currentUser } = useContext(createGroupContext);

  useEffect(() => {
    // Initialize socket connection when the component mounts
    if (currentUser && !socket.current) {
      try {
        socket.current = io("http://localhost:8000");
        socket.current.emit("add-user", currentUser._id);
        console.log('>>>>>>>>>>>gc socket current', socket.current);
      } catch (error) {
        console.error('Error connecting to socket:', error);
      }
    }

    // Disconnect socket when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser, socket]);

  useEffect(() => {
    // Fetch messages when the groupId changes
    const fetchMessages = async () => {
      try {
        const resp = await axios.post('http://localhost:8000/api/v1/message/allMessages', {
          from: currentUser._id,
          to: currentGroupId,
        });
        console.log('>>>>>>>>>>>msgs', resp.data.data);
        setReceivedMsg(resp.data.data);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };

    if (currentGroupId) {
      fetchMessages();
    }
  }, [currentGroupId, currentUser]);

  const sendHandler = async () => {
    if (!message) {
      return console.log('>>>>>>>>>>>enter message');
    }

    try {
      const resp = await axios.post('http://localhost:8000/api/v1/message/addMessage', {
        from: currentUser._id,
        to: currentGroupId,
        message: message,
      });

      // Check if the socket is available before using it
      if (socket && socket.current && socket.current.emit) {
        socket.current.emit('send-message', {
          to: currentGroupId,
          from: currentUser._id,
          message: message,
        });
        console.log('>>>>>>>>>>>msg sent  ')
      } else {
        console.log('Socket is not available.');
      }

      const msgs = [...receivedMsg];
      msgs.push({ fromSelf: true, message: message });
      setReceivedMsg(msgs);

      if (resp.data.success) {
        setReceivedMsg([...receivedMsg, resp.data.data]);
      } else {
        console.log('Failed to send message:', resp.data.message);
      }

      setMessage('');
    } catch (error) {
      console.log('Error in sending message:', error);
    }
  };

  useEffect(() => {
    // Listen for incoming messages
    if (socket && socket.current) {
      socket.current.on("message-received", (data) => {
        console.log('>>>>>>>>>>>', data);
        setArrivalMessage({ fromSelf: false, message: data.message });
      });
    } else {
      console.log('Socket is not available.');
    }

    // Update received messages when arrivalMessage changes
    arrivalMessage && setReceivedMsg((prev) => [...prev, arrivalMessage]);

    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [socket, arrivalMessage, receivedMsg]);

  return (
    <>
      <div className="chatContent overflow-y-scroll no-scrollbar w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-10.55rem)]">
        {/* Display received messages */}
        {receivedMsg.map((msgs, index) => (
          <Fragment key={index}>
            <div
              ref={scrollRef}
              className={`px-5 flex text-white ${msgs?.fromSelf ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`${msgs?.fromSelf ? 'bg-blue-400/75' : 'bg-blue-300/75'} p-3 my-2 px-7 rounded-xl max-w-[60%] text-justify  `}
              >
                {msgs?.message}
              </div>
            </div>
          </Fragment>
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* Typing area */}
      <div className="typingArea bg-slate-300/50  00 h-[3rem] flex items-center px-1 md:px-10 gap-2">
        <label htmlFor="file">
          <GoPlus className="text-3xl cursor-pointer" />
        </label>
        <input type="file" id="file" className="hidden" onChange={(e) => console.log(e.target.files[0])} />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="enter message"
          className="w-[100%] h-[1.8rem] px-2 rounded-md"
        />
        <IoMdSend onClick={sendHandler} className="text-3xl" />
      </div>
    </>
  );
};
