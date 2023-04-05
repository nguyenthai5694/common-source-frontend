# Round 1 Demo Guideline

## 1. Cài đặt Virtual host:
Thêm `127.0.0.1 web.soumu.io` vào trong file host C:\Windows\System32\drivers\etc\hosts (đối với máy dùng Windows)  
Với các hệ điều hành khác, tìm và sửa file host tương tự như trên

## 2. Cài đặt npm:
Download và cài đặt: 
https://nodejs.org/en/download/

## 3. Cài đặt yarn với npm
```bash
$ npm install -g yarn
```

## 4. Download source code:
### 4.1. Download trực tiếp file .zip tại:
https://drive.google.com/drive/folders/1ro776MsM_cZVlsQgzZT_ijhWh-pd4lMr

**Sau khi download và giải nén source code, thực hiện luôn bước [5](##5)**

### 4.2. Nếu sử dụng git:
#### 4.2.1. Clone source:
```bash
$ git clone https://git.vti.com.vn/p2_common/p2_frontend/soumu_fe.git demo-frontend-1
```
#### 4.2.2. Checkout nhánh demo:
```bash
$ cd demo-frontend-1
$ git checkout demo-1
```

## 5. Cài đặt các package:
Mở terminal tại **thư mục gốc** của source code, gõ lệnh:
```bash
$ yarn
```

## 6. Khởi động dev server:
```bash
$ yarn start
```

## 7. Nội dung demo

### 7.1:
Truy cập url http://web.soumu.io trên browser

### 7.2:
Click vào link **雛形ルート一覧** (hoặc truy cập url: http://web.soumu.io/dae/hinagata-route-list) để vào trang demo template route list:  
Các chức năng có thể sử dụng:  
- Chức năng search(mock data)
- Chăng năng sort
- Chức năng phân trang, thay đổi số lượng hiển thị.
- Chức năng setting cột hiển thị.
- Chức năng chọn rồi delete.

### 7.3:
Click vào item link bất kì trên list **雛形ルート一覧** để đến trang detail template route:  
Các chức năng có thể sử dụng:
- Click các anchor: 基本情報 _hoặc_  ルート情報 để tự động scroll đến các mục thông tin
- Click Go top button để tự động scroll lên đầu trang
- Click 一覧に戻る button để trở lại list
- Lưu ý:  
 Button 削除 chưa click được   
 Các item của button 雛形ルートを設定 click được nhưng di chuyển tới các page trống, chưa xây dựng  
### 7.4: 
Trở lại trang home bằng cách click vào button **文書管理システム** ở góc trên cùng bên trái.  
Click vào link **06_決裁者設定／08_ユーザー情報 追加後** (hoặc truy cập url: http://web.soumu.io/decision/page-modal2) để đến trang demo authorizer setting  
Click button **最終決裁者設定** để mở modal setting  
Các chức năng có thể sử dụng:
- Đóng/mở tree view
- Tìm kiếm theo keyword
- Hover vào icon user trong danh sách để hiển thị thông tin
- Click 追加 button để add vào danh sách phía dưới
- Resize khung giữa 2 panel
- Drag and drop những item ở list bên dưới
- Click 代理設定 button
- Click dropdown button (dấu 3 chấm) và các menu item bên trong đó
- Click この内容で設定 button

### 7.5:
Trở lại trang home bằng cách click vào button **文書管理システム** ở góc trên cùng bên trái.  
Click vào link **07_起案用紙PDF出力** (hoặc truy cập url: http://web.soumu.io/decision/page-modal3) để đến trang demo download pdf  
Click **その他の操作** button  
Click **起案用紙PDF出力** button để mở modal  
