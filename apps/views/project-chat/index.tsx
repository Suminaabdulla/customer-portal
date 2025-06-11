import React from 'react';
import ChatComponent from './components/Chat';

const ProjectChatManagement = ({project}) => {
    return (
        <ChatComponent project={project}/>
    );
};

export default ProjectChatManagement;
