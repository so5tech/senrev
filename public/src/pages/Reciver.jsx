import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";



export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      console.log('11111111111111111111111')
      // if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      // }
      //  else {
      //   navigate("/setAvatar");
      // }
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      
      // setCurrentChat(
      //   {avatarImage:"",
      //   email: "deepak.d@feniceenergy.com",
      //   username: "Deepak",
      //   _id:"6480428cb02c7003c627165c"}
      //   );

        setCurrentChat(
          {avatarImage:"",
          email: currentUser.email,
          username: currentUser.username,
          _id:currentUser._id}
          );
    }
  }, [currentUser]);

  // const handleChatChange = (chat) => {
  //   // console.log("----------------------",chat)
  //   setCurrentChat(
  //     {avatarImage:"",
  //     email: "deepak.d@feniceenergy.com",
  //     username: "Deepak",
  //     _id:"6480428cb02c7003c627165c"}
  //     );
  // };
  console.log("----------------------", currentChat)
  return (
    <>
      <Container>
        <div className="container">
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
            // <InboxNotifications />
          )}
        </div>
      </Container>
    </>
  );
}




// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .container {
//     height: 85vh;
//     width: 85vh;
//     background-color: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// `;


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100vh; /* Use 100vh for full-page height */
    width: 100vw; /* Use 100vw for full-page width */
  }
`;

