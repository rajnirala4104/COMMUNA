import React, { Fragment, Suspense, useEffect, useState } from "react";
import { getChats } from "../api/servces";

export const Chats = () => {
   const [apiData, setApiData] = useState([]);

   const fetchApiData = async () => {
      const data = await getChats();
      setApiData(data.data);
   };

   useEffect(() => {
      fetchApiData();
   }, []);
   console.log(apiData);

   return (
      <Fragment>
         <Suspense fallback="loading...">
            <div className="data">
               {apiData.length &&
                  apiData.map((singleData, i) => {
                     return (
                        <Fragment key={i}>
                           <h2>
                              <strong>{singleData.chatName} : </strong>
                              {singleData.isGroupChat ? "Group" : "Person"}
                           </h2>
                        </Fragment>
                     );
                  })}
            </div>
         </Suspense>
      </Fragment>
   );
};
