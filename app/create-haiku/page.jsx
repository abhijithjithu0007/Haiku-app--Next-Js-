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
        <div className='text-center'>
            <h1 className='text-2xl mb-5 border-b-2 text-black'>Create Haiku</h1>
        </div>
        <HaikuForm action="create"/>
        </>
    );
}


