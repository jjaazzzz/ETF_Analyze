// // Stock Analyzer JavaScript

// class StockAnalyzer {
//     constructor() {
//         this.initializeElements();
//         this.bindEvents();
//         this.currentAnalysis = null;
//     }

//     initializeElements() {
//         // Input elements
//         this.stockInput = document.getElementById('stockInput');
//         this.searchBtn = document.getElementById('searchBtn');
//         this.searchBtnText = document.getElementById('searchBtnText');

//         // State elements
//         this.loadingState = document.getElementById('loadingState');
//         this.errorState = document.getElementById('errorState');
//         this.resultsSection = document.getElementById('resultsSection');
//         this.errorMessage = document.getElementById('errorMessage');

//         // Result elements
//         this.companyName = document.getElementById('companyName');
//         this.stockSymbol = document.getElementById('stockSymbol');
//         this.stockPrice = document.getElementById('stockPrice');
//         this.priceChange = document.getElementById('priceChange');
//         this.changeIcon = document.getElementById('changeIcon');
//         this.changeAmount = document.getElementById('changeAmount');
//         this.changePercent = document.getElementById('changePercent');
//         this.recommendationBadge = document.getElementById('recommendationBadge');
//         this.overallScore = document.getElementById('overallScore');
//         this.overallProgress = document.getElementById('overallProgress');

//         // Detail score elements
//         this.financialScore = document.getElementById('financialScore');
//         this.financialProgress = document.getElementById('financialProgress');
//         this.growthScore = document.getElementById('growthScore');
//         this.growthProgress = document.getElementById('growthProgress');
//         this.marketScore = document.getElementById('marketScore');
//         this.marketProgress = document.getElementById('marketProgress');
//         this.valuationScore = document.getElementById('valuationScore');
//         this.valuationProgress = document.getElementById('valuationProgress');

//         // Metrics elements
//         this.peRatio = document.getElementById('peRatio');
//         this.roeRatio = document.getElementById('roeRatio');
//         this.debtRatio = document.getElementById('debtRatio');
//         this.revenueGrowth = document.getElementById('revenueGrowth');

//         // Analysis lists
//         this.strengthsList = document.getElementById('strengthsList');
//         this.risksList = document.getElementById('risksList');
//     }

//     bindEvents() {
//         this.searchBtn.addEventListener('click', () => this.handleSearch());
//         this.stockInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') {
//                 this.handleSearch();
//             }
//         });

//         this.stockInput.addEventListener('input', () => {
//             this.clearError();
//         });
//     }

//     async handleSearch() {
//         const stockName = this.stockInput.value.trim();
        
//         if (!stockName) {
//             this.showError('주식명을 입력해주세요.');
//             this.stockInput.focus();
//             return;
//         }

//         this.setLoadingState(true);
//         this.clearError();
//         this.hideResults();

//         try {
//             // Flask API 호출
//             const response = await fetch('/api/analyze', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ stock_name: stockName }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => null);
//                 throw new Error(errorData?.error || `API 요청 실패: ${response.status}`);
//             }

//             const result = await response.json();
//             this.currentAnalysis = result;
//             this.displayResults(result);
            
//         } catch (error) {
//             console.error('API 호출 중 오류:', error);
//             this.showError(error.message || '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
//         } finally {
//             this.setLoadingState(false);
//         }
//     }

//     setLoadingState(isLoading) {
//         if (isLoading) {
//             this.searchBtn.disabled = true;
//             this.searchBtnText.textContent = '분석 중...';
//             this.loadingState.classList.remove('hidden');
//         } else {
//             this.searchBtn.disabled = false;
//             this.searchBtnText.textContent = '분석 시작';
//             this.loadingState.classList.add('hidden');
//         }
//     }

//     showError(message) {
//         this.errorMessage.textContent = message;
//         this.errorState.classList.remove('hidden');
//         // Scroll to error
//         this.errorState.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }

//     clearError() {
//         this.errorState.classList.add('hidden');
//     }

//     hideResults() {
//         this.resultsSection.classList.add('hidden');
//     }

