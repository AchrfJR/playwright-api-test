
import { expect, test, request } from "@playwright/test"
import {faker} from "@faker-js/faker"
import {DateTime} from "luxon"
// It is imported as js literal object
import putAuthBody from "../data/auth-data.json"
import putRequestBody from "../data/put-body-data.json"
import { stringFormat } from "../utils/stringformat.ts"

test("Create PUT API Request Using Dynamic Data", async ({ request }) => {
    const postResponse = await request.post("/auth", {
        data: putAuthBody
    })

    // Validate Status
    expect(postResponse.ok()).toBeTruthy()
    expect(postResponse.status()).toBe(200)
    // console.log(postRequestResponse["booking"])
    // console.log(postRequestResponse.booking)
    

    const postResponseObject = await postResponse.json()
    const token = postResponseObject.token
    console.log("Token : ",token)
    console.log(postResponseObject)

    // Validate JSON Api Response
    expect(postResponseObject).toHaveProperty("token" , token)
    const firstName = "achraf"
    const lastName = "ismael"
    const bId = putRequestBody.bookingid
    const modeifiedObjectAsString = stringFormat(JSON.stringify(putRequestBody) , firstName , lastName)

    const putResponse = await request.put(`/booking/${bId}`, {
        headers:{
            "Content-Type" : "application/json" ,
            "Cookie":`token=${token}`
        }, 
            data: JSON.parse(modeifiedObjectAsString)
        })
    console.log(putResponse)
    
    // console.log("PUT Response" , await putResponse.json())
    const putResponseAsObject = await putResponse.json()
    expect(putResponse.ok()).toBeTruthy()
    expect(putResponse.status()).toBe(200)
    expect(putResponseAsObject.firstname).toBe(firstName)
})