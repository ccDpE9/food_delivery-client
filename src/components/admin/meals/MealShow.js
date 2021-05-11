import React from "react";
import { NumberField, Show, SimpleShowLayout, TextField } from "ra-ui-materialui";

export const MealShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="category" />
            <NumberField source="price" />
        </SimpleShowLayout>
    </Show>
);