

import { expect, test, request } from "@playwright/test"
import {faker} from "@faker-js/faker"
import {DateTime} from "luxon"
// It is imported as js literal object
import putAuthBody from "../data/auth-data.json"
import patchRequestBody from "../data/patch-request-data.json"
import postReqestBody from "../data/post-request-data.json"

test("Create PATCH API Request Using Dynamic Data", async ({ request }) => {

    const createBookResponse = await request.post("/booking" , 
        {
            data:postReqestBody
        }
    )
    
    const postRes = await createBookResponse.json()
    const bId = postRes.bookingid
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

    const patchResponse = await request.patch(`/booking/${bId}`, {
        headers:{
            "Content-Type" : "application/json" ,
            "Cookie":`token=${token}`
        }, 
            data: patchRequestBody
        })
    console.log(patchResponse)
    
    // console.log("PUT Response" , await putResponse.json())
    const putResponseAsObject = await patchResponse.json()
    expect(patchResponse.ok()).toBeTruthy()
    expect(patchResponse.status()).toBe(200)
    // expect(putResponseAsObject.firstname).toBe(firstName)
})