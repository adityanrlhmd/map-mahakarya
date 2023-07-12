import coordianteSeats from '../data/coordinat-seat.json'
import { COLUMN_AMOUNT } from '../helpers/boxAmount';

const getItemId = (row, col) => {
  return (row - 1) * COLUMN_AMOUNT + col;
}

const colorByCode = (code) => {
  if (code === "VIP") {
    return {
      bgColor: 'blue',
      textColor: 'white'
    }
    // INI HARDCODE HARUS UBAH
  } else if (code === "SVIP") {
    return {
      bgColor: 'darkblue',
      textColor: 'white'
    }
  } else if (code === "PLP") {
    return {
      bgColor: 'antiquewhite',
      textColor: 'black'
    }
  } else if (code === "PL") {
    return {
      bgColor: 'purple',
      textColor: 'white'
    }
  } else if (code === "GOP") {
    return {
      bgColor: 'green',
      textColor: 'white'
    }
  } else if (code === "GO") {
    return {
      bgColor: 'yellow',
      textColor: 'black'
    }
  } else if (code === "SIP") {
    return {
      bgColor: 'black',
      textColor: 'white'
    }
  } else if (code === "SI") {
    return {
      bgColor: 'gray',
      textColor: 'white'
    }
  } else if (code === "BR") {
    return {
      bgColor: 'orange',
      textColor: 'white'
    }
  } else {
    return {
      bgColor: 'black',
      textColor: 'white'
    }
  }
}

const renderFestivalSeat = () => {
  const divBoxItem = document.getElementById('item-1');
  const boxWidth = divBoxItem.getBoundingClientRect().width;
  const boxHeight = divBoxItem.getBoundingClientRect().height;

  const mainGrid = document.getElementById("main-grid");
  mainGrid.style.position = 'relative';

  const areaRow = 17;
  const areaCol = 47;
  const areaOffsetRow = 20;
  const areaOffsetCol = 41;

  const div = document.createElement('div');
  const p = document.createElement('p');
  div.style.position = 'absolute';
  div.style.top = `${boxHeight * areaRow}px`;
  div.style.left = `${boxWidth * areaCol}px`;
  div.style.height = `${boxHeight * areaOffsetRow}px`;
  div.style.width = `${boxHeight * areaOffsetCol}px`;
  div.classList.add('bg-black', 'border', 'border-black', 'flex', 'items-center', 'justify-center')

  p.innerText = `FESTIVAL`;
  p.classList.add('font-semibold', 'text-lg', 'px-6', 'py-2', 'text-white', 'w-fit');

  div.appendChild(p);
  mainGrid.appendChild(div);
}

// const renderListSeat = (startDiv, data, horizontal, vertical, bgColor, textColor, isHorizontal, dataItem) => {
//   let breakpointsLength;
//   let tempHorizontalValue;
//   let breakpointsColLength;
//   let localIteration = 0;
//   let rowBreakpoint = 0;
//   let breakpointRowIndex = 0;
//   let breakpointColumnIndex = 0;

//   let breakpointAccumulator = 0;
//   let horizontalValue = horizontal;

//   if (dataItem.breakpoints && dataItem.breakpoints.length > 0) {
//     // setup initial length
//     breakpointsLength = dataItem.breakpoints.length;
//     breakpointsColLength = dataItem.breakpoints[breakpointRowIndex].length - 1;

//     breakpointAccumulator = dataItem.breakpoints[breakpointRowIndex][breakpointColumnIndex];
//     horizontalValue = dataItem.breakpoints[breakpointRowIndex].reduce((accumulator, currentValue) => {
//       return accumulator + currentValue;
//     }, 0);
//     rowBreakpoint += horizontalValue;
//   }

//   for (let i = 0; i < horizontal; i++) {
//     if (i === 506) {
//       break;
//     }
//     // Will reset after changing row
//     localIteration++

//     // horizontal
//     let horizontalStartDiv = startDiv;

//     const BREAKPOINTGAP = 2;
//     if (dataItem.breakpoint <= i) {
//       horizontalStartDiv = getItemId(rowDataIndex, dataItem.col + BREAKPOINTGAP);
//     }

//     if (dataItem.breakpoints && dataItem.breakpoints.length > 0) {
//       let nextAccumulatorData = breakpointAccumulator + dataItem.breakpoints[breakpointRowIndex][breakpointColumnIndex + 1];

//       if (isNaN(nextAccumulatorData)) {
//         nextAccumulatorData = breakpointAccumulator + dataItem.breakpoints[breakpointRowIndex + 1][0];
//         console.log("nextAccumulatorData", nextAccumulatorData)
//       }

