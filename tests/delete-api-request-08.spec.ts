


import { expect, test, request } from "@playwright/test"
import {faker} from "@faker-js/faker"
import {DateTime} from "luxon"
// It is imported as js literal object
import putAuthBody from "../data/auth-data.json"
// import deleteRequestBody from "../data/delete-request-data.json"
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

    const deleteResponse = await request.delete(`/booking/${bId}`, {
        headers:{
            "Content-Type" : "application/json" ,
            "Cookie":`token=${token}`
        }
        })
    console.log(deleteResponse)
    
    // console.log("PUT Response" , await putResponse.json())
    // const putResponseAsObject = await deleteResponse.json()
    expect(deleteResponse.statusText()).toBe("Created")
    expect(deleteResponse.status()).toBe(201)
    // expect(putResponseAsObject.firstname).toBe(firstName)
})