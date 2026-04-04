import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models"; // Nhập models để lấy dữ liệu
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    // useParams() giúp lấy ID của người dùng từ trên thanh địa chỉ web
    const { userId } = useParams(); 
    
    // Dùng ID đó để tìm thông tin chi tiết của user trong file models.js
    const user = models.userModel(userId);

    // Xử lý trường hợp bị lỗi, không tìm thấy user
    if (!user) {
        return <Typography variant="h5">Không tìm thấy người dùng!</Typography>;
    }

    return (
        <div className="user-detail-container" style={{ padding: '20px' }}>
            {/* Hiển thị Họ và Tên */}
            <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />

            {/* Hiển thị các thông tin chi tiết */}
            <Typography variant="body1" gutterBottom>
                <strong>Nghề nghiệp:</strong> {user.occupation}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Địa điểm:</strong> {user.location}
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>Mô tả:</strong> <span dangerouslySetInnerHTML={{ __html: user.description }} />
            </Typography>

            {/* Nút bấm để chuyển sang trang xem ảnh (UserPhotos) */}
            <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to={`/photos/${user._id}`}
                style={{ marginTop: '20px' }}
            >
                Xem ảnh của {user.first_name}
            </Button>
        </div>
    );
}

export default UserDetail;