//       if (nextAccumulatorData === i) {
//         // Kalau udah masuk breakpoint selanjutnya, tambah column index, kemudian tambah breakpoint accumulator
//         breakpointColumnIndex++;

//         // Kalau iterasi sudah sama dengan break point, maka break point acumulatornya naik
//         let breakpointsColData = dataItem.breakpoints[breakpointRowIndex][breakpointColumnIndex];
//         if (isNaN(breakpointsColData)) {
//           breakpointsColData = dataItem.breakpoints[breakpointRowIndex + 1][0];
//         }

//         breakpointAccumulator += breakpointsColData
//       }

//       // console.log('breakpointAccumulator', breakpointAccumulator)
//       // If the col index is the same with the accumulator data
//       if (breakpointAccumulator <= i) {
//         let colDataIndex = 0;

//         if (breakpointRowIndex === 0) {
//           colDataIndex = breakpointColumnIndex === 0 ? BREAKPOINTGAP : BREAKPOINTGAP * (breakpointColumnIndex + 1);
//         } else {
//           colDataIndex = breakpointColumnIndex === 0 ? 0 : BREAKPOINTGAP * (breakpointColumnIndex);
//         }

//         if (rowBreakpoint === i) {
//           breakpointRowIndex++;
//           breakpointsColLength = dataItem.breakpoints[breakpointRowIndex].length - 1;

//           // reset column index
//           breakpointColumnIndex = 0;

//           horizontalValue = dataItem.breakpoints[breakpointRowIndex].reduce((accumulator, currentValue) => {
//             return accumulator + currentValue;
//           }, 0);

//           // if (i > 141) {
//           //   horizontalValue = tempHorizontalValue
//           // }

//           // Update horizontal value
//           rowBreakpoint += dataItem.breakpoints[breakpointRowIndex].reduce((accumulator, currentValue) => {
//             return accumulator + currentValue;
//           }, 0);

//           localIteration = 0
//           colDataIndex = 0;
//         }

//         // if column length is maximum, then shift to next row
//         // space after breakpoint
//         // math: 20 + (2 * 0) = 20
//         // console.log(breakpointRowIndex)
//         const rowDataIndex = dataItem.row + (BREAKPOINTGAP * breakpointRowIndex);

//         //overwrite start div
//         // math: 15 + (2 * 0) = 15
//         horizontalStartDiv = getItemId(rowDataIndex, dataItem.col + colDataIndex);
//       }
//     }

//     const currentDivIndex = horizontalStartDiv + (localIteration % horizontalValue) + Math.floor(i / COLUMN_AMOUNT) * COLUMN_AMOUNT;

//     if (i == 142) {
//       console.log("Iteration", i);
//       console.log("horizontalStartDiv", horizontalStartDiv)
//       console.log("currentDivIndex", currentDivIndex)
//       console.log("horizontalValue", horizontalValue)
//     }

//     const currentDiv = document.getElementById(`item-${currentDivIndex}`);

//     if (i === 0) {
//       if (!isHorizontal) {
//         const rowNameDiv = document.getElementById(`item-${currentDivIndex - COLUMN_AMOUNT}`);
//         if (rowNameDiv && data[i].row) {
//           rowNameDiv.innerText = data[i].row;
//         }
//       } else {
//         const codeWing = data[i].code + data[i].wingAndGt;
//         // INI HARDCODE HARUS UBAH
//         const codeRowNameLeft = ['SIPLE', 'GOPLE', 'PLLE', 'SIRIGT12', 'GORIGT12', 'DILE', 'PLPLE'];
//         const rowNameDiv = codeRowNameLeft.includes(codeWing)
//           ? document.getElementById(`item-${currentDivIndex - 1}`)
//           : document.getElementById(`item-${currentDivIndex + horizontal}`);

//         if (rowNameDiv && data[i].row) {
//           rowNameDiv.innerText = data[i].row;
//         }
//       }
//     }

//     currentDiv.style.backgroundColor = bgColor;
//     currentDiv.style.color = textColor;
//     currentDiv.classList.add('boxSeat', '!border', "!border-black", 'cursor-pointer')
//     currentDiv.innerText = data[i].number;
//     currentDiv.setAttribute('name', data[i].seat_code);
//     currentDiv.setAttribute('number', data[i].number);

//     // vertical
//     for (let j = 1; j < vertical; j++) {
//       const currentDivIndexVertical = startDiv + (i % horizontal) + (j * COLUMN_AMOUNT);
//       const currentDivVertical = document.getElementById(`item-${currentDivIndexVertical}`);

