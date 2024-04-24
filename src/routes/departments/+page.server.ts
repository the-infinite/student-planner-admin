import type { PageServerLoad } from './$types';
import { departmentCollection } from '$lib/server';
import type { DepartmentModel } from '$lib/types/others'; 

export const load = (async () => {
    const departments: DepartmentModel[] = [];
    var error: Error | undefined;

    // This is fine.
    try {
        (await departmentCollection.get()).forEach(result => {
            const schedule = result.data() as DepartmentModel
            departments.push(schedule);
        });
    } catch (e) {
        error = e as Error
    }

    console.log(departments)

    // This is fine too.
    return {
        departments: departments,
        error: error,
    };
}) satisfies PageServerLoad;