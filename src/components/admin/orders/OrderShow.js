import React from "react";
import { ArrayField, Datagrid, NumberField, Show, SimpleShowLayout, TextField } from "ra-ui-materialui";

export const OrderShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="userFirstName" label="First Name" />
            <TextField source="status" />
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="meal.id" label="ID" />
                    <TextField source="meal.name" label="name" />
                    <TextField source="requirements" />
                    <NumberField source="meal.price" label="price" />
                    <NumberField source="quantity" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);