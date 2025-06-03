# Quy trình làm việc với Git cơ bản

## 1. Khởi tạo và clone repository

```bash
# Clone repository
git clone <url>

# Di chuyển vào thư mục dự án
cd <project-name>
```

## 2. Tạo branch và làm việc

```bash
# Tạo branch mới
git checkout -b <branch-name>

# Thêm thay đổi
git add .

# Commit thay đổi
git commit -m "Mô tả thay đổi"

# Push branch lên GitHub
git push origin <branch-name>
```

## 3. Tạo pull request

- Vào GitHub, tạo pull request từ branch của bạn vào branch `main`.
- Đồng nghiệp review code và phê duyệt.

## 4. Cập nhật code từ main

```bash
# Chuyển về branch main
git checkout main

# Pull code mới nhất
git pull origin main

# Merge main vào branch của bạn
git checkout <branch-name>
git merge main
```
