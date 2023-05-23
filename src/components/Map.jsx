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
  const [isRefreshCheckIn, setIsRefreshCheckIn] = useState(false);
  const [isAfterGetCheckin, setIsAfterGetCheckin] = useState(false);

  const [seatCode, setSeatCode] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);

  useEffect(() => {
    if (!isInitial) {
      initialRenderMap()
        .finally(() => setIsInitial(true))
    }
  }, [])

  useEffect(() => {
    if (isInitial && !isRefreshCheckIn) {
      const renderCheckIn = async () => {
        try {
          const dataCheckin = await getCheckIn();

          dataCheckin.map(item => {
            const targetDiv = document.querySelector(`div[name="${item}"]`);

            if (targetDiv) {
              targetDiv.setAttribute('isCheckIn', true);
              targetDiv.classList.add('isCheckIn');
            }
          })

          setIsAfterGetCheckin(true)
          setIsRefreshCheckIn(true)
        } catch (err) {
          console.error(err)
        }
      }

      renderCheckIn()
    }
  }, [isInitial, isRefreshCheckIn])

  useEffect(() => {
    if (isInitial && isAfterGetCheckin) {
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
  }, [isInitial, isAfterGetCheckin])

  const refreshCheckIn = () => {
    setIsAfterGetCheckin(false);
    setIsRefreshCheckIn(false);
  }

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
        onClick={refreshCheckIn}
        disabled={!isRefreshCheckIn}
        className='fixed z-10 rounded-full bottom-6 right-7'
      >
        <span className={`refresh-checkin ${!isRefreshCheckIn && 'refresh-checkin-load'}`}></span>
      </button>

      <div className='overflow-auto'>
        <div id='main-grid' className='main-grid'>
        </div>
      </div>
    </>
  )
}

export default Map