import React, { Fragment, Suspense, useEffect, useState } from "react";

export const Chats = () => {
   const [apiData, setApiData] = useState([]);

   return (
      <Fragment>
         <Suspense fallback="loading...">Registration Successfully</Suspense>
      </Fragment>
   );
};
