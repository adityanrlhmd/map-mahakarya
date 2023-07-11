export const getCheckIn = async () => {
  const fetchCheckin = await fetch(`${import.meta.env.VITE_API_URL}/seat-class/checkin/konser-wanita-hebat`, {
    headers: {
			'api-key': import.meta.env.VITE_API_KEY
		}
  });
  const checkin = await fetchCheckin.json();

  const dataCheckin = checkin.data;

  return dataCheckin;
}