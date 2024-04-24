/**
 * This is the model of this college as it is in our database.
 */
export type DepartmentModel = {
  /**
   * A shortcode representing this department.
   */
  course: string;

  /**
   * The name of this department as a string.
   */
  name: string;
};

/**
 * This is a model used to represent colleges as they are in our database. 
 */
export type CollegeModel = {
  /**
   * A shortcode representing this college.
   */
  code: string;

  /**
   * The name of this college as a string.
   */
  name: string;
};