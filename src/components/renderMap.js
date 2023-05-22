import { COLUMN_AMOUNT, ROW_AMOUNT } from "../helpers/boxAmount";

export const renderMap = async () => {
  const mainGrid = document.getElementById("main-grid");
  // Get the query string from the URL
  const queryString = window.location.search;

  // Create a new URLSearchParams object from the query string
  const urlParams = new URLSearchParams(queryString);

  // Use the get() method to get the value of a parameter
  const paramValue = urlParams.get('mode');

  const CELLS = ROW_AMOUNT * COLUMN_AMOUNT;

  let increment = 1;

  for (let i = 1; i <= CELLS; i++) {
    const rowNumber = Math.ceil(i / COLUMN_AMOUNT);
    const colNumber = increment;
    const div = document.createElement('div');

    div.classList.add('item', 'min-h-[1.5rem]');
    div.setAttribute('id', `item-${i}`);
    if (paramValue === 'edit') {
      div.setAttribute('data-tooltip', `(${rowNumber}, ${colNumber})`);
    }

    mainGrid.appendChild(div);

    increment++;
    if (increment > COLUMN_AMOUNT) {
      increment = 1;
    }
  }
}