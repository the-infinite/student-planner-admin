import type { PageServerLoad } from './$types';
import { schedulesCollection } from '$lib/server';
import type { ScheduleModel } from '$lib/types/schedule';

export const load = (async () => {
    const schedules: ScheduleModel[] = [];
    var error: Error | undefined;

    // This is fine.
    try {
        (await schedulesCollection.get()).forEach(result => {
            const schedule = result.data() as ScheduleModel
            schedule.dayOfWeek = result.data().day;
            schedule.startsAt = result.data().starts;
            schedule.endsAt = result.data().ends;
            schedule.uid = result.id;

            // Delete the remnant keys.
            delete (schedule as any).starts;
            delete (schedule as any).ends; 
            delete (schedule as any).day;

            // Push this forward.
            schedules.push(schedule);
        });
    } catch (e) {
        error = e as Error
    }

    // This is fine too.
    return {
        schedules: schedules,
        error: error,
    };
}) satisfies PageServerLoad;