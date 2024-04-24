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