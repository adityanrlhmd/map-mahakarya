import dummy from '../data/dummy.json'
import coordianteSeats from '../data/coordinat-seat.json'
import { COLUMN_AMOUNT } from '../helpers/boxAmount';

const getItemId = (row, col) => {
  return (row - 1) * COLUMN_AMOUNT + col;
}

const colorByCode = (code) => {
  if (code === "DI") {
    return {
      bgColor: 'blue',
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

  const areaRow = 10;
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

const renderListSeat = (startDiv, data, horizontal, vertical, bgColor, textColor, isHorizontal) => {
  for (let i = 0; i < horizontal; i++) {
    // horizontal
    const currentDivIndex = startDiv + (i % horizontal) + Math.floor(i / COLUMN_AMOUNT) * COLUMN_AMOUNT;
    const currentDiv = document.getElementById(`item-${currentDivIndex}`);

    if (i === 0) {
      if (!isHorizontal) {
        const rowNameDiv = document.getElementById(`item-${currentDivIndex - COLUMN_AMOUNT}`);
        if (rowNameDiv) {
          rowNameDiv.innerText = data[i].row;
        }
      } else {
        const codeWing = data[i].code + data[i].wingAndGt;
        const codeRowNameLeft = ['SIPLE', 'GOPLE', 'PLLE', 'SIRIGT12', 'GORIGT12', 'DILE', 'PLPLE'];
        const rowNameDiv = codeRowNameLeft.includes(codeWing)
          ? document.getElementById(`item-${currentDivIndex - 1}`)
          : document.getElementById(`item-${currentDivIndex + horizontal}`);

        if (rowNameDiv) {
          rowNameDiv.innerText = data[i].row;
        }
      }
    }

    currentDiv.style.backgroundColor = bgColor;
    currentDiv.style.color = textColor;
    currentDiv.classList.add('!border', "!border-black")
    currentDiv.innerText = data[i].number;
    currentDiv.setAttribute('name', data[i].seat_code);

    // vertical
    for (let j = 1; j < vertical; j++) {
      const currentDivIndexVertical = startDiv + (i % horizontal) + (j * COLUMN_AMOUNT);
      const currentDivVertical = document.getElementById(`item-${currentDivIndexVertical}`);

      if (!currentDivVertical) return console.log(currentDivIndexVertical);

      currentDivVertical.style.backgroundColor = bgColor;
      currentDivVertical.style.color = textColor;
      currentDivVertical.classList.add('!border', "!border-black")
      currentDivVertical.innerText = data[j].number;
      currentDivVertical.setAttribute('name', data[j].seat_code);
    }
  }
}

const boxSection = (data, startDiv) => {
  const { bgColor, textColor } = colorByCode(data.code);

  const codeHorizontalView = ["DI", "PLP", "PL", "GOP", "SIP"];

  const isCodeHorizontal = codeHorizontalView.includes(data.code);
  const GOHorizontal = data.code === "GO" && ["GT9", "GT12"].includes(data.gt);
  const SIHorizontal = data.code === "SI" && ["GT9", "GT12"].includes(data.gt);

  const isHorizontal = isCodeHorizontal || GOHorizontal || SIHorizontal;

  const lengthData = data.listSeat.length;

  if (isHorizontal) {
    renderListSeat(startDiv, data.listSeat, lengthData, 1, bgColor, textColor, isHorizontal);
  } else if (data.code !== "FEST") {
    renderListSeat(startDiv, data.listSeat, 1, lengthData, bgColor, textColor, isHorizontal);
  }
}

const splitCode = (seatClass, seatCode) => {
  if (seatClass === "FESTIVAL") {
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
  } else {
    const listCode = seatCode.match(/(\D+)(\d+)(\D+\d*)/);

    const codeAndRow = listCode[1];
    const code = codeAndRow.slice(0, -1);
    const row = codeAndRow.slice(-1);

    const number = parseInt(listCode[2]);
    const wingAndGt = listCode[3];

    const seatObject = {
      seat_class: seatClass,
      seat_code: seatCode,
      full_code: code + row + wingAndGt,
      code: code,
      row: row,
      number: number,
      wingAndGt: wingAndGt,
      wing: wingAndGt.slice(0, 2),
      gt: wingAndGt.slice(2)
    }

    const newCode = {
      full_code: code + row + wingAndGt,
      code: code,
      row: row,
      wingAndGt: wingAndGt,
      wing: wingAndGt.slice(0, 2),
      gt: wingAndGt.slice(2)
    };

    return { seatObject, newCode }
  }
}

function createSeatObjects(seats) {
  let seatObjects = [];
  let codeObjects = [];

  seats.forEach(seat => {
    const { seatObject, newCode } = splitCode(seat.seat_class, seat.seat_code);

    seatObjects.push(seatObject);
    codeObjects.push(newCode)
  });

  let filteredCodeObjects = codeObjects.filter((elem, index, self) =>
    index === self.findIndex((t) => (t.code === elem.code && t.row === elem.row && t.wingAndGt === elem.wingAndGt))
  );

  return { seatObjects, codeObjects: filteredCodeObjects };
}

export const renderSeats = async () => {
  const coordinat = coordianteSeats;

  const { seatObjects, codeObjects } = createSeatObjects(dummy);

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
          jsonObj.row = refObj.row;
          jsonObj.col = refObj.col;
          jsonObj.offsetCol = refObj.offsetCol;
          jsonObj.offsetRow = refObj.offsetRow;
          jsonObj.code = refObj.code;
        }
      });
    });

    return groupedList;
  }

  const listRender = addCoordinatesToGroupedList(coordinat, groupedList);

  listRender.map(item => {
    const colNumber = item?.offsetCol ? item.col + item?.offsetCol || 0 : item.col;
    const rowNumber = item?.offsetRow ? item.row + item?.offsetRow || 0 : item.row;

    const boxId = getItemId(rowNumber, colNumber);
    boxSection(item, boxId);
  })

  renderFestivalSeat()
}
