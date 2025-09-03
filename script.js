document.addEventListener('DOMContentLoaded', function() {
    // Efectos hover en las cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efectos en botones de play
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.style.background = '#ffffff';
            this.style.color = '#4ecdc4';
            
            // Simular cambio después de 3 segundos
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.style.background = '#2a9d8a';
                this.style.color = '#ffffff';
            }, 3000);
        });
    });

    // Efectos en categorías
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Efecto de pulso
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
        });
    });

    // Barra de progreso interactiva
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        progressFill.style.width = percentage + '%';
    });

    // Control de volumen
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeFill = document.querySelector('.volume-fill');
    
    volumeSlider.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        volumeFill.style.width = percentage + '%';
    });

    // Búsqueda con efecto
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchBar.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

                // Notificaciones
            const notificationBtn = document.querySelector('.notification-btn');
            notificationBtn.addEventListener('click', function() {
                this.style.background = '#2a9d8a';
                setTimeout(() => {
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 200);
            });
});
