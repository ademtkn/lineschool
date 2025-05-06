/**
 * EDUPLATFORM - MAIN APPLICATION SCRIPT
 * 
 * Bu dosya online eğitim platformunun temel işlevselliğini içerir
 * Tüm fonksiyonlar modüler şekilde düzenlenmiştir
 */

// Ana Uygulama Modülü
const EduPlatform = (() => {
    // Config ayarları
    const config = {
      darkMode: {
        localStorageKey: 'eduPlatformDarkMode',
        iconMoon: '<i class="fas fa-moon"></i>',
        iconSun: '<i class="fas fa-sun"></i>'
      },
      selectors: {
        sidebar: '#sidebar',
        mainContent: '.main-content',
        sidebarToggle: '#sidebarToggle',
        languageDropdown: '#languageDropdown',
        courseCards: '.course-card',
        langButtons: '[data-lang]',
        backToTop: '.back-to-top'
      },
      classes: {
        darkMode: 'dark-mode',
        show: 'show',
        visible: 'visible'
      }
    };
    

    const formValidation = {
      init: function() {
        this.setupLoginForm();
        this.setupRegisterForm();
      },
    
      setupLoginForm: function() {
        const form = document.getElementById('loginForm');
        if (!form) return;
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('loginEmail').value;
          const password = document.getElementById('loginPassword').value;
          const errorEl = document.getElementById('loginError');
    
          // Validasyon
          if (!this.validateEmail(email)) {
            this.showError(errorEl, 'Geçerli bir email adresi girin!');
            return;
          }
    
          if (password.length < 8) {
            this.showError(errorEl, 'Şifre en az 8 karakter olmalıdır!');
            return;
          }
    
          // Başarılıysa
          errorEl.classList.add('d-none');
          alert('Giriş başarılı! Yönlendiriliyorsunuz...');
          window.location.href = 'dashboard.html';
        });
      },
    
      setupRegisterForm: function() {
        const form = document.getElementById('registerForm');
        if (!form) return;
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const firstName = document.getElementById('firstName').value;
          const lastName = document.getElementById('lastName').value;
          const email = document.getElementById('registerEmail').value;
          const password = document.getElementById('registerPassword').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          const errorEl = document.getElementById('registerError');
    
          // Validasyon
          if (firstName.length < 2 || lastName.length < 2) {
            this.showError(errorEl, 'Ad ve soyad en az 2 karakter olmalıdır!');
            return;
          }
    
          if (!this.validateEmail(email)) {
            this.showError(errorEl, 'Geçerli bir email adresi girin!');
            return;
          }
    
          if (password.length < 8) {
            this.showError(errorEl, 'Şifre en az 8 karakter olmalıdır!');
            return;
          }
    
          if (password !== confirmPassword) {
            this.showError(errorEl, 'Şifreler eşleşmiyor!');
            return;
          }
    
          // Başarılıysa
          errorEl.classList.add('d-none');
          alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
          window.location.href = 'login.html';
        });
      },
    
      validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
    
      showError: function(element, message) {
        element.textContent = message;
        element.classList.remove('d-none');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    // Sidebar işlemleri
    const sidebar = {
      init: function() {
        const sidebarEl = document.querySelector(config.selectors.sidebar);
        const mainContentEl = document.querySelector(config.selectors.mainContent);
        const toggleBtn = document.querySelector(config.selectors.sidebarToggle);
  
        if (!sidebarEl || !mainContentEl || !toggleBtn) return;
  
        toggleBtn.addEventListener('click', () => this.toggle(sidebarEl, mainContentEl));
      },
      
      toggle: function(sidebarEl, mainContentEl) {
        sidebarEl.classList.toggle(config.classes.show);
        const isOpen = sidebarEl.classList.contains(config.classes.show);
        
        // Ana içerik alanını ayarla
        if (isOpen) {
          mainContentEl.style.marginLeft = `${sidebarEl.offsetWidth}px`;
        } else {
          mainContentEl.style.marginLeft = '0';
        }
        
        // Mobilde body'e overflow hidden ekle
        if (window.innerWidth < 992) {
          document.body.style.overflow = isOpen ? 'hidden' : '';
        }
      }
    };
  
    // Dil değiştirme işlemleri
    const language = {
      init: function() {
        const langButtons = document.querySelectorAll(config.selectors.langButtons);
        const dropdown = document.querySelector(config.selectors.languageDropdown);
        
        if (!langButtons.length || !dropdown) return;
  
        langButtons.forEach(btn => {
          btn.addEventListener('click', (e) => this.changeLanguage(e, btn, dropdown));
        });
      },
      
      changeLanguage: function(e, btn, dropdown) {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        
        // Gerçek uygulamada burada API çağrısı yapılacak
        console.log(`Dil ${lang} olarak değiştirilecek`);
        
        // Dropdown metnini güncelle
        dropdown.innerHTML = `${config.darkMode.iconMoon} ${lang.toUpperCase()}`;
        
        // Geçici uyarı (gerçek uygulamada kaldırılacak)
        this.showLanguageAlert(lang);
      },
      
      showLanguageAlert: function(lang) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert alert-info position-fixed top-0 start-50 translate-middle-x mt-3';
        alertBox.style.zIndex = '1060';
        alertBox.textContent = `Dil ${lang} olarak değiştirilecek. Bu özellik aktif değil.`;
        
        document.body.appendChild(alertBox);
        
        // 3 saniye sonra uyarıyı kaldır
        setTimeout(() => {
          alertBox.classList.add('fade');
          setTimeout(() => alertBox.remove(), 300);
        }, 3000);
      }
    };
  
    // Kurs kartları animasyonları
    const courseCards = {
      init: function() {
        const cards = document.querySelectorAll(config.selectors.courseCards);
        if (!cards.length) return;
        
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => this.animateCard(card, true));
          card.addEventListener('mouseleave', () => this.animateCard(card, false));
        });
      },
      
      animateCard: function(card, isHovering) {
        if (isHovering) {
          card.style.transform = 'translateY(-10px)';
          card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        } else {
          card.style.transform = '';
          card.style.boxShadow = '';
        }
      }
    };
  
    // Dark Mode işlemleri
    const darkMode = {
      init: function() {
        this.toggleBtn = this.createToggleButton();
        document.body.appendChild(this.toggleBtn);
        
        // Kullanıcı tercihini yükle
        this.loadUserPreference();
        
        // Buton eventini ekle
        this.toggleBtn.addEventListener('click', () => this.toggleMode());
      },
      
      createToggleButton: function() {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-lg rounded-circle dark-mode-toggle';
        btn.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        `;
        btn.innerHTML = config.darkMode.iconMoon;
        btn.setAttribute('aria-label', 'Dark mode toggle');
        return btn;
      },
      
      loadUserPreference: function() {
        const savedMode = localStorage.getItem(config.darkMode.localStorageKey);
        if (savedMode === 'enabled') {
          document.body.classList.add(config.classes.darkMode);
          this.toggleBtn.innerHTML = config.darkMode.iconSun;
        }
      },
      
      toggleMode: function() {
        document.body.classList.toggle(config.classes.darkMode);
        const isDarkMode = document.body.classList.contains(config.classes.darkMode);
        
        // Buton ikonunu güncelle
        this.toggleBtn.innerHTML = isDarkMode ? config.darkMode.iconSun : config.darkMode.iconMoon;
        
        // Tercihi localStorage'a kaydet
        localStorage.setItem(
          config.darkMode.localStorageKey, 
          isDarkMode ? 'enabled' : 'disabled'
        );
      }
    };
  
    // Back to top butonu
    const backToTop = {
      init: function() {
        const btn = this.createButton();
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => this.toggleVisibility(btn));
        btn.addEventListener('click', () => this.scrollToTop());
      },
      
      createButton: function() {
        const btn = document.createElement('a');
        btn.href = '#';
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.setAttribute('aria-label', 'Sayfanın başına dön');
        return btn;
      },
      
      toggleVisibility: function(btn) {
        if (window.pageYOffset > 300) {
          btn.classList.add(config.classes.show, config.classes.visible);
        } else {
          btn.classList.remove(config.classes.visible);
          setTimeout(() => {
            if (!btn.classList.contains(config.classes.visible)) {
              btn.classList.remove(config.classes.show);
            }
          }, 300);
        }
      },
      
      scrollToTop: function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };
  
    // Uygulamayı başlat
    const init = () => {
      console.log('EduPlatform başlatılıyor...');
      
      // Modülleri başlat
      sidebar.init();
      language.init();
      courseCards.init();
      darkMode.init();
      backToTop.init();
      formValidation.init();
      
      // Diğer başlangıç işlemleri
      this.checkBrowserFeatures();
    };
  
    // Tarayıcı özellik kontrolü
    const checkBrowserFeatures = () => {
      if (!('classList' in document.documentElement)) {
        alert('Tarayıcınız bazı modern özellikleri desteklemiyor. Lütfen güncel bir tarayıcı kullanın.');
      }
    };
  
    // Public API
    return {
      init
    };
  })();
  
  // DOM yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', EduPlatform.init);
  
// Modern modül yapısı için destek kontrolü
  if (typeof window !== 'undefined') {
    window.EduPlatform = EduPlatform;
}

function changeLanguage(lang) {
  fetch(`/public/locales/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = translations[el.dataset.i18n];
      });
    });
}