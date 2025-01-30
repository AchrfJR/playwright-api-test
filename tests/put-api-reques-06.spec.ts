
import { expect, test, request } from "@playwright/test";
import putAuthBody from "../data/auth-data.json";
import putRequestBody from "../data/put-body-data.json";
import postReqestBody from "../data/post-request-data.json";

test("Create PUT API Request Using Dynamic Data", async ({ request }) => {
    // Step 1: Create a booking to get a valid booking ID
    const createBookResponse = await request.post("/booking", {
        data: postReqestBody
    });
    expect(createBookResponse.ok()).toBeTruthy();
    expect(createBookResponse.status()).toBe(200);

    const postRes = await createBookResponse.json();
    const bId = postRes.bookingid;
    console.log("Booking ID:", bId);

    // Step 2: Authenticate to get a valid token
    const postResponse = await request.post("/auth", {
        data: putAuthBody
    });
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const postResponseObject = await postResponse.json();
    const token = postResponseObject.token;
    console.log("Token:", token);

    // Step 3: Send the PUT request to update the booking
    const putResponse = await request.put(`/booking/${bId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        },
        data: putRequestBody
    });

    // Log the request details for debugging
    console.log("PUT Request URL:", `/booking/${bId}`);
    console.log("PUT Request Headers:", {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
    });
    console.log("PUT Request Payload:", putRequestBody);

    // Log the response details
    console.log("PUT Response Status:", putResponse.status());
    const responseText = await putResponse.text();
    console.log("PUT Response Text:", responseText);

    // Step 4: Validate the response
    if (putResponse.ok()) {
        const putResponseAsObject = await putResponse.json();
        console.log("PUT Response JSON:", putResponseAsObject);
        expect(putResponse.status()).toBe(200);
    } else {
        console.error("PUT Request Failed:", responseText);
        expect(putResponse.ok()).toBeTruthy(); // This will fail if the response is not OK
    }
});