//     displayResults(data) {
//         this.updateBasicInfo(data);
//         this.updateOverallScore(data.overallScore);
//         this.updateDetailScores(data);
//         this.updateFinancialMetrics(data.analysis.keyMetrics);
//         this.updateRecommendation(data.recommendation);
//         this.updateAnalysisLists(data.analysis);
        
//         // Show results with animation
//         this.resultsSection.classList.remove('hidden');
//         this.animateResults();
        
//         // Scroll to results
//         setTimeout(() => {
//             this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }, 300);
//     }

//     updateBasicInfo(data) {
//         this.companyName.textContent = data.company;
//         this.stockSymbol.textContent = `코드: ${data.symbol}`;
//         this.stockPrice.textContent = this.formatNumber(data.price);
//         this.updatePriceChange(data.change, data.changePercent);
//     }

//     updatePriceChange(change, changePercent) {
//         const isPositive = change >= 0;
        
//         this.priceChange.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
//         this.changeIcon.className = `fas fa-arrow-${isPositive ? 'up' : 'down'}`;
//         this.changeAmount.textContent = `${isPositive ? '+' : ''}${this.formatNumber(change)}`;
//         this.changePercent.textContent = `(${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`;
//     }

//     updateOverallScore(score) {
//         this.overallScore.textContent = score;
//         this.overallScore.className = `score-number ${this.getScoreClass(score)}`;
        
//         // Animate progress bar
//         setTimeout(() => {
//             this.overallProgress.style.width = `${score}%`;
//             this.overallProgress.className = `progress-fill ${this.getScoreClass(score)}`;
//         }, 500);
//     }

//     updateDetailScores(data) {
//         const scores = [
//             { element: this.financialScore, progress: this.financialProgress, value: data.financialHealth },
//             { element: this.growthScore, progress: this.growthProgress, value: data.growthPotential },
//             { element: this.marketScore, progress: this.marketProgress, value: data.marketOutlook },
//             { element: this.valuationScore, progress: this.valuationProgress, value: data.valuation }
//         ];

//         scores.forEach(({ element, progress, value }, index) => {
//             element.textContent = `${value}점`;
//             element.className = `score-value ${this.getScoreClass(value)}`;
            
//             // Animate progress bars with delay
//             setTimeout(() => {
//                 progress.style.width = `${value}%`;
//                 progress.className = `progress-fill ${this.getScoreClass(value)}`;
//             }, 700 + (index * 200));
//         });
//     }

//     updateFinancialMetrics(metrics) {
//         this.peRatio.textContent = metrics.pe.toFixed(1);
//         this.roeRatio.textContent = `${metrics.roe.toFixed(1)}%`;
//         this.debtRatio.textContent = metrics.debtToEquity.toFixed(2);
//         this.revenueGrowth.textContent = `${metrics.revenueGrowth.toFixed(1)}%`;
        
//         // Animate metric items
//         const metricItems = document.querySelectorAll('.metric-item');
//         metricItems.forEach((item, index) => {
//             setTimeout(() => {
//                 item.style.opacity = '0';
//                 item.style.transform = 'translateY(20px)';
//                 item.style.transition = 'all 0.3s ease-out';
                
//                 setTimeout(() => {
//                     item.style.opacity = '1';
//                     item.style.transform = 'translateY(0)';
//                 }, 50);
//             }, index * 100);
//         });
//     }

//     updateRecommendation(recommendation) {
//         const recommendations = {
//             'strong_buy': { label: '적극 매수', class: 'strong-buy' },
//             'buy': { label: '매수', class: 'buy' },
//             'hold': { label: '보유', class: 'hold' },
//             'sell': { label: '매도', class: 'sell' },
//             'strong_sell': { label: '적극 매도', class: 'strong-sell' }
//         };

//         const config = recommendations[recommendation] || recommendations.hold;
//         this.recommendationBadge.textContent = config.label;
//         this.recommendationBadge.className = `recommendation-badge ${config.class}`;
//     }

