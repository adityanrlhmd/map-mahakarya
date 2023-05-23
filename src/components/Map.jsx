import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { getCheckIn } from './getCheckIn'
import { renderAreaAndGate } from './renderAreaAndGate'
import { renderMap } from './renderMap'
import { renderSeats } from './renderSeats'
import dummyCheckin from '../data/checkin.json'

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
              targetDiv.style.backgroundColor = '#42ba96';
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

      <div className='overflow-auto'>
        <div id='main-grid' className='main-grid'>
        </div>
      </div>
    </>
  )
}

export default Map