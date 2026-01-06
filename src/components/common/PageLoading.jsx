// 1. ページ全体のローディング（初期読み込み用）
export function PageLoading() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="text-center">
                {/* シンプルなスピナー */}
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>

                {/* ローディングテキスト */}
                <p className="mt-6 text-gray-700 text-sm font-medium">
                    Loading...
                </p>
            </div>
        </div>
    )
}

export default PageLoading
