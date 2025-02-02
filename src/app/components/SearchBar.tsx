'use client'

export function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="ค้นหายาหรือเวชภัณฑ์..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2">
        🔍
      </button>
    </div>
  )
}