//       if (!currentDivVertical) return console.log(currentDivIndexVertical);

//       currentDivVertical.style.backgroundColor = bgColor;
//       currentDivVertical.style.color = textColor;
//       currentDivVertical.classList.add('boxSeat', '!border', "!border-black", 'cursor-pointer')
//       currentDivVertical.innerText = data[j].number;
//       currentDivVertical.setAttribute('name', data[j].seat_code);
//       currentDivVertical.setAttribute('number', data[j].number);
//     }
//   }
// }

const renderListSeat = (startDiv, data, horizontal, vertical, bgColor, textColor, isHorizontal, dataItem) => {
  let breakIndex = 0;
  let colBreakpoint = dataItem.breakpoints[breakIndex];

  for (let i = 0; i < horizontal; i++) {
    let nextColBreakpoint = colBreakpoint + dataItem.breakpoints[breakIndex + 1];
    // horizontal
    let horizontalStartDiv = startDiv;

    const BREAKPOINTGAP = 2;

    if (i === nextColBreakpoint) {
      breakIndex++;
      colBreakpoint += dataItem.breakpoints[breakIndex];
    }

    if (colBreakpoint <= i) {
      horizontalStartDiv = getItemId(dataItem.row, dataItem.col + (BREAKPOINTGAP * (breakIndex + 1)));
    } else {
      // const COLDATAINDEX = breakIndex === 0 ? 0 : BREAKPOINTGAP;
      horizontalStartDiv = getItemId(dataItem.row, dataItem.col);
    }
    // if (dataItem.breakpoints.length > 0 && dataItem.breakpoints[breakIndex] <= i) {
    //   breakIndex++
    //   horizontalStartDiv = getItemId(dataItem.row, dataItem.col + BREAKPOINTGAP);
    // }

    const currentDivIndex = horizontalStartDiv + (i % horizontal) + Math.floor(i / COLUMN_AMOUNT) * COLUMN_AMOUNT;

    const currentDiv = document.getElementById(`item-${currentDivIndex}`);

    if (i === 0) {
      if (!isHorizontal) {
        const rowNameDiv = document.getElementById(`item-${currentDivIndex - COLUMN_AMOUNT}`);
        if (rowNameDiv && data[i].row) {
          rowNameDiv.innerText = data[i].row;
        }
      } else {
        const codeWing = data[i].code + data[i].wingAndGt;
        // INI HARDCODE HARUS UBAH
        const codeRowNameLeft = ['SIPLE', 'GOPLE', 'PLLE', 'SIRIGT12', 'GORIGT12', 'DILE', 'PLPLE'];
        const rowNameDiv = codeRowNameLeft.includes(codeWing)
          ? document.getElementById(`item-${currentDivIndex - 1}`)
          : document.getElementById(`item-${currentDivIndex + horizontal}`);

        if (rowNameDiv && data[i].row) {
          rowNameDiv.innerText = data[i].row;
        }
      }
    }

    currentDiv.style.backgroundColor = bgColor;
    currentDiv.style.color = textColor;
    currentDiv.classList.add('boxSeat', '!border', "!border-black", 'cursor-pointer')
    currentDiv.innerText = data[i].number;
    currentDiv.setAttribute('name', data[i].seat_code);
    currentDiv.setAttribute('number', data[i].number);

    // vertical
    for (let j = 1; j < vertical; j++) {
      const currentDivIndexVertical = startDiv + (i % horizontal) + (j * COLUMN_AMOUNT);
      const currentDivVertical = document.getElementById(`item-${currentDivIndexVertical}`);

      if (!currentDivVertical) return console.log(currentDivIndexVertical);

      currentDivVertical.style.backgroundColor = bgColor;
      currentDivVertical.style.color = textColor;
      currentDivVertical.classList.add('boxSeat', '!border', "!border-black", 'cursor-pointer')
      currentDivVertical.innerText = data[j].number;
      currentDivVertical.setAttribute('name', data[j].seat_code);
      currentDivVertical.setAttribute('number', data[j].number);
    }
  }
}

