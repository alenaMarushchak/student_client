import constants from '../constants';

const {
    LOAD_GROUP,
    LOAD_GROUPS_LIST,
    CLEAN_DATA,
    CREATE_GROUP,
    EDIT_GROUP,
    DELETE_GROUP,

    ADD_POINT_TO_STUDENT,
    LOAD_GROUP_WITH_POINTS
} = constants;

const groups = (groups = {
    list    : {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    },
    selected: {
        value: {}
    },
    students: {
        values: []
    }
}, action) => {
    switch (action.type) {

        case LOAD_GROUPS_LIST:
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values,
                    page,
                    totalPages
                },
            };

        case `${CLEAN_DATA}_${LOAD_GROUPS_LIST}`:
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [],
                },
            };

        case LOAD_GROUP:
            return {
                ...groups,
                selected: Object.assign({},
                    {
                        value: action.payload.value
                    })
            };

        case `${CLEAN_DATA}_${LOAD_GROUP}`:
            return {
                ...groups,
                selected: {
                    value: {}
                },
            };

        case CREATE_GROUP:
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: groups.list.values.concat(action.payload)
                }
            };
        case EDIT_GROUP: {
            let index = groups.list.values.findIndex(o => o._id === action.payload._id);

            groups.list.values[index] = action.payload;
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [].concat(groups.list.values)
                }
            };
        }

        case DELETE_GROUP: {
            let index = groups.list.values.findIndex(o => o._id === action.payload);

            groups.list.values.splice(index, 1);

            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [].concat(groups.list.values)
                }
            };
        }

        case LOAD_GROUP_WITH_POINTS: {
            return {
                ...groups,
                students: Object.assign({},
                    {
                        values: action.payload.values
                    })
            };
        }

        case `${CLEAN_DATA}_${LOAD_GROUP_WITH_POINTS}`:
            return {
                ...groups,
                students: {
                    values: [],
                },
            };

        case ADD_POINT_TO_STUDENT: {
            const {studentId, point, pointType} = action.payload;

            const studentsArray = groups.students.values;
            const studentIndex = studentsArray.findIndex(item => item._id === studentId);

            if (studentsArray[studentIndex].points && studentsArray[studentIndex].points.length) {
                const pointIndex = studentsArray[studentIndex].points.findIndex(item => item.pointName === pointType);

                if(pointIndex === -1){
                    studentsArray[studentIndex].points.push({
                        pointName: pointType,
                        value: point
                    })
                } else {
                    studentsArray[studentIndex].points[pointIndex].value = point;
                }

            } else {
                studentsArray[studentIndex].points = [];

                studentsArray[studentIndex].points.push({
                    pointName: pointType,
                    value: point
                })
            }

            return {
                ...groups,
                students: {
                    values: [].concat(studentsArray)
                }
            }
        }

        default:
            return groups;

    }
};

export {groups};

