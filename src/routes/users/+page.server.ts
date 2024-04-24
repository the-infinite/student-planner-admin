import type { PageServerLoad } from './$types';
import { usersCollection } from '$lib/server';
import type { UserDTO, UserModel } from '$lib/types/user';

type ResponseData = { error: Error | null; data: UserDTO[]; };

export const load = (function (): Promise<ResponseData> {
    return new Promise<ResponseData>(async function (resolve, reject) {
        const response: ResponseData = {
            error: null,
            data: [],
        };

        try {
            const results = await usersCollection.get();
            results.forEach(async function (result) {
                const data = result.data() as UserModel;
                const college = (await data.college.get()).data() as { code: string; name: string; };
                const department = (await data.department.get()).data() as { course: string; name: string; };

                // Next, we do some math.
                response.data.push({
                    uid: data.uid,
                    name: data.name,
                    email: data.email,
                    level: data.level,
                    studentID: data.studentId,
                    college: {
                        isDepartment: false,
                        code: college.code,
                        name: college.name,
                        path: data.college.path
                    },
                    department: {
                        isDepartment: true,
                        code: department.course,
                        name: department.name,
                        path: data.department.path
                    }
                } as UserDTO);

                //? When the size is about what we expect, it means that all the promises we
                //? are waiting for have been resolved.
                if (response.data.length === results.size) {
                    resolve(response); // Hence, you can just move along
                }
            });
        } catch (e) {
            response.error = e as Error;
            reject(response);
        }
    });
}) satisfies PageServerLoad;