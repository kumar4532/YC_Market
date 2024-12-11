'use server';

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { author } from "@/sanity/schemaTypes/author";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const createIdea = async(state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({ error: "Not signed in", status: "ERROR" });

    const { title, description, category, link } = Object.fromEntries(Array.from(form).filter(([key]) => key !== 'pitch'))

    const slug = slugify(title as string, { lower: true, strict: true })

    try {
        const startup = {
            title,
            slug: {
                _type: slug,
                current: slug
            },
            description,
            category,
            image: link,
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            pitch
        }

        const result = await writeClient.create({ _type: 'startup', ...startup});

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    } catch (error) {
        console.log(error);
    }
}