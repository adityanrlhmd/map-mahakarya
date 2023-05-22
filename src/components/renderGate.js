import gates from '../data/coordinate-gate.json'

export const renderGate = async () => {
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
}