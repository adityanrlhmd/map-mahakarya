export const getCheckIn = async () => {
  const fetchCheckin = await fetch(`${import.meta.env.VITE_API_URL}/seat-class/checkin/51-tahun-kerajaan-cinta-ahmad-dhani`, {
    headers: {
			'api-key': import.meta.env.VITE_API_KEY
		},
  });
  const checkin = await fetchCheckin.json();

  const dataCheckin = checkin.data;

  return dataCheckin;
}