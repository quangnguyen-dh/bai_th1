import React, { useState, useEffect } from "react";
import { Typography, Button, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchModel(`/user/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => console.error("Lỗi tải chi tiết user:", err));
    }, [userId]);

    // Nếu dữ liệu chưa về kịp, hiển thị thông báo chờ
    if (!user) {
        return <Typography variant="h6" style={{ padding: '20px' }}>Đang tải dữ liệu...</Typography>;
    }

    return (
        <div className="user-detail-container" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />

            <Typography variant="body1" gutterBottom>
                <strong>Nghề nghiệp:</strong> {user.occupation}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Địa điểm:</strong> {user.location}
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>Mô tả:</strong> <span dangerouslySetInnerHTML={{ __html: user.description }} />
            </Typography>

            <Button variant="contained" color="primary" component={Link} to={`/photos/${user._id}`} style={{ marginTop: '20px' }}>
                Xem ảnh của {user.first_name}
            </Button>
        </div>
    );
}

export default UserDetail;