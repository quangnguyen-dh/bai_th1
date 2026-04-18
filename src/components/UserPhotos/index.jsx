import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardHeader, CardMedia, CardContent, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

// Hàm xử lý ảnh an toàn, nếu đường dẫn sai web cũng không bị sập
const getSafeImage = (fileName) => {
    try {
        return require(`../../images/${fileName}`);
    } catch (error) {
        return ""; 
    }
};

function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchModel(`/photosOfUser/${userId}`)
            .then((response) => {
                // Bảo vệ: Nếu dữ liệu tải về không phải mảng, set mảng rỗng
                if (response && Array.isArray(response.data)) {
                    setPhotos(response.data);
                } else {
                    setPhotos([]);
                }
            })
            .catch((err) => console.error("Lỗi khi tải ảnh:", err));
    }, [userId]);

    // Bảo vệ: Nếu chưa có ảnh thì hiện thông báo
    if (!photos || photos.length === 0) {
        return <Typography variant="h6" style={{ padding: '20px' }}>Đang tải dữ liệu hoặc người dùng chưa có ảnh...</Typography>;
    }

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {/* Bảo vệ bằng (photos || []).map */}
            {(photos || []).map((photo) => (
                <Grid item xs={12} key={photo._id}>
                    <Card variant="outlined">
                        <CardHeader
                            title="Chi tiết bức ảnh"
                            subheader={`Ngày đăng: ${photo.date_time ? new Date(photo.date_time).toLocaleString() : 'Không rõ'}`} 
                        />
                        <CardMedia
                            component="img"
                            image={getSafeImage(photo.file_name)}
                            alt={photo.file_name}
                            style={{ objectFit: 'contain', maxHeight: '500px' }}
                        />
                        <CardContent>
                            <Typography variant="h6">Bình luận:</Typography>
                            <Divider style={{ marginBottom: '10px' }} />
                            
                            {/* BẢO VỆ CHÍNH Ở ĐÂY: Dùng (photo.comments || []).map để không bao giờ bị lỗi map */}
                            {photo.comments && photo.comments.length > 0 ? (
                                (photo.comments || []).map((c) => (
                                    <div key={c._id} style={{ marginBottom: '15px' }}>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {c.date_time ? new Date(c.date_time).toLocaleString() : 'Không rõ'} - Đăng bởi:{" "}
                                            <strong>
                                                {c.user ? (
                                                    <Link to={`/users/${c.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                                                        {c.user.first_name} {c.user.last_name}
                                                    </Link>
                                                ) : (
                                                    "Người dùng ẩn danh"
                                                )}
                                            </strong>
                                        </Typography>
                                        <Typography variant="body1">
                                            {c.comment ? <span dangerouslySetInnerHTML={{ __html: c.comment }} /> : ""}
                                        </Typography>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">Chưa có bình luận nào.</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default UserPhotos;