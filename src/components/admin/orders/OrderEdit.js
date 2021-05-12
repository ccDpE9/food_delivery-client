import React from "react";
import { ArrayField, Datagrid, Edit, NumberField, SelectInput, SimpleForm, TextField } from "ra-ui-materialui";

export const OrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="userFirstName" label="First Name" />
            <SelectInput source="status" choices={[
                { id: "P", name: "Pending" },
                { id: "A", name: "Accepted" },
                { id: "D", name: "Delivered" }
            ]} />
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="meal.id" label="ID" />
                    <TextField source="meal.name" label="name" />
                    <TextField source="requirements" />
                    <NumberField source="meal.price" label="price" />
                    <NumberField source="quantity" />
                </Datagrid>
            </ArrayField>
        </SimpleForm>
    </Edit>
);