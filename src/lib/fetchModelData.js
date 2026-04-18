/**
 * fetchModel - Kết nối Frontend với máy chủ Backend thật
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    // ĐÂY LÀ ĐƯỜNG LINK CHUẨN TỪ CODESANDBOX CỦA BẠN (KHÔNG CÓ DẤU / Ở CUỐI)
    const serverUrl = "https://dpdhln-8081.csb.app"; 

    // Chuyển đổi đường dẫn URL của React cho khớp với các API của Node.js
    let apiPath = url;
    if (url.startsWith("/user/list")) {
        apiPath = "/api/user/list";
    } else if (url.startsWith("/user/")) {
        // Ví dụ: /user/123 -> /api/user/123
        apiPath = "/api/user/" + url.split("/")[2];
    } else if (url.startsWith("/photosOfUser/")) {
        // Ví dụ: /photosOfUser/123 -> /api/photo/photosOfUser/123
        apiPath = "/api/photo/photosOfUser/" + url.split("/")[2];
    }

    // Gọi lên máy chủ CodeSandbox để lấy dữ liệu
    fetch(serverUrl + apiPath)
      .then((response) => {
        if (!response.ok) {
          return reject(new Error("Lỗi mạng hoặc API không phản hồi"));
        }
        return response.json(); // Biến dữ liệu thô thành JSON
      })
      .then((data) => {
        // Gói dữ liệu vào trong biến { data: ... } để React đọc được
        resolve({ data: data }); 
      })
      .catch((error) => {
        console.error("Lỗi fetchModel:", error);
        reject(error);
      });
  });
}

export default fetchModel;