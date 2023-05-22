import React from 'react'

const Modal = ({ seatCode, setIsShowModal }) => {
  return (
    <div
      id="myModal"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowModal(false);
      }}
      className="fixed z-20 top-0 left-0 bottom-0 right-0 bottom-0 bg-[#000000A1] flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative rounded bg-white w-[80vw] md:w-[60vw] lg:w-96 rounded-lg min-h-[10rem]"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsShowModal(false);
          }}
          className="absolute text-xl font-semibold cursor-pointer right-2">
          &times;
        </span>
        {seatCode}
      </div>
    </div>
  )
}

export default Modal