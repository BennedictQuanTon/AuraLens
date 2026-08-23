#!/bin/bash

# ==============================================================================
# AuraLens — One-Click Startup Script (AI Riser 2026 / #BuildWithGoogleAI)
# ==============================================================================

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "✨ ======================================================= ✨"
echo "           🚀 KHỞI ĐỘNG DỰ ÁN AURALENS AI FULL-STACK        "
echo "✨ ======================================================= ✨"

# 1. Check & Clean existing ports (8080 & 3000)
echo "🔍 Đang kiểm tra cổng 8080 (Server) và 3000 (Client)..."
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 2. Check node_modules
if [ ! -d "node_modules" ] || [ ! -d "client/node_modules" ] || [ ! -d "server/node_modules" ]; then
    echo "📦 Đang cài đặt thư viện cần thiết lần đầu..."
    npm install
    (cd server && npm install)
    (cd client && npm install)
fi

echo "⚡ Đang bật Server (Port 8080) & Client WebApp (Port 3000)..."
echo "🌐 Ứng dụng sẽ tự động mở trên trình duyệt tại: http://localhost:3000"
echo "🛑 Để dừng ứng dụng, bạn có thể bấm Ctrl+C hoặc chạy: ./stop.sh"
echo "--------------------------------------------------------"

# 3. Open browser after 2 seconds in background
(sleep 2 && open "http://localhost:3000") &

# 4. Start concurrent development servers
npm run dev
