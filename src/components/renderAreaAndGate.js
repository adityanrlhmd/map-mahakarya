import gates from '../data/coordinate-gate.json'
import area from '../data/coordinate-area.json'

export const renderAreaAndGate = async () => {
  const divBoxItem = document.getElementById('item-1');
  const boxWidth = divBoxItem.getBoundingClientRect().width;
  const boxHeight = divBoxItem.getBoundingClientRect().height;

  const mainGrid2 = document.getElementById("main-grid");
  mainGrid2.style.position = 'relative';

  gates.map(item => {
    const gateCol = item.col;
    const gateRow = item.row;

    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = `GATE ${item.gate}`;
    p.style.position = 'absolute';
    p.style.top = `${boxHeight * gateRow}px`;
    p.style.left = `${boxWidth * gateCol}px`;
    p.classList.add('text-lg', 'px-8', 'py-2', 'border', 'border-black', 'bg-white');
    div.appendChild(p);
    div.setAttribute('id', 'gate');
    mainGrid2.appendChild(div);
  })

  area.map(item => {
    const areaCol = item.col;
    const areaRow = item.row;
    const areaOffsetRow = item.offsetRow;
    const areaOffsetCol = item.offsetCol;

    const div = document.createElement('div');
    const divContent = document.createElement('div');
    const p = document.createElement('p');
    div.style.position = 'absolute';
    div.style.top = `${boxHeight * areaRow}px`;
    div.style.left = `${boxWidth * areaCol}px`;
    div.style.height = `${boxHeight * areaOffsetRow}px`;
    div.style.width = `${boxHeight * areaOffsetCol}px`;
    div.classList.add('bg-transparent', 'border', 'border-red-500', '-z-10')
    
    divContent.classList.add('relative', 'w-full', 'h-full', 'bg-transparent')
    
    p.innerText = `${item.area}`;
    p.style.top = item.directionName.top;
    p.style.left = item.directionName.left;
    p.style.right = item.directionName.right;
    p.style.bottom = item.directionName.bottom;
    p.classList.add('absolute','text-lg', 'px-6', 'py-2', 'border', 'border-black', 'bg-white', 'w-fit');

    divContent.appendChild(p);
    div.appendChild(divContent);
    mainGrid2.appendChild(div);
  })
}