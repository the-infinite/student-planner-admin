import { collegesCollection, departmentCollection } from '$lib/server';
import type { CollegeModel, DepartmentModel } from '$lib/types/others';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const departments: DepartmentModel[] = []
    const colleges: CollegeModel[] = []
    var error: Error | undefined

    // This is fine.
    try {
        (await collegesCollection.get()).forEach(result => {
            const college = result.data() as CollegeModel
            college.uid = result.id;
            colleges.push(college);
        });
        (await departmentCollection.get()).forEach(result => {
            const department = result.data() as DepartmentModel
            department.uid = result.id;
            departments.push(department);
        });
    } catch (e) {
        error = e as Error
    }

    return {
        departments,
        colleges,
        error,
    };
}) satisfies PageServerLoad;