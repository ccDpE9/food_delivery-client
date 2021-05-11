import { Edit, NumberInput, SimpleForm, TextInput } from "ra-ui-materialui";
import React from "react";

export const MealsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
            <TextInput source="category" />
            <NumberInput source="price" />
        </SimpleForm>
    </Edit>
);