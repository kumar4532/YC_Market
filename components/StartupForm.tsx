'use client';

import React, { useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';

const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")
    const isPending = false

    return (
        <form className='startup-form' action={() => { }}>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title' />
                {errors.title && <p className='startup-form_error'>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="decription" className='startup-form_label'>Descripttion</label>
                <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description' />
                {errors.description && <p className='startup-form_error'>{errors.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Health, Education...)' />
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className='startup-form_label'>Image Url</label>
                <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image Url' />
                {errors.link && <p className='startup-form_error'>{errors.link}</p>}
            </div>
            <div data-color-mode='light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor 
                    value={pitch} 
                    onChange={(value) => setPitch(value as string)} 
                    id='pitch' 
                    preview='edit' 
                    height={300} 
                    style={{borderRadius: 20, overflow: 'hidden'}}
                    textareaProps={{
                        placeholder: "Pitch Your Startups"
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />
                {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
            </div>
            <Button className='startup-form_btn text-white' type='submit' disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
            </Button>
        </form>
    )
}

export default StartupForm