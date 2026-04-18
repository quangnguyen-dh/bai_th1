import React, { useState, useEffect } from "react"; // Thêm useState, useEffect
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Import hàm fetch

function UserList() {
    const [users, setUsers] = useState([]); // State để lưu danh sách user

    useEffect(() => {
        // Gọi API lấy danh sách user
        fetchModel("/user/list").then((response) => {
            setUsers(response.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <List component="nav">
            {users.map((item) => (
                <React.Fragment key={item._id}>
                    <ListItem button component={Link} to={`/users/${item._id}`}>
                        <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
}
export default UserList;