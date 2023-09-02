import React, { useEffect, useState } from "react";
import { getChats } from "../api/servces";

export const Chats = () => {
   const [apiData, setApiData] = useState([]);

   // console.log(apiData);
   const fetchApiData = async () => {
      const data = await getChats();
      console.log(data);
   };

   useEffect(() => {
      fetchApiData();
   }, []);

   return <div>Chats</div>;
};
