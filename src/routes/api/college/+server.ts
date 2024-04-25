import type { CollegeModel } from '$lib/types/others';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { collegesCollection } from '$lib/server';

export const POST: RequestHandler = async (event) => {
    const request = event.request;
    const body: CollegeModel = await request.json();

    //? If this is not valid...
    if (!body) {
        return text("The request was not accompanied by a schedule model in its body.", {
            status: 400,
        })
    }

    try {
        // Create a new document.
        const document = collegesCollection.doc();
        
        // Set the value of this document.
        await document.set(body)

        // This failed.
        return text("The college has been created with the ID " + document.id);
    } catch(e) {
        return text("Failed because " + (e as Error)?.message.toLowerCase() ?? " an unknown error occurred")
    }
};