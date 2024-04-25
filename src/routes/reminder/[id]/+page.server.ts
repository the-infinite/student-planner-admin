import type { PageServerLoad } from './$types';
import { collegesCollection, departmentCollection, schedulesCollection } from '$lib/server';
import type { ScheduleModel } from '$lib/types/schedule';
import type { CollegeModel, DepartmentModel } from '$lib/types/others';

export const load = (async (event) => {
    var schedule: ScheduleModel = {} as ScheduleModel;
    var department: DepartmentModel = {} as DepartmentModel;
    var college: CollegeModel = {} as CollegeModel;
    var error: Error | undefined;

    // This is fine.
    try {
        const result = await schedulesCollection.doc(event.params.id).get();

        //? Only if the document you are looking for exists....
        if (result.exists) {
            schedule = result.data() as ScheduleModel

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

        // This is fine.
        const collegeData = await collegesCollection.where("code", "==", schedule.college).get()
        college = collegeData.docs[0].data() as CollegeModel

        // For the department
        const departmentData = await departmentCollection.where("course", "==", schedule.department).get()
        department = departmentData.docs[0].data() as DepartmentModel
    } catch (e) {
        error = e as Error
    }

    // This is fine too.
    return {
        schedule,
        department,
        college,
        error,
    };
}) satisfies PageServerLoad;