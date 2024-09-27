import { getUserFromCookie } from '@/lib/getUser';
import { redirect } from 'next/navigation';
import HaikuForm from '@/components/HaikuForm';

export default async function Page() {

    const user = await getUserFromCookie()

    if(!user){
        return redirect('/')
    }

    return (
        <>
        <div>Create Haiku</div>
        <HaikuForm/>
        </>
    );
}


