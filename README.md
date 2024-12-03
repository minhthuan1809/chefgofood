# Test Cases Documentation unit test

| No. | Test Cases | Description | Input Type | Input | Expected Output Type | Expected Output | Status |
|-----|------------|-------------|------------|-------|---------------------|-----------------|---------|
| 1 | Messages - Render List | Kiểm tra hiển thị danh sách tin nhắn | Component Render | `<Messages />` | DOM Elements | - User list displayed<br/>- Messages displayed | ✅ PASS |
| 2 | Messages - Send Message | Kiểm tra gửi tin nhắn thành công | User Action | - Select user<br/>- Type "Test message"<br/>- Click Send | Function Call | sendMessageAdmin called with correct params | ✅ PASS |
| 3 | Messages - Error Handling | Kiểm tra xử lý lỗi khi gửi tin nhắn | Error Simulation | Mock API Error | Error Message | Error message displayed | ✅ PASS |
| 4 | Messages - Auto Update | Kiểm tra tự động cập nhật tin nhắn | Timer | 2 second interval | API Call | getChatAdminDetail called twice | ✅ PASS |
| 5 | Messages - Cleanup | Kiểm tra dọn dẹp interval | Component Unmount | Unmount component | Function Call | clearInterval called | ✅ PASS |
| 6 | Dashboard - Title | Kiểm tra hiển thị tiêu đề dashboard | Component Render | `<Dashboard />` | Text Content | "Dashboard Overview" displayed | ✅ PASS |
| 7 | Dashboard - Web Client | Kiểm tra nút web client | Component Render | `<Dashboard />` | Button | "Web client" button displayed | ✅ PASS |
| 8 | Dashboard - Statistics | Kiểm tra hiển thị thống kê | API Data | Mock dashboard data | Text Content | - Revenue: "1.000.000"<br/>- Orders: "100"<br/>- Users: "50" | ✅ PASS |
| 9 | Dashboard - Services | Kiểm tra gọi services | Component Mount | `<Dashboard />` | Function Calls | All service functions called | ✅ PASS |
| 10 | OrdersChart - Title | Kiểm tra tiêu đề biểu đồ | Component Render | `<OrdersChart />` | Text Content | "Thống Kê Đơn Hàng" displayed | ✅ PASS |
| 11 | OrdersChart - Data | Kiểm tra lấy dữ liệu biểu đồ | API Call | Mock chart data | Function Call | getOrdersChart called | ✅ PASS |
| 12 | OrdersChart - Container | Kiểm tra render container biểu đồ | Component Render | `<OrdersChart />` | DOM Element | Chart container present | ✅ PASS |
| 13 | Login - Form | Kiểm tra hiển thị form đăng nhập | Component Render | `<Login />` | Form Elements | - Email input<br/>- Password input<br/>- Login button | ✅ PASS |
| 14 | Login - Submit | Kiểm tra xử lý đăng nhập | Form Submit | - Email: "test@example.com"<br/>- Password: "password123" | API Call | getLoginAdmin called with credentials | ✅ PASS |
| 15 | Login - Error | Kiểm tra xử lý lỗi đăng nhập | Error Simulation | Mock API Error | Error Message | Login error message displayed | ✅ PASS |
| 16 | TopProducts - Render | Kiểm tra hiển thị sản phẩm bán chạy | Component Render | `<TopProducts />` | Product List | Top products displayed | ✅ PASS |

## Test Results Summary
- Total Test Cases: 16
- Passed: 16
- Failed: 0
- Success Rate: 100%

## Notes
- ✅ PASS: Test case passed successfully
- ❌ FAIL: Test case failed
- ⚠️ SKIP: Test case skipped