//     updateAnalysisLists(analysis) {
//         // Update strengths
//         this.strengthsList.innerHTML = '';
//         analysis.strengths.forEach((strength, index) => {
//             const li = document.createElement('li');
//             li.textContent = strength;
//             li.style.animationDelay = `${index * 0.1}s`;
//             this.strengthsList.appendChild(li);
//         });

//         // Update risks
//         this.risksList.innerHTML = '';
//         analysis.weaknesses.forEach((weakness, index) => {
//             const li = document.createElement('li');
//             li.textContent = weakness;
//             li.style.animationDelay = `${index * 0.1}s`;
//             this.risksList.appendChild(li);
//         });
//     }

//     getScoreClass(score) {
//         if (score >= 80) return 'excellent';
//         if (score >= 60) return 'good';
//         return 'poor';
//     }

//     animateResults() {
//         const cards = document.querySelectorAll('.result-card');
//         cards.forEach((card, index) => {
//             card.style.opacity = '0';
//             card.style.transform = 'translateY(30px)';
//             card.style.transition = 'all 0.6s ease-out';
            
//             setTimeout(() => {
//                 card.style.opacity = '1';
//                 card.style.transform = 'translateY(0)';
//             }, index * 150);
//         });
//     }

//     formatNumber(num) {
//         return new Intl.NumberFormat('ko-KR').format(num);
//     }

//     // Public method for retry functionality
//     retry() {
//         this.handleSearch();
//     }
// }

// // Utility functions
// function retryAnalysis() {
//     if (window.stockAnalyzer) {
//         window.stockAnalyzer.retry();
//     }
// }

// // Toast notification system
// function showToast(message, type = 'info', duration = 3000) {
//     // Remove existing toast
//     const existingToast = document.querySelector('.toast');
//     if (existingToast) {
//         existingToast.remove();
//     }

//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
    
//     const icon = type === 'success' ? 'check-circle' : 
//                  type === 'error' ? 'exclamation-circle' : 'info-circle';
    
//     toast.innerHTML = `
//         <div class="toast-content">
//             <i class="fas fa-${icon}"></i>
//             <span>${message}</span>
//         </div>
//     `;

//     // Add toast styles if not already present
//     if (!document.querySelector('#toast-styles')) {
//         const styles = document.createElement('style');
//         styles.id = 'toast-styles';
//         styles.textContent = `
//             .toast {
//                 position: fixed;
//                 top: 20px;
//                 right: 20px;
//                 z-index: 10000;
//                 padding: 16px 20px;
//                 background: white;
//                 border-radius: 12px;
//                 box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//                 border-left: 4px solid;
//                 animation: slideInRight 0.3s ease-out;
//                 max-width: 400px;
//                 font-family: 'Inter', sans-serif;
//             }
//             .toast-success { border-color: #10b981; }
//             .toast-error { border-color: #ef4444; }
//             .toast-info { border-color: #3b82f6; }
//             .toast-content {
//                 display: flex;
//                 align-items: center;
//                 gap: 12px;
//                 font-size: 14px;
//             }
//             .toast-success .fas { color: #10b981; }
//             .toast-error .fas { color: #ef4444; }
//             .toast-info .fas { color: #3b82f6; }
//             @keyframes slideInRight {
//                 from {
//                     opacity: 0;
//                     transform: translateX(100%);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateX(0);
//                 }
//             }
//         `;
//         document.head.appendChild(styles);
//     }

//     document.body.appendChild(toast);

//     // Auto remove
//     setTimeout(() => {
//         if (toast.parentElement) {
//             toast.style.animation = 'slideInRight 0.3s ease-out reverse';
//             setTimeout(() => toast.remove(), 300);
//         }
//     }, duration);
// }

// // Smooth scroll utility
// function smoothScrollTo(element, offset = 0) {
//     if (element) {
//         const elementPosition = element.offsetTop - offset;
//         window.scrollTo({
//             top: elementPosition,
//             behavior: 'smooth'
//         });
//     }
// }

// // Form validation
// function validateInput(input, errorMessage) {
//     const value = input.value.trim();
//     if (!value) {
//         showToast(errorMessage, 'error');
//         input.focus();
//         return false;
//     }
//     return true;
// }

