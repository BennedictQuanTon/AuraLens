import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FF2E93]/20 border border-[#FF2E93]/40 flex items-center justify-center mx-auto text-[#FF2E93]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">Hệ Thống Đang Cân Chỉnh</h2>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Đã xảy ra sự cố hiển thị nhỏ trong quá trình xử lý. Bấm nút bên dưới để khôi phục ngay lập tức nhé!
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#FF2E93] text-gray-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-transform cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Khôi Phục Trang Chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
