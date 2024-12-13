import React from 'react';
// {show_loder && <ShowLoder/>}
const ShowLoder = () => {
  return (
    <>
      <style>{`
        @keyframes set_me_test {
          0% {
          width: 20%;
          background:rgb(135, 156, 238);
          }
          50% {width: 50%; left: 20%;}
          100% {
          width: 10%;
           left: 100%;
           background: #5264AE;
          }
        }

        @keyframes opacity_animation {
          0% {background: #00000000;}
          100% {background: #aeaeae73;}
        }

         .set_loder_page {
          background: #aeaeae73;
          position: absolute;
          top: 0;
          transition: all 0.2s;
          height: 100%;
          width: 100%;
          z-index: 1;
          animation: opacity_animation 0.5s ease-in-out;
        }


         .set_loder_page::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 10px;
          width: 20%;
          background: #5264AE;
          transition: all 0.2s;
          border-radius: 3px;
          animation: set_me_test 1.5s infinite;
        }
      `}</style>
        <div className={"set_loder_page"}></div>
    </>
  );
};

export default ShowLoder;
