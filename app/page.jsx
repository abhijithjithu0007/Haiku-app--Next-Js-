import Link from "next/link"
import RegisterForm from "@/components/RegisterForm"

export default function page() {
    return (
        <>
            <p className="text-center mb-3 text-2xl text-gray-600">Don&rsquo;t have an account? <strong>Create a new account</strong></p>
            <RegisterForm/>
        </>

    )
}