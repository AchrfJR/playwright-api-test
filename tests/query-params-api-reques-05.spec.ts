
import { expect, test, request } from "@playwright/test"
import {faker} from "@faker-js/faker"
import {DateTime} from "luxon"
// It is imported as js literal object
import bookingApiRequestBody from "../data/post-request-data.json"

test("Create Query Params API Request Using Dynamic Data", async ({ request }) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const totalPrice = faker.number.int(1000)

        const checkInDate = DateTime.now().toFormat('yyyy-MM-dd')
        const checkOutDate = DateTime.now().plus({day:10}).toFormat('yyyy-MM-dd')
        
    // console.log(typeof bookingApiRequestBody)
    // console.log(bookingApiRequestBody)
    const postRequestResponse = await request.post("/booking", {
        data: {
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
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
    const bookingId = postRequestResponseObject.bookingid
    console.log("ID : ",bookingId)
    
    console.log(postRequestResponseObject)

    // Validate JSON Api Response
    expect(postRequestResponseObject.booking).toHaveProperty("firstname" , firstName)
    // Validate Nested JSON Object
    expect(postRequestResponseObject.booking.bookingdates).toHaveProperty("checkin" , checkInDate)

    const getResponse = await request.get(`/booking/`, {
        params:{
            "firstname" : firstName
        }
    })
    console.log("Get Response" , await getResponse.json())
    expect(getResponse.ok()).toBeTruthy()
    expect(getResponse.status()).toBe(200)
})