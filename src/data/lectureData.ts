import { LectureUnit } from './lectureTypes';
import { LECTURE_UNITS_0_TO_2 } from './lectureUnits0to2';
import { LECTURE_UNITS_3_TO_4 } from './lectureUnits3to4';
import { LECTURE_UNITS_5_TO_6 } from './lectureUnits5to6';

export * from './lectureTypes';

export const LECTURE_UNITS: LectureUnit[] = [
  ...LECTURE_UNITS_0_TO_2,
  ...LECTURE_UNITS_3_TO_4,
  ...LECTURE_UNITS_5_TO_6,
];
