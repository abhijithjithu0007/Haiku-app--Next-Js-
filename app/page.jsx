import Link from "next/link"
import RegisterForm from "@/components/RegisterForm"
import { getUserFromCookie } from "@/lib/getUser"
import Dashborad from "@/components/Dashborad"

export default async function page() {
    const user = await getUserFromCookie()
    return (
        <>
            {user && (
               <Dashborad user={user}/>
            )}
            {!user && (
                <>
                    <p className="text-center mb-3 text-2xl text-gray-600">Don&rsquo;t have an account? <strong>Create a new account</strong></p>
                    <RegisterForm />
                </>
            )}

        </>

    )
}