import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function TopBar() {
    // useLocation giúp nhận biết chúng ta đang ở đường dẫn (URL) nào
    const location = useLocation();
    const [contextText, setContextText] = useState("Đang tải...");

    useEffect(() => {
        const path = location.pathname;
        
        // Nếu đang ở trang chi tiết người dùng
        if (path.startsWith("/users/")) {
            const userId = path.split("/")[2]; // Lấy ID từ URL
            fetchModel(`/user/${userId}`)
                .then(res => setContextText(`Chi tiết của ${res.data.first_name} ${res.data.last_name}`))
                .catch(() => setContextText("Chi tiết người dùng"));
        } 
        // Nếu đang ở trang xem ảnh
        else if (path.startsWith("/photos/")) {
            const userId = path.split("/")[2];
            fetchModel(`/user/${userId}`)
                .then(res => setContextText(`Ảnh của ${res.data.first_name} ${res.data.last_name}`))
                .catch(() => setContextText("Ảnh của người dùng"));
        } 
        // Nếu đang ở trang chủ hoặc danh sách
        else if (path === "/users" || path === "/") {
            setContextText("Danh sách người dùng");
        } else {
            setContextText("Ứng dụng chia sẻ ảnh");
        }
    }, [location]); // Chạy lại mỗi khi URL thay đổi

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                {/* Dùng Grid để chia 2 bên trái/phải */}
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" color="inherit" style={{ fontWeight: 'bold' }}>
                            Quang {/* Tên hiển thị bên trái */}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" color="inherit">
                            {contextText} {/* Ngữ cảnh hiển thị bên phải */}
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;