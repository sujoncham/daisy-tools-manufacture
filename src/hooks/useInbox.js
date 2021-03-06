import { useEffect, useState } from 'react';

const useInbox = () => {
    const [inboxs, setInboxs] = useState([]);

    useEffect(()=>{
        fetch('https://hidden-beyond-54066.herokuapp.com/inbox')
        .then(res =>res.json())
        .then(data =>setInboxs(data));
    }, []);

    return [inboxs];
};

export default useInbox;