const boxSection = (data) => {
  const colNumber = data?.offsetCol ? data.col + data?.offsetCol || 0 : data.col;
  const rowNumber = data?.offsetRow ? data.row + data?.offsetRow || 0 : data.row;

  const boxId = getItemId(rowNumber, colNumber);

  const { bgColor, textColor } = colorByCode(data.code);

  // INI HARDCODE HARUS UBAH
  const codeHorizontalView = ["SVIP", "VIP", "PLP", "PL", "GOP", "SIP"];

  const isCodeHorizontal = codeHorizontalView.includes(data.code);
  const GOHorizontal = data.code === "GO" && ["GT9", "GT12"].includes(data.gt);
  const SIHorizontal = data.code === "SI" && ["GT9", "GT12"].includes(data.gt);

  const isHorizontal = isCodeHorizontal || GOHorizontal || SIHorizontal;

  const lengthData = data.listSeat.length;

  // INI HARDCODE HARUS UBAH
  if (["SVIP", "VIP"].includes(data.code)) {
    if (isHorizontal) {
      renderListSeat(boxId, data.listSeat, lengthData, 1, bgColor, textColor, isHorizontal, data);
    } else if (data.code !== "FEST") {
      renderListSeat(boxId, data.listSeat, 1, lengthData, bgColor, textColor, isHorizontal, data);
    }
  }
}

const splitCode = (seatClass, seatCode) => {
  // if (["SUPER VIP", "FESTIVAL"].includes(seatClass)) {
  const code = seatCode.match(/^[^\d]*/)[0];
  const number = parseInt(seatCode.match(/\d+/)[0]);

  const seatObject = {
    seat_class: seatClass,
    seat_code: seatCode,
    full_code: code,
    code: code,
    number: number
  }

  const newCode = {
    full_code: code,
    code
  };

  return { seatObject, newCode };
  // } else {
  //   const listCode = seatCode.match(/(\D+)(\d+)(\D+\d*)/);

  //   const codeAndRow = listCode[1];

  //   const code = codeAndRow.slice(0, -1);
  //   const row = codeAndRow.slice(-1);

  //   const number = parseInt(listCode[2]);
  //   const wingAndGt = listCode[3];

  //   const seatObject = {
  //     seat_class: seatClass,
  //     seat_code: seatCode,
  //     full_code: code + row + wingAndGt,
  //     code: code,
  //     row: row,
  //     number: number,
  //     wingAndGt: wingAndGt,
  //     wing: wingAndGt.slice(0, 2),
  //     gt: wingAndGt.slice(2)
  //   }

  //   const newCode = {
  //     full_code: code + row + wingAndGt,
  //     code: code,
  //     row: row,
  //     wingAndGt: wingAndGt,
  //     wing: wingAndGt.slice(0, 2),
  //     gt: wingAndGt.slice(2)
  //   };

  //   return { seatObject, newCode }
  // }
}

function createSeatObjects(seats) {
  let seatObjects = [];
  let codeObjects = [];

  seats.forEach(seat => {
    // if (seat.seat_class_code == 'DIP') console.log(seat)
    if (!['EX'].includes(seat.seat_class_code)) {
      const { seatObject, newCode } = splitCode(seat.seat_class, seat.seat_code);

      seatObjects.push(seatObject);
      codeObjects.push(newCode)
    }
  });

  let filteredCodeObjects = codeObjects.filter((elem, index, self) =>
    index === self.findIndex((t) => (t.code === elem.code && t.row === elem.row && t.wingAndGt === elem.wingAndGt))
  );

  return { seatObjects, codeObjects: filteredCodeObjects };
}

export const renderSeats = async () => {
  const fetchSeats = await fetch(`${import.meta.env.VITE_API_URL}/seat-class/konser-wanita-hebat`, {
    headers: {
      'api-key': import.meta.env.VITE_API_KEY
    }
  });
  const dataSeats = await fetchSeats.json();

  const coordinat = coordianteSeats;

  const { seatObjects, codeObjects } = createSeatObjects(dataSeats.data);

  const filterSeat = codeObjects.map(item => {
    return seatObjects.filter(seat => seat.code === item.code && seat.row === item.row && seat.wingAndGt === item.wingAndGt);
  })

  const groupedList = filterSeat.map((arr) => {
    const obj = {};
    obj.type = arr[0].full_code;
    obj.wing = arr[0].wing;
    obj.gt = arr[0].gt;
    obj.listSeat = arr;
    return obj;
  });

  function addCoordinatesToGroupedList(coordinat, groupedList) {
    coordinat.forEach((refObj) => {
      groupedList.forEach((jsonObj) => {
        if (jsonObj.listSeat[0].full_code === refObj.full_code) {
          refObj.type = jsonObj.type;
          refObj.wing = jsonObj.wing;
          refObj.gt = jsonObj.gt;
          refObj.listSeat = jsonObj.listSeat.slice(refObj?.start, refObj?.end);
        }
      });
    });

    return coordinat;
  }

  const listRender = addCoordinatesToGroupedList(coordinat, groupedList);
  listRender.map((item) => {
    boxSection(item);
  })

  // renderFestivalSeat()
}
