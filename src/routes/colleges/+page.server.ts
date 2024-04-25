import type { PageServerLoad } from './$types';
import { collegesCollection } from '$lib/server';
import type { CollegeModel } from '$lib/types/others'; 

export const load = (async () => {
    const colleges: CollegeModel[] = [];
    var error: Error | undefined;

    // This is fine.
    try {
        (await collegesCollection.get()).forEach(result => {
            const college = result.data() as CollegeModel
            college.uid = result.id;
            colleges.push(college);
        });
    } catch (e) {
        error = e as Error
    }

    // This is fine too.
    return {
        colleges: colleges,
        error: error,
    };
}) satisfies PageServerLoad;