import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { createGroupContext } from '../../../Context';
import axios from 'axios';

export const Chat = ({ currentGroupId }) => {
    const [message, setMessage] = useState('');
    const [receivedMsg, setReceivedMsg] = useState([]);
    const { currentUser } = useContext(createGroupContext);
  
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
  
    useEffect(() => {
      fetchMessages();
    }, [currentGroupId]);
  
    const sendHandler = async () => {
        if(!message){
            return console.log('>>>>>>>>>>>enter message')
        }
      try {
        const resp = await axios.post('http://localhost:8000/api/v1/message/addMessage', {
          from: currentUser._id,
          to: currentGroupId,
          message: message,
        });
  
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
  
    return (
      <>
        <div className="chatContent overflow-y-scroll no-scrollbar w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-10.55rem)]">
          {/* Display received messages */}
          {receivedMsg.map((msgs, index) => (
            <Fragment key={index}>
              <div className={` px-5 flex text-white ${msgs?.fromSelf ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msgs?.fromSelf?"bg-blue-400/75":"bg-blue-300/75"} p-3 my-2 px-7 rounded-xl max-w-[60%] text-justify  `}>{msgs?.message}</div>
              </div>
            </Fragment>
          ))}
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
  