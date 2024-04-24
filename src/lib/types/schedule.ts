export type ScheduleModel = {
  /**
     * The topic of the class or event. Depending on the kind of
     */
  topic: string | null;

  /**
   * A 3 to 5 letter shortcode representing the shortcode for this, subject. Think of it like a
   * course or something like that.
   */
  subject: string | null;

  /**
   * This is the description of the event. This is something that the additional information that
   * would be attached to this event or schedule when the user clicks and then views this
   * description.
   */
  description: string | null,

  /**
   * The day of the week this event starts at
   */
  dayOfWeek: string;

  /**
   * This is a constant that represents the type of this schedule reminder. It should typically be
   * something that is either 'event' or 'class'. This is used to build the descriptions as the
   * case may be.
   */
  type: string;

  /**
   * This is the time when this event starts. It is in the format (hours * 100 + minutes) therefore,
   * to decode it:
   *
   * hours = floor(timestamp / 100)
   * minutes = timestamp % 100
   */
  startsAt: number;

  /**
   * This is the time when this event ends. It is in the format (hours * 100 + minutes) therefore,
   * to decode it:
   *
   * hours = floor(timestamp / 100)
   * minutes = timestamp % 100
   */
  endsAt: number;

  /**
   * This is the name or shortcode of the college that this event is hosted for. If this is Open,
   * it means that ANY college can join this event.
   */
  college: string;

  /**
   * This is the name or shortcode of the department that this event is hosted for. If this is Open,
   * it means that any department in the matching college can join this event.
   */
  department: string;

  /**
   * This is the level of that this event is tailored to.
   */
  level: number,

  /**
   * This is the list of hosts for this event in question.
   */
  hosts: Array<string>
}; 