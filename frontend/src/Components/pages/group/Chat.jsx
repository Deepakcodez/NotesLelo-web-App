import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { createGroupContext } from '../../../Context';
import axios from 'axios';


export const Chat = ({ currentGroupId }) => {
  const scrollRef = useRef();

  const { currentUser } = useContext(createGroupContext);

























  useEffect(() => {

    // Scroll to the bottom of the messages when they change
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="chatContent  overflow-y-scroll no-scrollbar w-full
       h-[calc(100vh-3rem)] md:h-[calc(100vh-7.6rem)]">
        {/* Display received messages */}
     
        <div ref={scrollRef}></div>
      </div>

     
    </>
  );
};
