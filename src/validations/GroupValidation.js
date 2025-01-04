import * as yup from "yup";

export const GroupSchema = yup.object().shape({
    name: yup.string().required().max(255,'Name must be at most 10 characters').min(3,'Name must bigger dan 3 characters'),
});

export const GroupUpdateSchema = yup.object().shape({
    name: yup.string().required().max(255,'Name must be at most 10 characters').min(3,'Name must bigger dan 3 characters'),
});