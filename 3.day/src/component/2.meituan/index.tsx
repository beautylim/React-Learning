import React, { useState, useRef, useEffect } from 'react';
import './resturantdetail.css';
import { addCartList, clearCartList, fetchFoodList, updateCartItemQuanity } from '../../store/modules/takeaway';
import type { MenuItem, Category } from '../../store/modules/takeaway';

import { useAppDispatch, useAppSelector } from "../../store/hooks"



const RestaurantDetail: React.FC = () => {
  const { foodList } = useAppSelector(state => state.foods)
  const { cartList } = useAppSelector(state => state.foods)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchFoodList())
  }, [dispatch])

  // 用户显式点击/滚动选中的分类；为空时默认回退到第一个分类
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showCartDetail, setShowCartDetail] = useState<boolean>(false);

  // 当前高亮的分类：优先使用显式选中的，否则默认第一个
  const activeCategoryId = selectedCategoryId || foodList[0]?.id || '';
  const setActiveCategoryId = setSelectedCategoryId;

  // 滚动容器ref
  const menuContainerRef = useRef<HTMLDivElement>(null);
  // 存储每个分类的dom元素ref
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // --- 计算购物车总价和总数量 ---
  const totalPrice = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartList.reduce((sum, item) => sum + item.quantity, 0);
  const minOrderAmount = 20;
  const remainingAmount = Math.max(0, minOrderAmount - totalPrice);

  // 是否满足起送价（渲染时直接派生，无需 effect）
  const isCheckoutReady = totalPrice >= minOrderAmount;

  // --- 加入购物车 ---
  const addToCart = (item: MenuItem) => {
    dispatch(addCartList(item))
  };

  // --- 修改购物车商品数量 ---
  const updateQuantity = (itemId: string, delta: number) => {
    dispatch(updateCartItemQuanity({ id: itemId, delta: delta }))
  };

  // --- 清空购物车 ---
  const clearCart = () => {
    dispatch(clearCartList())
    setShowCartDetail(false);
  };

  // --- 结算 ---
  const handleCheckout = () => {
    if (isCheckoutReady) {
      alert(`结算成功！总金额：¥${totalPrice.toFixed(2)}`);
      setShowCartDetail(false);
    } else {
      alert(`还差 ¥${remainingAmount.toFixed(2)} 起送`);
    }
  };

  // --- 侧边栏点击滚动到对应分类 ---
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element && menuContainerRef.current) {
      const container = menuContainerRef.current;
      const top = element.offsetTop - container.offsetTop - 10;
      container.scrollTo({ top, behavior: 'smooth' });
      setActiveCategoryId(categoryId);
    }
  };

  // --- 监听滚动，高亮对应分类 ---
  const handleScroll = () => {
    const container = menuContainerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    // 找到当前最靠近顶部的分类
    let currentId = foodList[0]?.id || '';
    for (const cat of foodList) {
      const el = categoryRefs.current[cat.id];
      if (el) {
        const offset = el.offsetTop - container.offsetTop - 20;
        if (scrollTop >= offset) {
          currentId = cat.id;
        }
      }
    }
    setActiveCategoryId(currentId);
  };

  // --- 搜索过滤 (仅过滤菜品) ---
  const getFilteredItems = (category: Category): MenuItem[] => {
    if (!searchKeyword.trim()) return category.items;
    return category.items.filter(item =>
      item.name.includes(searchKeyword.trim())
    );
  };

  // 判断某个分类是否在搜索后有结果
  const isCategoryVisible = (category: Category) => {
    if (!searchKeyword.trim()) return true;
    return getFilteredItems(category).length > 0;
  };

  // --- 渲染购物车详情弹窗 ---
  const renderCartDetail = () => {
    if (!showCartDetail) return null;
    return (
      <div className="cart-detail-overlay" onClick={() => setShowCartDetail(false)}>
        <div className="cart-detail-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cart-detail-header">
            <span>购物车</span>
            <button className="clear-cart-btn" onClick={clearCart}>清空购物车</button>
          </div>
          <div className="cart-detail-list">
            {cartList.length === 0 ? (
              <div className="empty-cart">购物车是空的</div>
            ) : (
              cartList.map(item => (
                <div key={item.id} className="cart-detail-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">¥{item.price.toFixed(2)}</div>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* --- 顶部：店家信息 --- */}
      <div className="store-header">
        <img src="https://via.placeholder.com/800x200/FF8C00/FFFFFF?text=Store+Banner" alt="店家图片" className="store-image" />
        <div className="store-info">
          <h1 className="store-name">老街烧烤·小龙虾</h1>
          <div className="store-meta">
            <span>⭐ 4.8</span>
            <span>月售 1243</span>
            <span>约 30分钟</span>
            <span>起送 ¥20</span>
          </div>
        </div>
      </div>

      {/* --- 导航栏：点菜 | 评价 | 商家 + 搜索框 --- */}
      <div className="nav-bar">
        <div className="nav-tabs">
          <span className="nav-tab active">点菜</span>
          <span className="nav-tab">评价 (128)</span>
          <span className="nav-tab">商家</span>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索菜品..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* --- 主体：侧边栏 + 菜单列表 (滚动) --- */}
      <div className="main-content">
        {/* 左侧分类侧边栏 */}
        <div className="category-sidebar">
          {foodList?.map(cat => (
            <div
              key={cat.id}
              className={`category-tab ${activeCategoryId === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* 右侧菜单列表（可滚动） */}
        <div
          className="menu-list-container"
          ref={menuContainerRef}
          onScroll={handleScroll}
        >
          {foodList?.map(cat => {
            const visibleItems = getFilteredItems(cat);
            if (!isCategoryVisible(cat)) return null;
            return (
              <div
                key={cat.id}
                className="menu-category-section"
                ref={(el) => { categoryRefs.current[cat.id] = el; }}
              >
                <div className="category-title">{cat.name}</div>
                {visibleItems.map(item => (
                  <div key={item.id} className="menu-item-card">
                    <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
                    <div className="menu-item-details">
                      <div className="menu-item-name">
                        {item.name}
                        {item.isRecommended && <span className="recommend-tag">网友推荐</span>}
                      </div>
                      {item.description && <div className="menu-item-desc">{item.description}</div>}
                      <div className="menu-item-stats">
                        <span>月售 {item.sales}</span>
                        <span>好评 {item.rating}%</span>
                      </div>
                      <div className="menu-item-footer">
                        <span className="menu-item-price">¥{item.price.toFixed(2)}</span>
                        <button className="add-to-cart-btn" onClick={() => addToCart(item)}>+ 加入购物车</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 底部购物车栏 --- */}
      <div className="bottom-cart-bar">
        <div className="cart-info" onClick={() => setShowCartDetail(!showCartDetail)}>
          <div className="cart-icon-wrapper">
            <span className="cart-icon">🛒</span>
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </div>
          <span className="cart-total-price">¥{totalPrice.toFixed(2)}</span>
        </div>
        <button
          className={`checkout-btn ${isCheckoutReady ? 'ready' : 'not-ready'}`}
          onClick={handleCheckout}
        >
          {isCheckoutReady ? `去结算` : `还差¥${remainingAmount.toFixed(2)}起送`}
        </button>
      </div>

      {/* 购物车详情弹窗 */}
      {renderCartDetail()}
    </div>
  );
};

export default RestaurantDetail;