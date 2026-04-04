import React from "react";
import { Typography, Grid, Card, CardHeader, CardMedia, CardContent, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models"; // Nhập dữ liệu
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    // Lấy userId từ thanh địa chỉ URL
    const { userId } = useParams();
    
    // Tìm tất cả ảnh của người dùng này
    const photos = models.photoOfUserModel(userId);

    // Xử lý trường hợp người dùng chưa có ảnh nào
    if (!photos || photos.length === 0) {
        return <Typography variant="h5">Người dùng này chưa có bức ảnh nào!</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {photos.map((photo) => (
                <Grid item xs={12} key={photo._id}>
                    <Card variant="outlined">
                        {/* Thời gian đăng ảnh */}
                        <CardHeader
                            title="Chi tiết bức ảnh"
                            subheader={`Ngày đăng: ${photo.date_time}`}
                        />
                        
                        {/* Hiển thị ảnh (Lấy trực tiếp từ thư mục src/images/) */}
                        <CardMedia
                            component="img"
                            image={require(`../../images/${photo.file_name}`)}
                            alt={photo.file_name}
                            style={{ objectFit: 'contain', maxHeight: '500px' }}
                        />
                        
                        <CardContent>
                            <Typography variant="h6">Bình luận:</Typography>
                            <Divider style={{ marginBottom: '10px' }} />
                            
                            {/* Kiểm tra và in ra danh sách bình luận */}
                            {photo.comments && photo.comments.length > 0 ? (
                                photo.comments.map((c) => (
                                    <div key={c._id} style={{ marginBottom: '15px' }}>
                                        {/* Tên người bình luận (Có thể click để sang trang của người đó) và thời gian */}
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {c.date_time} - Đăng bởi:{" "}
                                            <strong>
                                                <Link to={`/users/${c.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                                                    {c.user.first_name} {c.user.last_name}
                                                </Link>
                                            </strong>
                                        </Typography>
                                        
                                        {/* Nội dung bình luận */}
                                        <Typography variant="body1">
                                            {/* Dùng dangerouslySetInnerHTML vì trong dữ liệu models.js có chứa thẻ in đậm <b> */}
                                            <span dangerouslySetInnerHTML={{ __html: c.comment }} />
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