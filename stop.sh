#!/bin/bash

# ==============================================================================
# AuraLens — One-Click Shutdown Script
# ==============================================================================

echo "🛑 ======================================================= 🛑"
echo "           ĐANG DỪNG TẤT CẢ TIẾN TRÌNH AURALENS...          "
echo "🛑 ======================================================= 🛑"

# Kill processes listening on Port 8080 (Server) and Port 3000 (Client)
SERVER_PID=$(lsof -ti:8080)
CLIENT_PID=$(lsof -ti:3000)

if [ -n "$SERVER_PID" ]; then
    echo "🔻 Đang tắt Backend Server (Port 8080 - PID: $SERVER_PID)..."
    kill -9 $SERVER_PID 2>/dev/null
else
    echo "ℹ️  Không có tiến trình nào đang chạy trên cổng 8080."
fi

if [ -n "$CLIENT_PID" ]; then
    echo "🔻 Đang tắt Frontend Client (Port 3000 - PID: $CLIENT_PID)..."
    kill -9 $CLIENT_PID 2>/dev/null
else
    echo "ℹ️  Không có tiến trình nào đang chạy trên cổng 3000."
fi

# Cleanup any orphan concurrently/tsx/vite processes
pkill -f "tsx watch src/app.ts" 2>/dev/null
pkill -f "vite" 2>/dev/null

echo "✅ Toàn bộ hệ thống AuraLens đã được dừng an toàn 100%!"
