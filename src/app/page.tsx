import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto p-4">
        <div className="space-y-4">
          <SearchBar />
          <CategoryFilter />
          <ProductGrid />
        </div>
      </main>
    </>
  )
}
