// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import ChatInput from "./ChatInput";
// import Logout from "./Logout";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

// export default function ChatContainer({ currentChat, socket }) {
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     const response = await axios.post(recieveMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//     });
//     setMessages(response.data);
//   }, [currentChat]);

//   useEffect(() => {
//     const getCurrentChat = async () => {
//       if (currentChat) {
//         await JSON.parse(
//           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//         )._id;
//       }
//     };
//     getCurrentChat();
//   }, [currentChat]);

//   const handleSendMsg = async (msg) => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     socket.current.emit("send-msg", {
//       to: currentChat._id,
//       from: data._id,
//       msg,
//     });
//     await axios.post(sendMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//       message: msg,
//     });

//     const msgs = [...messages];
//     msgs.push({ fromSelf: true, message: msg });
//     setMessages(msgs);
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recieve", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Container>
//       <div className="chat-header">
//         <div className="user-details">
//           <div className="avatar">
//             <img
//               src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
//               alt=""
//             />
//           </div>
//           <div className="username">
//             <h3>{currentChat.username}</h3>
//           </div>
//         </div>
//         <Logout />
//       </div>
//       <div className="chat-messages">
//         {messages.map((message) => {
//           return (
//             <div ref={scrollRef} key={uuidv4()}>
//               <div
//                 className={`message ${message.fromSelf ? "sended" : "recieved"
//                   }`}
//               >
//                 <div className="content ">
//                   <p>{message.message}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <ChatInput handleSendMsg={handleSendMsg} />
//     </Container>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import toast, { Toaster } from 'react-hot-toast';


export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receivedViaSocket, setReceivedViaSocket] = useState(false);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // const handleSendMsg = async (msg) => {
  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   socket.current.emit("send-msg", {
  //     to: currentChat._id,
  //     from: data._id,
  //     msg,
  //   });
  //   await axios.post(sendMessageRoute, {
  //     from: data._id,
  //     to: currentChat._id,
  //     message: msg,
  //   });

  //   const msgs = [...messages];
  //   // msgs.push({ fromSelf: true, message: msg });
  //   setMessages(msgs);

  //   // Broadcast the message to other tabs using BroadcastChannel
  //   const broadcastChannel = new BroadcastChannel("chatMessages");
  //   broadcastChannel.postMessage({ fromSelf: true, message: msg });

  //   // Set the receivedViaSocket flag to true when sending a message via socket.io
  //   setReceivedViaSocket(true);
  // };
  // -----------------------------------------------------------------------------------------------------
  // const handleSendMsg = async (msg) => {
  //   const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  //   socket.current.emit("send-msg", {
  //     to: currentChat._id,
  //     from: data._id,
  //     msg,
  //   });
  //   await axios.post(sendMessageRoute, {
  //     from: data._id,
  //     to: currentChat._id,
  //     message: msg,
  //   });

  //   // Prepend the new message to the messages array
  //   setMessages((prevMessages) => [{ fromSelf: true, message: msg }, ...prevMessages]);

  //   // Broadcast the message to other tabs using BroadcastChannel
  //   const broadcastChannel = new BroadcastChannel("chatMessages");
  //   broadcastChannel.postMessage({ fromSelf: true, message: msg });

  //   // Set the receivedViaSocket flag to true when sending a message via socket.io
  //   setReceivedViaSocket(true);
  // };


  useEffect(() => {
    if (socket.current) {
      const data = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        if (msg.from !== data._id) {
          // Set the receivedViaSocket flag to true when receiving a message via socket.io
          setReceivedViaSocket(true);
          setArrivalMessage({ fromSelf: false, message: msg });

          // Broadcast the received message to other tabs using BroadcastChannel
          const broadcastChannel = new BroadcastChannel("chatMessages");
          broadcastChannel.postMessage({ fromSelf: false, message: msg });
        }
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the top (most recent message)
  // }, [messages]);

  // useEffect(() => {
  //   const chatContainer = scrollRef.current;
  //   chatContainer.scrollTop = 0; // Scroll to the top (most recent message)
  // }, [messages]);
  
  

  // Listen for messages from other tabs using BroadcastChannel
  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("chatMessages");
    broadcastChannel.onmessage = (event) => {
      const data = event.data;

      // Check if the message is not from the current tab and wasn't received via socket.io
      if (data.fromSelf !== true && !receivedViaSocket) {
        setMessages((prev) => [...prev, data]);
      }

      // Reset the receivedViaSocket flag after processing the BroadcastChannel message
      setReceivedViaSocket(false);
    };

    return () => {
      // Close the BroadcastChannel when the component unmounts
      broadcastChannel.close();
    };
  }, [receivedViaSocket]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {/* {messages.slice().reverse().map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"}`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })} */}
        {messages
          .filter((message) => !message.fromSelf) // Filter out sent messages
          .reverse() // Reverse the order of received messages
          .map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message recieved`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
    </Container>
  );
}









const Container = styled.div`
  display: grid;
  grid-template-rows: 8vh 82vh 10vh;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 12vh 76vh 12vh;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
