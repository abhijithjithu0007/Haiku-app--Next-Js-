
'use client'

import { createHaiku } from '@/actions/haikuController';
import { useFormState, useFormStatus } from 'react-dom'


export default function HaikuForm(){

    const [formState, formAction] = useFormState(createHaiku, {});

    return(
        <form action={formAction} className="max-w-xs mx-auto">
        <div className="mb-5">
            <input name="line1" type="text" autoComplete="off" placeholder="line #1" className="input input-bordered w-full max-w-xs" />
            {formState?.errors?.line1 && (
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState?.errors?.username}</span>
                </div>
            )}
        </div>
        <div className="mb-5">
            <input name="line1" type="text" autoComplete="off" placeholder="line #2" className="input input-bordered w-full max-w-xs" />
            {formState?.errors?.line1 && (
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState?.errors?.username}</span>
                </div>
            )}
        </div>
        <div className="mb-5">
            <input name="line1" type="text" autoComplete="off" placeholder="line #3" className="input input-bordered w-full max-w-xs" />
            {formState?.errors?.line1 && (
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState?.errors?.username}</span>
                </div>
            )}
        </div>
        <button className="btn btn-primary">Submit</button>
        </form>
    )
}