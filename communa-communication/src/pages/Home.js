import React, { Fragment, useCallback, useState } from "react";
import { useSocket } from "../context/socketProvider";

export const Home = () => {
   const [email, setEmail] = useState("");
   const [room, setRoom] = useState("");

   const socket = useSocket();

   const handleSubmitForm = useCallback(
      (e) => {
         e.preventDefault();
         socket.emit("room:join", { email, room });
      },
      [email, room, socket]
   );

   return (
      <Fragment>
         <div className="container flex mx-auto justify-center flex-col items-center border border-red-500 h-[100vh] w-full">
            <div className="appTitle">
               <h1 className="text-4xl">COMMUNA</h1>
            </div>
            <div className="form my-5">
               <form onSubmit={handleSubmitForm}>
                  <div>
                     <label htmlFor="userEmail">Email:</label>
                     <input
                        type="email"
                        id="userEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border focus:outline-none text-gray-700 py-2 px-3"
                        placeholder="example@gmail.com"
                     />
                  </div>
                  <div className="my-3">
                     <label htmlFor="userRoom">Room:</label>
                     <input
                        type="text"
                        id="userRoom"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="border focus:outline-none text-gray-700 py-2 px-3"
                        placeholder="123"
                     />
                  </div>
                  <div className="btns flex items-center justify-center">
                     <button
                        type="submit"
                        className="rounded-md bg-blue-400 hover:bg-blue-300 py-2 px-5"
                     >
                        Join
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </Fragment>
   );
};
