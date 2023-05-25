import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { getCheckIn } from './getCheckIn'
import { renderAreaAndGate } from './renderAreaAndGate'
import { renderMap } from './renderMap'
import { renderSeats } from './renderSeats'

const initialRenderMap = async () => {
  try {
    await renderMap()
    await renderAreaAndGate()
    await renderSeats()
  } catch (err) {
    console.error(err)
  }
}

const Map = () => {
  const [isInitial, setIsInitial] = useState(false);
  const [isLoadCheckIn, setIsLoadCheckIn] = useState(true);

  const [seatCode, setSeatCode] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);

  const renderClickBox = () => {
    const boxSeats = document.querySelectorAll(`.boxSeat`);

    boxSeats.forEach(item => {
      const name = item.getAttribute('name');
      const isCheckIn = item.getAttribute('ischeckin');

      const openBoxDetail = (isCheckIn) => {
        setSeatCode(name)
        setIsShowModal(true)
        setIsCheckIn(isCheckIn)
      }

      item.onclick = () => {
        openBoxDetail(isCheckIn)
      }
    })
  }

  const renderCheckIn = async () => {
    try {
      setIsLoadCheckIn(true)
      const dataCheckin = await getCheckIn();

      dataCheckin.map(item => {
        const targetDiv = document.querySelector(`div[name="${item.seat_code}"]`);

        if (targetDiv) {
          targetDiv.setAttribute('isCheckIn', true);
          targetDiv.classList.add('isCheckIn');
        }
      })

      setIsLoadCheckIn(false)

      renderClickBox()
    } catch (err) {
      setIsLoadCheckIn(false)
      console.error(err)
    }
  }

  useEffect(() => {
    if (!isInitial) {
      initialRenderMap()
        .finally(() => {
          renderCheckIn()
            .finally(() => {
              setIsInitial(true)
            })
        })
    }
  }, [])

  useEffect(() => {
    if (isInitial) {
      const interval = setInterval(() => {
        renderCheckIn()
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isInitial])

  return (
    <>
      {
        isShowModal &&
        <Modal
          isCheckIn={isCheckIn}
          seatCode={seatCode}
          setSeatCode={setSeatCode}
          setIsShowModal={setIsShowModal}
        />
      }

      <button
        type='button'
        onClick={renderCheckIn}
        disabled={isLoadCheckIn}
        className='fixed z-10 px-4 py-2 bg-white border border-gray-400 rounded-lg bottom-6 right-7 disabled:bg-gray-400'
      >
        Refresh
      </button>

      <div className='w-screen h-screen overflow-x-scroll overflow-y-scroll'>
        <div id='main-grid' className='main-grid'>
        </div>
      </div>
    </>
  )
}

export default Map