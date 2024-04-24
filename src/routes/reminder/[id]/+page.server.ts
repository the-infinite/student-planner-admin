import type { PageServerLoad } from './$types';
import { schedulesCollection } from '$lib/server';
import type { ScheduleModel } from '$lib/types/schedule';

export const load = (async (event) => {
    var schedule: ScheduleModel = {} as ScheduleModel;
    var error: Error | undefined;

    // This is fine.
    try {
        const result = await schedulesCollection.doc(event.params.id).get();

        //? Only if the document you are looking for exists....
        if (result.exists) {
            const schedule = result.data() as ScheduleModel

            // This is fair enough.
            schedule.dayOfWeek = (result.data() as any).day;
            schedule.startsAt = (result.data() as any).starts;
            schedule.endsAt = (result.data() as any).ends;
            schedule.uid = result.id;

            // Delete the remnant keys.
            delete (schedule as any).starts;
            delete (schedule as any).ends;
            delete (schedule as any).day;
        } 
        
        //? If this document does not exist...
        else {
            error = new Error("This schedule identified by the ID " + event.params.id + " does not exist");
        }
    } catch (e) {
        error = e as Error
    }

    // This is fine too.
    return {
        schedule,
        error,
    };
}) satisfies PageServerLoad;