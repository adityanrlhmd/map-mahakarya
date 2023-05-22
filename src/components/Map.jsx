import React, { useEffect, useState } from 'react'
import { renderMap } from './renderMap'
import { renderGate } from './renderGate'
import { renderSeats } from './renderSeats'
import { getCheckIn } from './getCheckIn'
import Modal from './Modal'

const initialRenderMap = async () => {
  try {
    await renderMap()
    await renderGate()
    await renderSeats()
  } catch (err) {
    console.error(err)
  }
}

const Map = () => {
  const [isInitial, setIsInitial] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [seatCode, setSeatCode] = useState('');

  useEffect(() => {
    if (!isInitial) {
      initialRenderMap()
        .finally(() => setIsInitial(true))
    }
  }, [])

  useEffect(() => {
    if (isInitial) {
      const renderCheckIn = async () => {
        try {
          const dataCheckin = await getCheckIn();

          dataCheckin.map(item => {
            const targetDiv = document.querySelector(`div[name="${item}"]`);

            if (targetDiv) {
              targetDiv.style.backgroundColor = 'red';
              targetDiv.classList.add('cursor-pointer');
              targetDiv.onclick = () => {
                setIsShowModal(true)
                setSeatCode(item)
              }
            }
          })
        } catch (err) {
          console.error(err)
        }
      }

      renderCheckIn()
    }
  }, [isInitial])

  return (
    <>
      {
        isShowModal &&
        <Modal
          seatCode={seatCode}
          setSeatCode={setSeatCode}
          setIsShowModal={setIsShowModal}
        />
      }
      <div id='main-grid' className='main-grid'>
      </div>
    </>
  )
}

export default Map