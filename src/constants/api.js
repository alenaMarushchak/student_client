export const API_LOGIN = '/signIn';
export const API_LOGOUT = '/signOut';

export const API_PROFILE = '/profile';


export const API_USER = '/admin/user';
export const API_SUBJECT = '/admin/subject';

export const API_GROUP = '/admin/group';

export const API_SUBJECT_SELECT = '/select/subject';
export const API_STUDENT_SELECT = '/select/student';

export const API_OWN_TEACHERS_SUBJECT = '/teacher/subject/own';

export const API_STUDENTS_POINTS_LIST = '/teacher/student';
export const API_STUDENTS_POINTS_LIST_OWN_POINTS = '/student/point';
export const API_STUDENTS_LIST = '/teacher/student';

export const API_ADMIN_STATISTIC = '/admin/statistic';

export const API_BLOG = '/blog'

export const API = {
    SUBJECT: {
        ADMIN  : '/admin/subject',
        TEACHER: '/teacher/subject',
        STUDENT: '/student/subject'
    },

    GROUP: {
        ADMIN  : '/admin/group',
        TEACHER: '/teacher/group',
        STUDENT: '/student/group'
    },

    USER: {
        ADMIN  : '/admin/user',
        TEACHER: '/teacher/user',
        STUDENT: '/student/user'
    },

    POINT: {
        TEACHER: '/teacher/point',
        STUDENT: '/student/point'
    },

    STATISTIC: {
        ADMIN  : '/admin/statistic/student',
        TEACHER: '/teacher/statistic/student',
        STUDENT: '/student/statistic/student'
    }
};

export const API_TYPES = {
    SUBJECT: 'SUBJECT',
    GROUP  : 'GROUP',
    USER   : 'USER',
    POINT  : 'POINT'
};
