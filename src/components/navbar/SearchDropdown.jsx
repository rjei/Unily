import React from "react";
import { Store, User, Package } from "lucide-react";

const SearchDropdown = ({
  isLoading,
  results,
  onSelectItem,
  onViewAll,
  currentPage,
}) => {
  if (!isLoading && (!results || results.length === 0)) return null;

  const LoadingSkeleton = () => (
    <div className="p-3 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-200 animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-shimmer w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-35"
        style={{ top: "77px" }}
      />

      {/* Dropdown content */}
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-40">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Toko Section */}
            {results.stores && results.stores.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                  Toko
                </div>
                {results.stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => onSelectItem(store, "store")}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        store.type === "official" ? "bg-green-50" : "bg-blue-50"
                      }`}
                    >
                      {store.type === "official" ? (
                        <Store className="text-green-600" size={24} />
                      ) : (
                        <User className="text-blue-600" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {store.name}
                        {store.type === "official" && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Resmi
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {store.location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Produk Section */}
            {results.products && results.products.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                  Produk
                </div>
                {results.products.slice(0, 5).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onSelectItem(product, "product")}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-sm font-semibold text-[oklch(0.4_0.15_140)]">
                        Rp {product.price.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* View All Button */}
            {results.total > 5 && (
              <button
                onClick={onViewAll}
                className="w-full px-4 py-3 text-center text-sm font-medium text-[oklch(0.4_0.15_140)] hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                Lihat Semua {results.total} Hasil
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchDropdown;
