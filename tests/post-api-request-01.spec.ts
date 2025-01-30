
import { expect, test, request } from "@playwright/test"

test("Create POST API Request Using Static Request Body", async ({ request }) => {

    const postRequestResponse = await request.post("/booking", {
        data: {
            "firstname": "{{fname}}",
            "lastname": "{{lname}}",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    // Validate Status

    expect(postRequestResponse.ok()).toBeTruthy()
    expect(postRequestResponse.status()).toBe(200)
    // console.log(postRequestResponse["booking"])
    // console.log(postRequestResponse.booking)
    

    const postRequestResponseObject = await postRequestResponse.json()
    console.log(postRequestResponseObject)

    // Validate JSON Api Response

    // Validate Nested JSON Object
})