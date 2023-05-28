import React, { useEffect, useMemo, useState } from 'react'

async function getDetail(seatCode) {
  const fetchDetail = await fetch(`${import.meta.env.VITE_API_URL}/order/wristband/data/${seatCode}`, {
    headers: {
      'api-key': import.meta.env.VITE_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  const res = await fetchDetail.json();
  return res
}

const convertCode = (seatCode) => {
  const listCode = seatCode.match(/(\D+)(\d+)(\D+\d*)/);

  if (listCode) {
    const codeAndRow = listCode[1];

    const code = codeAndRow.slice(0, -1);
    const row = codeAndRow.slice(-1);

    const number = parseInt(listCode[2]);
    const wingAndGt = listCode[3];

    return {
      code, row, number, wing: wingAndGt.slice(0, 2), gate: wingAndGt.slice(2)
    }
  } else {
    const matchesNew = seatCode.match(/(\D+)(\d+)/);

    const codeAndRow = matchesNew[1];

    const code = codeAndRow.slice(0, -1);
    const row = codeAndRow.slice(-1);

    const number = parseInt(matchesNew[2]);

    return {
      code, row, number
    }
  }
}

const capitalize = (str) => {
  return str.replace(/_/g, ' ')
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Modal = ({ seatCode, setIsShowModal, isCheckIn }) => {
  const [dataDetail, setDataDetail] = useState(null);
  const [isLoadData, setIsLoadData] = useState(false);

  useEffect(() => {
    if (seatCode && isCheckIn) {
      setIsLoadData(true)
      getDetail(seatCode)
        .then(data => {
          if (data?.success) {
            setDataDetail(data?.data)
          } else {
            console.table(data)
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoadData(false))
    }
  }, [isCheckIn])

  const splitCode = useMemo(() => {
    return convertCode(seatCode)
  }, [seatCode])

  return (
    <>
      <div
        id="myModal"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(false);
        }}
        className="fixed z-20 top-0 left-0 bottom-0 right-0 bg-[#0000008a] flex items-center justify-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative bg-white w-[80%] md:w-[60%] lg:w-96 rounded-lg min-h-[12rem] p-5 flex flex-col"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
            className="absolute text-xl font-semibold cursor-pointer top-1 right-3">
            &times;
          </span>

          <h1 className={`text-lg font-semibold ${isCheckIn ? 'mb-3' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
            {seatCode}
          </h1>

          {
            isCheckIn &&
            <>
              {
                isLoadData ?
                  <div className='flex items-center justify-center grow'>
                    <span className='loader'></span>
                  </div> :
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='flex flex-col items-center justify-center'>
                      <h4 className='text-sm text-center'>Name</h4>
                      <p className='font-semibold text-center'>
                        {dataDetail?.first_name} {dataDetail?.last_name}
                      </p>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                      <h4 className='text-sm text-center'>Phone</h4>
                      <p className='font-semibold text-center'>
                        {dataDetail?.phone_number}
                      </p>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                      <h4 className='text-sm text-center'>Email</h4>
                      <p className='font-semibold text-center'>
                        {dataDetail?.email}
                      </p>
                    </div>

                    {
                      Object.keys(splitCode).map((key) => {
                        if (!splitCode[key]) return null

                        const customKey = (key) => {
                          if (key === 'Number') {
                            return 'Get Number'
                          } else return key
                        }
                        return (
                          <div key={key} className='flex flex-col items-center'>
                            <h4 className='text-sm text-center'>
                              {customKey(capitalize(key))}
                            </h4>

                            <p className='font-semibold text-center'>
                              {splitCode[key]}
                            </p>
                          </div>
                        )
                      })
                    }
                  </div>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Modal