const getAuthToken = () => {
	return fetch("https://uat.setu.co/api/v2/auth/token", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			clientID: "e40c012a-288f-44d1-98a4-9aa92c7838f7",
			secret: "59777f94-265c-4829-b6a4-92436aa1dd25",
		}),
	});
};

const createPaymentLink = (auth_token: string, amount: number) => {
	console.log("generating payment link", auth_token);
	return fetch("https://uat.setu.co/api/v2/payment-links", {
		method: "POST",
		headers: {
			"X-Setu-Product-Instance-ID": process.env.SETU_INSTANCE_ID || "",
			Authorization: "Bearer " + auth_token,
			"content-type": "application/json",
		},
		body: JSON.stringify({
			amount: {
				currencyCode: "INR",
				value: amount,
			},
			amountExactness: "EXACT",
			billerBillID: process.env.SETU_BILLER_ID,
			//Todo: Keep a resonable expiry date for the link
			transactionNote: "Registeration for Hackfest",
			settlement:{
				primaryAccount:{
					id:process.env.SETU_PRIMARY_ACCOUNT_ID,
					ifsc:process.env.SETU_PRIMARY_ACCOUNT_IFSC,
					name:process.env.SETU_PRIMARY_ACCOUNT_NAME
				}
			}
		}),
	});
};

const checkPaymentStatus = (auth_token: string) => {
	return fetch("https://uat.setu.co", {
		method: "GET",
		headers: {
			"content-type": "application/json",
			"X-Setu-Product-Instance-ID": process.env.INSTANCE_ID || "",
			Authorization: auth_token,
		},
	});
};

export { getAuthToken, createPaymentLink, checkPaymentStatus };
