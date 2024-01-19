export const postAdminUser = (data) => {
	return async () => {
		const response = await fetch("http://localhost:8000/loginUsers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const resData = await response.json();
		return resData;
	};
};

export const updateAdminAction = (data, id) => {
	return async () => {
		const response = await fetch(`http://localhost:8000/loginUsers/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const resData = await response.json();
		return resData;
	};
};
