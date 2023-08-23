import React, { Fragment, useCallback, useState } from "react";

export const Home = () => {
   const [email, setEmail] = useState("");
   const [room, setRoom] = useState("");

   const handleSubmitForm = useCallback(
      (e) => {
         e.preventDefault();
         console.log({
            email,
            room,
         });
      },
      [email, room]
   );

   return (
      <Fragment>
         <div className="container flex justify-center flex-col items-center border border-red-500 h-[100vh] w-full">
            <div className="appTitle">
               <h1 className="text-4xl">COMMUNA</h1>
            </div>
            <div className="form my-5">
               <form onSubmit={handleSubmitForm}>
                  <div>
                     <label>Email:</label>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border focus:outline-none text-gray-700 py-2 px-3"
                        placeholder="example@gmail.com"
                     />
                  </div>
                  <div className="my-3">
                     <label>Room:</label>
                     <input
                        type="text"
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
