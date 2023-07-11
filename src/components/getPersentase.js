export const getPersentase = async () => {
  const fetchPersentase = await fetch(`${import.meta.env.VITE_API_URL}/seat-class/checkin/leftovers/konser-wanita-hebat`, {
    headers: {
      'api-key': import.meta.env.VITE_API_KEY
    }
  });
  const response = await fetchPersentase.json();

  const data = response.data;

  const ALLOCATION = 5721;

  const totalCheckin = Object.values(data).reduce((accumulator, currentValue) => {
    return accumulator + currentValue.checkin;
  }, 0);

  function getDataPersentase() {
    return (totalCheckin / ALLOCATION) * 100;
  }

  function getLeftOver() {
    return ALLOCATION - totalCheckin;
  }

  return {
    allPersentase: getDataPersentase(),
    checkin: totalCheckin,
    leftOver: getLeftOver()
  }
}