import React, { useCallback } from "react";
import { Create, NumberInput, SimpleForm, TextInput } from "ra-ui-materialui";
import {
    useMutation,
    required,
    minLength,
    minValue,
    number,
} from "react-admin";

const validateName = [required(), minLength(3)];
const validateDescription = required();
const validateCategory = required();
const validatePrice = [minValue(0), number()];

export const MealsCreate = (props) => {
    const [mutate] = useMutation();
    const save = useCallback(
        async (values) => {
            try {
                await mutate({
                    type: "create",
                    resource: "meals",
                    payload: { data: values },
                }, { returnPromise: true })
            } catch (error) {
                if (error.body.errors) {
                    return error.body.errors;
                }
            }
        },
        [mutate]
    );

    return (
        <Create mutationMode="undoable" {...props}>
            <SimpleForm save={save} redirect="list">
                <TextInput label="Name" source="name" validate={validateName} />
                <TextInput label="Description" source="description" validate={validateDescription} />
                <TextInput label="Category" source="category" validate={validateCategory} />
                <NumberInput label="Price" source="price" validate={validatePrice} />
            </SimpleForm>
        </Create>
    )
};