// // Local storage helpers
// const Storage = {
//     set: (key, value) => {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//             return true;
//         } catch (e) {
//             console.error('Failed to save to localStorage:', e);
//             return false;
//         }
//     },

//     get: (key, defaultValue = null) => {
//         try {
//             const item = localStorage.getItem(key);
//             return item ? JSON.parse(item) : defaultValue;
//         } catch (e) {
//             console.error('Failed to get from localStorage:', e);
//             return defaultValue;
//         }
//     },

//     remove: (key) => {
//         try {
//             localStorage.removeItem(key);
//             return true;
//         } catch (e) {
//             console.error('Failed to remove from localStorage:', e);
//             return false;
//         }
//     }
// };

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize stock analyzer
//     window.stockAnalyzer = new StockAnalyzer();
    
//     // Add ripple effect to buttons
//     const buttons = document.querySelectorAll('.search-btn, .retry-btn');
//     buttons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             // Create ripple effect
//             const ripple = document.createElement('span');
//             const rect = this.getBoundingClientRect();
//             const size = Math.max(rect.width, rect.height);
//             const x = e.clientX - rect.left - size / 2;
//             const y = e.clientY - rect.top - size / 2;
            
//             ripple.style.cssText = `
//                 position: absolute;
//                 border-radius: 50%;
//                 background: rgba(255, 255, 255, 0.3);
//                 transform: scale(0);
//                 animation: ripple 0.6s linear;
//                 left: ${x}px;
//                 top: ${y}px;
//                 width: ${size}px;
//                 height: ${size}px;
//                 pointer-events: none;
//             `;
            
//             // Add ripple animation if not already present
//             if (!document.querySelector('#ripple-styles')) {
//                 const styles = document.createElement('style');
//                 styles.id = 'ripple-styles';
//                 styles.textContent = `
//                     @keyframes ripple {
//                         to {
//                             transform: scale(4);
//                             opacity: 0;
//                         }
//                     }
//                 `;
//                 document.head.appendChild(styles);
//             }
            
//             this.style.position = 'relative';
//             this.style.overflow = 'hidden';
//             this.appendChild(ripple);
            
//             setTimeout(() => ripple.remove(), 600);
//         });
//     });

//     // Add focus enhancement to input
//     const input = document.getElementById('stockInput');
//     if (input) {
//         input.addEventListener('focus', () => {
//             input.parentElement.style.transform = 'scale(1.02)';
//             input.parentElement.style.transition = 'transform 0.2s ease';
//         });
        
//         input.addEventListener('blur', () => {
//             input.parentElement.style.transform = 'scale(1)';
//         });
//     }

//     // Save search history
//     const saveSearchHistory = (stockName) => {
//         const history = Storage.get('searchHistory', []);
//         if (!history.includes(stockName)) {
//             history.unshift(stockName);
//             if (history.length > 10) history.pop(); // Keep only last 10 searches
//             Storage.set('searchHistory', history);
//         }
//     };

//     // Override handleSearch to save history
//     const originalHandleSearch = window.stockAnalyzer.handleSearch;
//     window.stockAnalyzer.handleSearch = function() {
//         const stockName = this.stockInput.value.trim();
//         if (stockName) {
//             saveSearchHistory(stockName);
//         }
//         return originalHandleSearch.call(this);
//     };

//     console.log('Stock Analyzer initialized successfully');
// });

// // Global error handlers
// window.addEventListener('error', (event) => {
//     console.error('Global error:', event.error);
//     showToast('예상치 못한 오류가 발생했습니다.', 'error');
// });

// window.addEventListener('unhandledrejection', (event) => {
//     console.error('Unhandled promise rejection:', event.reason);
//     showToast('네트워크 오류가 발생했습니다.', 'error');
// });

// // Export for global use
// window.StockAnalyzer = StockAnalyzer;
// window.retryAnalysis = retryAnalysis;
// window.showToast = showToast;
// window.Storage = Storage;