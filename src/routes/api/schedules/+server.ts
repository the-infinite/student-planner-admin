import type { ScheduleModel } from '$lib/types/schedule';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { schedulesCollection } from '$lib/server';

export const POST: RequestHandler = async (event) => {
    const request = event.request;
    const body: ScheduleModel = await request.json();

    //? If this is not valid...
    if (!body) {
        return text("The request was not accompanied by a schedule model in its body.", {
            status: 400,
        })
    }

    try {
        // Create a new document.
        const document = schedulesCollection.doc();
        
        // Set the value of this document.
        await document.set(body)

        // This failed.
        return text("The schedule has been created with the ID " + document.id);
    } catch(e) {
        return text("Failed because " + (e as Error)?.message.toLowerCase() ?? " an unknown error occurred")
    }
};