'use client'

import { useParams, useSearchParams } from "next/navigation"
import axios from 'axios'
function Page() {
    const token =useSearchParams().get("token")
    console.log("token :",token)
    async function verify()
    {
      const res=await   axios.post(`http://localhost:3000/api/users/verify`,{token :token})
        console.log(res)
    }
  return (
    <div className="flex items-center flex-col gap-6 justify-center h-screen">verification page
        with tokenb {token}

        <button onClick={verify} className="bg-green-500 rounded-2xl px-4 py-2">click to verify</button>
    </div>
  )
}

export default Page