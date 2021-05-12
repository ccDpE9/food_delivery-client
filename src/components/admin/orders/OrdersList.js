import * as React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const OrdersList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="userFirstName" label="user" />
            <TextField source="status" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);