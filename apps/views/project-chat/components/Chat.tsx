import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const ChatComponent = ({project}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true); // Add a loading state

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const getUserDetails = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userDetails');
      const userDetails = userInfo ? JSON.parse(userInfo) : null;
      setUser(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // Stop loading once user details are fetched
    }
  };
  useEffect(() => {
    getUserDetails();
  },[loading]);
  const projectNo = project?.ProjectNo; // Replace with dynamic project number if needed

  const [messages, setMessages] = useState([]);

  // Fetch messages from GroupMessage API
  const fetchMessagesAPI = async (message) => {

    const userInfo = await AsyncStorage.getItem('userDetails');
    const userDetails = userInfo ? JSON.parse(userInfo) : null;
    try {
      const response = await fetch(
        'https://crmss.naffco.com/CRMSS/CRMAdmin/SteeringCommittee.aspx/GroupMessage',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userDetails?.UserID, ProjectNo: projectNo, Message:message?.text ?? '' }),
        }
      );

      const result = await response.json();

      // {"Date": "25 Dec 2024 06:09:27:400", "Message": "TEST", "SenderID": "8895", "SenderName": "ABDULNAVAS", "Time": "06:09", "UpdateTime": "/Date(1735092567000)/", "__type": "CRMAdmin_SteeringCommittee+GroupMessages"}
      if (result && result.d) {
        const apiMessages = result.d.map((msg, index) => {
          const dateString = msg.Date;

          const [day, month, year, timeWithMillis] = dateString.split(' ');

          // Split time with milliseconds into hours, minutes, seconds, and milliseconds
          const [hours, minutes, seconds, millis] = timeWithMillis.split(':');


          // Map month abbreviation to its numeric value
          const monthMap = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
          };

          // Convert month to number
          const monthNumber = monthMap[month];

          // Log the mapped month number
          // Construct the ISO date string
          const isoDate = `${year}-${monthNumber}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}.${millis}`;

          // Log the ISO date string before creating Date object

          // Convert to a Date object
          const localDate = new Date(isoDate);
        return ({
          _id: index + 1,
          text: msg.Message,
          createdAt: localDate.getTime()         , // Ensure your API returns a proper timestamp
          user: {
            _id: msg.SenderID,
            name: msg.SenderName,
            avatar: '',
          },
        });});
        setMessages(apiMessages);
      } else {
        setErrorMessage('Failed to fetch messages.');
      }
    } catch (error) {
      setErrorMessage('Unable to fetch messages from the server.');

    }
  };

  // Send a message to SendMessage API
  // const sendMessageAPI = async (message) => {
  // console.log("user",user);


  // };
  // const sendMessageAPI = async (message) => {
  //   if (!user) {
  //     Alert.alert("Error", "User not loaded. Please try again.");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       'https://crmss.naffco.com/CRMSS/CRMAdmin/SteeringCommittee.aspx/GroupMessage',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           UserId: user?.UserID,
  //           ProjectNo: projectNo,
  //           Message: message.text,
  //         }),
  //       }
  //     );
  //     console.log("user",user);

  //     console.log("response>>", response);

  //     const result = await response.json();
  //     console.log("result>>", result);

  //     if (!result || result.d !== 'Success') {
  //       setErrorMessage('Failed to send the message.');
  //     }else {
  //       // fetchMessagesAPI();
  //       const apiMessages = result.d.map((msg, index) => {
  //         const dateString = msg?.Date;

  //         const [day, month, year, timeWithMillis] = dateString.split(' ');
  //         const [hours, minutes, secondsWithMillis] = timeWithMillis.split(':');
  //         const [seconds, millis] = secondsWithMillis.split(':');
  //         const monthMap = {
  //           Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  //           Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  //         };

  //         const monthNumber = monthMap[month];
  //         const isoDate = `${year}-${monthNumber}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}.000Z`;
  //       return ({
  //         _id: index + 1,
  //         text: msg.Message,
  //         createdAt: new Date(isoDate)          , // Ensure your API returns a proper timestamp
  //         user: {
  //           _id: msg.SenderID,
  //           name: msg.SenderName,
  //           avatar: '',
  //         },
  //       });});
  //       setMessages(apiMessages.reverse());
  //     }
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     setErrorMessage('Unable to send message to the server.');

  //   }
  // };

  // Handle sending a new message
  const onSend = useCallback((newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    fetchMessagesAPI(newMessages[0]);
  }, []);

  useEffect(() => {
    if(user?.UserID && projectNo) {
      fetchMessagesAPI();
    }
  }, [user?.UserID, projectNo]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#b01c12', // Customize sender bubble color
          },
          left: {
            backgroundColor: '#d3d3d3', // Customize receiver bubble color
          },
        }}
      />
    );
  };

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: user?.UserID,
          name: user?.EmpName,
          avatar: user?.ImageURL,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ChatComponent;
