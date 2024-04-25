import type { PageServerLoad } from './$types';
import { departmentCollection } from '$lib/server';
import type { DepartmentModel } from '$lib/types/others'; 

export const load = (async () => {
    const departments: DepartmentModel[] = [];
    var error: Error | undefined;

    // This is fine.
    try {
        (await departmentCollection.get()).forEach(result => {
            const department = result.data() as DepartmentModel
            department.uid = result.id;
            departments.push(department);
        });
    } catch (e) {
        error = e as Error
    }

    // This is fine too.
    return {
        departments: departments,
        error: error,
    };
}) satisfies PageServerLoad;