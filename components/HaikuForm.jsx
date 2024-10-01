'use client'

import { createHaiku, editHaiku } from '@/actions/haikuController';
import { useFormState } from 'react-dom';
import { CldUploadWidget } from 'next-cloudinary';

export default function HaikuForm(props) {
    let realAction = props.action === "create" ? createHaiku : editHaiku;
    const [formState, formAction] = useFormState(realAction, {});

    return (
        <div className="max-w-md mx-auto p-6">
            <form action={formAction} className="space-y-5">
                <div>
                    <input
                        defaultValue={props?.haiku?.line1}
                        name="line1"
                        type="text"
                        placeholder="First line"
                        className={`input input-bordered w-full ${formState?.errors?.line1 ? 'border-red-500' : ''}`}
                    />
                    {formState?.errors?.line1 && <div className="text-red-500">{formState.errors.line1}</div>}
                </div>

                <div>
                    <input
                        defaultValue={props?.haiku?.line2}
                        name="line2"
                        type="text"
                        placeholder="Second line"
                        className={`input input-bordered w-full ${formState?.errors?.line2 ? 'border-red-500' : ''}`}
                    />
                    {formState?.errors?.line2 && <div className="text-red-500">{formState.errors.line2}</div>}
                </div>

                <div>
                    <input
                        defaultValue={props?.haiku?.line3}
                        name="line3"
                        type="text"
                        placeholder="Third line"
                        className={`input input-bordered w-full ${formState?.errors?.line3 ? 'border-red-500' : ''}`}
                    />
                    {formState?.errors?.line3 && <div className="text-red-500">{formState.errors.line3}</div>}
                </div>
                <div className='mb-4'>
                    <CldUploadWidget
                        uploadPreset="HaikuPreset"  
                        signatureEndpoint=""
                    >
                        {({ open }) => {
                            return <button className='btn btn-secondary' onClick={() => open()}>Upload an image</button>;
                        }}
                    </CldUploadWidget>


                </div>

                <input type='hidden' name='haikuid' defaultValue={props.haiku?._id?.toString()} />

                <button className="btn btn-primary w-full">
                    {props.action === 'create' ? 'Create Haiku' : 'Update Haiku'}
                </button>
            </form>
        </div>
    );
}
