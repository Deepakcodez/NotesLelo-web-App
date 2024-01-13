import { Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createGroupContext } from "../../../Context";
import { io } from "socket.io-client";

export const GroupChat = () => {
  const { setGroupDeleteOpt } = useContext(createGroupContext);
  const [option, setOption] = useState(false);
  const [message, setMessage] = useState("");
  const optionModelRef = useRef();
  const optionIconRef = useRef();
  const token = localStorage.getItem("useDataToken");
  const id = localStorage.getItem("groupId");
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
  });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    socket.emit("authenticate", id);
  }, [socket, id]);

  const sendHandler = () => {
    if (!message.trim()) {
      console.log('No message to send');
    } else {
      socket.emit("message", { message, id });
      setMessage("");
    }
  };

  useEffect(() => {
    try {
      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
      });

      socket.on("received-message", (message) => {
        console.log('Received message:', message);
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("disconnect", () => {
        console.log('Socket disconnected');
      });

      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }, [socket]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!optionIconRef.current.contains(e.target) && optionModelRef.current) {
        setOption(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("groupId");
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/group/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      setGroupData({
        title: response.data.data.title,
        description: response.data.data.description,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [id, navigate]);

  const optionClickHandler = () => {
    setOption(!option);
  };

  const deleteGroupHandler = () => {
    setGroupDeleteOpt(true);
    setOption(false);
  };

  return (
    <Fragment>
      <div className="container relative min-h-full h-fit w-fit min-w-full  flex flex-col justify-between">
        <div className="navbar bg-slate-300 shadow-lg w-full h-[3rem] flex items-center">
          <ul className="flex h-full items-center justify-between px-5 w-full">
            <li className="font-bold text-xl">
              {groupData.title.toUpperCase()}
            </li>
            <li ref={optionIconRef} onClick={optionClickHandler}>
              <SlOptionsVertical />
            </li>
          </ul>
        </div>
        <div className="chatContent overflow-y-scroll no-scrollbar w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-10.55rem)]">
          {receivedMessages.map((msg, index) => (
            <h1 className="text-white" key={index}> {msg.text || JSON.stringify(msg)}</h1>
          ))}
        </div>
        {option && (
          <div
            ref={optionModelRef}
            className="optionModel absolute right-5 top-9 bg-slate-700 w-[10rem] rounded-md h-auto min-h-[2rem] shadow-md py-2"
          >
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              Members{" "}
            </div>
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              Docs, and links{" "}
            </div>
            <div
              className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer"
              onClick={deleteGroupHandler}
            >
              Delete
            </div>
            <div className="text-white hover:bg-slate-600 ps-4 py-3 cursor-pointer">
              More
            </div>
          </div>
        )}
        <div className="typingArea bg-slate-300 h-[3rem] flex items-center px-1 md:px-10 gap-2">
          <label htmlFor="file">
            <GoPlus className="text-3xl cursor-pointer" />
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => console.log(e.target.files[0])}
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="w-[100%] h-[1.8rem] px-2 rounded-md"
          />
          <IoMdSend onClick={sendHandler} className="text-3xl" />
        </div>
      </div>
    </Fragment>
  );
};
