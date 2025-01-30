
import { expect, test, request } from "@playwright/test"
import {faker} from "@faker-js/faker"
import {DataTime} from "luxon"
import { stringFormat } from "../utils/stringformat"
// It is imported as js literal object
import dynamicJsonObject from "../data/post-request-data-dynamic.json"
import { json } from "stream/consumers"

test("Create POST API Request Using Dynamic JSON File", async ({ request }) => {
    // console.log(typeof bookingApiRequestBody)
    // console.log(bookingApiRequestBody)
    const dynamicJsonObjectAsString = JSON.stringify(dynamicJsonObject)
    const modeifiedObjectAsString = stringFormat(dynamicJsonObjectAsString ,"ahmed" , "achraf" , "lol") 
    const postRequestResponse = await request.post("/booking", {
        data: JSON.parse(modeifiedObjectAsString) , 
        headers: {
            "Content-Type": "application/json", // Explicitly set the header ,not a must it is a good practise but withput it eveything is ok
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
    expect(postRequestResponseObject.booking).toHaveProperty("firstname" , "ahmed")
    // Validate Nested JSON Object
    expect(postRequestResponseObject.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
})