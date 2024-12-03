# Test Cases Documentation

| No. | Test Cases | Description | Input Type | Input | Expected Output Type | Expected Output | Status |
|-----|------------|-------------|------------|-------|---------------------|-----------------|---------|
| 1 | Messages - Render | Kiểm tra render component | Component Render | `<Messages />` | DOM Elements | User list & messages displayed | ❌ FAIL |
| 2 | Messages - Send | Kiểm tra gửi tin nhắn | User Action | Message text | API Call | sendMessageAdmin called | ❌ FAIL |
| 3 | Messages - Update | Kiểm tra auto update | Timer | 2s interval | API Call | getChatAdminDetail called | ❌ FAIL |
| 4 | Messages - Error | Kiểm tra xử lý lỗi | Error Simulation | API Error | UI Update | Error message shown | ❌ FAIL |

| 5 | Dashboard - Overview | Kiểm tra render dashboard | Component Render | `<Dashboard />` | Text Content | "Dashboard Overview" | ✅ PASS |
| 6 | Dashboard - Stats | Kiểm tra hiển thị thống kê | API Data | Mock data | Text Content | Revenue, orders stats | ✅ PASS |
| 7 | Dashboard - Services | Kiểm tra gọi services | Component Mount | `<Dashboard />` | Function Calls | Services called | ✅ PASS |
| 8 | Dashboard - Updates | Kiểm tra cập nhật data | Timer | Interval | API Call | Services refreshed | ✅ PASS |

| 9 | OrdersChart - Render | Kiểm tra render chart | Component Render | `<OrdersChart />` | DOM Element | Chart container | ❌ FAIL |
| 10 | OrdersChart - Data | Kiểm tra load dữ liệu | API Call | Mock data | Function Call | getOrdersChart called | ❌ FAIL |
| 11 | OrdersChart - Update | Kiểm tra cập nhật | New Data | Chart data | UI Update | Chart rerendered | ❌ FAIL |
| 12 | OrdersChart - Empty | Kiểm tra không có data | Empty Data | [] | UI Update | Empty message shown | ❌ FAIL |

| 13 | Login - Form | Kiểm tra render form | Component Render | `<Login />` | Form Elements | Login form shown | ✅ PASS |
| 14 | Login - Submit | Kiểm tra submit form | Form Submit | Credentials | API Call | getLoginAdmin called | ❌ FAIL |
| 15 | Login - Validation | Kiểm tra validate input | Invalid Input | Wrong format | UI Update | Error messages | ❌ FAIL |
| 16 | Login - Success | Kiểm tra đăng nhập OK | Valid Input | Correct creds | Navigation | Redirect to dashboard | ❌ FAIL |

| 17 | TopProducts - Render | Kiểm tra hiển thị | Component Render | `<TopProducts />` | Product List | Products displayed | ✅ PASS |
| 18 | TopProducts - Empty | Kiểm tra không có data | Empty Data | [] | UI Update | Empty message | ✅ PASS |
| 19 | TopProducts - Loading | Kiểm tra đang tải | Loading State | Loading | UI Update | Loading spinner | ✅ PASS |
| 20 | TopProducts - Error | Kiểm tra lỗi API | API Error | Error | UI Update | Error message | ✅ PASS |

## Test Results Summary
- Total Test Suites: 9 (3 passed, 6 failed)
- Total Tests: 11 executed (6 passed, 5 failed)
- Total Test Cases: 20 (9 passed, 11 failed)
- Success Rate: 45%
- Time: 4.293s

## Failed Test Details

### Messages Component (4 fails)
- Error: Cannot access 'mockServices' before initialization
- Status: All tests failed

### OrdersChart Component (4 fails)  
- Error: mockDashboardService is not defined
- Status: All tests failed

### Login Component (3 fails)
- Error: Actions must be plain objects
- Status: Submit and validation tests failed

## Coverage Summary
| Component | Statements | Branches | Functions | Lines |
|-----------|------------|----------|-----------|-------|
| Login | 80.95% | 40% | 83.33% | 80% |
| OrdersChart | 76.92% | 0% | 75% | 76.92% |
| TopProducts | 100% | 50% | 100% | 100% |
| Dashboard | 100% | 100% | 100% | 100% |

## Notes
- ✅ PASS: Test case passed successfully
- ❌ FAIL: Test case failed
- ⚠️ SKIP: Test case skipped
